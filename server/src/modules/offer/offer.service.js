const { NotFoundError } = require("../../utils/errors.js");
const BaseService = require("../base/base.service.js");
const OfferRepository = require("./offer.repository.js");

const {
  removeUploadFile,
} = require("../../middleware/upload/removeUploadFile.js");
const ImgUploader = require("../../middleware/upload/ImgUploder.js");

class OfferService extends BaseService {
  #repository;
  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#repository = repository;
  }

  async createOffer(payload, session) {
    const OfferData = await this.#repository.createOffer(payload, session);
    return OfferData;
  }

  async getAllOffer() {
    // return await this.#repository.findAll();
    return await this.#repository.getAllOffer();
  }

  async getOfferWithPagination(payload) {
    const Offer = await this.#repository.getOfferWithPagination(payload);
    return Offer;
  }

  async getSingleOffer(id) {
    const OfferData = await this.#repository.getOfferById(id);
    if (!OfferData) throw new NotFoundError("Offer Not Find");
    return OfferData;
  }

  async getSingleOfferWithSlug(slug) {
    const OfferData = await this.#repository.getOfferBySlug(slug);
    if (!OfferData) throw new NotFoundError("Offer Not Find");
    return OfferData;
  }

  async getNavBar() {
    const navbarData = await this.#repository.getNavBar();
    if (!navbarData) throw new NotFoundError("Navbar Not Find");
    return navbarData;
  }

  async updateOffer(id, payload) {    
    const OfferData = await this.#repository.updateOffer(id, payload);
    return OfferData;
  }

  async updateOfferStatus(id, status) {
    if (status === undefined) throw new NotFoundError("Status is required");

    const updatedStatus = status === true || status === "true";

    const Offer = await this.#repository.updateOfferStatus(id, {
      status: updatedStatus,
    });

    if (!Offer) throw new NotFoundError("Offer not found");

    return Offer;
  }

  async deleteOffer(id) {
    const Offer = await this.#repository.findById(id);
    if (!Offer) throw new NotFoundError("Offer not found");
    const deletedOffer = await this.#repository.deleteById(id);

    if (deletedOffer) {
      await removeUploadFile(Offer?.image);
    }
    return deletedOffer;
  }
}

module.exports = new OfferService(OfferRepository, "Offer");
