import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllOrders } from "../../api/adminApi";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getAllOrders()
      .then((response) => setOrders(response.data.orders || []))
      .catch((error) => console.error("Failed to fetch orders:", error));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.45em] text-amber-700">Orders</p>
        <h1 className="font-['Sora'] text-3xl font-semibold text-stone-950">All Orders</h1>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-white/60 bg-white/80 shadow-[0_20px_70px_rgba(23,19,18,0.08)]">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-stone-950 text-white">
              <tr>
                <th className="px-5 py-4">User</th>
                <th className="px-5 py-4">Products</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Total</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-t border-stone-100">
                  <td className="px-5 py-4">{order.user?.name || "Customer"}</td>
                  <td className="px-5 py-4">{order.items.map((item) => item.name).join(", ")}</td>
                  <td className="px-5 py-4">{order.status}</td>
                  <td className="px-5 py-4">Rs. {order.total}</td>
                  <td className="px-5 py-4">
                    <Link to={`/admin/orders/${order._id}`} className="rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-900">
                      Update Status
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
