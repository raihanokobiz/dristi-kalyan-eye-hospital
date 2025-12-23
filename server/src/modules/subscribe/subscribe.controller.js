const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const SubscribeService = require("./subscribe.service.js");

class SubscribeController {
  createSubscribe = withTransaction(async (req, res, next, session) => {
    try {
      const payload = {
        email: req.body.email,
      };
      const SubscribeResult = await SubscribeService.createSubscribe(
        payload,
        session
      );
      const resDoc = responseHandler(
        201,
        "Subscribe Created successfully",
        SubscribeResult
      );
      res.status(resDoc.statusCode).json(resDoc);
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ message: "Email already exists." });
      }
      next(error);
    }
  });

  getAllSubscribe = catchError(async (req, res, next) => {
    const SubscribeResult = await SubscribeService.getAllSubscribe();
    const resDoc = responseHandler(200, "Get All Subscribes", SubscribeResult);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getSubscribeWithPagination = catchError(async (req, res, next) => {
    let payload = {
      page: req.query.page,
      limit: req.query.limit,
      order: req.query.order,
    };
    const Subscribe = await SubscribeService.getSubscribeWithPagination(
      payload
    );
    const resDoc = responseHandler(
      200,
      "Subscribes get successfully",
      Subscribe
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getSingleSubscribe = catchError(async (req, res, next) => {
    const id = req.params.id;
    const SubscribeResult = await SubscribeService.getSingleSubscribe(id);
    const resDoc = responseHandler(
      201,
      "Single Subscribe successfully",
      SubscribeResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateSubscribe = catchError(async (req, res, next) => {
    try {
      const id = req.params.id;

      const payload = {
        email: req.body.email,
      };
      const SubscribeResult = await SubscribeService.updateSubscribe(
        id,
        payload
      );
      const resDoc = responseHandler(201, "Subscribe Update successfully");
      res.status(resDoc.statusCode).json(resDoc);
    } catch (error) {
      if (error.code === 11000) {
        return res
          .status(400)
          .json({ message: "Product email already exists." });
      }
      next(error);
    }
  });

  deleteSubscribe = catchError(async (req, res, next) => {
    const id = req.params.id;
    const SubscribeResult = await SubscribeService.deleteSubscribe(id);
    const resDoc = responseHandler(200, "Subscribe Deleted successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });
}

module.exports = new SubscribeController();
