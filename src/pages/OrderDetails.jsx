import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

const OrderDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    api
      .get(`/orders/${id}`)
      .then((response) => setOrder(response.data.order))
      .catch((error) => console.error("Failed to fetch order:", error));
  }, [id]);

  if (!order) {
    return <div className="px-6 py-16 text-center text-stone-600">Loading order details...</div>;
  }

  return (
    <div className="px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-5xl space-y-6 rounded-[2.5rem] border border-white/60 bg-white/80 p-8 shadow-[0_25px_90px_rgba(23,19,18,0.08)]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.45em] text-amber-700">Order</p>
            <h1 className="font-['Sora'] text-3xl font-semibold text-stone-950">Order Details</h1>
          </div>
          <button type="button" onClick={() => navigate("/profile/orders")} className="rounded-full border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-900">
            Back to Orders
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.5rem] bg-stone-50 p-5">
            <p className="text-sm text-stone-500">Status</p>
            <p className="mt-2 font-semibold text-stone-950">{order.status}</p>
          </div>
          <div className="rounded-[1.5rem] bg-stone-50 p-5">
            <p className="text-sm text-stone-500">Payment</p>
            <p className="mt-2 font-semibold text-stone-950">{order.paymentStatus}</p>
          </div>
          <div className="rounded-[1.5rem] bg-stone-50 p-5">
            <p className="text-sm text-stone-500">Total</p>
            <p className="mt-2 font-semibold text-stone-950">Rs. {order.total}</p>
          </div>
        </div>

        <div className="grid gap-4">
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
      </div>
    </div>
  );
};

export default OrderDetails;
