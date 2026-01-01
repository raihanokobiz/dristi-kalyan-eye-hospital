const { ServiceSchema } = require("../../models/index.js");
const { NotFoundError } = require("../../utils/errors.js");
const pagination = require("../../utils/pagination.js");
const ImgUploader = require("../../middleware/upload/ImgUploder.js");
const { removeUploadFile } = require("../../middleware/upload/removeUploadFile.js");

class ServiceService {
    // Create Service
    async createService(payloadFiles, payload, session) {
        const { files } = payloadFiles;
        const { title, description } = payload;

        // Validation
        if (!title || !description) {
            throw new Error("Title and description are required");
        }

        // Upload image if exists
        if (files?.length) {
            const images = await ImgUploader(files);
            for (const key in images) {
                payload[key] = images[key];
            }
        }

        const newService = await ServiceSchema.create([payload], { session });
        return newService[0];
    }

    // Get All Services
    async getAllService() {
        return await ServiceSchema.find({});
    }

    // Get Services with Pagination
    async getServiceWithPagination(payload) {
        try {
            const services = await pagination(
                payload,
                async (limit, offset, sortOrder) => {
                    const services = await ServiceSchema
                        .find({})
                        .sort({ createdAt: sortOrder })
                        .skip(offset)
                        .limit(limit);

                    const totalService = await ServiceSchema.countDocuments();

                    return { doc: services, totalDoc: totalService };
                }
            );

            return services;
        } catch (error) {
            console.error("Error getting services with pagination:", error);
            throw error;
        }
    }

    // Get Single Service
    async getSingleService(id) {
        const serviceData = await ServiceSchema.findById(id);
        if (!serviceData) throw new NotFoundError("Service not found");
        return serviceData;
    }

    // Get Single Service by Slug
    async getSingleServiceBySlug(slug) {
        const serviceData = await ServiceSchema.findOne({ slug });
        if (!serviceData) throw new NotFoundError("Service not found");
        return serviceData;
    }

    // Update Service
    async updateService(id, payloadFiles, payload) {
        const { files } = payloadFiles;

        // Get existing service for image cleanup
        const existingService = await ServiceSchema.findById(id);
        if (!existingService) throw new NotFoundError("Service not found");

        // Upload new image if provided
        if (files?.length) {
            const images = await ImgUploader(files);
            for (const key in images) {
                payload[key] = images[key];
            }
        }

        // Update the database with the new data
        const serviceData = await ServiceSchema.findByIdAndUpdate(
            id,
            payload,
            { new: true }
        );

        // Remove old image if a new one was uploaded
        if (files?.length && existingService.image) {
            await removeUploadFile(existingService.image);
        }

        return serviceData;
    }

    // Update Service Status
    async updateServiceStatus(id, status) {
        if (status === undefined || status === null) {
            throw new NotFoundError("Status is required");
        }

        const statusBoolean = status === "true" || status === true;

        const service = await ServiceSchema.findByIdAndUpdate(
            id,
            { status: statusBoolean },
            { new: true }
        );

        if (!service) throw new NotFoundError("Service not found");
        return service;
    }

    // Delete Service
    async deleteService(id) {
        const service = await ServiceSchema.findById(id);
        if (!service) throw new NotFoundError("Service not found");

        const deletedService = await ServiceSchema.findByIdAndDelete(id);

        // Remove image file if exists
        if (deletedService && service.image) {
            await removeUploadFile(service.image);
        }

        return deletedService;
    }
}

module.exports = new ServiceService();