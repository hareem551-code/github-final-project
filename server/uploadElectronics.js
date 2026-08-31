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
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return null;
  }

  const cleaned = String(value)
    .replace(/[₹,$]/g, "")
    .replace(/,/g, "")
    .trim();

  if (
    !cleaned ||
    cleaned.toLowerCase() === "nan"
  ) {
    return null;
  }

  const number = Number(cleaned);

  return Number.isFinite(number)
    ? number
    : null;
}

function cleanRating(value) {
  const number = cleanNumber(value);

  if (number === null) {
    return 0;
  }

  return Math.min(
    Math.max(number, 0),
    5
  );
}

function cleanReviews(value) {
  const number = cleanNumber(value);

  if (number === null) {
    return 0;
  }

  return Math.max(
    Math.round(number),
    0
  );
}

// ==========================================
// CATEGORY MAPPING
// ==========================================

function getCategory(mainCategory, subCategory, name) {
  const text = `
    ${mainCategory}
    ${subCategory}
    ${name}
  `
    .toLowerCase()
    .trim();

  // Smartphones
  if (
    text.includes("smartphone") ||
    text.includes("mobile phone") ||
    text.includes("cell phone") ||
    text.includes("iphone") ||
    text.includes("galaxy") ||
    text.includes("oneplus") ||
    text.includes("pixel")
  ) {
    return "Smartphones";
  }

  // Laptops
  if (
    text.includes("laptop") ||
    text.includes("notebook") ||
    text.includes("macbook") ||
    text.includes("chromebook")
  ) {
    return "Laptops";
  }

  // Tablets
  if (
    text.includes("tablet") ||
    text.includes("ipad")
  ) {
    return "Tablets";
  }

  // Gaming
  if (
    text.includes("gaming") ||
    text.includes("playstation") ||
    text.includes("xbox") ||
    text.includes("nintendo") ||
    text.includes("game console") ||
    text.includes("gaming console") ||
    text.includes("controller")
  ) {
    return "Gaming";
  }

  // Cameras
  if (
    text.includes("camera") ||
    text.includes("dslr") ||
    text.includes("mirrorless") ||
    text.includes("canon") ||
    text.includes("nikon") ||
    text.includes("sony alpha")
  ) {
    return "Cameras";
  }

  // Audio
  if (
    text.includes("headphone") ||
    text.includes("earphone") ||
    text.includes("earbud") ||
    text.includes("airpods") ||
    text.includes("speaker") ||
    text.includes("soundbar") ||
    text.includes("bluetooth audio") ||
    text.includes("audio")
  ) {
    return "Audio";
  }

  // Wearables
  if (
    text.includes("smartwatch") ||
    text.includes("smart watch") ||
    text.includes("fitness band") ||
    text.includes("fitness tracker") ||
    text.includes("wearable") ||
    text.includes("watch")
  ) {
    return "Wearables";
  }

  // Accessories
  if (
    text.includes("charger") ||
    text.includes("charging") ||
    text.includes("cable") ||
    text.includes("power bank") ||
    text.includes("adapter") ||
    text.includes("keyboard") ||
    text.includes("mouse") ||
    text.includes("case") ||
    text.includes("cover") ||
    text.includes("accessor")
  ) {
    return "Accessories";
  }

  // Default
  return "Accessories";
}

// ==========================================
// DOWNLOAD IMAGE
// ==========================================

async function downloadImage(imageUrl) {
  try {
    const response = await fetch(
      imageUrl,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/151 Safari/537.36",
          Accept:
            "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
        },
        redirect: "follow",
      }
    );

    if (!response.ok) {
      throw new Error(
        `HTTP ${response.status}`
      );
    }

    const contentType =
      response.headers.get(
        "content-type"
      ) || "";

    if (
      !contentType.startsWith("image/")
    ) {
      throw new Error(
        `Not an image: ${contentType}`
      );
    }

    const arrayBuffer =
      await response.arrayBuffer();

    return Buffer.from(arrayBuffer);

  } catch (error) {
    console.log(
      `⚠️ Download failed: ${imageUrl}`
    );

    console.log(
      `   ${error.message}`
    );

    return null;
  }
}

// ==========================================
// CLOUDINARY UPLOAD
// ==========================================

