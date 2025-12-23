const { NotFoundError } = require("../../utils/errors.js");
const BaseService = require("../base/base.service.js");
const SubscribeRepository = require("./subscribe.repository.js");

class SubscribeService extends BaseService {
  #repository;
  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#repository = repository;
  }

  async createSubscribe(payload, session) {
    const SubscribeData = await this.#repository.createSubscribe(
      payload,
      session
    );
    return SubscribeData;
  }

  async getAllSubscribe() {
    // return await this.#repository.findAll();
    return await this.#repository.getAllSubscribe();
  }

  async getSubscribeWithPagination(payload) {
    const Subscribe = await this.#repository.getSubscribeWithPagination(
      payload
    );
    return Subscribe;
  }

  async getSingleSubscribe(id) {
    const SubscribeData = await this.#repository.getSubscribeById(id);
    if (!SubscribeData) throw new NotFoundError("Subscribe Not Find");
    return SubscribeData;
  }

  async getSingleSubscribeWithSlug(slug) {
    const SubscribeData = await this.#repository.getSubscribeBySlug(slug);
    if (!SubscribeData) throw new NotFoundError("Subscribe Not Find");
    return SubscribeData;
  }

  async getNavBar() {
    const navbarData = await this.#repository.getNavBar();
    if (!navbarData) throw new NotFoundError("Navbar Not Find");
    return navbarData;
  }

  async updateSubscribe(id, payloadFiles, payload) {
    // Update the database with the new data
    const SubscribeData = await this.#repository.updateSubscribe(id, payload);

    return SubscribeData;
  }

  async updateSubscribeStatus(id, status) {
    if (status === undefined) throw new NotFoundError("Status is required");

    const updatedStatus = status === true || status === "true";

    const Subscribe = await this.#repository.updateSubscribeStatus(id, {
      status: updatedStatus,
    });

    if (!Subscribe) throw new NotFoundError("Subscribe not found");

    return Subscribe;
  }

  async deleteSubscribe(id) {
    const Subscribe = await this.#repository.findById(id);
    if (!Subscribe) throw new NotFoundError("Subscribe not found");
    const deletedSubscribe = await this.#repository.deleteById(id);
    return deletedSubscribe;
  }
}

module.exports = new SubscribeService(SubscribeRepository, "Subscribe");
