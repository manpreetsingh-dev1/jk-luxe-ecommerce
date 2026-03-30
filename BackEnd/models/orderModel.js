import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [orderItemSchema],

    address: {
      type: Object,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending","processing", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },

    paymentStatus: {
      type: String,
      enum: ["COD", "Paid", "Failed"],
      default: "COD",
    },

    total: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);