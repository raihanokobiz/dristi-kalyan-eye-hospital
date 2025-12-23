const mongoose = require("mongoose");
const slugify = require("slugify");

const Schema = mongoose.Schema;

const ServiceSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            default: 0
        },
        image: {
            type: String
        },
        slug: {
            type: String,
            unique: true
        },
        status: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

// Generate slug from title
ServiceSchema.pre("save", function (next) {
    if (this.isModified("title")) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }
    next();
});

const ServiceModel = mongoose.model("service", ServiceSchema);

module.exports = { ServiceSchema: ServiceModel };