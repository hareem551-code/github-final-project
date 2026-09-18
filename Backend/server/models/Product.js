import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    category: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    discountPercentage: {
      type: Number,
      default: 0,
    },

    rating: {
      type: Number,
      default: 0,
    },

    stock: {
      type: Number,
      default: 0,
    },

    brand: {
      type: String,
    },

    image: {
      type: String,
      required: true,
    },

    images: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);