const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const ServiceService = require("./service.service.js");

class ServiceController {
    createService = withTransaction(async (req, res, _next, session) => {
        const payloadFiles = {
            files: req.files
        };

        const payload = {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            status: req.body.status
        };

        const serviceResult = await ServiceService.createService(
            payloadFiles,
            payload,
            session
        );

        const resDoc = responseHandler(
            201,
            "Service created successfully",
            serviceResult
        );
        res.status(resDoc.statusCode).json(resDoc);
    });

    getAllService = catchError(async (req, res) => {
        const serviceResult = await ServiceService.getAllService();
        const resDoc = responseHandler(200, "Get all services", serviceResult);
        res.status(resDoc.statusCode).json(resDoc);
    });

    getServiceWithPagination = catchError(async (req, res) => {
        const payload = {
            page: req.query.page,
            limit: req.query.limit,
            order: req.query.order
        };

        const service = await ServiceService.getServiceWithPagination(payload);
        const resDoc = responseHandler(200, "Services get successfully", service);
        res.status(resDoc.statusCode).json(resDoc);
    });

    getSingleService = catchError(async (req, res) => {
        const id = req.params.id;
        const serviceResult = await ServiceService.getSingleService(id);
        const resDoc = responseHandler(
            200,
            "Single service retrieved successfully",
            serviceResult
        );
        res.status(resDoc.statusCode).json(resDoc);
    });

    updateService = catchError(async (req, res) => {
        const id = req.params.id;
        const payloadFiles = {
            files: req?.files
        };

        const payload = {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            status: req.body.status
        };

        await ServiceService.updateService(
            id,
            payloadFiles,
            payload
        );

        const resDoc = responseHandler(200, "Service updated successfully");
        res.status(resDoc.statusCode).json(resDoc);
    });

    updateServiceStatus = catchError(async (req, res) => {
        const id = req.params.id;
        const status = req.query.status;

        await ServiceService.updateServiceStatus(id, status);
        const resDoc = responseHandler(200, "Service status updated successfully");
        res.status(resDoc.statusCode).json(resDoc);
    });

    deleteService = catchError(async (req, res) => {
        const id = req.params.id;
        await ServiceService.deleteService(id);
        const resDoc = responseHandler(200, "Service deleted successfully");
        res.status(resDoc.statusCode).json(resDoc);
    });
}

module.exports = new ServiceController();