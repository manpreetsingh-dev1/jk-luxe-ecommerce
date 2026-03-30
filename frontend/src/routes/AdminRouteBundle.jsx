import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import AdminRoute from "./AdminRoute";

const AdminLayout = lazy(() => import("../pages/admin/layout/AdminLayout"));
const AdminDashboard = lazy(() => import("../pages/admin/AdminDashboard"));
const AdminOrders = lazy(() => import("../pages/admin/AdminOrders"));
const AdminOrderDetails = lazy(() => import("../pages/admin/AdminOrderDetails"));
const AdminProducts = lazy(() => import("../pages/admin/AdminProducts"));
const AdminProductForm = lazy(() => import("../pages/admin/AdminProductForm"));
const AdminUsers = lazy(() => import("../pages/admin/AdminUsers"));

const AdminRouteBundle = () => (
  <Routes>
    <Route element={<AdminRoute />}>
      <Route element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="orders/:id" element={<AdminOrderDetails />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="products/new" element={<AdminProductForm />} />
        <Route path="products/:id" element={<AdminProductForm />} />
        <Route path="users" element={<AdminUsers />} />
      </Route>
    </Route>
  </Routes>
);

export default AdminRouteBundle;
