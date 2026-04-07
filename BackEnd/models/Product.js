import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,   // 👈 URL only
      required: true,
    },
     category: {
      type:String, enum: ["men", "women", "kids"],
      required: true,
      index: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);