import { CheckCircle2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return <div className="px-6 py-16 text-center text-stone-600">No order data available.</div>;
  }

  return (
    <div className="px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-4xl rounded-[2.5rem] border border-white/60 bg-white/80 p-10 text-center shadow-[0_30px_120px_rgba(23,19,18,0.12)]">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <CheckCircle2 size={36} />
        </div>
        <p className="mt-6 text-xs uppercase tracking-[0.45em] text-amber-700">Order Confirmed</p>
        <h1 className="mt-3 font-['Sora'] text-4xl font-semibold text-stone-950">Your order has been placed.</h1>
        <p className="mt-3 text-sm leading-7 text-stone-600">Thank you for shopping with J&K Luxe. Your premium checkout flow is ready for production-style confirmation and order tracking.</p>

        <div className="mt-8 grid gap-4 text-left">
          {order.items.map((item, index) => (
            <div key={`${item.name}-${index}`} className="flex items-center justify-between rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5">
              <div>
                <p className="font-semibold text-stone-950">{item.name}</p>
                <p className="mt-1 text-sm text-stone-500">Quantity {item.quantity}</p>
              </div>
              <p className="font-semibold text-stone-950">Rs. {item.price * item.quantity}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button type="button" onClick={() => navigate("/shop")} className="rounded-full bg-stone-950 px-6 py-4 text-sm font-semibold text-white transition hover:bg-amber-800">
            Continue Shopping
          </button>
          <button type="button" onClick={() => navigate("/profile/orders")} className="rounded-full border border-stone-300 px-6 py-4 text-sm font-semibold text-stone-900">
            My Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
