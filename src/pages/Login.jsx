import { LockKeyhole, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, isAdmin } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated) return;
    navigate(isAdmin ? "/admin/dashboard" : location.state?.from || "/shop");
  }, [isAdmin, isAuthenticated, location.state, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/login", form);
      login(response.data.user, response.data.token);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-10 sm:px-6">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[2.5rem] border border-white/60 bg-white/75 shadow-[0_30px_120px_rgba(23,19,18,0.12)] lg:grid-cols-2">
        <section className="hidden bg-stone-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.45em] text-amber-200">Welcome Back</p>
            <h1 className="mt-6 font-['Sora'] text-5xl font-semibold leading-tight">Access your profile, cart, and premium order history.</h1>
          </div>
          <p className="max-w-md text-sm leading-7 text-stone-300">
            We refreshed the auth experience with cleaner hierarchy, clearer validation, and faster role-aware redirects.
          </p>
        </section>

        <section className="p-8 sm:p-12">
          <div className="mx-auto max-w-md space-y-8">
            <div>
              <p className="text-xs uppercase tracking-[0.45em] text-amber-700">J&K Luxe</p>
              <h2 className="mt-3 font-['Sora'] text-4xl font-semibold text-stone-950">Login</h2>
              <p className="mt-3 text-sm leading-7 text-stone-600">Enter your email and password to continue.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-stone-700">Email</span>
                <div className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-4">
                  <Mail size={18} className="text-stone-400" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                    className="w-full bg-transparent text-sm outline-none"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-stone-700">Password</span>
                <div className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-4">
                  <LockKeyhole size={18} className="text-stone-400" />
                  <input
                    type="password"
                    value={form.password}
                    onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                    className="w-full bg-transparent text-sm outline-none"
                    placeholder="Enter password"
                    required
                  />
                </div>
              </label>

              {error && <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{error}</div>}

              <button type="submit" disabled={loading} className="w-full rounded-full bg-stone-950 px-6 py-4 text-sm font-semibold text-white transition hover:bg-amber-800 disabled:opacity-60">
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            <p className="text-sm text-stone-600">
              Need an account?{" "}
              <Link to="/register" className="font-semibold text-stone-950 underline-offset-4 hover:underline">
                Create one
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;
