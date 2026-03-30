import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const MyOrders = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user?._id) return;

    api
      .get(`/orders/user/${user._id}`)
      .then((response) => setOrders(response.data.orders || []))
      .catch((error) => console.error("Failed to fetch orders:", error));
  }, [user]);

  return (
    <div className="px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.45em] text-amber-700">Orders</p>
            <h1 className="font-['Sora'] text-3xl font-semibold text-stone-950">My Orders</h1>
          </div>
          <button type="button" onClick={() => navigate("/profile")} className="rounded-full border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-900">
            Back to Profile
          </button>
        </div>

        <div className="grid gap-5">
          {orders.map((order) => (
            <article key={order._id} className="rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-[0_20px_70px_rgba(23,19,18,0.08)]">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-['Sora'] text-xl font-semibold text-stone-950">{order.items[0]?.name || "Order"}</p>
                  <p className="mt-2 text-sm text-stone-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex flex-wrap gap-3 text-sm">
                  <span className="rounded-full bg-amber-100 px-3 py-1 font-semibold text-amber-900">{order.status}</span>
                  <span className="rounded-full bg-stone-100 px-3 py-1 font-semibold text-stone-700">{order.paymentStatus}</span>
                  <span className="rounded-full bg-stone-950 px-3 py-1 font-semibold text-white">Rs. {order.total}</span>
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                {order.items.map((item, index) => (
                  <div key={`${item.name}-${index}`} className="flex items-center justify-between rounded-[1.25rem] bg-stone-50 px-4 py-3 text-sm text-stone-600">
                    <span>{item.quantity} x {item.name}</span>
                    <span>Rs. {item.quantity * item.price}</span>
                  </div>
                ))}
              </div>

              <button type="button" onClick={() => navigate(`/orders/${order._id}`)} className="mt-5 rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-800">
                View Details
              </button>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
