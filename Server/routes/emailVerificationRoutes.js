import express from 'express';
const router = express.Router();
import {
  sendVerificationEmail,
  verifyEmailWithCode,
  resendVerificationCode,
  checkVerificationStatus
} from '../controller/emailVerificationController.js';
import { verifyJWT } from '../middleware/auth.js';

// Send verification email
router.post('/send-verification', sendVerificationEmail);

// Verify email with code
router.post('/verify-code', verifyEmailWithCode);

// Resend verification code
router.post('/resend-code', resendVerificationCode);

// Check verification status
router.get('/status', checkVerificationStatus);

export default router;
