import { Outlet } from "react-router-dom";
import Navbar from "../../../components/nav";

const StoreFooter = () => (
  <footer className="border-t border-white/60 bg-stone-950 px-6 py-12 text-stone-200">
    <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
      <div className="space-y-3">
        <p className="font-['Sora'] text-lg font-semibold text-white">J&K Luxe</p>
        <p className="text-sm text-stone-400">
          Refined essentials with editorial styling, fast checkout, and a premium digital storefront.
        </p>
      </div>
      <div>
        <p className="mb-3 text-sm uppercase tracking-[0.24em] text-stone-500">Collections</p>
        <div className="space-y-2 text-sm text-stone-300">
          <p>Men</p>
          <p>Women</p>
          <p>Kids</p>
        </div>
      </div>
      <div>
        <p className="mb-3 text-sm uppercase tracking-[0.24em] text-stone-500">Support</p>
        <div className="space-y-2 text-sm text-stone-300">
          <p>Shipping</p>
          <p>Returns</p>
          <p>Profile</p>
        </div>
      </div>
      <div>
        <p className="mb-3 text-sm uppercase tracking-[0.24em] text-stone-500">Contact</p>
        <div className="space-y-2 text-sm text-stone-300">
          <p>support@jkluxe.com</p>
          <p>+91 98000 00000</p>
          <p>Punjab, India</p>
        </div>
      </div>
    </div>
  </footer>
);

const StoreLayout = () => {
  return (
    <div className="min-h-screen bg-transparent text-stone-900">
      <Navbar />
      <main className="pb-16">
        <Outlet />
      </main>
      <StoreFooter />
    </div>
  );
};

export default StoreLayout;
