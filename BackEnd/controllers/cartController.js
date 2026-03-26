import Cart from "../Models/cartModel.js";
import CartProduct from "../Models/cartProductModel.js";

// ADD TO CART
export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "productId required" });
    }

    const qty = Math.max(1, Number(quantity) || 1);

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [{ product: productId, quantity: qty }]
      });
    } else {
      const index = cart.items.findIndex(
        i => i.product?.toString() === productId
      );

      if (index > -1) {
        cart.items[index].quantity += qty;
      } else {
        cart.items.push({ product: productId, quantity: qty });
      }

      await cart.save();
    }

    // Sync CartProduct collection
    const existingCP = await CartProduct.findOne({
      user: userId,
      product: productId
    });

    if (existingCP) {
      existingCP.quantity += qty;
      await existingCP.save();
    } else {
      await CartProduct.create({
        user: userId,
        product: productId,
        quantity: qty
      });
    }

    const populatedCart = await Cart.findOne({ user: userId }).populate(
      "items.product"
    );

    res.json({ success: true, cart: populatedCart });

  } catch (err) {
    console.error("ADD TO CART ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET CART
export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    res.json(cart || { items: [] });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// REMOVE ITEM
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      item => item.product?.toString() !== productId
    );

    await cart.save();

    await CartProduct.findOneAndDelete({
      user: userId,
      product: productId
    });

    const updatedCart = await Cart.findOne({ user: userId }).populate(
      "items.product"
    );

    res.json({ success: true, cart: updatedCart });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CLEAR CART
export const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    await Cart.findOneAndDelete({ user: userId });
    await CartProduct.deleteMany({ user: userId });

    res.json({ success: true, message: "Cart cleared" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
