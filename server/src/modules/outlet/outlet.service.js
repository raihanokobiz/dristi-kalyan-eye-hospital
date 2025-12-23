const { NotFoundError } = require("../../utils/errors");
const BaseService = require("../base/base.service");
const outletRepository = require("./outlet.repository");

class OutletService extends BaseService {
  #repository;

  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#repository = repository;
  }

  async createOutlet(payload, session) {

    const outletData = await this.#repository.createOutlet(payload, session);

    return outletData;
  }

  async getAllOutlet() {
    return await this.#repository.findAll();
  }

  async getOutletWithPagination(payload) {
    const brand = await this.#repository.getOutletWithPagination(payload);
    return brand;
  }

  async getSingleOutlet(id) {
    const outletData = await this.#repository.findById(id);
    if (!outletData) throw new NotFoundError("Brand Not Find");
    return outletData;
  }

  async updateOutlet(id, payload) {
    
    const outletData = await this.#repository.updateOutlet(id, payload);
    return outletData;
  }

  async deleteOutle(id) {
    const outlet = await this.#repository.findById(id);
    if (!outlet) throw new NotFoundError("outlet not found");
    const deletedOutle = await this.#repository.deleteById(id);

    return deletedOutle;
  }
}

module.exports = new OutletService(outletRepository, "outlet");
