const mongoose = require("mongoose");
const slugify = require("slugify");

const Schema = mongoose.Schema;

const Offerschema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
    },
    image: {
      type: String,
    },
    imagePublicId: {
      type: String,
    },
  },
  { timestamps: true }
);

// Pre-save middleware to generate slug
Offerschema.pre("save", function (next) {
  if (this.name && (!this.slug || this.isModified("name"))) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

const OfferSchema = mongoose.model("Offer", Offerschema);

module.exports = { OfferSchema };
