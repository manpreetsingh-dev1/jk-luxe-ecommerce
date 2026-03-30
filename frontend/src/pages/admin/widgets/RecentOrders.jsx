import { Link } from "react-router-dom";

const RecentOrders = ({ orders }) => {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="text-lg font-bold mb-4">Recent Orders</h2>

      <div className="space-y-3">
        {orders.slice(0, 5).map(order => (
          <div
            key={order._id}
            className="flex justify-between items-center border-b pb-2"
          >
            <div>
              <p className="font-semibold text-sm">{order._id}</p>
              <p className="text-xs text-gray-500">₹{order.total}</p>
            </div>

            <div className="flex items-center gap-3">
              <span className={`text-xs px-2 py-1 rounded-full ${
                order.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                order.status === "shipped" ? "bg-blue-100 text-blue-700" :
                "bg-green-100 text-green-700"
              }`}>
                {order.status}
              </span>

              <Link
                to={`/admin/orders/${order._id}`}
                className="text-blue-600 text-xs"
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentOrders;