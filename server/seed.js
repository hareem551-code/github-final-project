
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { v2 as cloudinary } from "cloudinary";

import Product from "./models/Product.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.join(__dirname, ".env"),
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ======================================
// NEXTTECH ELECTRONICS PRODUCTS
// ======================================

const products = [

  // SMARTPHONES
  {
    id: 1,
    name: "iPhone 15 Pro",
    category: "Smartphones",
    price: 999,
    oldPrice: 1099,
    rating: 4.8,
    reviews: 245,
    vendor: "Mobile World",
    imageUrl: "https://images.unsplash.com/photo-1695048133142-1a20484d2569",
    description: "Premium smartphone with advanced camera and powerful performance.",
    stock: 35,
  },
  {
    id: 2,
    name: "Samsung Galaxy S24",
    category: "Smartphones",
    price: 899,
    oldPrice: 999,
    rating: 4.7,
    reviews: 198,
    vendor: "Digital World",
    imageUrl: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c",
    description: "Flagship smartphone with a stunning display and powerful processor.",
    stock: 42,
  },
  {
    id: 3,
    name: "Google Pixel 9",
    category: "Smartphones",
    price: 799,
    oldPrice: 899,
    rating: 4.6,
    reviews: 176,
    vendor: "Smart Tech",
    imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
    description: "Modern smartphone with excellent camera technology.",
    stock: 28,
  },
  {
    id: 4,
    name: "OnePlus 13",
    category: "Smartphones",
    price: 749,
    oldPrice: 829,
    rating: 4.5,
    reviews: 154,
    vendor: "Mobile World",
    imageUrl: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd",
    description: "Fast smartphone with a smooth display and powerful performance.",
    stock: 31,
  },

  // LAPTOPS
  {
    id: 5,
    name: "MacBook Pro 14",
    category: "Laptops",
    price: 1799,
    oldPrice: 1999,
    rating: 4.9,
    reviews: 321,
    vendor: "Digital World",
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    description: "Professional laptop with powerful performance and premium display.",
    stock: 18,
  },
  {
    id: 6,
    name: "Dell XPS 15",
    category: "Laptops",
    price: 1499,
    oldPrice: 1699,
    rating: 4.7,
    reviews: 187,
    vendor: "Tech Store",
    imageUrl: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6",
    description: "Premium Windows laptop for work, study and creative tasks.",
    stock: 22,
  },
  {
    id: 7,
    name: "HP Spectre x360",
    category: "Laptops",
    price: 1299,
    oldPrice: 1449,
    rating: 4.6,
    reviews: 143,
    vendor: "Office Tech",
    imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    description: "Convertible laptop combining portability and performance.",
    stock: 25,
  },

  // AUDIO
  {
    id: 8,
    name: "Sony WH-1000XM5",
    category: "Audio",
    price: 349,
    oldPrice: 399,
    rating: 4.9,
    reviews: 412,
    vendor: "Audio Hub",
    imageUrl: "https://images.unsplash.com/photo-1546435770-a3e426bf472b",
    description: "Premium wireless headphones with advanced noise cancellation.",
    stock: 45,
  },
  {
    id: 9,
    name: "AirPods Pro",
    category: "Audio",
    price: 249,
    oldPrice: 279,
    rating: 4.8,
    reviews: 386,
    vendor: "Audio Hub",
    imageUrl: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1",
    description: "Wireless earbuds with immersive sound and noise cancellation.",
    stock: 55,
  },
  {
    id: 10,
    name: "JBL Bluetooth Speaker",
    category: "Audio",
    price: 129,
    oldPrice: 159,
    rating: 4.6,
    reviews: 224,
    vendor: "Audio Hub",
    imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
    description: "Portable Bluetooth speaker with powerful wireless audio.",
    stock: 60,
  },

  // WEARABLES
  {
    id: 11,
    name: "Apple Watch Series 10",
    category: "Wearables",
    price: 429,
    oldPrice: 479,
    rating: 4.8,
    reviews: 235,
    vendor: "Smart Tech",
    imageUrl: "https://images.unsplash.com/photo-1551816230-ef5deaed4a2d",
    description: "Advanced smartwatch with fitness and smart connectivity features.",
    stock: 30,
  },
  {
    id: 12,
    name: "Samsung Galaxy Watch",
    category: "Wearables",
    price: 299,
    oldPrice: 349,
    rating: 4.6,
    reviews: 164,
    vendor: "Smart Tech",
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    description: "Smartwatch with fitness tracking and modern design.",
    stock: 36,
  },

  // GAMING
  {
    id: 13,
    name: "PlayStation 5",
    category: "Gaming",
    price: 499,
    oldPrice: 549,
    rating: 4.9,
    reviews: 512,
    vendor: "Tech Store",
    imageUrl: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db",
    description: "Next-generation gaming console for immersive entertainment.",
    stock: 15,
  },
  {
    id: 14,
    name: "Xbox Series X",
    category: "Gaming",
    price: 499,
    oldPrice: 549,
    rating: 4.8,
    reviews: 438,
    vendor: "Tech Store",
    imageUrl: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d",
    description: "Powerful gaming console designed for high-performance gaming.",
    stock: 17,
  },
  {
    id: 15,
    name: "Gaming Controller",
    category: "Gaming",
    price: 69,
    oldPrice: 79,
    rating: 4.5,
    reviews: 187,
    vendor: "Tech Store",
    imageUrl: "https://images.unsplash.com/photo-1592840496694-26c035b52b4c",
    description: "Responsive controller designed for comfortable gaming.",
    stock: 75,
  },
  {
    id: 16,
    name: "Gaming Keyboard",
    category: "Gaming",
    price: 99,
    oldPrice: 129,
    rating: 4.6,
    reviews: 143,
    vendor: "Tech Store",
    imageUrl: "https://images.unsplash.com/photo-1541140532154-b024d705b90a",
    description: "Mechanical gaming keyboard with responsive keys.",
    stock: 48,
  },

  // CAMERAS
  {
    id: 17,
    name: "Canon EOS R6",
    category: "Cameras",
    price: 2499,
    oldPrice: 2699,
    rating: 4.9,
    reviews: 184,
    vendor: "Camera House",
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
    description: "Professional mirrorless camera for high-quality photography.",
    stock: 12,
  },
  {
    id: 18,
    name: "Sony Alpha Camera",
    category: "Cameras",
    price: 1999,
    oldPrice: 2199,
    rating: 4.8,
    reviews: 156,
    vendor: "Camera House",
    imageUrl: "https://images.unsplash.com/photo-1516724562728-afc824a36e84",
    description: "Advanced mirrorless camera with excellent image quality.",
    stock: 14,
  },
  {
    id: 19,
    name: "Nikon DSLR Camera",
    category: "Cameras",
    price: 1199,
    oldPrice: 1349,
    rating: 4.7,
    reviews: 138,
    vendor: "Camera House",
    imageUrl: "https://images.unsplash.com/photo-1606986628253-1e9d5f6a4e0c",
    description: "Reliable DSLR camera for photography enthusiasts.",
    stock: 18,
  },

  // ACCESSORIES
  {
    id: 20,
    name: "USB-C Fast Charger",
    category: "Accessories",
    price: 39,
    oldPrice: 49,
    rating: 4.6,
    reviews: 342,
    vendor: "Mobile World",
    imageUrl: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0",
    description: "Compact fast charger for modern electronic devices.",
    stock: 100,
  },
  {
    id: 21,
    name: "Wireless Charging Pad",
    category: "Accessories",
    price: 29,
    oldPrice: 39,
    rating: 4.5,
    reviews: 217,
    vendor: "Mobile World",
    imageUrl: "https://images.unsplash.com/photo-1591290619762-c588d5b5b5b0",
    description: "Wireless charging pad for compatible devices.",
    stock: 85,
  },
  {
    id: 22,
    name: "USB-C Cable",
    category: "Accessories",
    price: 19,
    oldPrice: 25,
    rating: 4.4,
    reviews: 418,
    vendor: "Mobile World",
    imageUrl: "https://images.unsplash.com/photo-1625842268584-8f3296236761",
    description: "Durable USB-C cable for charging and data transfer.",
    stock: 150,
  },
  {
    id: 23,
    name: "Power Bank",
    category: "Accessories",
    price: 49,
    oldPrice: 59,
    rating: 4.6,
    reviews: 301,
    vendor: "Mobile World",
    imageUrl: "https://images.unsplash.com/photo-1609592424844-0c3e8b5b8c7c",
    description: "Portable power bank for charging electronic devices.",
    stock: 90,
  },

  // TABLETS
  {
    id: 24,
    name: "iPad Pro",
    category: "Tablets",
    price: 1099,
    oldPrice: 1199,
    rating: 4.9,
    reviews: 267,
    vendor: "Digital World",
    imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0",
    description: "Premium tablet with powerful performance and high-resolution display.",
    stock: 20,
  },
  {
    id: 25,
    name: "Samsung Galaxy Tab",
    category: "Tablets",
    price: 699,
    oldPrice: 799,
    rating: 4.7,
    reviews: 194,
    vendor: "Digital World",
    imageUrl: "https://images.unsplash.com/photo-1561154464-82e9adf32764",
    description: "Versatile tablet for entertainment, work and everyday use.",
    stock: 27,
  },
];

