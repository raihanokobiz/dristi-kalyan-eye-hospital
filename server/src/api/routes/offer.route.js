const { Router } = require("express");
const controller = require("../../modules/offer/offer.controller.js");
// const jwtAuth = require("../../middleware/auth/jwtAuth.js");
const { upload } = require("../../middleware/upload/upload.js");

const OfferRoute = Router();

// Uncomment the line below if JWT authentication is required
OfferRoute.get("/navbar", controller.getNavBar);
OfferRoute.route("/")
  .post(upload.any(), controller.createOffer)
  .get(controller.getAllOffer);

OfferRoute.get("/pagination", controller.getOfferWithPagination);

OfferRoute.route("/:slug").get(controller.getSingleOfferWithSlug);

OfferRoute.route("/:id")
  .get(controller.getSingleOffer)
  .put(upload.any(), controller.updateOffer)
  .delete(controller.deleteOffer);

OfferRoute.patch("/status/:id", controller.updateOfferStatus);

module.exports = OfferRoute;
