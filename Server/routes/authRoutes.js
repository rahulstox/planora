const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  googleAuth,
  googleAuthCallback, // <-- Import the new function
  getCurrentUser,
} = require("../controller/authController");
const { verifyJWT } = require("../middleware/auth");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.post("/google", googleAuth);

// This is the new route you need to add
router.get("/google/callback", googleAuthCallback); // <-- The Redirect URL Handler

// @access  Private (protected route)
router.get("/me", verifyJWT, getCurrentUser);

module.exports = router;
