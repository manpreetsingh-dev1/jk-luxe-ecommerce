import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, increaseQty, decreaseQty } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="px-4 py-6 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-[2.5rem] border border-white/60 bg-white/80 p-8 shadow-[0_25px_90px_rgba(23,19,18,0.08)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.45em] text-amber-700">Bag</p>
              <h1 className="font-['Sora'] text-3xl font-semibold text-stone-950">Your Cart</h1>
            </div>
            <button type="button" onClick={() => navigate("/shop")} className="rounded-full border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-900">
              Continue Shopping
            </button>
          </div>

          <div className="mt-8 grid gap-5">
            {cart.length === 0 ? (
              <div className="rounded-[2rem] bg-stone-50 p-10 text-center text-stone-600">Your cart is empty.</div>
            ) : (
              cart.map((item) => (
                <article key={item._id} className="grid gap-5 rounded-[2rem] border border-stone-200 bg-stone-50 p-5 md:grid-cols-[140px_1fr_auto]">
                  <img src={item.image} alt={item.name} className="h-36 w-full rounded-[1.5rem] object-cover" />
                  <div className="space-y-3">
                    <h2 className="font-['Sora'] text-xl font-semibold text-stone-950">{item.name}</h2>
                    <p className="text-sm text-stone-500">Refined fit, premium finish, and flexible all-day wear.</p>
                    <p className="text-lg font-semibold text-stone-900">Rs. {item.price}</p>
                    <div className="flex items-center gap-3">
                      <button type="button" onClick={() => decreaseQty(item._id)} className="rounded-full border border-stone-300 px-3 py-1">-</button>
                      <span className="min-w-8 text-center font-semibold">{item.qty}</span>
                      <button type="button" onClick={() => increaseQty(item._id)} className="rounded-full border border-stone-300 px-3 py-1">+</button>
                    </div>
                  </div>
                  <div className="flex items-start justify-between gap-4 md:flex-col md:items-end">
                    <p className="text-lg font-semibold text-stone-900">Rs. {item.qty * item.price}</p>
                    <button type="button" onClick={() => removeFromCart(item._id)} className="rounded-full bg-rose-100 px-4 py-2 text-sm font-semibold text-rose-700">
                      Remove
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>

        <aside className="h-fit rounded-[2.5rem] border border-white/60 bg-stone-950 p-8 text-white shadow-[0_25px_90px_rgba(23,19,18,0.15)]">
          <p className="text-xs uppercase tracking-[0.45em] text-amber-200">Summary</p>
          <h2 className="mt-3 font-['Sora'] text-3xl font-semibold">Order Total</h2>
          <div className="mt-8 space-y-4 text-sm text-stone-300">
            <div className="flex items-center justify-between">
              <span>Items</span>
              <span>{cart.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="flex items-center justify-between border-t border-white/10 pt-4 text-lg font-semibold text-white">
              <span>Total</span>
              <span>Rs. {total}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              navigate("/checkout", {
                state: {
                  source: "cart",
                  items: cart.map((item) => ({
                    productId: item._id,
                    name: item.name,
                    image: item.image,
                    price: item.price,
                    quantity: item.qty,
                  })),
                },
              })
            }
            disabled={!cart.length}
            className="mt-8 w-full rounded-full bg-white px-5 py-4 text-sm font-semibold text-stone-950 transition hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Proceed to Checkout
          </button>
        </aside>
      </div>
    </div>
  );
};

export default Cart;
