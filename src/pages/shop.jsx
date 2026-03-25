import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const priceOptions = [
  { label: "All Prices", value: "all" },
  { label: "Under Rs. 1000", value: "1000" },
  { label: "Under Rs. 2500", value: "2500" },
  { label: "Under Rs. 5000", value: "5000" },
];

const Shop = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");

  useEffect(() => {
    api
      .get("/products")
      .then((response) => setProducts(response.data.products || []))
      .catch((error) => console.error("Failed to fetch products:", error));
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setSelectedCategory(searchParams.get("category") || "all");
  }, [location.search]);

  const categories = useMemo(() => {
    const values = Array.from(new Set(products.map((product) => product.category).filter(Boolean)));
    return ["all", ...values];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" ||
        product.category?.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
      const matchesPrice =
        selectedPrice === "all" || Number(product.price) <= Number(selectedPrice);

      return matchesCategory && matchesSearch && matchesPrice;
    });
  }, [products, search, selectedCategory, selectedPrice]);

  return (
    <div className="px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="rounded-[2.5rem] border border-white/60 bg-white/75 p-8 shadow-[0_25px_80px_rgba(23,19,18,0.08)] backdrop-blur-xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-3">
              <p className="text-xs uppercase tracking-[0.45em] text-amber-700">Discover</p>
              <h1 className="font-['Sora'] text-4xl font-semibold text-stone-950">Luxury essentials, styled with clarity.</h1>
              <p className="text-base leading-7 text-stone-600">
                Browse premium categories, search instantly, and filter by price without losing the editorial feel.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="relative md:col-span-3">
                <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search product name"
                  className="w-full rounded-2xl border border-stone-200 bg-white px-12 py-4 text-sm outline-none ring-0 transition focus:border-amber-600"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
                className="rounded-2xl border border-stone-200 bg-white px-4 py-4 text-sm outline-none"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>

              <select
                value={selectedPrice}
                onChange={(event) => setSelectedPrice(event.target.value)}
                className="rounded-2xl border border-stone-200 bg-white px-4 py-4 text-sm outline-none"
              >
                {priceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("all");
                  setSelectedPrice("all");
                  navigate("/shop");
                }}
                className="rounded-2xl bg-stone-950 px-5 py-4 text-sm font-semibold text-white transition hover:bg-amber-800"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </section>

        <section className="grid gap-10 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <article
              key={product._id}
              className="group overflow-hidden rounded-3xl border border-white/60 bg-white/80 shadow-[0_25px_80px_rgba(23,19,18,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_35px_100px_rgba(23,19,18,0.12)]"
            >
              <button type="button" onClick={() => navigate(`/product/${product._id}`)} className="block w-full text-left">
                <div className="overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-110 w-full object-cover object-top transition duration-700 group-hover:scale-106"
                  />
                </div>
              </button>
              <div className="space-y-4 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-amber-700">{product.category || "Collection"}</p>
                    <h2 className="mt-2 font-['Sora'] text-xl font-semibold text-stone-950">{product.name}</h2>
                  </div>
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-900">
                    Rs. {product.price}
                  </span>
                </div>
                <p className="line-clamp-2 text-sm leading-7 text-stone-600">
                  {product.description || "Refined finishes, comfortable wear, and signature premium detailing."}
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => navigate(`/product/${product._id}`)}
                    className="rounded-full border border-stone-300 px-4 py-3 text-sm font-semibold text-stone-900 transition hover:bg-stone-100"
                  >
                    View Details
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      if (!isAuthenticated) {
                        navigate("/login");
                        return;
                      }

                      await addToCart(product);
                    }}
                    className="rounded-full bg-stone-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-amber-800"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Shop;
