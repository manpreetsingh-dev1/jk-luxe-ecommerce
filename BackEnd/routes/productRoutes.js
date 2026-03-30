import express from "express";
import { createProduct, getProducts, getSingleProduct } from "../controllers/productController.js";
import { adminOnly, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, adminOnly, createProduct);
router.get("/", getProducts);
router.get("/:id", getSingleProduct);

export default router;
