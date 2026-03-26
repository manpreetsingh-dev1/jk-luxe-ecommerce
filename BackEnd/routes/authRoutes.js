// authroute.jsx
import express from "express";
import { registerUser, login } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { updateUser } from "../controllers/authController.js";

console.log("AUTH ROUTES FILE LOADED ✅");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);

router.put(
  "/update/:id",
  protect,
  updateUser
);

router.get("/ProfilePage", protect, (req, res) => {
   console.log("PROFILE ROUTE HIT ✅");
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});

export default router;
