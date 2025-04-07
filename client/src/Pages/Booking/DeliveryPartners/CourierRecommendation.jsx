import { Star, Clock, BadgeCheck } from "lucide-react";

const CourierRecommendation = ({ couriers }) => {
  if (!couriers || couriers.length === 0) return null;

  const scoredCouriers = couriers
    .map((courier) => ({
      ...courier,
      score: courier.rate + (5 - (courier.rating || 0)) * 10,
    }))
    .sort((a, b) => a.score - b.score)
    .slice(0, 3);

  return (
    <div className="w-full max-w-6xl mx-auto bg-gray-800 text-white rounded-xl shadow-lg p-6 mt-6">
      <h3 className="text-xl font-bold mb-6 text-blue-400">
        ✨ Our Top Courier Recommendations
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {scoredCouriers.map((courier, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-6 shadow-md transition-all duration-300 hover:shadow-blue-500/70 hover:scale-[1.02]"
          >
            <h4 className="text-lg font-semibold text-white mb-1">
              {courier.courier_name}
            </h4>

            {/* Price */}
            <p className="text-gray-300 mb-2">
              Price:{" "}
              <span className="text-white font-medium">
                ₹{courier.rate.toFixed(2)}
              </span>
            </p>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-2 text-yellow-400">
              {Array.from({ length: Math.round(courier.rating || 0) }).map(
                (_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 stroke-yellow-400"
                  />
                )
              )}
              <span className="text-sm text-white ml-2">
                {courier.rating?.toFixed(1) || "N/A"}
              </span>
            </div>

            {/* Delivery Time */}
            <div className="flex items-center gap-2 text-sm text-gray-300 mb-3">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>Delivery in {courier.estimated_delivery_days} day(s)</span>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-2 mt-2">
              {courier.cod ? (
                <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full">
                  COD Available
                </span>
              ) : (
                <span className="text-xs bg-indigo-600 text-white px-2 py-1 rounded-full">
                  Prepaid
                </span>
              )}
              {courier.delivery_days ===
                Math.min(...scoredCouriers.map((c) => c.delivery_days)) && (
                <span className="text-xs bg-indigo-600 text-white px-2 py-1 rounded-full flex items-center gap-1">
                  <BadgeCheck className="w-3 h-3" />
                  Fastest
                </span>
              )}
              <span className="text-xs border border-blue-500 text-blue-400 px-2 py-1 rounded-full">
                Recommended #{index + 1}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourierRecommendation;
