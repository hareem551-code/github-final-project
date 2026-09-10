import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// ======================================================
// GENERATE JWT TOKEN
// ======================================================

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// ======================================================
// FORMAT USER FOR RESPONSE (never send password back)
// ======================================================

const formatUser = (user) => ({
  id: user._id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  phone: user.phone,
  profileImage: user.profileImage,
  role: user.role,
  address: user.address,
  city: user.city,
  country: user.country,
  storeName: user.storeName,
  storeDescription: user.storeDescription,
  businessName: user.businessName,
  businessAddress: user.businessAddress,
  vendorStatus: user.vendorStatus,
});

// ======================================================
// REGISTER
// POST /api/auth/register
// ======================================================

router.post("/register", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      profileImage,
      role,
      address,
      city,
      country,
      storeName,
      storeDescription,
      businessName,
      businessAddress,
    } = req.body;

    // --------------------------------------------------
    // BASIC VALIDATION
    // --------------------------------------------------

    if (!firstName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "First name, email and password are required",
      });
    }

    // Public registration only allows customer or vendor
    const allowedPublicRoles = ["customer", "vendor"];
    const finalRole = allowedPublicRoles.includes(role)
      ? role
      : "customer";

    // --------------------------------------------------
    // VENDOR-SPECIFIC VALIDATION
    // --------------------------------------------------

    if (finalRole === "vendor" && !storeName) {
      return res.status(400).json({
        success: false,
        message: "Store name is required for vendor accounts",
      });
    }

    // --------------------------------------------------
    // CHECK EXISTING USER
    // --------------------------------------------------

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    // --------------------------------------------------
    // BUILD USER DATA
    // --------------------------------------------------

    const userData = {
      firstName,
      lastName,
      email,
      phone,
      password,
      profileImage,
      role: finalRole,
      address,
      city,
      country,
    };

    if (finalRole === "vendor") {
      userData.storeName = storeName;
      userData.storeDescription = storeDescription;
      userData.businessName = businessName;
      userData.businessAddress = businessAddress;
      userData.vendorStatus = "pending";
    }

    const user = await User.create(userData);

    const token = generateToken(user);

    res.status(201).json({
      success: true,
      message:
        finalRole === "vendor"
          ? "Registered successfully. Your vendor account is pending admin approval."
          : "Registered successfully",
      token,
      user: formatUser(user),
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

// ======================================================
// LOGIN
// POST /api/auth/login
// ======================================================

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token,
      user: formatUser(user),
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

export default router;