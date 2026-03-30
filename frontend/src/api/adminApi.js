import axios from "./axios";

export const getAllOrders = () => {
  return axios.get("/admin/orders");
};

export const getOrderById = (id) => {
  return axios.get(`/admin/orders/${id}`);
};

export const updateOrderStatus = (id, status) => {
  return axios.patch(`/admin/orders/${id}`, { status });
};

/* ===========================
   PRODUCT APIs
=========================== */

export const getAllProducts = () => {
  return axios.get("/admin/products");
};

export const getProductById = (id) => {
  return axios.get(`/admin/products/${id}`);
};

export const createProduct = (data) => {
  return axios.post("/admin/products", data);
};

export const updateProduct = (id, data) => {
  return axios.patch(`/admin/products/${id}`, data);
};

export const deleteProduct = (id) => {
  return axios.delete(`/admin/products/${id}`);
};


/* ===========================
   USER APIs
=========================== */

export const getAllUsers = () => {
  return axios.get("/admin/users");
};

export const getUserById = (id) => {
  return axios.get(`/admin/users/${id}`);
};

export const deleteUser = (id) => {
  return axios.delete(`/admin/users/${id}`);
};