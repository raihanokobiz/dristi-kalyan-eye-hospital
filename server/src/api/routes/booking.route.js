const express = require("express");
const bookingController = require("../../modules/bookings/booking.controller");

const BookingRoute = express.Router();

BookingRoute.post("/", bookingController.addBooking);
BookingRoute.get("/", bookingController.getAllBookigs);
BookingRoute.get("/pagination", bookingController.getBookingsWithPagination)
module.exports = BookingRoute;