// ======================================
// UPLOAD IMAGE
// ======================================

const uploadImage = async (product) => {
  try {
    const result = await cloudinary.uploader.upload(
      product.imageUrl,
      {
        folder: `NextTech/Products/${product.category}`,
        public_id: String(product.id),
        overwrite: true,
        resource_type: "image",
      }
    );

    return result.secure_url;
  } catch (error) {
    console.log(
      `❌ Image upload failed: ${product.name}`
    );

    console.log(error.message);

    return "";
  }
};

// ======================================
// SEED
// ======================================

const seedProducts = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing");
    }

    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      throw new Error(
        "CLOUDINARY_CLOUD_NAME is missing"
      );
    }

    if (!process.env.CLOUDINARY_API_KEY) {
      throw new Error(
        "CLOUDINARY_API_KEY is missing"
      );
    }

    if (!process.env.CLOUDINARY_API_SECRET) {
      throw new Error(
        "CLOUDINARY_API_SECRET is missing"
      );
    }

    await mongoose.connect(
      process.env.MONGO_URI
    );

    console.log(
      "✅ MongoDB Connected Successfully"
    );

    // Delete old MongoDB products
    const deleted =
      await Product.deleteMany({});

    console.log(
      `🗑️ Old Products Deleted: ${deleted.deletedCount}`
    );

    const finalProducts = [];

    for (const product of products) {
      console.log(
        `☁️ Uploading: ${product.name}`
      );

      const image =
        await uploadImage(product);

      if (!image) {
        console.log(
          `⚠️ Skipped: ${product.name}`
        );
        continue;
      }

      finalProducts.push({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        oldPrice: product.oldPrice,
        rating: product.rating,
        reviews: product.reviews,
        vendor: product.vendor,
        image,
        description: product.description,
        stock: product.stock,
      });

      console.log(
        `✅ ${product.category}: ${product.name}`
      );
    }

    const inserted =
      await Product.insertMany(
        finalProducts
      );

    console.log(
      `\n🎉 ${inserted.length} Products Added Successfully`
    );

    // ==================================
    // CATEGORY REPORT
    // ==================================

    console.log(
      "\n📂 NEXTTECH CATEGORIES"
    );

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
      const count =
        inserted.filter(
          (p) => p.category === category
        ).length;

      console.log(
        `   ${category}: ${count}`
      );
    }

    console.log(
      `\n📦 Total Products: ${inserted.length}`
    );

    await mongoose.connection.close();

    console.log(
      "✅ MongoDB Connection Closed"
    );

  } catch (error) {
    console.error(
      "\n❌ Seed Error:",
      error.message
    );

    if (
      mongoose.connection.readyState !== 0
    ) {
      await mongoose.connection.close();
    }

    process.exit(1);
  }
};

seedProducts();

