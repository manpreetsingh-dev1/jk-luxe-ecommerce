import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import app from "./app.js";
import errorHandler from "./middlewares/errorMiddleware.js";
import addressRoutes from "./routes/addressRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.resolve(__dirname, "../dist");

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/admin", adminRoutes);
app.use("/uploads", express.static("uploads"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(clientDistPath));

  app.get(/^(?!\/api).*/, (_req, res) => {
    res.sendFile(path.join(clientDistPath, "index.html"));
  });
}

app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    const port = process.env.PORT || 5000;
    console.log("MongoDB connected");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("DB ERROR:", error);
  });
