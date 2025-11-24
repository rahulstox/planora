// Server/routes/hotelRoutes.js
import express from 'express';
const router = express.Router();
import { searchHotels } from '../controller/hotelController.js';

router.get('/search', searchHotels);

export default router;