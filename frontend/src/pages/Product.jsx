import { Minus, Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((response) => setProduct(response.data.product))
      .catch((error) => console.error("Failed to load product:", error))
      .finally(() => setLoading(false));
  }, [id]);

  const gallery = useMemo(() => {
    if (!product) return [];
    return [product.image, product.image, product.image];
  }, [product]);

  if (loading) {
    return <div className="mx-auto min-h-[40vh] max-w-7xl animate-pulse rounded-[2rem] bg-white/70 px-6 py-10" />;
  }

  if (!product) {
    return <div className="px-6 py-16 text-center text-stone-600">Product not found.</div>;
  }

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    for (let index = 0; index < quantity; index += 1) {
      await addToCart(product);
    }
  };

  return (
    <div className="px-4 py-6 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="grid gap-4 md:grid-cols-[0.2fr_0.8fr]">
          <div className="grid grid-cols-3 gap-3 md:grid-cols-1">
            {gallery.map((image, index) => (
              <div key={`${image}-${index}`} className="overflow-hidden rounded-[1.5rem] border border-white/60 bg-white/80">
                <img src={image} alt={`${product.name} ${index + 1}`} className="h-28 w-full object-cover md:h-36" />
              </div>
            ))}
          </div>
          <div className="overflow-hidden rounded-[2.5rem] border border-white/60 bg-white/80 shadow-[0_25px_90px_rgba(23,19,18,0.08)]">
            <img src={product.image} alt={product.name} className="h-full min-h-[440px] w-full object-cover" />
          </div>
        </section>

        <section className="rounded-[2.5rem] border border-white/60 bg-white/80 p-8 shadow-[0_25px_90px_rgba(23,19,18,0.08)]">
          <div className="space-y-5">
            <p className="text-xs uppercase tracking-[0.45em] text-amber-700">{product.category || "Collection"}</p>
            <h1 className="font-['Sora'] text-4xl font-semibold text-stone-950">{product.name}</h1>
            <p className="text-3xl font-semibold text-stone-900">Rs. {product.price}</p>
            <p className="text-base leading-8 text-stone-600">
              {product.description || "A premium essential designed to pair clean structure with all-day comfort."}
            </p>
          </div>

          <div className="mt-8 grid gap-5 rounded-[2rem] bg-stone-50 p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">Quantity</span>
              <div className="flex items-center gap-3 rounded-full border border-stone-200 bg-white px-3 py-2">
                <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))}>
                  <Minus size={18} />
                </button>
                <span className="min-w-8 text-center font-semibold">{quantity}</span>
                <button type="button" onClick={() => setQuantity((value) => value + 1)}>
                  <Plus size={18} />
                </button>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className="rounded-full border border-stone-300 px-6 py-4 text-sm font-semibold text-stone-950 transition hover:bg-stone-100"
              >
                Add to Cart
              </button>
              <button
                type="button"
                onClick={async () => {
                  await handleAddToCart();
                  navigate("/checkout", {
                    state: {
                      source: "buyNow",
                      items: [
                        {
                          productId: product._id,
                          name: product.name,
                          image: product.image,
                          price: product.price,
                          quantity,
                        },
                      ],
                    },
                  });
                }}
                className="rounded-full bg-stone-950 px-6 py-4 text-sm font-semibold text-white transition hover:bg-amber-800"
              >
                Buy Now
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
