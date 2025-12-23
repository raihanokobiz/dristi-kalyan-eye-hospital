const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Subscribeschema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);


const SubscribeSchema = mongoose.model("subscribe", Subscribeschema);

module.exports = { SubscribeSchema };
