import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios"; // your axios instance

export default function SearchBar({ onClose }) {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch all products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products"); // GET /api/products
        setProducts(res.data); // assuming res.data is an array of products
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, []);

  // Filter products whenever search changes
  useEffect(() => {
    const filtered = products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [search, products]);

  const handleNavigate = (product) => {
    onClose(); // close search
    if (product.category) {
      navigate(`/shop/${product.category}`); // navigate to category page
    } else {
      navigate(`/shop?search=${product.name}`); // fallback search query
    }
  };

  return (
    <div className="fixed inset-0 z-999 bg-black/40 backdrop-blur-sm">
      {/* Top Bar */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <input
            type="text"
            placeholder="Search luxury fashion..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black text-lg"
          />
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-black text-white hover:bg-gray-800 transition"
          >
            Close
          </button>
        </div>
      </div>

      {/* Results */}
      {search && (
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product._id || product.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden group cursor-pointer"
                onClick={() => handleNavigate(product)}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-gray-500">${product.price}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-white text-lg">
              No products found
            </p>
          )}
        </div>
      )}
    </div>
  );
}