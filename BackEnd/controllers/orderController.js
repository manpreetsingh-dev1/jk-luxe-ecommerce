// controllers/orderController.js
import Order from "../Models/orderModel.js";
import Cart from "../Models/cartModel.js";
import CartProduct from "../Models/cartProductModel.js";

export const createOrder = async (req, res) => {
  try {
    const { userId, items, address, source } = req.body;
    const requesterId = req.user?._id?.toString();

    if (!userId || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "userId and items required",
      });
    }

    if (requesterId !== userId && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "You can only create orders for your own account",
      });
    }

    // 🔥 Format items properly
    const formattedItems = items.map((item) => ({
      product: item.productId,
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: item.quantity,
    }));

    // calculate total
    const total = formattedItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const order = await Order.create({
      user: userId,
      items: formattedItems,
      address,
      total,
    });

    // clear cart if needed
    if (source === "cart") {
      await Cart.findOneAndDelete({ user: userId });
      await CartProduct.deleteMany({ user: userId });
    }

    res.status(201).json({
      success: true,
      order,
    });
  } catch (err) {
    console.error("ORDER ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
// get orders(user)
export const getUserOrders = async (req, res) => {
  try {
    if (req.user._id.toString() !== req.params.userId && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    const orders = await Order.find({ user: req.params.userId })
      .populate("user", "name email")
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
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

    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
