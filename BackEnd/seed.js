import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "./models/Product.js";
import User from "./models/userModel.js";

dotenv.config({ path: "./.env" });

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await User.deleteMany();
    await Product.deleteMany();
    console.log("Database connected and cleared");
    process.exit(0);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

seed();
