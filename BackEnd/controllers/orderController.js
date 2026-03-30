import Cart from "../models/cartModel.js";
import CartProduct from "../models/cartProductModel.js";
import Order from "../models/orderModel.js";

export const createOrder = async (req, res) => {
  try {
    const { userId, items, address, source } = req.body;
    const requesterId = req.user?._id?.toString();

    if (!userId || !items || items.length === 0) {
      return res.status(400).json({ success: false, message: "userId and items required" });
    }

    if (requesterId !== userId && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "You can only create orders for your own account",
      });
    }

    const formattedItems = items.map((item) => ({
      product: item.productId,
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: item.quantity,
    }));

    const total = formattedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const order = await Order.create({
      user: userId,
      items: formattedItems,
      address,
      total,
    });

    if (source === "cart") {
      await Cart.findOneAndDelete({ user: userId });
      await CartProduct.deleteMany({ user: userId });
    }

    return res.status(201).json({ success: true, order });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    if (req.user._id.toString() !== req.params.userId && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    const orders = await Order.find({ user: req.params.userId })
      .populate("user", "name email")
      .populate("items.product")
      .sort({ createdAt: -1 });

    return res.json({ success: true, orders });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getSingleOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (order.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    return res.json({ success: true, order });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
