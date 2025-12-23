
const { default: mongoose } = require("mongoose");
const pagination = require("../../utils/pagination.js");
const BaseRepository = require("../base/base.repository.js");
const { SubscribeSchema } = require("../../models/subscribe/subscribeSchema.js");



class SubscribeRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }

  async createSubscribe(payload, session) {
    const newSubscribe = await this.#model.create([payload], { session });
    console.log("New Subscribe Created:", newSubscribe);
    return newSubscribe;
  }

  async getAllSubscribe() {
    const categories = await this.#model.find({}).sort({ createdAt: -1 });
    return categories;
  }

  async getSubscribeById(SubscribeId) {
    const Subscribe = await this.#model.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(SubscribeId) }, // Match the specific Subscribe ID
      },
      {
        $lookup: {
          from: "subcategories", // Name of the subSubscribe collection in MongoDB
          localField: "_id", // Field in the Subscribe collection to match
          foreignField: "SubscribeRef", // Field in the SubSubscribe collection to match
          as: "subCategories", // Alias for the joined subcategories
        },
      },
      {
        $limit: 1, // Ensure only one result is returned (optional but useful for clarity)
      },
    ]);

    // Return the first Subscribe if it exists, otherwise return null
    return Subscribe.length > 0 ? Subscribe[0] : null;
  }


  async updateSubscribe(id, payload) {
    const updatedSubscribe = await this.#model.findByIdAndUpdate(id, payload);
    if (!updatedSubscribe) {
      throw new Error("About Us not found");
    }
    return updatedSubscribe;
  }

  async getSubscribeWithPagination(payload) {
    try {
      const Subscribes = await pagination(
        payload,
        async (limit, offset, sortOrder) => {
          const Subscribes = await this.#model.aggregate([
            {
              $sort: { createdAt: sortOrder }, // Sort by createdAt in the desired order
            },
            {
              $skip: offset, // Skip records for pagination
            },
            {
              $limit: limit, // Limit records for pagination
            },
            {
              $lookup: {
                from: "subcategories", // Name of the subSubscribe collection in MongoDB
                localField: "_id", // Field in the Subscribe collection to match
                foreignField: "SubscribeRef", // Field in the SubSubscribe collection to match
                as: "subCategories", // Alias for the joined subcategories
              },
            },
          ]);
          const totalSubscribe = await this.#model.countDocuments();

          return { doc: Subscribes, totalDoc: totalSubscribe };
        }
      );

      return Subscribes;
    } catch (error) {
      console.error("Error getting Subscribes with pagination:", error);
      throw error;
    }
  }

  async updateSubscribeStatus(id, payload) {
    return await this.#model.findByIdAndUpdate(id, payload, { new: true });
  }
}

module.exports = new SubscribeRepository(SubscribeSchema);
