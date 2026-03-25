import { CreditCard, MapPinHouse } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const emptyForm = {
  name: "",
  phone: "",
  addressLine: "",
  city: "",
  state: "",
  pincode: "",
};

const Checkout = () => {
  const { user } = useAuth();
  const { cart, buyNow } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (!user?._id) return;

    api
      .get(`/address/user/${user._id}`)
      .then((response) => {
        const nextAddresses = response.data.addresses || [];
        setAddresses(nextAddresses);
        const defaultAddress = nextAddresses.find((address) => address.isDefault);
        if (defaultAddress) {
          setSelectedAddressId(defaultAddress._id);
        }
      })
      .catch((error) => console.error("Failed to load addresses:", error));
  }, [user]);

  const checkoutItems = useMemo(() => {
    const stateItems = location.state?.items;
    if (stateItems?.length) return stateItems;

    return cart.map((item) => ({
      productId: item._id,
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: item.qty,
    }));
  }, [cart, location.state]);

  const total = checkoutItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSaveAddress = async () => {
    const response = await api.post("/address/add", { ...form, userId: user._id, isDefault: !addresses.length });
    const nextAddress = response.data.address;
    const nextAddresses = [nextAddress, ...addresses];
    setAddresses(nextAddresses);
    setSelectedAddressId(nextAddress._id);
    setForm(emptyForm);
  };

  const handlePlaceOrder = async () => {
    const selectedAddress = addresses.find((address) => address._id === selectedAddressId) || form;
    const response = await buyNow(checkoutItems, selectedAddress, location.state?.source || "cart");

    if (response.success) {
      navigate("/ordersuccess", { state: { order: response.order } });
    }
  };

  return (
    <div className="px-4 py-6 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="space-y-8">
          <div className="rounded-[2.5rem] border border-white/60 bg-white/80 p-8 shadow-[0_25px_90px_rgba(23,19,18,0.08)]">
            <div className="flex items-center gap-3">
              <MapPinHouse className="text-amber-700" />
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-amber-700">Delivery</p>
                <h1 className="font-['Sora'] text-3xl font-semibold text-stone-950">Choose Address</h1>
              </div>
            </div>

            <div className="mt-6 grid gap-4">
              {addresses.map((address) => (
                <button
                  key={address._id}
                  type="button"
                  onClick={() => setSelectedAddressId(address._id)}
                  className={`rounded-[2rem] border p-5 text-left transition ${
                    selectedAddressId === address._id
                      ? "border-stone-950 bg-stone-950 text-white"
                      : "border-stone-200 bg-stone-50 text-stone-900"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-semibold">{address.name}</p>
                    {address.isDefault && <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">Default</span>}
                  </div>
                  <p className="mt-2 text-sm">{address.phone}</p>
                  <p className="mt-2 text-sm leading-6">
                    {address.addressLine}, {address.city}, {address.state} - {address.pincode}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-white/60 bg-white/80 p-8 shadow-[0_25px_90px_rgba(23,19,18,0.08)]">
            <p className="text-xs uppercase tracking-[0.4em] text-amber-700">New Address</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {Object.keys(emptyForm).map((field) => (
                <input
                  key={field}
                  value={form[field]}
                  onChange={(event) => setForm((current) => ({ ...current, [field]: event.target.value }))}
                  placeholder={field.replace(/([A-Z])/g, " $1").replace(/^./, (value) => value.toUpperCase())}
                  className={`rounded-2xl border border-stone-200 bg-white px-4 py-4 text-sm outline-none ${field === "addressLine" ? "md:col-span-2" : ""}`}
                />
              ))}
            </div>
            <button type="button" onClick={handleSaveAddress} className="mt-5 rounded-full bg-stone-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-800">
              Save Address
            </button>
          </div>
        </section>

        <aside className="h-fit rounded-[2.5rem] border border-white/60 bg-stone-950 p-8 text-white shadow-[0_25px_90px_rgba(23,19,18,0.15)]">
          <div className="flex items-center gap-3">
            <CreditCard className="text-amber-200" />
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-amber-200">Payment</p>
              <h2 className="font-['Sora'] text-3xl font-semibold">Order Summary</h2>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            {checkoutItems.map((item) => (
              <div key={`${item.productId}-${item.name}`} className="flex items-center justify-between gap-4 rounded-[1.5rem] bg-white/5 p-4">
                <div>
                  <p className="font-semibold text-white">{item.name}</p>
                  <p className="text-sm text-stone-300">Qty {item.quantity}</p>
                </div>
                <p className="font-semibold">Rs. {item.price * item.quantity}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-4 border-t border-white/10 pt-6 text-sm text-stone-300">
            <div className="flex items-center justify-between">
              <span>Payment Method</span>
              <span>Cash on Delivery</span>
            </div>
            <div className="flex items-center justify-between text-lg font-semibold text-white">
              <span>Total</span>
              <span>Rs. {total}</span>
            </div>
          </div>

          <button type="button" onClick={handlePlaceOrder} className="mt-8 w-full rounded-full bg-white px-6 py-4 text-sm font-semibold text-stone-950 transition hover:bg-amber-100">
            Pay Securely
          </button>
        </aside>
      </div>
    </div>
  );
};

export default Checkout;
