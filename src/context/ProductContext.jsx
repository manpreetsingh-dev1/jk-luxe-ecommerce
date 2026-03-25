import { createContext, useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "./AuthContext";
import { useCart } from "./CartContext";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const { user } = useAuth();
  const { addToCart } = useCart();

  useEffect(() => {
    api
      .get("/products")
      .then((response) => setProducts(response.data.products || []))
      .catch((error) => console.error("Products fetch error:", error));
  }, []);

  return (
    <ProductsContext.Provider value={{ products, setProducts, message, setMessage, addToCart, user }}>
      {children}
    </ProductsContext.Provider>
  );
};
