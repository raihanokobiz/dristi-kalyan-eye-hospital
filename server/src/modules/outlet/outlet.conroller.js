const catchError = require("../../middleware/errors/catchError");
const withTransaction = require("../../middleware/transactions/withTransaction");
const responseHandler = require("../../utils/responseHandler");
const outletService = require("./outlet.service");

class OutletController {
  createOutlet = withTransaction(async (req, res, next, session) => {
    try {
      const { title, city, area, address, mobile, mapLink } = req.body;
      const payload = {
        title,
        city,
        area,
        address,
        mobile,
        mapLink,
      };

      const outletResult = await outletService.createOutlet(payload, session);

      const resDoc = responseHandler(
        201,
        "Outlet Created successfully",
        outletResult
      );
      res.status(resDoc.statusCode).json(resDoc);
    } catch (error) {
      next(error);
    }
  });

  getAllOutlet = catchError(async (req, res, next) => {
    const OutletResult = await outletService.getAllOutlet();
    const resDoc = responseHandler(200, "Get All Outle", OutletResult);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getOutletWithPagination = catchError(async (req, res, next) => {
    let payload = {
      page: req.query.page,
      limit: req.query.limit,
      order: req.query.order,
    };
    const Outlet = await outletService.getOutletWithPagination(payload);
    const resDoc = responseHandler(200, "Offers get successfully", Outlet);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getSingleOutlet = catchError(async (req, res, next) => {
    const id = req.params.id;
    const OutleResult = await outletService.getSingleOutlet(id);
    const resDoc = responseHandler(
      201,
      "Single Outle successfully",
      OutleResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateOutlet = catchError(async (req, res, next) => {
    try {
      const id = req.params.id;

      const payload = {
        title: req.body.title,
        slug: req.body.slug,
        city: req.body.city,
        area: req.body.area,
        address: req.body.address,
        mobile: req.body.mobile,
        map: req.body.map,
      };

      await outletService.updateOutlet(id, payload);
      const resDoc = responseHandler(201, "Outlet Update successfully");
      res.status(resDoc.statusCode).json(resDoc);
    } catch (error) {
      if (error.code === 11000) {
        return res
          .status(400)
          .json({ message: "Outlet title already exists." });
      }
      next(error);
    }
  });

  deleteOutle = catchError(async (req, res, next) => {
    const id = req.params.id;
    await outletService.deleteOutle(id);
    const resDoc = responseHandler(200, "Outlet Deleted successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });
}

module.exports = new OutletController();
