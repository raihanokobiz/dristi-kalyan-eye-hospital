const mongoose = require("mongoose");
const slugify = require("slugify");

const Schema = mongoose.Schema;

const DoctorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
    },

    degree: {
      type: String,
      required: true,
      trim: true,
    },

    visitingTime: {
      type: String,
      required: true,
      trim: true,
    },

    consultationFee: {
      type: Number,
      required: true,
      min: 0,
    },

    availableDays: {
      type: [String],
      enum: [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ],
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
    },

    image: {
      type: String,
    },

    imagePublicId: {
      type: String,
    },

    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// 🔹 Auto-generate slug from name
DoctorSchema.pre("save", function (next) {
  if (this.name && (!this.slug || this.isModified("name"))) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

const Doctor = mongoose.model("doctor", DoctorSchema);

module.exports = { Doctor };
