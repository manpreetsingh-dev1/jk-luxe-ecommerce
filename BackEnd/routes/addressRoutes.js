import express from "express";
import {
  addAddress,
  updateAddress,
  getAddresses,
  deleteAddress,
  setDefaultAddress,
} from "../controllers/addressController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, addAddress);
router.get("/user/:userId", protect, getAddresses);
router.put("/:id", protect, updateAddress);
router.delete("/:id", protect, deleteAddress);
router.post("/default", protect, setDefaultAddress);

export default router;
