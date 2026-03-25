import { LayoutDashboard, Package, ShoppingCart, Users } from "lucide-react";
import { NavLink } from "react-router-dom";

const items = [
  { label: "Dashboard", to: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Products", to: "/admin/products", icon: Package },
  { label: "Orders", to: "/admin/orders", icon: ShoppingCart },
  { label: "Users", to: "/admin/users", icon: Users },
];

const AdminSidebar = () => (
  <aside className="hidden w-72 shrink-0 flex-col border-r border-white/10 bg-stone-950 p-6 text-white lg:flex">
    <div className="rounded-[2rem] bg-white/5 p-5">
      <p className="text-xs uppercase tracking-[0.45em] text-amber-200">Admin</p>
      <h2 className="mt-3 font-['Sora'] text-2xl font-semibold">J&K Luxe</h2>
      <p className="mt-2 text-sm leading-7 text-stone-300">Production-ready overview for products, orders, users, and store health.</p>
    </div>

    <nav className="mt-8 grid gap-2">
      {items.map(({ label, to, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-[1.25rem] px-4 py-3 text-sm font-semibold transition ${
              isActive ? "bg-white text-stone-950" : "text-stone-300 hover:bg-white/10 hover:text-white"
            }`
          }
        >
          <Icon size={18} />
          {label}
        </NavLink>
      ))}
    </nav>
  </aside>
);

export default AdminSidebar;
