const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const OfferService = require("./offer.service.js");

class OfferController {
  createOffer = withTransaction(async (req, res, next, session) => {
    try {
      
      const payload = {
        name: req.body.name,
        slug: req.body.slug,
        image: req.body.image,
        imagePublicId: req.body.imagePublicId,
      };

      const OfferResult = await OfferService.createOffer(payload, session);
      const resDoc = responseHandler(
        201,
        "Offer Created successfully",
        OfferResult
      );
      res.status(resDoc.statusCode).json(resDoc);
    } catch (error) {
      if (error.code === 11000) {
        return res
          .status(400)
          .json({ message: "Product title already exists." });
      }
      // next(error);
    }
  });

  getAllOffer = catchError(async (req, res, next) => {
    const OfferResult = await OfferService.getAllOffer();
    const resDoc = responseHandler(200, "Get All Offers", OfferResult);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getOfferWithPagination = catchError(async (req, res, next) => {
    let payload = {
      page: req.query.page,
      limit: req.query.limit,
      order: req.query.order,
    };
    const Offer = await OfferService.getOfferWithPagination(payload);
    const resDoc = responseHandler(200, "Offers get successfully", Offer);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getSingleOffer = catchError(async (req, res, next) => {
    const id = req.params.id;
    const OfferResult = await OfferService.getSingleOffer(id);
    const resDoc = responseHandler(
      201,
      "Single Offer successfully",
      OfferResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getSingleOfferWithSlug = catchError(async (req, res, next) => {
    const slug = req.params.slug;
    const OfferResult = await OfferService.getSingleOfferWithSlug(slug);
    const resDoc = responseHandler(
      201,
      "Single Offer successfully",
      OfferResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getNavBar = catchError(async (req, res, next) => {
    const navBarResult = await OfferService.getNavBar();
    const resDoc = responseHandler(
      201,
      "Single Navbar successfully",
      navBarResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateOffer = catchError(async (req, res, next) => {
    try {
      const id = req.params.id;

      const payload = {
        name: req.body.name,
        slug: req.body.slug,
        image: req.body.image,
        imagePublicId: req.body.imagePublicId,
      };
      await OfferService.updateOffer(id, payload);
      const resDoc = responseHandler(201, "Offer Update successfully");
      res.status(resDoc.statusCode).json(resDoc);
    } catch (error) {
      if (error.code === 11000) {
        return res
          .status(400)
          .json({ message: "Product title already exists." });
      }
      next(error);
    }
  });

  updateOfferStatus = catchError(async (req, res, next) => {
    const id = req.params.id;
    const { status } = req.body;

    if (status === undefined) {
      throw new Error("Status is required");
    }

    const OfferResult = await OfferService.updateOfferStatus(id, status);
    const resDoc = responseHandler(201, "Offer Status Update successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });

  deleteOffer = catchError(async (req, res, next) => {
    const id = req.params.id;
    const OfferResult = await OfferService.deleteOffer(id);
    const resDoc = responseHandler(200, "Offer Deleted successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });
}

module.exports = new OfferController();
