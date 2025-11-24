import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookingType: {
      type: String,
      enum: ["hotel", "package", "flight", "train", "bus", "cab"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
      default: "Pending",
    },
    bookingDate: {
      type: Date,
      default: Date.now,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    // Flexible field for specific booking details
    details: {
      // Common fields
      destination: String,
      noOfPeople: Number,

      // Hotel-specific fields
      hotelId: String,
      hotelName: String,
      noOfRooms: Number,

      // Package-specific fields
      packageId: { type: mongoose.Schema.Types.ObjectId, ref: "TravelPackage" },

      // Ticket-specific fields
      from: String,
      to: String,
      cabin: String,
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
