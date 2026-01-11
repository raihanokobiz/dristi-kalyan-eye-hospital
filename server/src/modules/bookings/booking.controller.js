const catchError = require("../../middleware/errors/catchError.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const responseHandler = require("../../utils/responseHandler.js");
const bookingService = require("./booking.service.js");

class BookingController {
    addBooking = withTransaction(async (req, res, next, session) => {

        console.log(req.body);


        const payload = {
            doctorId: req.body.doctorId,
            appointmentDate: req?.body?.appointmentDate,
            appointmentDay: req?.body?.appointmentDay,
            patientName: req.body.patientName,
            phone: req.body.phone,
            age: req.body.age,
            problem: req.body.problem
        }
        console.log("Payload in booking controller", payload)
        const bookingResult = await bookingService.addBooking(payload, session);
        const resDoc = responseHandler(201, "Booking Successfull. Our team will contact you soon", bookingResult);
        res.status(resDoc.statusCode).json(resDoc);
    });

    getAllBookigs = catchError(async (req, res, next, session) => {
        const bookings = await bookingService.getAllBooknings()
        const resDoc = responseHandler(200, "Bookings fetched successfully", bookings);
        res.status(resDoc.statusCode).json(resDoc)
    })

    getBookingsWithPagination = catchError(async (req, res) => {
        let payload = {
            page: req.query?.page,
            limit: req.query?.limit,
            booking: req.query?.booking,
        };
        console.log(payload)
        const doctors = await bookingService.getBookingsWithPagination(payload);
        const resDoc = responseHandler(200, "Bookings get successfully", doctors);
        res.status(resDoc.statusCode).json(resDoc);
    });

    updateBookingStatus = catchError(async (req, res, next) => {
        const { id } = req.params;
        const { status } = req.body;
        const updated = await bookingService.updateBookingStatus(id, status);
        const resDoc = responseHandler(200, "Booking status updated", updated);
        res.status(resDoc.statusCode).json(resDoc);
    });

    /** Delete booking */
    deleteBooking = catchError(async (req, res, next) => {
        const { id } = req.params;
        const deleted = await bookingService.deleteBooking(id);
        const resDoc = responseHandler(200, "Booking deleted successfully", deleted);
        res.status(resDoc.statusCode).json(resDoc);
    });


}
module.exports = new BookingController();