const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const DoctorService = require("./doctor.service.js");

class DoctorController {
    createDoctor = withTransaction(async (req, res, _next, session) => {
        const payloadFiles = {
            files: req.files,
        };
        const payload = {
            name: req.body.name,
            degree: req.body.degree,
            visitingTime: req.body.visitingTime,
            phone: req.body.phone,
            email: req.body.email,
            availableDays: req.body.availableDays,
            consultationFee: req.body.consultationFee,
            status: req.body.status,
            image: req.body.image,
            imagePublicId: req.body.imagePublicId,
        };
        const doctorResult = await DoctorService.createDoctor(
            payloadFiles,
            payload,
            session
        );
        const resDoc = responseHandler(
            201,
            "Doctor created successfully",
            doctorResult
        );
        res.status(resDoc.statusCode).json(resDoc);
    });

    getAllDoctor = catchError(async (req, res) => {
        const doctorResult = await DoctorService.getAllDoctor();
        const resDoc = responseHandler(200, "Get all doctors", doctorResult);
        res.status(resDoc.statusCode).json(resDoc);
    });

    getDoctorWithPagination = catchError(async (req, res) => {
        let payload = {
            page: req.query.page,
            limit: req.query.limit,
            order: req.query.order,
        };
        const doctors = await DoctorService.getDoctorWithPagination(payload);
        const resDoc = responseHandler(200, "Doctors get successfully", doctors);
        res.status(resDoc.statusCode).json(resDoc);
    });

    getSingleDoctor = catchError(async (req, res) => {
        const id = req.params.id;
        const doctorResult = await DoctorService.getSingleDoctor(id);
        const resDoc = responseHandler(
            200,
            "Single doctor retrieved successfully",
            doctorResult
        );
        res.status(resDoc.statusCode).json(resDoc);
    });

    updateDoctor = catchError(async (req, res) => {
        const id = req.params.id;
        const payload = {
            name: req.body.name,
            degree: req.body.degree,
            visitingTime: req.body.visitingTime,
            phone: req.body.phone,
            email: req.body.email,
            availableDays: req.body.availableDays,
            consultationFee: req.body.consultationFee,
            status: req.body.status,
            image: req.body.image,
            imagePublicId: req.body.imagePublicId,
        };

        const doctorResult = await DoctorService.updateDoctor(
            id,
            payload
        );
        const resDoc = responseHandler(200, "Doctor updated successfully", doctorResult);
        res.status(resDoc.statusCode).json(resDoc);
    });

    updateDoctorStatus = catchError(async (req, res) => {
        const id = req.params.id;
        const status = req.query.status;
        await DoctorService.updateDoctorStatus(id, status);
        const resDoc = responseHandler(200, "Doctor status updated successfully");
        res.status(resDoc.statusCode).json(resDoc);
    });

    deleteDoctor = catchError(async (req, res) => {
        const id = req.params.id;
        await DoctorService.deleteDoctor(id);
        const resDoc = responseHandler(200, "Doctor deleted successfully");
        res.status(resDoc.statusCode).json(resDoc);
    });


    getDoctorsByAvailableDay = catchError(async (req, res) => {
        const day = req.params.day;
        const doctorResult = await DoctorService.getDoctorsByAvailableDay(day);
        const resDoc = responseHandler(
            200,
            "Doctors by available day",
            doctorResult
        );
        res.status(resDoc.statusCode).json(resDoc);
    });
}

module.exports = new DoctorController();