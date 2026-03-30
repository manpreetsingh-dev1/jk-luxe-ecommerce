import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import StoreLayout from "./pages/admin/layout/StoreLayout";
import AdminRouteBundle from "./routes/AdminRouteBundle";
import PrivateRoute from "./routes/UserRoute";

const Home = lazy(() => import("./pages/home"));
const Shop = lazy(() => import("./pages/shop"));
const Product = lazy(() => import("./pages/Product"));
const Men = lazy(() => import("./pages/Men"));
const Women = lazy(() => import("./pages/Women"));
const Kids = lazy(() => import("./pages/Kids"));
const Contact = lazy(() => import("./pages/Contact"));
const Cart = lazy(() => import("./pages/Cart"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Checkout = lazy(() => import("./pages/Checkout"));
const OrderDetails = lazy(() => import("./pages/OrderDetails"));
const OrderSuccess = lazy(() => import("./pages/OrderSuccess"));
const Profile = lazy(() => import("./pages/profilePage"));
const MyOrders = lazy(() => import("./pages/MyOrders"));
const Addresses = lazy(() => import("./pages/Addresses"));
const EditProfile = lazy(() => import("./pages/EditProfile"));

const AppFallback = () => (
  <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(177,144,90,0.2),transparent_35%),linear-gradient(180deg,#f8f2e8_0%,#fffdf8_40%,#f4efe7_100%)] px-6 py-16">
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="h-12 w-56 animate-pulse rounded-full bg-white/70" />
      <div className="h-[40vh] animate-pulse rounded-[2rem] bg-white/70" />
      <div className="grid gap-6 md:grid-cols-3">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="h-60 animate-pulse rounded-[2rem] bg-white/70" />
        ))}
      </div>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<AppFallback />}>
        <Routes>
          <Route path="/admin/*" element={<AdminRouteBundle />} />

          <Route element={<StoreLayout />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="product/:id" element={<Product />} />
            <Route path="men" element={<Men />} />
            <Route path="women" element={<Women />} />
            <Route path="kids" element={<Kids />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="ordersuccess" element={<OrderSuccess />} />

            <Route element={<PrivateRoute />}>
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="orders/:id" element={<OrderDetails />} />
              <Route path="profile" element={<Profile />} />
              <Route path="profile/orders" element={<MyOrders />} />
              <Route path="profile/addresses" element={<Addresses />} />
              <Route path="profile/edit" element={<EditProfile />} />
            </Route>

            <Route path="ProfilePage" element={<Navigate to="/profile" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
