// authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Models/userModel.js";

const sanitizeUser = (user) => ({
  _id: user._id,
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  phone: user.phone || "",
  createdAt: user.createdAt,
});

// ====================== REGISTER ======================
export const registerUser = async (req, res) => {
  try {
    console.log("REGISTER API HIT ✅");
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword, // ✅ hashed
      role: "user",
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: sanitizeUser(user),
    });
  } catch (error) {
    console.error("REGISTER CRASH 🔴", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ====================== LOGIN ======================
export const login = async (req, res) => {
  try {
    console.log("LOGIN API HIT ✅");
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: sanitizeUser(user),
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

// ====================== GET ALL USERS (ADMIN) ======================
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0, __v: 0 });
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ====================== DELETE USER (ADMIN) ======================
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    if (user.role === "admin") {
      return res.status(403).json({ success: false, message: "Cannot delete an admin user!" });
    }

    await user.remove();
    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ====================== UPDATE USER ======================
export const updateUser = async (req, res) => {
  try {
    const requesterId = req.user?._id?.toString();
    const targetId = req.params.id;

    if (!requesterId) return res.status(401).json({ message: "Unauthorized" });
    if (requesterId !== targetId && req.user.role !== "admin") return res.status(403).json({ message: "Forbidden" });

    const user = await User.findById(targetId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { fullName, email, phone } = req.body;
    if (fullName) user.name = fullName;
    if (email) user.email = email;
    if (phone) user.phone = phone;

    const updatedUser = await user.save();
    res.json({ user: sanitizeUser(updatedUser) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};