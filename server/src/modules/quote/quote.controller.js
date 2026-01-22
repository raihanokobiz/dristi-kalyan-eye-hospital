const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const quoteService = require("./quote.service.js");
const paymentService = require("../payment/payment.service.js");
const ImgUploader = require("../../middleware/upload/ImgUploder.js");

class quoteController {

  createquote = withTransaction(async (req, res, next, session) => {
    try {
      let uploadedFiles = {};

      // Upload files if they exist
      if (req.files && req.files.length > 0) {
        try {
          uploadedFiles = await ImgUploader(req.files);
        } catch (uploadError) {
          console.error("File upload error:", uploadError.message);
          // Continue without file if upload fails, not a critical error
        }
      }

      const payload = {
        subTotalPrice: req.body.subTotalPrice,
        shippingCost: req.body.shippingCost,
        userRef: req.body.userRef,
        customerName: req.body.customerName,
        customerPhone: req.body.customerPhone,
        customerAddress: req.body.customerAddress,
        customerCity: req.body.customerCity,
        customerThana: req.body.customerThana,
        customerEmail: req.body.customerEmail,
        paymentMethod: req.body.paymentMethod,
        prescription: uploadedFiles?.prescription || null,
      };

      const quote = await quoteService.createquote(
        { files: req.files },
        payload,
        session
      );

      return res.status(201).json({
        success: true,
        message: "Quote created successfully",
        data: quote,
      });
    } catch (err) {
      next(err);
    }
  });


  createAdminquote = withTransaction(async (req, res, next, session) => {
    const payload = {
      userRef: req.body.userRef,
      quotes: req?.body?.quote,
      warehouseRef: req.body.warehouseRef,
      payment: req.body.payment,
      note: req.body.note,
    };
    const quoteResult = await quoteService.createAdminquote(payload, session);
    const resDoc = responseHandler(
      201,
      "quote Created successfully",
      quoteResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getAllquote = catchError(async (req, res) => {
    const quoteResult = await quoteService.getAllquote();
    const resDoc = responseHandler(200, "Get All quotes", quoteResult);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getquoteWithPagination = catchError(async (req, res) => {
    let payload = {
      page: req.query.page,
      limit: req.query.limit,
      quote: req.query.quote,
      warehouseRef: req.query.warehouseRef,
    };
    const quote = await quoteService.getquoteWithPagination(payload);
    const resDoc = responseHandler(200, "quotes get successfully", quote);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getSinglequote = catchError(async (req, res) => {
    const id = req.params.id;
    const quoteResult = await quoteService.getSinglequote(id);
    const resDoc = responseHandler(
      201,
      "Single quote successfully",
      quoteResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getUserAllquote = catchError(async (req, res) => {
    const id = req.params.id;
    const quoteResult = await quoteService.getUserAllquote(id);
    const resDoc = responseHandler(
      201,
      "User All quote get successfully",
      quoteResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });
  quoteTracking = catchError(async (req, res) => {
    const payload = {
      quoteId: req.body.quoteId,
    };
    const quoteResult = await quoteService.quoteTracking(payload);
    const resDoc = responseHandler(
      201,
      "User quote get successfully",
      quoteResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  updatequote = catchError(async (req, res) => {
    const id = req.params.id;
    // const payloadFiles = {
    //   files: req?.files,
    // };
    const payload = {
      quoteId: req.body.quoteId,
      subTotal: req.body.subTotal,
      total: req.body.total,
      status: req.body.status,
      coupon: req.body.coupon,
      userRef: req.body.userRef,
    };
    await quoteService.updatequote(
      id,
      // payloadFiles,
      payload
    );
    const resDoc = responseHandler(201, "quote Update successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });

  updatequoteStatus = withTransaction(async (req, res, next, session) => {
    const id = req.params.id;
    const status = req.body.status;
    await quoteService.updatequoteStatus(id, status, session);
    const resDoc = responseHandler(201, "quote Status Update successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });

  deletequote = withTransaction(async (req, res, next, session) => {
    const id = req.params.id;

    const quoteResult = await quoteService.deletequote(id, session);
    if (quoteResult) {
      const resDoc = responseHandler(200, "quote Deleted successfully");
      res.status(resDoc.statusCode).json(resDoc);
    }
  });
}

module.exports = new quoteController();
