const express = require("express");
const router = express.Router();
const { loginUser, registerUser, enableMFA, verifyMFA } = require("../controllers/authController");
const { getProfile, updateProfile } = require("../controllers/userController");
const verifyAuth = require("../middlewares/authMiddleware");

// ================= AUTH ROUTES =================

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// MFA
router.post("/enable-mfa", enableMFA);
router.post("/verify-mfa", verifyMFA);

// ================= PROTECTED ROUTES =================

// Profile - GET
router.get("/profile", verifyAuth, getProfile);

// Profile - UPDATE
router.post("/update", verifyAuth, updateProfile);

module.exports = router;
