import express from "express";
import { protect } from "../middlewares/authMiddleware.js"; // ✅ // ✅ import middleware
import { createOrder, getUserOrders, getSingleOrder } from "../controllers/orderController.js";
const router = express.Router();

router.get("/user/:userId", protect, getUserOrders);
router.get("/:id", protect, getSingleOrder);
console.log("ORDER ROUTES FILE LOADED ✅");

// POST /api/orders/create
router.post("/create", protect, createOrder); // ✅ protected route

export default router;