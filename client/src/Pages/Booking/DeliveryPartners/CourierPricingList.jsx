import React from "react";
const CourierPricingList = ({ couriers }) => {
  console.log("couriers", couriers);
  if (!Array.isArray(couriers) || couriers.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl mx-auto my-6">
      {couriers.map((data) => (
        <div
          key={data.id}
          className="bg-gray-900 text-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            🚚 {data.courier_name}
          </h2>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-gray-400">City:</span> {data.city}
            </div>
            <div>
              <span className="text-gray-400">State:</span> {data.state}
            </div>
            <div>
              <span className="text-gray-400">ETD:</span> {data.etd} (
              {data.estimated_delivery_days} days)
            </div>
            <div>
              <span className="text-gray-400">Freight Charge:</span> ₹
              {data.freight_charge}
            </div>
            <div>
              <span className="text-gray-400">COD Charges:</span> ₹
              {data.cod_charges}
            </div>
            <div>
              <span className="text-gray-400">Rate:</span> ₹{data.rate}
            </div>
            <div>
              <span className="text-gray-400">RTO Charges:</span> ₹
              {data.rto_charges}
            </div>
            <div>
              <span className="text-gray-400">COD:</span>{" "}
              {data.cod ? "Yes" : "No"}
            </div>
            <div>
              <span className="text-gray-400">Surface:</span>{" "}
              {data.is_surface ? "Yes" : "No"}
            </div>
            <div>
              <span className="text-gray-400">Delivery:</span>{" "}
              {data.delivery_performance}/5
            </div>
            <div>
              <span className="text-gray-400">Pickup:</span>{" "}
              {data.pickup_performance}/5
            </div>
            <div>
              <span className="text-gray-400">Tracking:</span>{" "}
              {data.realtime_tracking}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourierPricingList;
