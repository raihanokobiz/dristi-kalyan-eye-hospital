const { NotFoundError } = require("../../utils/errors.js");
const BaseService = require("../base/base.service.js");
const bannerRepository = require("./banner.repository.js");
const {
  removeUploadFile,
} = require("../../middleware/upload/removeUploadFile.js");
const ImgUploader = require("../../middleware/upload/ImgUploder.js");

class BannerService extends BaseService {
  #repository;
  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#repository = repository;
  }

  async createBanner(payload) {
    const bannerData = await this.#repository.createBanner(payload);
    return bannerData;
  }

  async getAllBanner(payload) {
    const { type } = payload;

    const filter = {
      status: true,
    };

    if (type) filter.type = type;

    return await this.#repository.findAll(filter);
  }

  async getBannerWithPagination(payload) {
    const banner = await this.#repository.getBannerWithPagination(payload);
    return banner;
  }

  async getSingleBanner(id) {
    const bannerData = await this.#repository.findById(id);
    if (!bannerData) throw new NotFoundError("Banner Not Find");
    return bannerData;
  }

  async updateBanner(id, payload) {
    const bannerData = await this.#repository.updateById(id, payload);
    if (!bannerData) throw new NotFoundError("Banner Not Find");

    return bannerData;
  }

  async deleteBanner(id) {
    const banner = await this.#repository.findById(id);
    if (!banner) throw new NotFoundError("Banner not found");
    const deletedBanner = await this.#repository.deleteById(id);
    return deletedBanner;
  }
}

module.exports = new BannerService(bannerRepository, "banner");
