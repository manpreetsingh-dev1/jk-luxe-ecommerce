import { MapPin, Package, Save} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useRef } from "react";
const emptyAddress = {
  name: "",
  phone: "",
  addressLine: "",
  city: "",
  state: "",
  pincode: "",
};

const ProfilePage = () => {
  const navigate = useNavigate();
  const addressesRef = useRef(null);
  const { user, token, login } = useAuth();
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  const [addresses, setAddresses] = useState([]);
  const [addressForm, setAddressForm] = useState(emptyAddress);

  const loadAddresses = async () => {
    const response = await api.get(`/address/user/${user._id}`);
    setAddresses(response.data.addresses || []);
  };

  useEffect(() => {
    if (!user) return;
    setProfile({
      fullName: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
    });
    loadAddresses();
  }, [user]);

  const handleProfileSave = async () => {
    const response = await api.put(`/auth/update/${user._id}`, profile);
    login(response.data.user, token);
  };

  const handleAddAddress = async () => {
    await api.post("/address/add", { ...addressForm, userId: user._id });
    setAddressForm(emptyAddress);
    loadAddresses();
  };

  const handleDeleteAddress = async (id) => {
    await api.delete(`/address/${id}`);
    loadAddresses();
  };

  return (
    <div className="px-4 py-6 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <aside className="space-y-6 rounded-[2.5rem] border border-white/60 bg-stone-950 p-8 text-white shadow-[0_25px_90px_rgba(23,19,18,0.15)]">
          <div className="flex items-center gap-4">
            <div>
              <p className="font-['Sora'] text-2xl font-semibold">
                {user?.name}
              </p>
              <p className="text-sm text-stone-300">{user?.email}</p>
            </div>
          </div>

          <div className="grid gap-3">
            <button
              type="button"
              onClick={() => navigate("/profile/orders")}
              className="flex items-center justify-between rounded-[1.5rem] bg-white/5 px-5 py-4 text-left transition hover:bg-white/10"
            >
              <span className="flex items-center gap-3">
                <Package size={18} />
                My Orders
              </span>
              <span>Open</span>
            </button>
            <button
              type="button"
              onClick={() =>
                addressesRef.current?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex items-center justify-between rounded-[1.5rem] bg-white/5 px-5 py-4 text-left transition hover:bg-white/10"
            >
              <span className="flex items-center gap-3">
                <MapPin size={18} />
                Manage Addresses
              </span>
              <span>Open</span>
            </button>
          </div>
        </aside>

        <section className="space-y-8">
          <div className="rounded-[2.5rem] border border-white/60 bg-white/80 p-8 shadow-[0_25px_90px_rgba(23,19,18,0.08)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.45em] text-amber-700">
                  Profile
                </p>
                <h1 className="font-['Sora'] text-3xl font-semibold text-stone-950">
                  Account Details
                </h1>
              </div>
              <button
                type="button"
                onClick={handleProfileSave}
                className="inline-flex items-center gap-2 rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-800"
              >
                <Save size={16} />
                Save
              </button>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <input
                value={profile.fullName}
                onChange={(event) =>
                  setProfile((current) => ({
                    ...current,
                    fullName: event.target.value,
                  }))
                }
                placeholder="Full Name"
                className="rounded-2xl border border-stone-200 bg-white px-4 py-4 text-sm outline-none"
              />
              <input
                value={profile.email}
                onChange={(event) =>
                  setProfile((current) => ({
                    ...current,
                    email: event.target.value,
                  }))
                }
                placeholder="Email"
                className="rounded-2xl border border-stone-200 bg-white px-4 py-4 text-sm outline-none"
              />
              <input
                value={profile.phone}
                onChange={(event) =>
                  setProfile((current) => ({
                    ...current,
                    phone: event.target.value,
                  }))
                }
                placeholder="Phone"
                className="rounded-2xl border border-stone-200 bg-white px-4 py-4 text-sm outline-none md:col-span-2"
              />
            </div>
          </div>

          <div ref={addressesRef} className="rounded-[2.5rem] border border-white/60 bg-white/80 p-8 shadow-[0_25px_90px_rgba(23,19,18,0.08)]">
            <p className="text-xs uppercase tracking-[0.45em] text-amber-700">
              Addresses
            </p>
            <h2 className="mt-3 font-['Sora'] text-3xl font-semibold text-stone-950">
              Delivery Book
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {Object.keys(emptyAddress).map((field) => (
                <input
                  key={field}
                  value={addressForm[field]}
                  onChange={(event) =>
                    setAddressForm((current) => ({
                      ...current,
                      [field]: event.target.value,
                    }))
                  }
                  placeholder={field
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (value) => value.toUpperCase())}
                  className={`rounded-2xl border border-stone-200 bg-white px-4 py-4 text-sm outline-none ${field === "addressLine" ? "md:col-span-2" : ""}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={handleAddAddress}
              className="mt-5 rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-800"
            >
              Add Address
            </button>

            <div className="mt-8 grid gap-4">
              {addresses.map((address) => (
                <div
                  key={address._id}
                  className="flex flex-col gap-4 rounded-[2rem] border border-stone-200 bg-stone-50 p-5 md:flex-row md:items-start md:justify-between"
                >
                  <div>
                    <p className="font-semibold text-stone-950">
                      {address.name}
                    </p>
                    <p className="mt-1 text-sm text-stone-600">
                      {address.phone}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-stone-600">
                      {address.addressLine}, {address.city}, {address.state} -{" "}
                      {address.pincode}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteAddress(address._id)}
                    className="rounded-full bg-rose-100 px-4 py-2 text-sm font-semibold text-rose-700"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
