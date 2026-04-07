import { createContext, useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "./AuthContext";
import { useCart } from "./CartContext";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const { user } = useAuth();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get("/products?limit=100");
        setProducts(response.data.products || []);
      } catch (error) {
        console.error("Products fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, setProducts, loading, message, setMessage, addToCart, user }}>
      {children}
    </ProductsContext.Provider>
  );
};
