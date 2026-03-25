import { ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  const handleVerify = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/auth/verifyOtp", { email, otp });
      navigate("/login");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-2xl rounded-[2.5rem] border border-white/60 bg-white/80 p-10 shadow-[0_30px_120px_rgba(23,19,18,0.12)]">
        <div className="mx-auto flex max-w-md flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-800">
            <ShieldCheck size={28} />
          </div>
          <p className="mt-6 text-xs uppercase tracking-[0.45em] text-amber-700">Verify Account</p>
          <h1 className="mt-3 font-['Sora'] text-4xl font-semibold text-stone-950">Enter your OTP</h1>
          <p className="mt-3 text-sm leading-7 text-stone-600">We sent a verification code to your email so we can finish activating your account securely.</p>
        </div>

        <form onSubmit={handleVerify} className="mx-auto mt-8 max-w-md space-y-5">
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-4 text-sm outline-none"
            required
          />
          <input
            type="text"
            value={otp}
            onChange={(event) => setOtp(event.target.value)}
            placeholder="Enter 6-digit OTP"
            className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-4 text-center text-lg tracking-[0.4em] outline-none"
            required
          />

          {error && <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{error}</div>}

          <button type="submit" disabled={loading} className="w-full rounded-full bg-stone-950 px-6 py-4 text-sm font-semibold text-white transition hover:bg-amber-800 disabled:opacity-60">
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
