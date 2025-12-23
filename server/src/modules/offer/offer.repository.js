// const { OfferSchema } = require("../../models/index.js");
const { default: mongoose } = require("mongoose");
const { OfferSchema } = require("../../models/index.js");
const pagination = require("../../utils/pagination.js");
const BaseRepository = require("../base/base.repository.js");

class OfferRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }

  async createOffer(payload, session) {
    // create a single document and return the created offer
    const newOffer = await this.#model.create([payload], { session });
    return newOffer;

  }

  async getAllOffer() {
    const categories = await this.#model.find({}).sort({ createdAt: -1 });
    return categories;
  }

  async getNavBar() {
    const navBar = await OfferSchema.aggregate([
      {
        $lookup: {
          from: "subcategories",
          localField: "_id",
          foreignField: "OfferRef",
          as: "subCategories",
        },
      },
      {
        $lookup: {
          from: "childcategories",
          localField: "subCategories._id",
          foreignField: "subOfferRef",
          as: "childCategories",
        },
      },
      {
        $lookup: {
          from: "subchildcategories",
          localField: "childCategories._id",
          foreignField: "childOfferRef",
          as: "subChildCategories",
        },
      },
      // {
      //   $addFields: {
      //     "subCategories.childCategories": {
      //       $filter: {
      //         input: "$childCategories",
      //         as: "child",
      //         cond: {
      //           $eq: ["$$child.subOfferRef", "$$child.subOfferRef"],
      //         },
      //       },
      //     },
      //   },
      // },
      {
        $addFields: {
          subCategories: {
            $map: {
              input: "$subCategories",
              as: "sub",
              in: {
                $mergeObjects: [
                  "$$sub",
                  {
                    childCategories: {
                      $filter: {
                        input: "$childCategories",
                        as: "child",
                        cond: {
                          $eq: ["$$child.subOfferRef", "$$sub._id"],
                        },
                      },
                    },
                  },
                ],
              },
            },
          },
        },
      },

      {
        $project: {
          childCategories: 0,
        },
      },
    ]);
    return navBar;
  }

  async getOfferById(OfferId) {
    const Offer = await this.#model.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(OfferId) }, // Match the specific Offer ID
      },
      {
        $lookup: {
          from: "subcategories", // Name of the subOffer collection in MongoDB
          localField: "_id", // Field in the Offer collection to match
          foreignField: "OfferRef", // Field in the SubOffer collection to match
          as: "subCategories", // Alias for the joined subcategories
        },
      },
      {
        $limit: 1, // Ensure only one result is returned (optional but useful for clarity)
      },
    ]);

    // Return the first Offer if it exists, otherwise return null
    return Offer.length > 0 ? Offer[0] : null;
  }

  async getOfferBySlug(slug) {
    const Offer = await this.#model.aggregate([
      {
        $match: { slug: slug }, // Match the specific Offer ID
      },
      {
        $lookup: {
          from: "subcategories", // Name of the subOffer collection in MongoDB
          localField: "_id", // Field in the Offer collection to match
          foreignField: "OfferRef", // Field in the SubOffer collection to match
          as: "subCategories", // Alias for the joined subcategories
        },
      },
      {
        $limit: 1, // Ensure only one result is returned (optional but useful for clarity)
      },
    ]);

    // Return the first Offer if it exists, otherwise return null
    return Offer.length > 0 ? Offer[0] : null;
  }

  async updateOffer(id, payload) {
    const updatedOffer = await this.#model.findByIdAndUpdate(id, payload);
    if (!updatedOffer) {
      throw new Error("About Us not found");
    }
    return updatedOffer;
  }

  async getOfferWithPagination(payload) {
    try {
      const Offers = await pagination(
        payload,
        async (limit, offset, sortOrder) => {
          const Offers = await this.#model.aggregate([
            {
              $sort: { createdAt: sortOrder }, // Sort by createdAt in the desired order
            },
            {
              $skip: offset, // Skip records for pagination
            },
            {
              $limit: limit, // Limit records for pagination
            },
            {
              $lookup: {
                from: "subcategories", // Name of the subOffer collection in MongoDB
                localField: "_id", // Field in the Offer collection to match
                foreignField: "OfferRef", // Field in the SubOffer collection to match
                as: "subCategories", // Alias for the joined subcategories
              },
            },
          ]);
          const totalOffer = await this.#model.countDocuments();

          return { doc: Offers, totalDoc: totalOffer };
        }
      );

      return Offers;
    } catch (error) {
      console.error("Error getting Offers with pagination:", error);
      throw error;
    }
  }

  async updateOfferStatus(id, payload) {
    return await this.#model.findByIdAndUpdate(id, payload, { new: true });
  }
}

module.exports = new OfferRepository(OfferSchema);
