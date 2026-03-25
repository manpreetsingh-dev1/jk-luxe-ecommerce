import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/userModel.js";
import Product from "./models/Product.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const seedData = async () => {
  try {
    // Clear old data
    await User.deleteMany();
    await Product.deleteMany();

    // Create Admin User
    const admin = await User.create({
      name: "Manpreet Singh",
      email: "admin@gmail.com",
      password: "123456", // make sure hashing middleware exists
      isAdmin: true
    });

    console.log("Admin Created");

    // Create Products
    const products = [
      {
        name: "Black Hoodie",
        price: 999,
        category: "Hoodie",
        stock: 15,
        image: "hoodie1.jpg",
        description: "Premium black hoodie"
      },
      {
        name: "White T-Shirt",
        price: 499,
        category: "T-Shirt",
        stock: 20,
        image: "tshirt1.jpg",
        description: "Classic white tee"
      },
      {
        name: "Denim Jacket",
        price: 1999,
        category: "Jacket",
        stock: 10,
        image: "jacket1.jpg",
        description: "Stylish denim jacket"
      },
      {
        name: "Cargo Pants",
        price: 1299,
        category: "Pants",
        stock: 18,
        image: "pants1.jpg",
        description: "Trendy cargo pants"
      },
      {
        name: "Oversized Hoodie",
        price: 1199,
        category: "Hoodie",
        stock: 12,
        image: "hoodie2.jpg",
        description: "Oversized streetwear hoodie"
      },
      {
        name: "Graphic T-Shirt",
        price: 599,
        category: "T-Shirt",
        stock: 25,
        image: "tshirt2.jpg",
        description: "Cool printed t-shirt"
      },
      {
        name: "Leather Jacket",
        price: 2499,
        category: "Jacket",
        stock: 8,
        image: "jacket2.jpg",
        description: "Premium leather jacket"
      },
      {
        name: "Slim Fit Jeans",
        price: 1499,
        category: "Jeans",
        stock: 14,
        image: "jeans1.jpg",
        description: "Comfort slim fit jeans"
      }
    ];

    await Product.insertMany(products);

    console.log("Products Added ✅");
    process.exit();

  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedData();