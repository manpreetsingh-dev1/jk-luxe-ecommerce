import express from "express";
import { createOrder, getSingleOrder, getUserOrders } from "../controllers/orderController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/user/:userId", protect, getUserOrders);
router.get("/:id", protect, getSingleOrder);
router.post("/create", protect, createOrder);

export default router;
