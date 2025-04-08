import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router";

const API_URL = `${import.meta.env.VITE_API_URL}/api`;

export default function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState(null);

  const [searchParams] = useSearchParams();
  const cancelled = searchParams.get("cancelled");

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_URL}/courier/all-orders`);
      setOrders(res.data.data.data);
    } catch (err) {
      setError("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  const filteredData = cancelled
    ? orders.filter((order) => order.status === "CANCELED")
    : orders;

  useEffect(() => {
    fetchOrders();
  }, []);

  const cancelOrder = async (id) => {
    if (!confirm("Are you sure you want to cancel this order?")) return;
    try {
      setCancellingId(id);
      await axios.post(`${API_URL}/courier/cancel-order/${id}`);
      alert("Order cancelled successfully.");
      fetchOrders();
    } catch (err) {
      alert("Failed to cancel the order.");
    } finally {
      setCancellingId(null);
    }
  };

  const getStatusColor = (status) => {
    if (!status) return "bg-gray-600 text-white";
    const s = status.toLowerCase();
    if (s.includes("cancel")) return "bg-red-600 text-white";
    if (s.includes("delivered")) return "bg-green-600 text-white";
    if (s.includes("shipped")) return "bg-blue-600 text-white";
    return "bg-yellow-500 text-black";
  };

  return (
    <div className="p-4 bg-gray-950 min-h-screen text-white">
      {loading ? (
        <p className="text-center text-gray-400">Loading orders...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-400">No orders found.</p>
      ) : (
        <div className="grid gap-6">
          {filteredData?.map((order) => (
            <div
              key={order?.id}
              className="bg-gray-900 rounded-2xl shadow-md p-6 border border-gray-700 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">
                    Order #{order?.channel_order_id}
                  </h2>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      order?.status
                    )}`}
                  >
                    {order?.status}
                  </span>
                </div>
                <div className="text-right text-sm">
                  <p className="text-gray-400 mb-1">
                    {new Date(order?.created_at).toLocaleString()}
                  </p>
                  <p className="text-green-400 font-bold text-lg">
                    ₹{order?.total}
                  </p>
                </div>
              </div>

              {/* Customer Info */}
              <div className="grid gap-1 text-sm text-gray-300 mb-4">
                <p>
                  <span className="font-semibold text-white">Customer:</span>{" "}
                  {order?.customer_name}
                </p>
                <p>
                  <span className="font-semibold text-white">Phone:</span>{" "}
                  {order?.customer_phone}
                </p>
                <p>
                  <span className="font-semibold text-white">Address:</span>{" "}
                  {order?.customer_address}, {order?.customer_city},{" "}
                  {order?.customer_state} - {order?.customer_pincode}
                </p>
                <p>
                  <span className="font-semibold text-white">Payment:</span>{" "}
                  {order?.payment_method}
                </p>
              </div>

              {/* Products */}
              <div>
                <h3 className="font-semibold text-gray-200 mb-2">
                  Ordered Products
                </h3>
                <ul className="text-sm text-gray-400 space-y-1 list-disc pl-5">
                  {order?.products.map((product, idx) => (
                    <li key={idx}>
                      <span className="text-white font-medium">
                        {product.name}
                      </span>{" "}
                      (x{product.quantity}) – ₹{product.selling_price}{" "}
                      <span className="text-gray-500">
                        [SKU: {product.channel_sku}]
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cancel Order */}
              <div className="mt-6 text-right">
                {order?.status != "CANCELED" && (
                  <button
                    onClick={() => cancelOrder(order?.id)}
                    disabled={cancellingId === order?.id}
                    className="bg-red-600 hover:bg-red-500 transition-colors px-4 py-2 rounded-md text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {cancellingId === order?.id
                      ? "Cancelling..."
                      : "Cancel Order"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
