import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { parse } from "csv-parse/sync";

import Product from "./models/Product.js";

// ==========================================
// ENV
// ==========================================

const serverPath = process.cwd();

dotenv.config({
  path: path.join(serverPath, ".env"),
});

// ==========================================
// CLOUDINARY
// ==========================================

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ==========================================
// CSV
// ==========================================

const csvPath = path.join(
  serverPath,
  "electronics_product.csv"
);

// ==========================================
// HELPERS
// ==========================================

function cleanText(value) {
  return String(value ?? "").trim();
}

function cleanNumber(value) {
  if (!value) return null;

  const cleaned = String(value)
    .replace(/[₹,$â‚¹]/g, "")
    .replace(/,/g, "")
    .trim();

  const number = Number(cleaned);

  return Number.isFinite(number)
    ? number
    : null;
}

function getCategory(mainCategory, subCategory, name) {
  const text = `
    ${mainCategory}
    ${subCategory}
    ${name}
  `.toLowerCase();

  if (
    text.includes("smartphone") ||
    text.includes("mobile") ||
    text.includes("iphone") ||
    text.includes("galaxy") ||
    text.includes("oneplus") ||
    text.includes("redmi") ||
    text.includes("realme") ||
    text.includes("pixel") ||
    text.includes("oppo") ||
    text.includes("vivo")
  ) {
    return "Smartphones";
  }

  if (
    text.includes("laptop") ||
    text.includes("notebook") ||
    text.includes("macbook") ||
    text.includes("chromebook")
  ) {
    return "Laptops";
  }

  if (
    text.includes("tablet") ||
    text.includes("ipad")
  ) {
    return "Tablets";
  }

  if (
    text.includes("headphone") ||
    text.includes("earphone") ||
    text.includes("earbud") ||
    text.includes("airpods") ||
    text.includes("speaker") ||
    text.includes("soundbar") ||
    text.includes("bluetooth audio")
  ) {
    return "Audio";
  }

  if (
    text.includes("smart watch") ||
    text.includes("smartwatch") ||
    text.includes("fitness band") ||
    text.includes("fitness tracker") ||
    text.includes("wearable") ||
    text.includes("watch")
  ) {
    return "Wearables";
  }

  if (
    text.includes("playstation") ||
    text.includes("xbox") ||
    text.includes("nintendo") ||
    text.includes("gaming") ||
    text.includes("game console") ||
    text.includes("controller")
  ) {
    return "Gaming";
  }

  if (
    text.includes("camera") ||
    text.includes("dslr") ||
    text.includes("mirrorless") ||
    text.includes("canon eos") ||
    text.includes("nikon")
  ) {
    return "Cameras";
  }

  if (
    text.includes("charger") ||
    text.includes("adapter") ||
    text.includes("cable") ||
    text.includes("power bank") ||
    text.includes("charging") ||
    text.includes("keyboard") ||
    text.includes("mouse") ||
    text.includes("case") ||
    text.includes("cover")
  ) {
    return "Accessories";
  }

  return "Accessories";
}

// ==========================================
// DOWNLOAD IMAGE
// ==========================================

async function downloadImage(url) {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0",
        Accept: "image/*",
      },
      redirect: "follow",
    });

    if (!response.ok) {
      throw new Error(
        `HTTP ${response.status}`
      );
    }

    const contentType =
      response.headers.get(
        "content-type"
      ) || "";

    if (!contentType.startsWith("image/")) {
      throw new Error(
        `Not an image: ${contentType}`
      );
    }

    const buffer = Buffer.from(
      await response.arrayBuffer()
    );

    return buffer;

  } catch (error) {
    console.log(
      `❌ Image download failed: ${error.message}`
    );

    return null;
  }
}

// ==========================================
// CLOUDINARY UPLOAD
// ==========================================

