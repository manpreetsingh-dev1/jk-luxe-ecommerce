import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { ProductsProvider } from "./context/ProductContext";
import ReactDOM from "react-dom/client"; 
import App from "./App";
import './index.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <CartProvider>
      <ProductsProvider>
  <App />
</ProductsProvider>
    </CartProvider>
  </AuthProvider>
);