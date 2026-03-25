// orderCard.jsx
const OrderCard = ({ order }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <p><b>Order ID:</b> {order._id}</p>
      <p><b>Status:</b> {order.status || "Processing"}</p>
      <p><b>Total:</b> ₹{order.totalAmount}</p>
      <p><b>Date:</b> {new Date(order.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default OrderCard;