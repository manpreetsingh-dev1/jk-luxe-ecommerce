import { LockKeyhole, Mail, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await api.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      navigate("/login", { state: { email: form.email } });
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { key: "name", label: "Full Name", icon: User, type: "text" },
    { key: "email", label: "Email", icon: Mail, type: "email" },
    { key: "password", label: "Password", icon: LockKeyhole, type: "password" },
    { key: "confirmPassword", label: "Confirm Password", icon: LockKeyhole, type: "password" },
  ];

  return (
    <div className="px-4 py-10 sm:px-6">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[2.5rem] border border-white/60 bg-white/75 shadow-[0_30px_120px_rgba(23,19,18,0.12)] lg:grid-cols-2">
        <section className="hidden bg-[linear-gradient(160deg,#171312_0%,#3d2b1f_100%)] p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.45em] text-amber-200">Create Account</p>
            <h1 className="mt-6 font-['Sora'] text-5xl font-semibold leading-tight">Join the refreshed J&K Luxe shopping experience.</h1>
          </div>
          <p className="max-w-md text-sm leading-7 text-stone-300">
            Sign up, verify your account with OTP, and unlock personalized shopping, checkout, addresses, and order history.
          </p>
        </section>

        <section className="p-8 sm:p-12">
          <div className="mx-auto max-w-md space-y-8">
            <div>
              <p className="text-xs uppercase tracking-[0.45em] text-amber-700">J&K Luxe</p>
              <h2 className="mt-3 font-['Sora'] text-4xl font-semibold text-stone-950">Register</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {fields.map(({ key, label, icon: Icon, type }) => (
                <label key={key} className="block">
                  <span className="mb-2 block text-sm font-semibold text-stone-700">{label}</span>
                  <div className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-4">
                    <Icon size={18} className="text-stone-400" />
                    <input
                      type={type}
                      value={form[key]}
                      onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))}
                      className="w-full bg-transparent text-sm outline-none"
                      placeholder={label}
                      required
                    />
                  </div>
                </label>
              ))}

              {error && <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{error}</div>}

              <button type="submit" disabled={loading} className="w-full rounded-full bg-stone-950 px-6 py-4 text-sm font-semibold text-white transition hover:bg-amber-800 disabled:opacity-60">
                {loading ? "Creating..." : "Create Account"}
              </button>
            </form>

            <p className="text-sm text-stone-600">
              Already registered?{" "}
              <Link to="/login" className="font-semibold text-stone-950 underline-offset-4 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Register;
