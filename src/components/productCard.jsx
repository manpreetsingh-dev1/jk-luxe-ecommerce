// src/components/productCard.jsx
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, user, addToCart }) => {
  const navigate = useNavigate();

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-lg mb-4 cursor-pointer"
        onClick={() => navigate(`/shop/${product._id}`)}
      />
      <h2 className="font-bold text-lg">{product.name}</h2>
      <p className="text-gray-700 mb-2">₹{product.price}</p>

      {/* Add to Cart */}
      <button
        onClick={async () => {
          if (!user) {
            navigate("/login");
            return;
          }
          const res = await addToCart(product);
          if (res.success) alert("Added to cart");
          else alert(res.message || "Failed to add");
        }}
        className="bg-black text-white px-4 py-2 rounded-lg mt-2 w-full hover:bg-white hover:text-black transition border-2"
      >
        Add to Cart
      </button>

      {/* Buy Now */}
      <button
        onClick={() => {
          if (!user) {
            navigate("/login");
            return;
          }
          navigate("/address", {
            state: {
              source: "shop",
              items: [{ productId: product._id, quantity: 1, price: product.price }],
            },
          });
        }}
        className="bg-green-500 text-white px-4 py-2 rounded-lg mt-2 w-full hover:bg-green-600 transition border-2"
      >
        Buy Now
      </button>
    </div>
  );
};

export default ProductCard;