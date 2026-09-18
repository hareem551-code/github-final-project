
import express from "express";
import mongoose from "mongoose";

import Review from "../models/Review.js";
import Product from "../models/Product.js";

const router = express.Router();

// ======================================================
// ADD REVIEW
// POST /api/reviews
// ======================================================

router.post("/", async (req, res) => {
  try {
    const {
      productId,
      rating,
      comment,
    } = req.body;

    // --------------------------------------------------
    // CHECK REQUIRED FIELDS
    // --------------------------------------------------

    if (
      productId === undefined ||
      productId === null ||
      rating === undefined ||
      rating === null ||
      !comment ||
      !String(comment).trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Product ID, rating and comment are required",
      });
    }

    // --------------------------------------------------
    // CHECK RATING
    // --------------------------------------------------

    const numericRating = Number(rating);

    if (
      Number.isNaN(numericRating) ||
      numericRating < 1 ||
      numericRating > 5
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Rating must be between 1 and 5",
      });
    }

    // --------------------------------------------------
    // FIND PRODUCT USING NUMERIC ID
    // --------------------------------------------------

    const numericProductId =
      Number(productId);

    if (
      !Number.isInteger(
        numericProductId
      ) ||
      numericProductId <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product =
      await Product.findOne({
        id: numericProductId,
      });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // --------------------------------------------------
    // CREATE REVIEW
    // --------------------------------------------------

    const review =
      await Review.create({
        productId: product._id,
        rating: numericRating,
        comment:
          String(comment).trim(),
      });

    // --------------------------------------------------
    // GET ALL REVIEWS FOR PRODUCT
    // --------------------------------------------------

    const reviews =
      await Review.find({
        productId: product._id,
      });

    // --------------------------------------------------
    // CALCULATE AVERAGE RATING
    // --------------------------------------------------

    const totalRating =
      reviews.reduce(
        (sum, item) =>
          sum + item.rating,
        0
      );

    const averageRating =
      reviews.length > 0
        ? totalRating /
          reviews.length
        : 0;

    // --------------------------------------------------
    // UPDATE PRODUCT RATING
    // --------------------------------------------------

    product.rating = Number(
      averageRating.toFixed(1)
    );

    // Only update reviews field
    // if Product schema contains it.

    if (
      Object.prototype.hasOwnProperty.call(
        product.toObject(),
        "reviews"
      )
    ) {
      product.reviews =
        reviews.length;
    }

    await product.save();

    // --------------------------------------------------
    // RESPONSE
    // --------------------------------------------------

    res.status(201).json({
      success: true,

      message:
        "Review added successfully",

      review,

      averageRating:
        product.rating,

      totalReviews:
        reviews.length,
    });

  } catch (error) {
    console.error(
      "ADD REVIEW ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});


// ======================================================
// GET ALL REVIEWS
// GET /api/reviews
// ======================================================

router.get("/", async (req, res) => {
  try {
    const reviews =
      await Review.find()
        .populate(
          "productId",
          "id name"
        )
        .sort({
          createdAt: -1,
        });

    res.status(200).json({
      success: true,

      totalReviews:
        reviews.length,

      reviews,
    });

  } catch (error) {
    console.error(
      "GET ALL REVIEWS ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});


// ======================================================
// GET REVIEWS FOR ONE PRODUCT
// GET /api/reviews/product/:productId
// ======================================================

router.get(
  "/product/:productId",
  async (req, res) => {
    try {
      // ------------------------------------------------
      // CONVERT NUMERIC PRODUCT ID
      // ------------------------------------------------

      const numericProductId =
        Number(
          req.params.productId
        );

      // ------------------------------------------------
      // VALIDATE PRODUCT ID
      // ------------------------------------------------

      if (
        !Number.isInteger(
          numericProductId
        ) ||
        numericProductId <= 0
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
          id: numericProductId,
        });

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      // ------------------------------------------------
      // FIND REVIEWS
      // ------------------------------------------------

      const reviews =
        await Review.find({
          productId: product._id,
        }).sort({
          createdAt: -1,
        });

      // ------------------------------------------------
      // CALCULATE AVERAGE
      // ------------------------------------------------

      const totalRating =
        reviews.reduce(
          (sum, item) =>
            sum + item.rating,
          0
        );

      const averageRating =
        reviews.length > 0
          ? Number(
              (
                totalRating /
                reviews.length
              ).toFixed(1)
            )
          : 0;

      // ------------------------------------------------
      // RESPONSE
      // ------------------------------------------------

      res.status(200).json({
        success: true,

        productId:
          product.id,

        averageRating,

        totalReviews:
          reviews.length,

        reviews,
      });

    } catch (error) {
      console.error(
        "GET PRODUCT REVIEWS ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  }
);


// ======================================================
// DELETE REVIEW
// DELETE /api/reviews/:reviewId
// ======================================================

router.delete(
  "/:reviewId",
  async (req, res) => {
    try {
      const {
        reviewId,
      } = req.params;

      // ------------------------------------------------
      // CHECK REVIEW ID
      // ------------------------------------------------

      if (
        !mongoose.Types.ObjectId.isValid(
          reviewId
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid review ID",
        });
      }

      // ------------------------------------------------
      // FIND REVIEW
      // ------------------------------------------------

      const review =
        await Review.findById(
          reviewId
        );

      if (!review) {
        return res.status(404).json({
          success: false,
          message:
            "Review not found",
        });
      }

      const productId =
        review.productId;

      // ------------------------------------------------
      // DELETE REVIEW
      // ------------------------------------------------

      await Review.findByIdAndDelete(
        reviewId
      );

      // ------------------------------------------------
      // GET REMAINING REVIEWS
      // ------------------------------------------------

      const remainingReviews =
        await Review.find({
          productId,
        });

      // ------------------------------------------------
      // CALCULATE NEW RATING
      // ------------------------------------------------

      const totalRating =
        remainingReviews.reduce(
          (sum, item) =>
            sum + item.rating,
          0
        );

      const averageRating =
        remainingReviews.length > 0
          ? totalRating /
            remainingReviews.length
          : 0;

      // ------------------------------------------------
      // UPDATE PRODUCT
      // ------------------------------------------------

      const product =
        await Product.findById(
          productId
        );

      if (product) {
        product.rating =
          Number(
            averageRating.toFixed(
              1
            )
          );

        if (
          Object.prototype.hasOwnProperty.call(
            product.toObject(),
            "reviews"
          )
        ) {
          product.reviews =
            remainingReviews.length;
        }

        await product.save();
      }

      // ------------------------------------------------
      // RESPONSE
      // ------------------------------------------------

      res.status(200).json({
        success: true,

        message:
          "Review deleted successfully",

        averageRating:
          product
            ? product.rating
            : 0,

        totalReviews:
          remainingReviews.length,
      });

    } catch (error) {
      console.error(
        "DELETE REVIEW ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  }
);


export default router;
