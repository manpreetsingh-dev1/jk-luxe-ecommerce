import { LogOut, Store } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminTopbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <header className="flex flex-col gap-4 border-b border-stone-200 bg-white/70 px-6 py-5 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.45em] text-amber-700">Admin Control</p>
        <h1 className="mt-2 font-['Sora'] text-2xl font-semibold text-stone-950">Welcome, {user?.name || "Admin"}</h1>
      </div>

      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={() => navigate("/")} className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-900">
          <Store size={16} />
          Back to Store
        </button>
        <button
          type="button"
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="inline-flex items-center gap-2 rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-800"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminTopbar;
