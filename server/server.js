import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import Product from "./models/Product.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// ======================================================
// LOAD ENVIRONMENT VARIABLES
// ======================================================

dotenv.config({
  path: "./server/.env",
});

// ======================================================
// CREATE EXPRESS APP
// ======================================================

const app = express();

// ======================================================
// MIDDLEWARE
// ======================================================

app.use(cors());

app.use(express.json());

// ======================================================
// DATABASE CONNECTION
// ======================================================

connectDB();

// ======================================================
// AUTH ROUTES
// ======================================================

app.use("/api/auth", authRoutes);

// ======================================================
// REVIEW ROUTES
// ======================================================

app.use("/api/reviews", reviewRoutes);

// ======================================================
// GET ALL PRODUCTS
// SEARCH / CATEGORY / SORT / PAGINATION
// ======================================================

app.get("/api/products", async (req, res) => {
  try {
    // --------------------------------------------------
    // QUERY PARAMETERS
    // --------------------------------------------------

    const page = Math.max(
      Number(req.query.page) || 1,
      1
    );

    const limit = Math.max(
      Number(req.query.limit) || 16,
      1
    );

    const search = String(
      req.query.search || ""
    ).trim();

    const category = String(
      req.query.category || ""
    ).trim();

    const sort = String(
      req.query.sort || ""
    ).trim();

    // --------------------------------------------------
    // MONGODB QUERY
    // --------------------------------------------------

    const query = {};

    // --------------------------------------------------
    // SEARCH
    // --------------------------------------------------

    if (search) {
      const searchRegex = {
        $regex: search,
        $options: "i",
      };

      query.$or = [
        { name: searchRegex },
        { category: searchRegex },
        { sub_category: searchRegex },
        { subCategory: searchRegex },
        { vendor: searchRegex },
      ];
    }

    // --------------------------------------------------
    // CATEGORY FILTER
    // --------------------------------------------------

    if (
      category &&
      category.toLowerCase() !== "all"
    ) {
      query.category = {
        $regex: `^${category}$`,
        $options: "i",
      };
    }

    // --------------------------------------------------
    // SORT
    // --------------------------------------------------

    let sortOption = {};

    if (sort === "price-low") {
      sortOption = {
        price: 1,
      };
    } else if (sort === "price-high") {
      sortOption = {
        price: -1,
      };
    } else if (sort === "rating") {
      sortOption = {
        rating: -1,
      };
    } else {
      sortOption = {
        _id: -1,
      };
    }

    // --------------------------------------------------
    // TOTAL PRODUCTS
    // --------------------------------------------------

    const totalProducts =
      await Product.countDocuments(query);

    // --------------------------------------------------
    // TOTAL PAGES
    // --------------------------------------------------

    const totalPages = Math.ceil(
      totalProducts / limit
    );

    // --------------------------------------------------
    // GET PRODUCTS
    // --------------------------------------------------

    const products = await Product.find(query)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit);

    // --------------------------------------------------
    // RESPONSE
    // --------------------------------------------------

    res.status(200).json({
      success: true,

      currentPage: page,

      productsPerPage: limit,

      totalProducts,

      totalPages,

      search,

      category,

      sort,

      products,
    });

  } catch (error) {
    console.error(
      "GET PRODUCTS ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
});

// ======================================================
// GET SINGLE PRODUCT
// ======================================================

app.get(
  "/api/products/:id",
  async (req, res) => {
    try {
      const productId = Number(
        req.params.id
      );

      // ------------------------------------------------
      // CHECK PRODUCT ID
      // ------------------------------------------------

      if (
        !Number.isInteger(productId) ||
        productId <= 0
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid product ID",
        });
      }

      // ------------------------------------------------
      // FIND PRODUCT
      // ------------------------------------------------

      const product =
        await Product.findOne({
          id: productId,
        });

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      // ------------------------------------------------
      // RESPONSE
      // ------------------------------------------------

      res.status(200).json(product);

    } catch (error) {
      console.error(
        "SINGLE PRODUCT ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message: "Failed to fetch product",
        error: error.message,
      });
    }
  }
);

// ======================================================
// ROOT ROUTE
// ======================================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Electronic Marketplace API is running",
  });
});

// ======================================================
// SERVER
// ======================================================

const PORT =
  process.env.SERVER_PORT ||
  process.env.PORT ||
  5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});