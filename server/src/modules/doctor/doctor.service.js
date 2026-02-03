const { DoctorSchema } = require("../../models/index.js");
const { NotFoundError } = require("../../utils/errors.js");
const ImgUploader = require("../../middleware/upload/ImgUploder.js");
const { removeUploadFile } = require("../../middleware/upload/removeUploadFile.js");
const pagination = require("../../utils/pagination.js");

class DoctorService {

    async createDoctor(payloadFiles, payload, session) {
        const { files } = payloadFiles;
        const {
            name,
            degree,
            visitingTime,
            phone,
            availableDays,
            consultationFee,
        } = payload;

        // Validate required fields (image is optional)
        if (!name || !degree || !visitingTime || !phone || !availableDays || !consultationFee) {
            throw new Error("All required fields must be provided");
        }

        // Parse availableDays if it's a JSON string
        if (typeof availableDays === "string") {
            payload.availableDays = JSON.parse(availableDays);
        }

        // Handle profile picture upload
        if (files?.length) {
            const images = await ImgUploader(files);
            if (images.profilePicture) {
                payload.profilePicture = images.profilePicture;
            }
        }

        const doctorData = await DoctorSchema.create([payload], { session });
        return doctorData;
    }

    async getAllDoctor() {
        const doctors = await DoctorSchema.find({});
        return doctors;
    }

    async getDoctorsForHomePage() {
        const doctors = await DoctorSchema.find({ status: true })
            .select(
                "name degree image visitingTime consultationFee status"
            )
            .sort({ createdAt: -1 })
            .limit(4);

        return doctors;
    }


    async getDoctorWithPagination(payload) {
        try {
            const doctors = await pagination(
                payload,
                async (limit, offset, sortOrder) => {
                    const doctors = await DoctorSchema
                        .find({})
                        .sort({ createdAt: sortOrder })
                        .skip(offset)
                        .limit(limit);

                    const totalDoctors = await DoctorSchema.countDocuments();

                    return { doc: doctors, totalDoc: totalDoctors };
                }
            );

            return doctors;
        } catch (error) {
            console.error("Error getting doctors with pagination:", error);
            throw error;
        }
    }

    async getSingleDoctor(id) {
        const doctorData = await DoctorSchema.findById(id);
        if (!doctorData) throw new NotFoundError("Doctor not found");
        return doctorData;
    }

    async updateDoctor(id, payload) {

        // Parse availableDays if it's a JSON string
        if (payload.availableDays && typeof payload.availableDays === "string") {
            payload.availableDays = JSON.parse(payload.availableDays);
        }

        // Get old doctor data for file cleanup
        const oldDoctorData = await DoctorSchema.findById(id);
        if (!oldDoctorData) {
            throw new NotFoundError("Doctor not found");
        }

        // Update the database with the new data
        const doctorData = await DoctorSchema.findByIdAndUpdate(id, payload, {
            new: true,
        });

        return doctorData;
    }

    async updateDoctorStatus(id, status) {
        if (status === undefined) throw new NotFoundError("Status is required");
        const statusBoolean = status === "true";

        const doctor = await DoctorSchema.findByIdAndUpdate(
            id,
            { status: statusBoolean },
            { new: true }
        );

        if (!doctor) throw new NotFoundError("Doctor not found");
        return doctor;
    }

    async deleteDoctor(id) {
        const doctor = await DoctorSchema.findById(id);
        if (!doctor) throw new NotFoundError("Doctor not found");

        const deletedDoctor = await DoctorSchema.findByIdAndDelete(id);

        if (deletedDoctor && doctor?.profilePicture) {
            await removeUploadFile(doctor.profilePicture);
        }

        return deletedDoctor;
    }



    async getDoctorsByAvailableDay(day) {
        const doctors = await DoctorSchema.find({
            availableDays: day,
            status: true,
        });
        return doctors;
    }
}

module.exports = new DoctorService();