async function uploadImage(
  imageUrl,
  productId,
  category,
  name
) {
  if (!imageUrl) {
    return "";
  }

  try {
    const safeName =
      name
        .replace(
          /[^a-zA-Z0-9]+/g,
          "-"
        )
        .replace(
          /^-|-$/g,
          ""
        )
        .substring(0, 60);

    const publicId =
      `${productId}-${safeName}`;

    const folder =
      `NextTech/Products/${category}`;

    // ======================================
    // CHECK EXISTING IMAGE
    // ======================================

    try {
      const existing =
        await cloudinary.api.resource(
          `${folder}/${publicId}`,
          {
            resource_type: "image",
          }
        );

      if (existing?.secure_url) {
        console.log(
          `♻️ Existing image: ${name}`
        );

        return existing.secure_url;
      }

    } catch {
      // Image does not exist
    }

    // ======================================
    // DOWNLOAD IMAGE
    // ======================================

    const imageBuffer =
      await downloadImage(
        imageUrl
      );

    if (!imageBuffer) {
      return "";
    }

    // ======================================
    // UPLOAD BUFFER
    // ======================================

    const result =
      await new Promise(
        (resolve, reject) => {
          const stream =
            cloudinary.uploader.upload_stream(
              {
                folder,
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

          stream.end(imageBuffer);
        }
      );

    return result.secure_url;

  } catch (error) {
    console.log(
      `❌ Cloudinary failed: ${name}`
    );

    console.log(
      `   ${error.message}`
    );

    return "";
  }
}

// ==========================================
// MAIN IMPORT
// ==========================================

async function importProducts() {
  try {
    // ======================================
    // ENV CHECK
    // ======================================

    if (!process.env.MONGO_URI) {
      throw new Error(
        "MONGO_URI is missing"
      );
    }

    if (
      !process.env.CLOUDINARY_CLOUD_NAME
    ) {
      throw new Error(
        "CLOUDINARY_CLOUD_NAME is missing"
      );
    }

    if (
      !process.env.CLOUDINARY_API_KEY
    ) {
      throw new Error(
        "CLOUDINARY_API_KEY is missing"
      );
    }

    if (
      !process.env.CLOUDINARY_API_SECRET
    ) {
      throw new Error(
        "CLOUDINARY_API_SECRET is missing"
      );
    }

    // ======================================
    // CSV CHECK
    // ======================================

    if (!fs.existsSync(csvPath)) {
      throw new Error(
        `CSV not found: ${csvPath}`
      );
    }

    // ======================================
    // MONGODB
    // ======================================

    await mongoose.connect(
      process.env.MONGO_URI
    );

    console.log(
      "✅ MongoDB Connected Successfully!"
    );

    // ======================================
    // READ CSV
    // ======================================

    const csvText =
      fs.readFileSync(
        csvPath,
        "utf8"
      );

    const records =
      parse(csvText, {
        columns: true,
        skip_empty_lines: true,
        relax_quotes: true,
        relax_column_count: true,
        bom: true,
      });

    console.log(
      `📦 CSV Products Found: ${records.length}`
    );

    // ======================================
    // DELETE OLD PRODUCTS
    // ======================================

    const deleted =
      await Product.deleteMany({});

    console.log(
      `🗑️ Old Products Deleted: ${deleted.deletedCount}`
    );

    // ======================================
    // IMPORT
    // ======================================

    const products = [];

    let id = 1;
    let skipped = 0;
    let imageFailed = 0;

    for (const row of records) {

      const name =
        cleanText(row.name);

      const mainCategory =
        cleanText(
          row.main_category
        );

      const subCategory =
        cleanText(
          row.sub_category
        );

      const imageUrl =
        cleanText(row.image);

      // ====================================
      // NAME CHECK
      // ====================================

      if (!name) {
        skipped++;
        continue;
      }

      // ====================================
      // CATEGORY
      // ====================================

      const category =
        getCategory(
          mainCategory,
          subCategory,
          name
        );

      // ====================================
      // PRICE
      // ====================================

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
        actualPrice ?? null;

      if (
        oldPrice !== null &&
        oldPrice <= price
      ) {
        oldPrice = null;
      }

      // ====================================
      // RATING
      // ====================================

      const rating =
        cleanRating(
          row.ratings
        );

      // ====================================
      // REVIEWS
      // ====================================

      const reviews =
        cleanReviews(
          row.no_of_ratings
        );

      // ====================================
      // DESCRIPTION
      // ====================================

      const description =
        subCategory
          ? `${name} - ${subCategory}`
          : `${name} electronic product.`;

      // ====================================
      // VENDOR
      // ====================================

      const vendor =
        "Kaggle Marketplace";

      // ====================================
      // IMAGE
      // ====================================

      let cloudinaryUrl = "";

      if (imageUrl) {
        console.log(
          `☁️ ${id}: ${category} → ${name}`
        );

        cloudinaryUrl =
          await uploadImage(
            imageUrl,
            id,
            category,
            name
          );
      }

      if (!cloudinaryUrl) {
        imageFailed++;

        console.log(
          `⚠️ Image unavailable: ${name}`
        );
      }

      // ====================================
      // PRODUCT
      // ====================================

      products.push({
        id,
        name,
        category,
        price,
        oldPrice,
        rating,
        reviews,
        vendor,
        image: cloudinaryUrl,
        description,
        stock: 50,
      });

      id++;
    }

    // ======================================
    // INSERT
    // ======================================

    console.log(
      "\n📥 Inserting products into MongoDB..."
    );

    if (products.length > 0) {
      const inserted =
        await Product.insertMany(
          products,
          {
            ordered: false,
          }
        );

      console.log(
        `\n🎉 MongoDB Products Added: ${inserted.length}`
      );
    }

    // ======================================
    // REPORT
    // ======================================

    console.log(
      "\n===================================="
    );

    console.log(
      "🎉 IMPORT COMPLETE"
    );

    console.log(
      "===================================="
    );

    console.log(
      `📦 CSV Rows: ${records.length}`
    );

    console.log(
      `✅ MongoDB Products: ${products.length}`
    );

    console.log(
      `⚠️ Skipped: ${skipped}`
    );

    console.log(
      `⚠️ Images Failed: ${imageFailed}`
    );

    console.log(
      "===================================="
    );

    // ======================================
    // CATEGORY REPORT
    // ======================================

    console.log(
      "\n📂 CATEGORY COUNTS:"
    );

    const categoryCounts = {};

    for (const product of products) {
      categoryCounts[
        product.category
      ] =
        (categoryCounts[
          product.category
        ] || 0) + 1;
    }

    const categories = [
      "Smartphones",
      "Laptops",
      "Audio",
      "Wearables",
      "Gaming",
      "Cameras",
      "Accessories",
      "Tablets",
    ];

    for (const category of categories) {
      console.log(
        `${category}: ${
          categoryCounts[category] || 0
        }`
      );
    }

  } catch (error) {

    console.error(
      "\n❌ Import Error:",
      error.message
    );

  } finally {

    await mongoose.disconnect();

    console.log(
      "\n🔌 MongoDB connection closed."
    );
  }
}

// ==========================================
// RUN
// ==========================================

importProducts();