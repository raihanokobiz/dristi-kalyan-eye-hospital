const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Quoteschema = new Schema(
  {

    quoteId: {
      type: String,
      required: true,
      unique: true,
      default: function () {
        return `QUO-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      },
    },

    subTotalPrice: {
      type: Number,
    },
    totalPrice: {
      type: Number,
    },
    shippingCost: {
      type: Number,
      default: 0,
    },
    couponRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "coupon",
    },
    userRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    correlationId: {
      type: String,
    },
    customerName: {
      type: String,
    },
    customerPhone: {
      type: String,
    },
    customerEmail: {
      type: String,
    },
    customerCity: {
      type: String,
    },
    customerAddress: {
      type: String,
    },
    customerHouse: {
      type: String,
    },
    customerRoad: {
      type: String,
    },
    customerThana: {
      type: String,
    },
    customerAltPhone: {
      type: String,
    },
    paymentMethod: {
      type: String,
      enum: ["CashOnDelivery", "Online", "MobileBanking"],
      default: "CashOnDelivery",
    },

    mobileBankingProvider: {
      type: String, // e.g., bKash, Nagad, Rocket
    },
    mobileNumber: {
      type: String,
    },
    transactionId: {
      type: String,
    },


    paymentRef: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "payment",
      },
    ],

    couponDiscount: {
      type: Number,
      default: 0,
    },

    products: [
      {
        productRef: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          // required: true,
        },
        inventoryRef: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "inventory",
          // required: true,
        },
        quantity: { type: Number, required: true },
        price: { type: Number },
        mrpPrice: { type: Number },
        // color: { type: String },
        // level: { type: String },
        // price: { type: Number },
        // productDiscount: { type: Number },
      },
    ],
    status: {
      type: String,
      enum: [
        "QuotePlaced",
        "Pending",
        "Delivered",
        "Cancelled",
        "Hold",
        "InReview",
      ],
      default: "Pending",
    },
    paymentStatus: {
      type: String,
      enum: ["PENDING", "COMPLETED", "FAILED", "CANCELLED"],
      default: "PENDING",
    },
    isGuestUser: {
      type: Boolean,
      default: false,
    },
    guestUserRef: {
      type: String,
    },
    note: {
      type: String,
    },
    prescription: {
      type: String,
    },
  },
  { timestamps: true }
);

const QuoteSchema = mongoose.model("quote", Quoteschema);

module.exports = { QuoteSchema };
