const { BookingSchema } = require("../../models/Bookings/bookingSchema");
const pagination = require("../../utils/pagination");
const BaseService = require("../base/base.service");
const BookingRepository = require("./booking.repository");
class BookingService extends BaseService {
  #repository;
  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#repository = repository;
  }
  async addBooking(payload, session) {
    const BookingData = await this.#repository.addBooking(payload, session);
    return BookingData;
  }
  async getAllBooknings() {
    const bookings = await this.#repository.findAll(
      {},

      ["patientName", "appointmentDay", "age", "problem", "doctorId", "phone"],
      { doctorId: "name image availableDays specialization" }

    );
    return bookings;
  }
  async getBookingsWithPagination(payload) {
    try {
      const bookings = await pagination(
        payload,
        async (limit, offset, sortOrder) => {
          const bookings = await BookingSchema
            .find({}).populate("doctorId", "name image availableDays specialization")
            .sort({ createdAt: sortOrder })
            .skip(offset)
            .limit(limit);

          const totalDoctors = await BookingSchema.countDocuments();

          return { doc: bookings, totalDoc: totalDoctors };
        }
      );

      return bookings;
    } catch (error) {
      console.error("Error getting doctors with pagination:", error);
      throw error;
    }
  }

  /** Update booking status */
  async updateBookingStatus(id, status) {
    return await this.#repository.updateBookingStatus(id, status);
  }

  /** Delete booking */
  async deleteBooking(id) {
    return await this.#repository.deleteBooking(id);
  }

}
module.exports = new BookingService(BookingRepository, "booking");