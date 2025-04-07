import { RefreshCw, Ruler, Weight, DollarSign } from "lucide-react";

const AutoMeasurement = () => {
  const measurements = {
    length: 40, // in cm
    width: 30,
    height: 25,
    weight: 3.2, // in kg
  };

  const volume =
    (measurements.length * measurements.width * measurements.height) / 1000; // in cubic dm
  const pricing = (volume * 2 + measurements.weight * 10).toFixed(2); // Sample formula

  const handleRefresh = () => {
    // logic to re-fetch data from hardware
    console.log("Fetching latest measurements...");
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-xl rounded-xl p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold tracking-wide">
          📏 Auto Measurement Integration
        </h2>
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 text-sm bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Dimensions and Weight */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center mb-8">
        <div className="bg-gray-800 rounded-lg p-4 shadow-inner">
          <div className="text-gray-400 text-xs uppercase mb-1">Length</div>
          <div className="text-lg font-semibold flex justify-center items-center gap-2">
            <Ruler className="w-5 h-5" />
            {measurements.length} cm
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 shadow-inner">
          <div className="text-gray-400 text-xs uppercase mb-1">Width</div>
          <div className="text-lg font-semibold flex justify-center items-center gap-2">
            <Ruler className="w-5 h-5" />
            {measurements.width} cm
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 shadow-inner">
          <div className="text-gray-400 text-xs uppercase mb-1">Height</div>
          <div className="text-lg font-semibold flex justify-center items-center gap-2">
            <Ruler className="w-5 h-5" />
            {measurements.height} cm
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 shadow-inner">
          <div className="text-gray-400 text-xs uppercase mb-1">Weight</div>
          <div className="text-lg font-semibold flex justify-center items-center gap-2">
            <Weight className="w-5 h-5" />
            {measurements.weight} kg
          </div>
        </div>
      </div>

      {/* Auto Pricing */}
      <div className="bg-blue-900 rounded-xl p-6 flex items-center justify-between shadow-inner">
        <div className="text-gray-300 text-sm">
          Auto-calculated based on size & weight
        </div>
        <div className="flex items-center gap-2 text-2xl font-bold text-green-400">
          <DollarSign className="w-6 h-6" />₹ {pricing}
        </div>
      </div>
    </div>
  );
};

export default AutoMeasurement;
