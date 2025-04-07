import React from "react";
import { DollarSign, MapPin, Package } from "lucide-react";

const PriceEstimation = () => {
  const estimation = {
    baseFee: 50,
    sizeWeightFee: 30,
    distanceFee: 70,
    total: 150,
  };

  return (
    <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-lg max-w-6xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <DollarSign className="w-6 h-6 text-green-400" />
        Price Estimation
      </h2>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between border-b border-gray-700 pb-2">
          <div className="flex items-center gap-2 text-gray-300">
            <Package className="w-5 h-5" />
            Base Fee
          </div>
          <span>₹{estimation.baseFee}</span>
        </div>

        <div className="flex justify-between border-b border-gray-700 pb-2">
          <div className="flex items-center gap-2 text-gray-300">
            <Package className="w-5 h-5" />
            Size & Weight Fee
          </div>
          <span>₹{estimation.sizeWeightFee}</span>
        </div>

        <div className="flex justify-between border-b border-gray-700 pb-2">
          <div className="flex items-center gap-2 text-gray-300">
            <MapPin className="w-5 h-5" />
            Distance Fee
          </div>
          <span>₹{estimation.distanceFee}</span>
        </div>
      </div>

      <div className="flex justify-between items-center bg-gray-800 p-4 rounded-lg mb-6">
        <span className="text-lg font-semibold text-white">
          Estimated Total
        </span>
        <span className="text-2xl font-bold text-green-400">
          ₹{estimation.total}
        </span>
      </div>

      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition">
        Confirm Booking
      </button>
    </div>
  );
};

export default PriceEstimation;
