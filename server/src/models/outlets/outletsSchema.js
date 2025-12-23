const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Paymentschema = new Schema(
  {
    title: { type: String, required: true },
    city: { type: String, required: true },
    area: { type: String, required: false },
    address: { type: String, required: true },
    mobile: { type: Number, required: false },
    mapLink: { type: String, required: false },
  },
  { timestamps: true }
);

const OutletSchema = mongoose.model("outlet", Paymentschema);

module.exports = { OutletSchema };
