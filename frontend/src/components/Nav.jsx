import { Menu, ShoppingBag, User2, X } from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Men", to: "/men" },
  { label: "Women", to: "/women" },
  { label: "Kids", to: "/kids" },
  { label: "Contact", to: "/contact" },
];

const getAvatarLabel = (name = "U") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((chunk) => chunk[0]?.toUpperCase())
    .join("");

export default function Navbar() {
  const navigate = useNavigate();
  const { cart } = useCart();
  const { user, isAdmin, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClassName = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-medium tracking-[0.18em] uppercase transition ${
      isActive
        ? "bg-white text-stone-950 shadow-sm"
        : "text-stone-700 hover:bg-white/70 hover:text-stone-950"
    }`;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 px-4 py-4 sm:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/60 bg-white/60 px-4 py-3 shadow-[0_20px_60px_rgba(23,19,18,0.08)] backdrop-blur-xl sm:px-6">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex items-center gap-3 rounded-full px-2 py-1 text-left"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-stone-950 text-sm font-semibold text-amber-300">
            JL
          </div>
          <div>
            <p className="font-['Sora'] text-sm uppercase tracking-[0.35em] text-amber-300">
              J&K Luxe
            </p>
            <p className="font-['Sora'] text-base font-semibold text-stone-900">Modern luxury essentials</p>
          </div>
        </button>

        <nav className="hidden items-center gap-2 lg:flex">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClassName}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            onClick={() => navigate("/cart")}
            className="relative rounded-full border border-stone-200 bg-white/80 p-3 text-stone-800 transition hover:-translate-y-0.5"
          >
            <ShoppingBag size={18} />
            {cart.length > 0 && (
              <span className="absolute -right-1 -top-1 rounded-full bg-amber-700 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                {cart.length}
              </span>
            )}
          </button>

          {user ? (
            <div className="flex items-center gap-3 rounded-full border border-white/70 bg-white/70 px-2 py-2">
              <button
                type="button"
                onClick={() => navigate(isAdmin ? "/admin/dashboard" : "/profile")}
                className="flex items-center gap-3 rounded-full px-2 py-1"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-950 text-sm font-semibold text-amber-200">
                  {getAvatarLabel(user.name)}
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-amber-400">{user.name}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                    {isAdmin ? "Admin" : "Profile"}
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-amber-200 transition hover:bg-amber-800"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <NavLink to="/login" className="rounded-full px-5 py-3 text-sm font-semibold text-stone-800 transition hover:bg-white/70">
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-800"
              >
                Join Now
              </NavLink>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((value) => !value)}
          className="rounded-full border border-stone-200 bg-white/80 p-3 text-stone-900 lg:hidden"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div className="mx-auto mt-3 max-w-7xl rounded-[2rem] border border-white/70 bg-white/85 p-4 shadow-[0_20px_60px_rgba(23,19,18,0.08)] backdrop-blur-xl lg:hidden">
          <div className="grid gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-stone-700 transition hover:bg-stone-100"
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="mt-4 grid gap-3 border-t border-stone-200 pt-4">
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                navigate("/cart");
              }}
              className="flex items-center justify-center gap-2 rounded-2xl border border-stone-200 px-4 py-3 font-semibold text-stone-800"
            >
              <ShoppingBag size={18} />
              Cart ({cart.length})
            </button>

            {user ? (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    navigate(isAdmin ? "/admin/dashboard" : "/profile");
                  }}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-stone-100 px-4 py-3 font-semibold text-stone-900"
                >
                  <User2 size={18} />
                  {user.name}
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-2xl bg-stone-950 px-4 py-3 font-semibold text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" onClick={() => setMenuOpen(false)} className="rounded-2xl border border-stone-200 px-4 py-3 text-center font-semibold text-stone-900">
                  Login
                </NavLink>
                <NavLink to="/register" onClick={() => setMenuOpen(false)} className="rounded-2xl bg-stone-950 px-4 py-3 text-center font-semibold text-white">
                  Join Now
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
