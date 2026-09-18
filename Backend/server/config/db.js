
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // --------------------------------------------------
    // CHECK MONGO URI
    // --------------------------------------------------

    if (!process.env.MONGO_URI) {
      console.error(
        "MongoDB Error: MONGO_URI is not defined in .env"
      );

      process.exit(1);
    }

    // --------------------------------------------------
    // CONNECT TO MONGODB
    // --------------------------------------------------

    await mongoose.connect(
      process.env.MONGO_URI
    );

    console.log("MongoDB Connected");

  } catch (error) {
    console.error(
      "MongoDB Error:",
      error.message
    );

    process.exit(1);
  }
};

export default connectDB;

