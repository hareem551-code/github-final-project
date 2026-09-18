import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // ==========================
    // Core identity fields
    // ==========================
    firstName: {
      type: String,
      required: [true, "First name is required."],
      trim: true,
    },

    lastName: {
      type: String,
      trim: true,
      default: "",
    },

    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address."],
    },

    password: {
      type: String,
      required: [true, "Password is required."],
      minlength: [6, "Password must be at least 6 characters."],
      select: false, // never returned by default in queries
    },

    phone: {
      type: String,
      trim: true,
      default: "",
    },

    profileImage: {
      type: String,
      default: "",
    },

    // ==========================
    // Role
    // ==========================
    role: {
      type: String,
      enum: {
        values: ["customer", "vendor", "admin"],
        message: "Role must be either customer, vendor, or admin.",
      },
      default: "customer",
    },

    // ==========================
    // Address (optional, all roles)
    // ==========================
    address: {
      type: String,
      trim: true,
      default: "",
    },

    city: {
      type: String,
      trim: true,
      default: "",
    },

    country: {
      type: String,
      trim: true,
      default: "",
    },

    // ==========================
    // Vendor-only fields
    // ==========================
    storeName: {
      type: String,
      trim: true,
      default: "",
    },

    storeDescription: {
      type: String,
      trim: true,
      default: "",
    },

    businessName: {
      type: String,
      trim: true,
      default: "",
    },

    businessAddress: {
      type: String,
      trim: true,
      default: "",
    },

    vendorStatus: {
      type: String,
      enum: {
        values: ["pending", "approved", "rejected"],
        message: "Vendor status must be pending, approved, or rejected.",
      },
      // no default — only set when role === "vendor" in the controller
    },
  },
  {
    timestamps: true,
  }
);

// ==========================
// Indexes
// ==========================
// email already gets a unique index from `unique: true` above.
// Add a compound index if you'll frequently query vendors by status:
userSchema.index({ role: 1, vendorStatus: 1 });

const User = mongoose.model("User", userSchema);

export default User;