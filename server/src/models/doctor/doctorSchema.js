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
        profilePicture: {
            type: String,
        },
        status: {
            type: Boolean,
            default: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
        },
        availableDays: {
            type: [String],
            enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
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