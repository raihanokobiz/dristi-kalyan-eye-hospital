const { Router } = require("express");
const outletConroller = require("../../modules/outlet/outlet.conroller");

const outletsRoute = Router();

outletsRoute
  .route("/")
  .post(outletConroller.createOutlet)
  .get(outletConroller.getAllOutlet);

outletsRoute.get("/pagination", outletConroller.getOutletWithPagination)


outletsRoute
  .route("/:id")
  .get(outletConroller.getSingleOutlet)
  .put(outletConroller.updateOutlet)
  .delete(outletConroller.deleteOutle);

module.exports = outletsRoute;
