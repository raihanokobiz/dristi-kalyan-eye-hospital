
const { CartSchema, InventorySchema, ProductSchema, CouponSchema } = require("../../models/index.js");
const { QuoteSchema } = require("../../models/quote/quoteSchema.js");
const pagination = require("../../utils/pagination.js");
const BaseRepository = require("../base/base.repository.js");

class quoteRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }

  async createquote(payload, session) {
    try {

      const {
        shippingCost = 0,
        coupon,
        userRef,
        customerName,
        customerPhone,
        customerEmail,
        customerCity,
        customerAddress,
        customerAltPhone,
        paymentMethod,
        mobileBankingProvider,
        mobileNumber,
        transactionId,
        prescription,
      } = payload;


      if (!userRef) throw new Error("userRef is required");

      const isObjectId = /^[a-f\d]{24}$/i.test(userRef);
      const query = isObjectId ? { userRef } : { correlationId: userRef };


      // Get cart items
      const carts = await CartSchema.find(query).populate("productRef");
      console.log("Carts found:", carts.length);

      if (!carts.length) throw new Error("Cart is empty");

      // Coupon validate
      let appliedCoupon = null;
      if (coupon) {
        const now = new Date();
        const existCoupon = await CouponSchema.findOne({ code: coupon });

        if (
          existCoupon &&
          now >= existCoupon.startDate &&
          now <= existCoupon.expireDate
        ) {
          appliedCoupon = existCoupon;
        }
      }

      let subTotalPrice = 0;
      let totalCouponDiscount = 0;
      let productDiscountTotal = 0;

      const cartDetails = carts.map((cart) => {
        const product = cart.productRef;
        const qty = cart.quantity;

        const mrp = product.mrpPrice || 0;
        const price = product.price || mrp;

        const productDiscount = price < mrp ? (mrp - price) * qty : 0;

        productDiscountTotal += productDiscount;
        subTotalPrice += price * qty;

        let couponDiscount = 0;
        if (appliedCoupon) {
          if (appliedCoupon.type === "percent") {
            couponDiscount = ((mrp * appliedCoupon.discount) / 100) * qty;
          } else if (appliedCoupon.type === "flat") {
            couponDiscount = (appliedCoupon.discount / carts.length) * qty;
          }
        }

        totalCouponDiscount += couponDiscount;

        return {
          cartId: cart._id,
          product,
          quantity: qty,
          subtotal: price * qty,
          productDiscount,
          couponDiscount,
          savedAmount: productDiscount + couponDiscount,
        };
      });

      const totalPrice =
        payload.totalPrice ?? subTotalPrice - totalCouponDiscount + shippingCost;

      const finalSubTotal = payload.subTotalPrice ?? subTotalPrice;

      // Build product list for quote
      const products = carts.map((c) => ({
        productRef: c.productRef._id,
        quantity: c.quantity,
        price: c.productRef.price,
        mrpPrice: c.productRef.mrpPrice,
        inventoryRef: c.inventoryRef,
      }));

      // Create quote
      const newquote = await QuoteSchema.create(
        [
          {
            subTotalPrice: finalSubTotal,
            totalPrice,
            shippingCost,
            couponDiscount: totalCouponDiscount,
            productDiscount: productDiscountTotal,
            status: "Pending",
            ...query,
            couponRef: appliedCoupon?._id || null,
            customerName,
            customerPhone,
            customerEmail,
            customerCity,
            customerAddress,
            customerAltPhone,
            paymentMethod,
            products,
            mobileBankingProvider,
            mobileNumber,
            transactionId,
            prescription,
          },
        ],
        { session }
      );

      for (const item of products) {
        const productId = item.productRef;
        const qty = item.quantity;

        await InventorySchema.findOneAndUpdate(
          { productRef: productId },
          {
            $inc: {
              availableQuantity: -qty,
              soldQuantity: qty,
            },
          },
          { session }
        );

        await ProductSchema.findByIdAndUpdate(
          productId,
          {
            $inc: {
              totalSales: qty,
              totalquotes: 1,
              totalStockValue: -(qty * item.price),
            },
          },
          { session }
        );
        await ProductSchema.findByIdAndUpdate(
          productId,
          {
            $inc: {
              totalStockValue: -(item.quantity * item.price),
            },
          },
          { session }
        );
        await ProductSchema.findByIdAndUpdate(
          productId,
          { $inc: { totalquotes: 1, totalSales: qty } },
          { session }
        );
      }

      // Delete cart items
      await CartSchema.deleteMany(query, { session });

      return newquote[0];
    } catch (error) {
      console.error("Error in createquote:", error.message);
      throw error;
    }
  }

  async updatequote(id, payload) {
    const updatedquote = await this.#model.findByIdAndUpdate(id, payload);
    if (!updatedquote) {
      throw new Error("About Us not found");
    }
    return updatedquote;
  }
  // async deletequote(id) {
  //   const updatedquote = await this.#model.findByIdAndDelete(id);
  //   if (!updatedquote) {
  //     throw new Error("About Us not found");
  //   }
  //   return updatedquote;
  // }
  async getquoteWithPagination(payload) {
    try {
      const quotes = await pagination(
        payload,
        async (limit, offset, sortquote) => {
          const quotes = await this.#model
            .find({ warehouseRef: payload.warehouseRef })
            .sort({ createdAt: sortquote })
            .skip(offset)
            .limit(limit)
            .populate("paymentRef")
            .populate("products.productRef")
            .populate("products.inventoryRef")
            .populate({
              path: "userRef",
              select: "-password", // Exclude the password field
            })
            .populate("couponRef");
          // .populate('')
          const totalquote = await this.#model.countDocuments({
            warehouseRef: payload.warehouseRef,
          });
          return { doc: quotes, totalDoc: totalquote };
        }
      );

      return quotes;
    } catch (error) {
      console.error("Error getting quotes with pagination:", error);
      throw error;
    }
  }

  async updatequoteStatus(id, status) {
    const updatedquote = await this.#model.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updatedquote) {
      throw new Error("quote not found");
    }
    return updatedquote;
  }

  async getquoteReport(startDate, endDate) {
    const statuses = [
      "quotePlaced",
      "DeliveredPending",
      "Delivered",
      "Cancelled",
      "Hold",
      "InReview",
    ];

    const quotes = await QuoteSchema.aggregate([
      // Match only quotes within the time frame
      {
        $match: {
          createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
        },
      },
      // Group by status and sum values
      {
        $group: {
          _id: "$status",
          totalquotes: { $sum: 1 },
          totalSubTotalPrice: { $sum: { $ifNull: ["$subTotalPrice", 0] } },
          totalProducts: { $sum: { $sum: "$products.quantity" } },
        },
      },
      // Add missing statuses
      {
        $group: {
          _id: null,
          existingStatuses: { $push: "$$ROOT" },
        },
      },
      {
        $project: {
          mergedData: {
            $map: {
              input: statuses,
              as: "status",
              in: {
                status: "$$status", // Rename _id to status
                totalquotes: {
                  $let: {
                    vars: {
                      match: {
                        $arrayElemAt: [
                          {
                            $filter: {
                              input: "$existingStatuses",
                              as: "e",
                              cond: { $eq: ["$$e._id", "$$status"] },
                            },
                          },
                          0,
                        ],
                      },
                    },
                    in: { $ifNull: ["$$match.totalquotes", 0] },
                  },
                },
                totalSubTotalPrice: {
                  $let: {
                    vars: {
                      match: {
                        $arrayElemAt: [
                          {
                            $filter: {
                              input: "$existingStatuses",
                              as: "e",
                              cond: { $eq: ["$$e._id", "$$status"] },
                            },
                          },
                          0,
                        ],
                      },
                    },
                    in: { $ifNull: ["$$match.totalSubTotalPrice", 0] },
                  },
                },
                totalProducts: {
                  $let: {
                    vars: {
                      match: {
                        $arrayElemAt: [
                          {
                            $filter: {
                              input: "$existingStatuses",
                              as: "e",
                              cond: { $eq: ["$$e._id", "$$status"] },
                            },
                          },
                          0,
                        ],
                      },
                    },
                    in: { $ifNull: ["$$match.totalProducts", 0] },
                  },
                },
              },
            },
          },
        },
      },
      { $unwind: "$mergedData" },
      { $replaceRoot: { newRoot: "$mergedData" } },
      { $sort: { totalquotes: -1 } }, // Sort by total quotes (optional)
    ]);

    // If no quotes are found, return the statuses with zero values
    if (quotes.length === 0) {
      return statuses.map((status) => ({
        status: status, // Rename _id to status
        totalquotes: 0,
        totalSubTotalPrice: 0,
        totalProducts: 0,
      }));
    }

    return quotes;

  }
  async getProfitLossReport(startDate, endDate, warehouseRef) {
    const quotes = await QuoteSchema.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
          warehouseRef,
        },
      },
    ]);
  }
}

module.exports = new quoteRepository(QuoteSchema);
