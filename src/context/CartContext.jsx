import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import api from "../api/axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user } = useAuth();

  // helper to convert backend cart structure to client items
  const normalizeCart = (serverCart) => {
    if (!serverCart || !serverCart.items) return [];
    return serverCart.items.map((i) => {
      const prod = i.product || {};
      return {
        _id: prod._id || prod.id || "",
        name: prod.name || "Unknown",
        price: prod.price || 0,
        image: prod.image || "",
        qty: i.quantity || 0,
      };
    });
  };

  // ADD TO CART (returns promise so components can react)
  const addToCart = async (product) => {
    if (user) {
      console.log("addToCart request", { product });
      try {
        const res = await api.post("/cart/add", {
          productId: product._id,
          quantity: 1,
        });
        
        if (res.data && res.data.cart) {
          const serverCart = res.data.cart;
          const normalized = normalizeCart(serverCart);
          console.log("normalized cart from server", normalized);
          setCart(normalized);
          return { success: true };
        } else {
          console.error("Unexpected response structure:", res.data);
          return { success: false, message: "Invalid response from server" };
        }
      } catch (err) {
        console.error("cart add error", err.response ? err.response.data : err.message, err);
        return { success: false, message: err.response?.data?.message || err.message };
      }
    }

    // fallback for guests
    setCart((prev) => {
      const exists = prev.find((item) => item._id === product._id);

      if (exists) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
    return { success: true };
  };

  // REMOVE
  const removeFromCart = async (id) => {
    if (user) {
      try {
        await api.delete(`/cart/remove/${id}`);
      } catch (err) {
        console.error("remove error", err.response ? err.response.data : err.message, err);
      }
    }
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  // INCREASE QTY (just add again)
  const increaseQty = async (id) => {
    const prod = cart.find((i) => i._id === id);
    if (prod) {
      await addToCart({ _id: id, ...prod });
    }
  };

  // DECREASE QTY
  const decreaseQty = async (id) => {
    // For logged-in users, remove and re-add with updated quantity
    if (user) {
      const item = cart.find((i) => i._id === id);
      if (item && item.qty > 1) {
        try {
          await api.delete(`/cart/remove/${id}`);
          await api.post("/cart/add", {
            productId: id,
            quantity: item.qty - 1
          });
          fetchCart();
        } catch (err) {
          console.error("decreaseQty error", err.response ? err.response.data : err.message, err);
        }
      }
    }
    
    setCart((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, qty: item.qty > 1 ? item.qty - 1 : 1 }
          : item
      )
    );
  };

  // load cart when user changes
  const fetchCart = async () => {
    if (user) {
      try {
        const res = await api.get("/cart");
        const normalized2 = normalizeCart(res.data);
        console.log("normalized cart fetched", normalized2);
        setCart(normalized2);
      } catch (err) {
        console.error("fetch cart error", err.response ? err.response.data : err.message, err);
      }
    }
  };

  // re-fetch on user login/logout
  useEffect(() => {
    fetchCart();
  }, [user]);

  // BUY NOW / checkout - creates an order and clears cart
  // if `orderItems` passed, use it; otherwise use entire cart
  const buyNow = async (items, address, source) => {
    if (!user) return { success: false, message: "Login required" };

    const userId = user._id || user.id || user.userId;

    const res = await api.post("/orders/create", {
      userId,
      items,
      address,
      source
    });

    if (source === "cart") setCart([]);

    return { success: true, order: res.data.order };
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, increaseQty, decreaseQty, buyNow }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
