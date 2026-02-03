const { Router } = require("express");
const controller = require("../../modules/service/service.controller.js");
// const jwtAuth = require("../../middleware/auth/jwtAuth.js");
const { upload } = require("../../middleware/upload/upload.js");

const ServiceRoute = Router();

ServiceRoute.route("/")
    .post(upload.any(), controller.createService)
    .get(controller.getAllService);

ServiceRoute.route("/home-page-services")
    .get(controller.getAllServiceForHome);

ServiceRoute.get("/pagination", controller.getServiceWithPagination);

ServiceRoute.get("/slug/:slug", controller.getSingleServiceBySlug);

ServiceRoute.route("/:id")
    .get(controller.getSingleService)
    .put(upload.any(), controller.updateService)
    .delete(controller.deleteService);

ServiceRoute.put("/status/:id", controller.updateServiceStatus);

module.exports = ServiceRoute;