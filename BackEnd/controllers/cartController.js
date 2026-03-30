import Cart from "../models/cartModel.js";
import CartProduct from "../models/cartProductModel.js";

export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    if (!productId) {
      return res.status(400).json({ success: false, message: "productId required" });
    }

    const qty = Math.max(1, Number(quantity) || 1);
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [{ product: productId, quantity: qty }],
      });
    } else {
      const index = cart.items.findIndex((item) => item.product?.toString() === productId);

      if (index > -1) {
        cart.items[index].quantity += qty;
      } else {
        cart.items.push({ product: productId, quantity: qty });
      }

      await cart.save();
    }

    const existingItem = await CartProduct.findOne({ user: userId, product: productId });

    if (existingItem) {
      existingItem.quantity += qty;
      await existingItem.save();
    } else {
      await CartProduct.create({ user: userId, product: productId, quantity: qty });
    }

    const populatedCart = await Cart.findOne({ user: userId }).populate("items.product");
    return res.json({ success: true, cart: populatedCart });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    return res.json(cart || { items: [] });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    cart.items = cart.items.filter((item) => item.product?.toString() !== productId);
    await cart.save();
    await CartProduct.findOneAndDelete({ user: userId, product: productId });

    const updatedCart = await Cart.findOne({ user: userId }).populate("items.product");
    return res.json({ success: true, cart: updatedCart });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;
    await Cart.findOneAndDelete({ user: userId });
    await CartProduct.deleteMany({ user: userId });
    return res.json({ success: true, message: "Cart cleared" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
