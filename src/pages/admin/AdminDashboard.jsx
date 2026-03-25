import { useEffect, useMemo, useState } from "react";
import { getAllOrders, getAllProducts, getAllUsers } from "../../api/adminApi";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    Promise.all([getAllOrders(), getAllProducts(), getAllUsers()])
      .then(([ordersResponse, productsResponse, usersResponse]) => {
        setOrders(ordersResponse.data.orders || []);
        setProducts(productsResponse.data.products || []);
        setUsers(usersResponse.data.users || []);
      })
      .catch((error) => console.error("Dashboard load failed:", error));
  }, []);

  const revenue = useMemo(
    () => orders.reduce((sum, order) => sum + Number(order.total || 0), 0),
    [orders],
  );

  const stats = [
    { label: "Total Products", value: products.length },
    { label: "Total Orders", value: orders.length },
    { label: "Total Users", value: users.length },
    { label: "Revenue", value: `Rs. ${revenue}` },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-[2.5rem] bg-stone-950 p-8 text-white shadow-[0_25px_90px_rgba(23,19,18,0.15)]">
        <p className="text-xs uppercase tracking-[0.45em] text-amber-200">Overview</p>
        <h1 className="mt-3 font-['Sora'] text-4xl font-semibold">Welcome Admin</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-300">
          This dashboard now gives you a cleaner control layer for store performance, product management, orders, and user visibility.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <article key={stat.label} className="rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-[0_20px_70px_rgba(23,19,18,0.08)]">
            <p className="text-sm uppercase tracking-[0.25em] text-stone-500">{stat.label}</p>
            <p className="mt-4 font-['Sora'] text-4xl font-semibold text-stone-950">{stat.value}</p>
          </article>
        ))}
      </section>

      <section className="rounded-[2.5rem] border border-white/60 bg-white/80 p-8 shadow-[0_20px_70px_rgba(23,19,18,0.08)]">
        <h2 className="font-['Sora'] text-2xl font-semibold text-stone-950">Recent Orders</h2>
        <div className="mt-6 grid gap-4">
          {orders.slice(0, 5).map((order) => (
            <div key={order._id} className="flex flex-col gap-3 rounded-[1.5rem] bg-stone-50 p-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-semibold text-stone-950">{order.user?.name || "Customer"}</p>
                <p className="mt-1 text-sm text-stone-500">{order.items.length} items</p>
              </div>
              <div className="flex flex-wrap gap-3 text-sm">
                <span className="rounded-full bg-amber-100 px-3 py-1 font-semibold text-amber-900">{order.status}</span>
                <span className="rounded-full bg-stone-950 px-3 py-1 font-semibold text-white">Rs. {order.total}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
