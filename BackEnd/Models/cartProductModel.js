import mongoose from "mongoose";

const cartProductSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",   // ✅ MUST be Product
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  }
});

export default mongoose.model("CartProduct", cartProductSchema);