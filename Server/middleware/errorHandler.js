import { ApiError } from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // If the error is not one we created, it might be something unexpected.
  // We can log it for debugging and send a generic message.
  if (!(err instanceof ApiError)) {
    // For production, you might want to log the full error stack to a logging service
    console.error(err.stack);

    // In development, it's helpful to see more detail.
    if (process.env.NODE_ENV === "development") {
      return res.status(statusCode).json({
        success: false,
        message: message,
        stack: err.stack,
      });
    }

    // For production, send a generic error message
    statusCode = 500;
    message = "Something went wrong on the server.";
  }

  return res.status(statusCode).json({
    success: false,
    message: message,
    errors: err.errors || [],
  });
};

export { errorHandler };
