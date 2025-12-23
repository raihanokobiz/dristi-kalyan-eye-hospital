const { Router } = require("express");
const controller = require("../../modules/doctor/doctor.controller.js");
const jwtAuth = require("../../middleware/auth/jwtAuth.js");
const { upload } = require("../../middleware/upload/upload.js");

const DoctorRoute = Router();

DoctorRoute.route("/")
    .post(

        upload.any(),
        controller.createDoctor
    )
    .get(

        controller.getAllDoctor
    );

DoctorRoute.get("/pagination", controller.getDoctorWithPagination);


DoctorRoute.get("/available-day/:day", controller.getDoctorsByAvailableDay);

DoctorRoute.route("/:id")
    .get(controller.getSingleDoctor)
    .put(upload.any(), controller.updateDoctor)
    .delete(controller.deleteDoctor);

DoctorRoute.put("/status/:id", controller.updateDoctorStatus);

module.exports = DoctorRoute;