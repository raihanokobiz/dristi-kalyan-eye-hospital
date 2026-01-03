const { BookingSchema } = require("../../models/Bookings/bookingSchema");
const BaseRepository = require("../base/base.repository");

class BookingRepository extends BaseRepository {
  #model;

  constructor(model) {
    super(model);          
    this.#model = model;   
  }

  async addBooking(payload, session) {
    const newBooking = await this.#model.create([payload], { session });
    return newBooking;
  };
  async getAllBookings(){
    const bookings = await this.#model.find({});
    return bookings;
  }
}

module.exports = new BookingRepository(BookingSchema);
