import React from "react";

export default function OrderCard({ order }) {
  const product = order.products[0];
  const shipment = order.shipments[0];
  const billing = order.others;

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-md rounded-2xl p-6 mb-6 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          Order ID: {order.channel_order_id}
        </h2>
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
          {order.status}
        </span>
      </div>

      {/* Customer Info */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Customer Info
        </h3>
        <p>
          <strong>Name:</strong> {order.customer_name}
        </p>
        <p>
          <strong>Phone:</strong> {order.customer_phone}
        </p>
        <p>
          <strong>Address:</strong> {order.customer_address},{" "}
          {order.customer_address_2}, {order.customer_city},{" "}
          {order.customer_state} - {order.customer_pincode}
        </p>
      </div>

      {/* Product Info */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Product</h3>
        <div className="grid grid-cols-2 gap-4">
          <p>
            <strong>Name:</strong> {product.name}
          </p>
          <p>
            <strong>SKU:</strong> {product.channel_sku}
          </p>
          <p>
            <strong>Quantity:</strong> {product.quantity}
          </p>
          <p>
            <strong>Price:</strong> ₹{product.selling_price}
          </p>
          <p>
            <strong>HSN:</strong> {product.hsn}
          </p>
        </div>
      </div>

      {/* Shipment Info */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Shipment</h3>
        <div className="grid grid-cols-2 gap-4">
          <p>
            <strong>Weight:</strong> {shipment.weight} kg
          </p>
          <p>
            <strong>Dimensions:</strong> {shipment.dimensions}
          </p>
          <p>
            <strong>Shipping Method:</strong> {order.shipping_method}
          </p>
          <p>
            <strong>Pickup Location:</strong> {order.pickup_location}
          </p>
        </div>
      </div>

      {/* Billing Info */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Billing Info
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <p>
            <strong>Total:</strong> ₹{order.total}
          </p>
          <p>
            <strong>Tax:</strong> ₹{order.tax}
          </p>
          <p>
            <strong>Payment:</strong> {order.payment_method}
          </p>
          <p>
            <strong>Invoice City:</strong> {billing.billing_city}
          </p>
        </div>
      </div>

      <div className="text-sm text-gray-500">
        <p>Created At: {order.created_at}</p>
        <p>Channel: {order.channel_name}</p>
      </div>
    </div>
  );
}
