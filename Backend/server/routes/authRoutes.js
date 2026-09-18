import express from "express";
import {
  register,
  login,
  forgotPassword,
  resetPassword,
} from "../Controllers/authController.js";
import { protect } from "../Middleware/authMiddleware.js";
import upload from "../Middleware/uploadMiddleware.js";
import {
  forgotPasswordLimiter,
  loginLimiter,
  registerLimiter,
} from "../Middleware/rateLimitMiddleware.js";

const router = express.Router();

// Public routes — each sensitive route now has a rate limiter
// in front of it, in addition to the controller-level checks.
router.post(
  "/register",
  registerLimiter,
  upload.single("profileImage"),
  register
);

router.post("/login", loginLimiter, login);

router.post("/forgot-password", forgotPasswordLimiter, forgotPassword);
router.post("/reset-password/:token", resetPassword);

// Example protected route
router.get("/me", protect, (req, res) => {
  res.status(200).json({
    success: true,
    role: req.userRole,
    user: req.user,
  });
});

export default router;