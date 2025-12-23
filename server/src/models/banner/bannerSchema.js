const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Bannerschema = new Schema(
  {
    image: {
      type: String,
    },
    imagePublicId: {
      type: String,
    },
    type: {
      type: String,
      enum: [
        "MAIN BANNER",
        "CATEGORY BANNER",
        "BEST SALE BANNER",
        "NEWSLETTER BANNER",
        "SHOP BANNER",
        "PROMO BANNER",
        "UPCOMING BANNER",
      ],
      default: "MAIN BANNER",
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const BannerSchema = mongoose.model("banner", Bannerschema);

module.exports = { BannerSchema };
