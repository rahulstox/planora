import express from 'express';
const router = express.Router();
import { protect } from '../middleware/auth.js';
import audioUpload from '../middleware/audioUploadMiddleware.js';
import {
  getAllMusic,
  getMusicById,
  uploadMusic,
  updateMusic,
  deleteMusic,
  toggleLike,
  incrementPlayCount,
  getMusicStats
} from '../controller/musicController.js';

// Public routes (no authentication required)
router.get('/', getAllMusic);
router.get('/stats', getMusicStats);
router.get('/:id', getMusicById);
router.post('/', audioUpload.single('audio'), uploadMusic);
router.post('/:id/play', incrementPlayCount); // Public route to track plays

// Protected routes (require authentication)
router.put('/:id', protect, updateMusic);
router.delete('/:id', protect, deleteMusic);
router.post('/:id/like', protect, toggleLike);

export default router;
