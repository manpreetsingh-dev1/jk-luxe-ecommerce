import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import HeroCarousel from "../components/HeroCarousel";

const categories = [
  {
    id: "men",
    name: "Men",
    description: "Sharp tailoring, elevated staples, and all-day comfort.",
    image: "https://images.pexels.com/photos/7668398/pexels-photo-7668398.jpeg",
  },
  {
    id: "women",
    name: "Women",
    description: "Fluid silhouettes, rich textures, and premium layers.",
    image: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: "kids",
    name: "Kids",
    description: "Playful essentials finished with luxe comfort and polish.",
    image: "https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
];

const SkeletonCard = () => (
  <button
    type="button"
    disabled
    className="group relative overflow-hidden rounded-4xl text-left shadow-[0_30px_90px_rgba(23,19,18,0.12)] h-80 bg-stone-200 animate-pulse"
  />
);

const Home = () => {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get("/products?limit=8")
      .then((response) => setFeaturedProducts(response.data.products || []))
      .catch((error) => console.error("Failed to load products:", error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-10">
      <HeroCarousel />

      {/* <section className="px-4 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[2.5rem] border border-white/60 bg-white/70 p-8 shadow-[0_25px_80px_rgba(23,19,18,0.08)] backdrop-blur-xl lg:grid-cols-[1.2fr_0.8fr] lg:p-12">
          <div className="space-y-5">
            <p className="text-xs uppercase tracking-[0.45em] text-amber-700">Brand Direction</p>
            <h2 className="font-['Sora'] text-3xl font-semibold leading-tight text-stone-950 sm:text-5xl">
              Premium digital retail with the calm confidence of top-tier fashion brands.
            </h2>
            <p className="max-w-2xl text-base leading-8 text-stone-600">
              J&K Luxe now has a more refined storefront rhythm with responsive layouts, softer motion,
              stronger content hierarchy, and polished product discovery across mobile, tablet, and desktop.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {[
              ["Responsive UX", "Layouts tuned for mobile-first browsing and faster product scanning."],
              ["Protected Flows", "User, admin, and checkout journeys are separated more cleanly."],
              ["Premium Visuals", "Glass surfaces, warm neutrals, and editorial spacing throughout."],
            ].map(([title, copy]) => (
              <div key={title} className="rounded-[2rem] bg-stone-950 p-6 text-white shadow-[0_20px_40px_rgba(23,19,18,0.18)]">
                <p className="font-['Sora'] text-lg font-semibold">{title}</p>
                <p className="mt-3 text-sm leading-7 text-stone-300">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      <section className="px-4 sm:px-6">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-amber-700">Collections</p>
              <h2 className="font-['Sora'] text-3xl font-semibold text-stone-950 sm:text-4xl">Shop by Category</h2>
            </div>
            <button
              type="button"
              onClick={() => navigate("/shop")}
              className="inline-flex items-center gap-2 self-start rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-800"
            >
              View All
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => navigate(`/shop/${category.id}`)}
                className="group relative overflow-hidden rounded-4xl text-left shadow-[0_30px_90px_rgba(23,19,18,0.12)]"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-85 w-full object-cover object-top transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,12,10,0.05)_0%,rgba(16,12,10,0.82)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 p-8 text-white">
                  <p className="text-xs uppercase tracking-[0.4em] text-amber-200">{category.name}</p>
                  <h3 className="mt-3 font-['Sora'] text-2xl font-semibold">{category.name} Edit</h3>
                  <p className="mt-3 max-w-sm text-sm leading-7 text-stone-200">{category.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-10 sm:px-6">
        <div className="mx-auto max-w-7xl space-y-8">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-amber-700">Best Sellers</p>
            <h2 className="font-['Sora'] text-3xl font-semibold text-stone-950 sm:text-4xl">Featured Products</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {loading ? (
              [...Array(8)].map((_, index) => (
                <button
                  key={index}
                  type="button"
                  disabled
                  className="overflow-hidden rounded-4xl border border-white/60 bg-stone-200 shadow-[0_25px_80px_rgba(23,19,18,0.08)] animate-pulse h-96"
                />
              ))
            ) : featuredProducts.length === 0 ? (
              <div className="col-span-full text-center py-16">
                <p className="text-stone-600 text-lg">No products available yet.</p>
              </div>
            ) : (
              featuredProducts.map((product) => (
                <button
                  key={product._id}
                  type="button"
                  onClick={() => navigate(`/product/${product._id}`)}
                  className="group overflow-hidden rounded-4xl border border-white/60 bg-white/80 text-left shadow-[0_25px_80px_rgba(23,19,18,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_35px_90px_rgba(23,19,18,0.12)]"
                >
                  <div className="overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-80 w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-3 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-['Sora'] text-lg font-semibold text-stone-950">{product.name}</h3>
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-900">
                        Rs. {product.price}
                      </span>
                    </div>
                    <p className="line-clamp-2 text-sm leading-6 text-stone-600">
                      {product.description || "Premium construction and elevated everyday styling."}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-stone-900">
                      Shop Now
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
