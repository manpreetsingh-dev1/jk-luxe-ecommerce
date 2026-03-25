import express from "express";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";
import {
  getAllOrders,
  getSingleOrder,
  updateOrderStatus
} from "../controllers/adminController.js";

import {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import { getAllUsers, deleteUser } from "../controllers/authController.js";

const router = express.Router();

// Orders
router.get("/orders", protect, adminOnly, getAllOrders);
router.get("/orders/:id", protect, adminOnly, getSingleOrder);
router.patch("/orders/:id", protect, adminOnly, updateOrderStatus);

// Products
router.get("/products", protect, adminOnly, getProducts);
router.get("/products/:id", protect, adminOnly, getSingleProduct);
router.post("/products", protect, adminOnly, createProduct);
router.patch("/products/:id", protect, adminOnly, updateProduct);
router.delete("/products/:id", protect, adminOnly, deleteProduct);

// Users
router.get("/users", protect, adminOnly, getAllUsers);
router.delete("/users/:id", protect, adminOnly, deleteUser);

// Test admin route
router.get("/test", protect, adminOnly, (req, res) => {
  res.json({
    success: true,
    message: "Admin access granted 🚀",
    admin: req.user,
  });
});

export default router;
