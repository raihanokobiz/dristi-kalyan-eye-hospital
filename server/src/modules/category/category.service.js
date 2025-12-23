const { NotFoundError } = require("../../utils/errors.js");
const BaseService = require("../base/base.service.js");
const categoryRepository = require("./category.repository.js");

const {
  removeUploadFile,
} = require("../../middleware/upload/removeUploadFile.js");
const ImgUploader = require("../../middleware/upload/ImgUploder.js");

class CategoryService extends BaseService {
  #repository;
  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#repository = repository;
  }

  async createCategory(payload, session) {
    const categoryData = await this.#repository.createCategory(
      payload,
      session
    );
    return categoryData;
  }

  async getAllCategory() {
    // return await this.#repository.findAll();
    return await this.#repository.getAllCategory();
  }

  async getCategoryWithPagination(payload) {
    const category = await this.#repository.getCategoryWithPagination(payload);
    return category;
  }

  async getSingleCategory(id) {
    const categoryData = await this.#repository.getCategoryById(id);
    if (!categoryData) throw new NotFoundError("Category Not Find");
    return categoryData;
  }

  async getSingleCategoryWithSlug(slug) {
    const categoryData = await this.#repository.getCategoryBySlug(slug);
    if (!categoryData) throw new NotFoundError("Category Not Find");
    return categoryData;
  }

  async getNavBar() {
    const navbarData = await this.#repository.getNavBar();
    if (!navbarData) throw new NotFoundError("Navbar Not Find");
    return navbarData;
  }

  async updateCategory(id, payloadFiles, payload) {
    const categoryData = await this.#repository.updateCategory(id, payload);

    return categoryData;
  }

  async updateCategoryStatus(id, status) {
    if (status === undefined) throw new NotFoundError("Status is required");

    const updatedStatus = status === true || status === "true";

    const category = await this.#repository.updateCategoryStatus(id, {
      status: updatedStatus,
    });

    if (!category) throw new NotFoundError("Category not found");

    return category;
  }

  async deleteCategory(id) {
    const category = await this.#repository.findById(id);
    if (!category) throw new NotFoundError("Category not found");
    const deletedCategory = await this.#repository.deleteById(id);

    return deletedCategory;
  }
}

module.exports = new CategoryService(categoryRepository, "category");