async function uploadImage(
  imageUrl,
  id,
  category,
  name
) {
  const buffer =
    await downloadImage(imageUrl);

  if (!buffer) {
    return "";
  }

  const safeName = name
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 50);

  const publicId =
    `${id}-${safeName}`;

  try {
    const result =
      await new Promise(
        (resolve, reject) => {
          const stream =
            cloudinary.uploader.upload_stream(
              {
                folder:
                  `NextTech/Products/${category}`,
                public_id: publicId,
                overwrite: true,
                resource_type: "image",
              },
              (error, result) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(result);
                }
              }
            );

          stream.end(buffer);
        }
      );

    return result.secure_url;

  } catch (error) {
    console.log(
      `❌ Cloudinary upload failed: ${error.message}`
    );

    return "";
  }
}

// ==========================================
// TEST ONLY — FIRST 5 PRODUCTS
// ==========================================

async function testImport() {
  try {
    if (!fs.existsSync(csvPath)) {
      throw new Error(
        "electronics_product.csv not found"
      );
    }

    await mongoose.connect(
      process.env.MONGO_URI
    );

    console.log(
      "✅ MongoDB Connected Successfully"
    );

    const csvText =
      fs.readFileSync(
        csvPath,
        "utf8"
      );

    const records = parse(
      csvText,
      {
        columns: true,
        skip_empty_lines: true,
        relax_quotes: true,
        relax_column_count: true,
        bom: true,
      }
    );

    console.log(
      `📦 CSV Rows: ${records.length}`
    );

    // ======================================
    // ONLY FIRST 5
    // ======================================

    const testProducts =
      records.slice(0, 5);

    console.log(
      "\n🧪 TESTING FIRST 5 PRODUCTS ONLY\n"
    );

    const products = [];

    let id = 1;

    for (const row of testProducts) {
      const name =
        cleanText(row.name);

      const category =
        getCategory(
          row.main_category,
          row.sub_category,
          name
        );

      const imageUrl =
        cleanText(row.image);

      const discountPrice =
        cleanNumber(
          row.discount_price
        );

      const actualPrice =
        cleanNumber(
          row.actual_price
        );

      const price =
        discountPrice ??
        actualPrice ??
        0;

      let oldPrice =
        actualPrice;

      if (
        oldPrice !== null &&
        oldPrice <= price
      ) {
        oldPrice = null;
      }

      console.log(
        `\n${id}. ${name}`
      );

      console.log(
        `📂 Category: ${category}`
      );

      console.log(
        "☁️ Uploading image..."
      );

      const image =
        await uploadImage(
          imageUrl,
          id,
          category,
          name
        );

      if (image) {
        console.log(
          "✅ Cloudinary upload SUCCESS"
        );
      } else {
        console.log(
          "❌ Cloudinary upload FAILED"
        );
      }

      products.push({
        id,
        name,
        category,
        price,
        oldPrice,
        rating:
          Number(row.ratings) || 0,
        reviews:
          cleanNumber(
            row.no_of_ratings
          ) || 0,
        vendor:
          "Kaggle Marketplace",
        image,
        description:
          `${name} electronic product.`,
        stock: 50,
      });

      id++;
    }

    // ======================================
    // DELETE ONLY TEST RECORDS
    // ======================================

    await Product.deleteMany({
      id: {
        $in: [1, 2, 3, 4, 5],
      },
    });

    await Product.insertMany(
      products
    );

    console.log(
      "\n===================================="
    );

    console.log(
      "🎉 5 PRODUCT TEST COMPLETE"
    );

    console.log(
      "===================================="
    );

    for (const product of products) {
      console.log(
        `${product.id}. ${product.category} | ${product.name}`
      );

      console.log(
        `   Image: ${
          product.image
            ? "✅ Cloudinary"
            : "❌ Failed"
        }`
      );
    }

    console.log(
      "===================================="
    );

  } catch (error) {
    console.error(
      "\n❌ TEST ERROR:",
      error.message
    );

  } finally {
    await mongoose.disconnect();

    console.log(
      "\n🔌 MongoDB connection closed."
    );
  }
}

testImport();