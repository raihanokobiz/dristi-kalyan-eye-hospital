const { Router } = require("express");
const controller = require("../../modules/subscribe/subscribe.controller.js")

const SubscribeRoute = Router();

SubscribeRoute.route("/")
  .post( controller.createSubscribe)
  .get(controller.getAllSubscribe);

SubscribeRoute.get("/pagination", controller.getSubscribeWithPagination);

SubscribeRoute.route("/:id")
  .get(controller.getSingleSubscribe)
  .put( controller.updateSubscribe)
  .delete(controller.deleteSubscribe);


module.exports = SubscribeRoute;
