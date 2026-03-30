import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import app from "./app.js";
import errorHandler from "./middlewares/errorMiddleware.js";
import addressRoutes from "./routes/addressRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config({ path: "./.env" });

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/admin", adminRoutes);
app.use("/uploads", express.static("uploads"));

app.get("/api/health", (_req, res) => {
  res.status(200).json({ success: true, message: "Backend is running" });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});

app.use(errorHandler);

const startServer = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not configured in backend/.env");
    }

    await mongoose.connect(process.env.MONGO_URI);

    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`MongoDB connected`);
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

 startServer();
