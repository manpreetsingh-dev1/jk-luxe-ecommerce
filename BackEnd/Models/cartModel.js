import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true // ✅ ensure one cart per user
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product", // must match Product model
          required: true
        },

        quantity: {
          type: Number,
          default: 1,
          min: 1
        }
      }
    ]
  },
  { timestamps: true } // ✅ adds createdAt & updatedAt
);

export default mongoose.model("Cart", cartSchema);