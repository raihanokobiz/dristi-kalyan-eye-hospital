const { Router } = require("express");
const controller = require("../../modules/quote/quote.controller.js");
// const jwtAuth = require("../../middleware/auth/jwtAuth.js");
const { upload } = require("../../middleware/upload/upload.js");

const QuoteRoute = Router();

// Uncomment the line below if JWT authentication is required
// OrderRoute.use(jwtAuth());

// Pagination route must come first (before /:id)
QuoteRoute.get("/pagination", controller.getquoteWithPagination);

// Main routes
QuoteRoute.route("/")
  .post(upload.any(), controller.createquote)
  .get(controller.getAllquote);

QuoteRoute.route("/admin").post(controller.createAdminquote);

QuoteRoute.route("/user/:id").get(controller.getUserAllquote);

QuoteRoute.route("/track").post(controller.quoteTracking);

QuoteRoute.put("/status/:id", controller.updatequoteStatus);

// Single quote routes (/:id) - must come last
QuoteRoute.route("/:id")
  .get(controller.getSinglequote)
  .put(upload.any(), controller.updatequote)
  .delete(controller.deletequote);

module.exports = QuoteRoute;
