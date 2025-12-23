const { OutletSchema } = require("../../models/index.js");
const pagination = require("../../utils/pagination.js");
const BaseRepository = require("../base/base.repository");

class OutletRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }

  async createOutlet(payload, session) {
    const newOutlet = await this.#model.create([payload], { session });
    return newOutlet;
  }

  async updateOutlet(id, payload) {
    
    const updatedOutlet = await this.#model.findByIdAndUpdate(id, payload);
    if (!updatedOutlet) {
      throw new Error("About Us not found");
    }
    return updatedOutlet;
  }

  async getOutletWithPagination(payload) {
    try {
      const butlet = await pagination(
        payload,
        async (limit, offset, sortOrder) => {
          const brands = await this.#model
            .find({})
            .sort({ createdAt: sortOrder })
            .skip(offset)
            .limit(limit);
          // .populate('')
          // .populate('')
          const totalBrand = await this.#model.countDocuments();

          return { doc: brands, totalDoc: totalBrand };
        }
      );

      return butlet;
    } catch (error) {
      console.error("Error getting butlet with pagination:", error);
      throw error;
    }
  }
}

module.exports = new OutletRepository(OutletSchema);
