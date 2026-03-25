import express from "express";
import { createProduct, getProducts,getSingleProduct } from "../controllers/productController.js";
import { adminOnly, protect } from "../middlewares/authMiddleware.js";

console.log("PRODUCT ROUTES FILE LOADED ✅");

const router = express.Router();

router.post("/", protect, adminOnly, createProduct);   // POST /api/products
router.get("/", getProducts);      // GET  /api/products
router.get("/:id", getSingleProduct); // GET /api/products/:id
export default router;
