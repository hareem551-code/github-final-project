import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import Product from "./models/Product.js";

// ==========================================
// FIX __dirname
// ==========================================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==========================================
// LOAD .ENV FROM SERVER FOLDER
// ==========================================

dotenv.config({
  path: path.join(__dirname, ".env"),
});

// ==========================================
// EXPRESS APP
// ==========================================

const app = express();

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

// ==========================================
// TEST ROUTE
// ==========================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Electronics Marketplace Backend is running",
  });
});

// ==========================================
// GET ALL CATEGORIES
// ==========================================

app.get("/api/categories", async (req, res) => {
  try {
    const categories = await Product.distinct("category");

    const cleanCategories = categories
      .filter((category) => category)
      .map((category) => String(category).trim())
      .filter((category) => category.length > 0);

    const uniqueCategories = [
      ...new Set(cleanCategories),
    ].sort((a, b) =>
      a.localeCompare(b)
    );

    res.status(200).json({
      success: true,
      categories: [
        "All",
        ...uniqueCategories,
      ],
    });
  } catch (error) {
    console.error(
      "❌ Categories Error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Could not fetch categories",
      error: error.message,
    });
  }
});

// ==========================================
// GET PRODUCTS
// SEARCH
// CATEGORY
// SORT
// PAGINATION
// ==========================================

app.get("/api/products", async (req, res) => {
  try {
    // ========================================
    // PAGE
    // ========================================

    const page = Math.max(
      parseInt(req.query.page, 10) || 1,
      1
    );

    // ========================================
    // LIMIT
    // ========================================

    const limit = Math.min(
      Math.max(
        parseInt(req.query.limit, 10) || 16,
        1
      ),
      100
    );

    // ========================================
    // SEARCH
    // ========================================

    const search =
      req.query.search?.trim() || "";

    // ========================================
    // CATEGORY
    // ========================================

    const category =
      req.query.category?.trim() || "";

    // ========================================
    // SORT
    // ========================================

    const sort =
      req.query.sort?.trim() || "default";

    // ========================================
    // MONGODB FILTER
    // ========================================

    const filter = {};

    // ========================================
    // SEARCH FILTER
    // ========================================

    if (search) {
      filter.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          category: {
            $regex: search,
            $options: "i",
          },
        },
        {
          vendor: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // ========================================
    // CATEGORY FILTER
    // ========================================

    if (
      category &&
      category.toLowerCase() !== "all"
    ) {
      filter.category = {
        $regex: `^${category}$`,
        $options: "i",
      };
    }

    // ========================================
    // SORTING
    // ========================================

    let sortOption = {
      id: 1,
    };

    if (sort === "low") {
      sortOption = {
        price: 1,
        id: 1,
      };
    }

    if (sort === "high") {
      sortOption = {
        price: -1,
        id: 1,
      };
    }

    if (sort === "rating") {
      sortOption = {
        rating: -1,
        id: 1,
      };
    }

    // ========================================
    // COUNT FILTERED PRODUCTS
    // ========================================

    const totalProducts =
      await Product.countDocuments(filter);

    // ========================================
    // TOTAL PAGES
    // ========================================

    const totalPages =
      totalProducts === 0
        ? 1
        : Math.ceil(
            totalProducts / limit
          );

    // ========================================
    // PREVENT INVALID PAGE
    // ========================================

    const safePage =
      Math.min(page, totalPages);

    // ========================================
    // SKIP
    // ========================================

    const skip =
      (safePage - 1) * limit;

    // ========================================
    // FETCH PRODUCTS
    // ========================================

    const products =
      await Product.find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(limit)
        .lean();

    // ========================================
    // RESPONSE
    // ========================================

    res.status(200).json({
      success: true,

      currentPage: safePage,

      productsPerPage: limit,

      totalProducts,

      totalPages,

      products,

      pagination: {
        currentPage: safePage,
        productsPerPage: limit,
        totalProducts,
        totalPages,
        hasPreviousPage:
          safePage > 1,
        hasNextPage:
          safePage < totalPages,
      },
    });
  } catch (error) {
    console.error(
      "❌ Get Products Error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Could not fetch products",
      error: error.message,
    });
  }
});

// ==========================================
// GET SINGLE PRODUCT
// ==========================================

app.get(
  "/api/products/:id",
  async (req, res) => {
    try {
      const productId = Number(
        req.params.id
      );

      if (Number.isNaN(productId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid product ID",
        });
      }

      const product =
        await Product.findOne({
          id: productId,
        }).lean();

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      res.status(200).json({
        success: true,
        product,
      });
    } catch (error) {
      console.error(
        "❌ Single Product Error:",
        error.message
      );

      res.status(500).json({
        success: false,
        message: "Could not fetch product",
        error: error.message,
      });
    }
  }
);

// ==========================================
// 404
// ==========================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ==========================================
// MONGODB URI
// ==========================================

const MONGO_URI =
  process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error(
    "❌ MONGO_URI is missing from server/.env"
  );

  process.exit(1);
}

// ==========================================
// CONNECT MONGODB
// ==========================================

mongoose
  .connect(MONGO_URI)

  .then(() => {
    console.log(
      "✅ MongoDB Connected Successfully!"
    );

    // ======================================
    // START SERVER
    // ======================================

    app.listen(5000, () => {
      console.log(
        "✅ Backend running at http://localhost:5000"
      );
    });
  })

  .catch((error) => {
    console.error(
      "❌ MongoDB Connection Failed:",
      error.message
    );
  });