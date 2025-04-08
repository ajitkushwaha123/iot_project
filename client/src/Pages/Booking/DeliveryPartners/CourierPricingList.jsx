import { Truck } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";

const CourierPricingList = ({ couriers, length, breadth, height, weight }) => {
  if (!Array.isArray(couriers) || couriers.length === 0) return null;
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl mx-auto my-6">
      {couriers?.map((data) => (
        <div
          key={data.id}
          // onClick={() =>
          //   navigate(
          //     `/order/create-order?name=${data.courier_name}&length=${length}&breadth=${breadth}&height=${height}&weight=${weight}`
          //   )
          // }
          className="relative bg-gray-900 text-white rounded-xl shadow-lg p-6"
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

          <div className="absolute flex bottom-0 right-0 mb-4 mr-4">
            {/* <div className="bg-green-500 mr-3 text-white font-bold py-2 px-4 rounded-lg shadow-lg">
              ₹{data.rate}
            </div> */}
            <button
              onClick={() =>
                navigate(
                  `/order/create-order?courier=${data.courier_name}&length=${length}&breadth=${breadth}&height=${height}&weight=${weight}`
                )
              }
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm shadow-md transition-all"
            >
              <Truck className="w-4 h-4" />
              Schedule
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourierPricingList;
