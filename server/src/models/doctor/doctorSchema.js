const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DoctorSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        degree: {
            type: String,
            required: true,
        },
        visitingTime: {
            type: String,
            required: true,
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
        phone: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
        },
        availableDays: {
            type: [String],
            enum: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
            required: true,
        },
        consultationFee: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);



const Doctor = mongoose.model("Doctor", DoctorSchema);

module.exports = { DoctorSchema: Doctor };
