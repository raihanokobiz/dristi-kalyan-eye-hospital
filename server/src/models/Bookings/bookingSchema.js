const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Bookingchema = new Schema(
  {
    appointmentDate: {
      type: String,
      required: true
    },
    appointmentDay: {
      type: String
    },
    patientName: {
      type: String,
    },
    phone: {
      type: String,
      optional: true
    },
    age: {
      type: String,
    },
    problem: {
      type: String,
    },
    status: {
      type: [
        {
          type: String,
          enum: ["pending", "confirmed", "completed", "cancelled"]
        }
      ],
      default: ["pending"]
    },
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "Doctor"
    }
  },
  { timestamps: true }
);

const BookingSchema = mongoose.model("Booking", Bookingchema);

module.exports = { BookingSchema };
