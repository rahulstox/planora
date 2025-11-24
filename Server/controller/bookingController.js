import Booking from "../models/booking.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

/**
 * @description A helper to safely get the user ID from the request object.
 * Throws a standardized error if the user is not authenticated.
 * @param {object} req - The Express request object.
 * @returns {string} The authenticated user's ID.
 */
const getUserId = (req) => {
  // req.user is attached by our `verifyJWT` middleware
  if (!req.user?._id) {
    throw new ApiError(401, "User is not authenticated. Please log in.");
  }
  return req.user._id;
};

/**
 * @description Create a new booking for the authenticated user.
 */
export const addBooking = asyncHandler(async (req, res, next) => {
  const userId = getUserId(req);
  const { bookingType, startDate, endDate, totalPrice, details } = req.body;

  // Validate required fields
  if (!bookingType || !startDate || !endDate || !totalPrice || !details) {
    return next(new ApiError(400, "All booking fields are required"));
  }

  // Check for overlapping bookings to prevent duplicates
  const existingBooking = await Booking.findOne({
    userId,
    "details.destination": details.destination, // Check within the nested 'details' object
    status: { $in: ["Pending", "Confirmed"] }, // Only check against active bookings
    startDate: { $lt: new Date(endDate) },
    endDate: { $gt: new Date(startDate) },
  });

  if (existingBooking) {
    return next(
      new ApiError(
        409,
        "You have an overlapping booking for this destination during the selected dates."
      )
    );
  }

  const newBooking = await Booking.create({
    userId,
    bookingType,
    startDate,
    endDate,
    totalPrice,
    details,
    status: "Confirmed", // Default to Confirmed, can also be passed from body if needed
  });

  return res
    .status(201)
    .json(new ApiResponse(201, newBooking, "Booking created successfully!"));
});

/**
 * @description Get all bookings for the authenticated user.
 */
export const getAllBookings = asyncHandler(async (req, res, next) => {
  const userId = getUserId(req);
  const userBookings = await Booking.find({ userId }).sort({ startDate: 1 }); // Sort by soonest trip

  return res
    .status(200)
    .json(
      new ApiResponse(200, userBookings, "User bookings fetched successfully!")
    );
});

/**
 * @description Get a single booking by its ID for the authenticated user.
 */
export const getBooking = asyncHandler(async (req, res, next) => {
  const userId = getUserId(req);
  const { bookingId } = req.params;

  const booking = await Booking.findOne({ _id: bookingId, userId });

  if (!booking) {
    return next(
      new ApiError(
        404,
        "Booking not found or you're not authorized to view it."
      )
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, booking, "Booking fetched successfully!"));
});

/**
 * @description Edit a booking (e.g., change its status).
 */
export const editBooking = asyncHandler(async (req, res, next) => {
  const userId = getUserId(req);
  const { bookingId } = req.params;
  const { status } = req.body; // For now, let's focus on updating status

  // You can expand this to include other updatable fields
  const allowedUpdates = ["Pending", "Confirmed", "Cancelled", "Completed"];
  if (!status || !allowedUpdates.includes(status)) {
    return next(
      new ApiError(400, "A valid status field is required for update.")
    );
  }

  const updatedBooking = await Booking.findOneAndUpdate(
    { _id: bookingId, userId },
    { $set: { status } },
    { new: true } // This option returns the document after the update
  );

  if (!updatedBooking) {
    return next(
      new ApiError(
        404,
        "Booking not found or you're not authorized to edit it."
      )
    );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedBooking, "Booking updated successfully!")
    );
});

/**
 * @description Delete a booking for the authenticated user.
 */
export const deleteBooking = asyncHandler(async (req, res, next) => {
  const userId = getUserId(req);
  const { bookingId } = req.params;

  const deletedBooking = await Booking.findOneAndDelete({
    _id: bookingId,
    userId,
  });

  if (!deletedBooking) {
    return next(
      new ApiError(
        404,
        "Booking not found or you're not authorized to delete it."
      )
    );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { deletedId: bookingId },
        "Booking deleted successfully!"
      )
    );
});

/**
 * @description Rebook a previously cancelled or completed trip.
 */
export const rebookBooking = asyncHandler(async (req, res, next) => {
  const userId = getUserId(req);
  const { bookingId } = req.params;

  const originalBooking = await Booking.findOne({ _id: bookingId, userId });

  if (!originalBooking) {
    return next(
      new ApiError(
        404,
        "Original booking not found or it does not belong to you."
      )
    );
  }

  // Create a new booking based on the old one
  const rebooked = await Booking.create({
    userId: userId,
    bookingType: originalBooking.bookingType,
    startDate: originalBooking.startDate, // Consider prompting user for new dates
    endDate: originalBooking.endDate,
    totalPrice: originalBooking.totalPrice, // Consider re-calculating price
    details: originalBooking.details,
    status: "Confirmed", // New booking is confirmed
  });

  return res
    .status(201)
    .json(
      new ApiResponse(201, rebooked, "Trip has been rebooked successfully!")
    );
});
