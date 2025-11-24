import express from 'express';
import { verifyJWT } from '../middleware/auth.js';

import {
  addBooking,
  getAllBookings,
  getBooking,
  deleteBooking,
  editBooking,
  rebookBooking,
} from '../controller/bookingController.js';

const bookingRouter = express.Router();

// PROTECTED ROUTES
bookingRouter.post('/addBooking', verifyJWT, addBooking);
bookingRouter.get('/getAllBookings', verifyJWT, getAllBookings);
bookingRouter.get('/getBooking/:bookingId', verifyJWT, getBooking);
bookingRouter.delete('/deleteBooking/:bookingId', verifyJWT, deleteBooking);
bookingRouter.patch('/editBooking/:bookingId', verifyJWT, editBooking);
bookingRouter.post('/rebook/:bookingId', verifyJWT, rebookBooking);

export default bookingRouter;