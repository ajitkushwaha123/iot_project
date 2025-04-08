import { useFormik } from "formik";
import { Calendar } from "lucide-react";
import axios from "axios";
import { useState } from "react";
import CourierPricingList from "./DeliveryPartners/CourierPricingList";
import CourierRecommendation from "./DeliveryPartners/CourierRecommendation";

const API_URL = `${import.meta.env.VITE_API_URL}/api`;

const PackageBooking = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPricing = async (values) => {
    try {
      const res = await axios.get(`${API_URL}/courier/get-pricing`, {
        params: {
          cod: values.cod,
          pickup_postcode: values.pickup_postcode,
          delivery_postcode: values.delivery_postcode,
          weight: values.weight,
          length: values.length,
          breadth: values.breadth,
          height: values.height,
        },
      });

      console.log("Pricing response:", res.data);
      return res.data;
    } catch (err) {
      console.error("Pricing error:", err?.response?.data || err.message);
      return null;
    }
  };

  const formik = useFormik({
    initialValues: {
      pickup_postcode: "110038",
      delivery_postcode: "110080",
      weight: "",
      length: "",
      breadth: "",
      height: "",
      cod: false,
      pickupTime: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      const pricing = await getPricing(values);
      if (pricing) {
        setData(pricing.data.data.available_courier_companies);
      }
      setLoading(false);
    },
  });

  // 🚀 Fetch data from Arduino and set to form fields
  const fetchArduinoData = async () => {
    try {
      const res = await axios.get(`${API_URL}/arduino/fetch`);
      const { length, breadth, height, volume } = res.data;

      formik.setFieldValue("length", length);
      formik.setFieldValue("breadth", breadth);
      formik.setFieldValue("height", height);
      formik.setFieldValue("weight", volume / 5000);

      console.log("ESP32 data fetched:", res.data);
    } catch (err) {
      console.error("Failed to fetch ESP32 data:", err.message);
    }
  };

  return (
    <div>
      <div className="w-full max-w-6xl mx-auto bg-gray-900 text-white shadow-xl rounded-xl my-5 p-8">
        <h2 className="text-2xl font-semibold mb-6 tracking-wide">
          📦 Quick Package Booking
        </h2>

        <button
          onClick={fetchArduinoData}
          type="button"
          className="mb-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Fetch Dimensions from Arduino
        </button>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Postcodes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-300 mb-1 block">
                Pickup Pincode
              </label>
              <input
                type="text"
                name="pickup_postcode"
                onChange={formik.handleChange}
                value={formik.values.pickup_postcode}
                placeholder="e.g. 110001"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700"
              />
            </div>
            <div>
              <label className="text-sm text-gray-300 mb-1 block">
                Delivery Pincode
              </label>
              <input
                type="text"
                name="delivery_postcode"
                onChange={formik.handleChange}
                value={formik.values.delivery_postcode}
                placeholder="e.g. 400001"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700"
              />
            </div>
          </div>

          {/* Dimensions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-300 mb-1 block">
                Weight (kg)
              </label>
              <input
                type="number"
                name="weight"
                onChange={formik.handleChange}
                placeholder="e.g. 2(kg)"
                value={formik.values.weight}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700"
              />
            </div>
            <div>
              <label className="text-sm text-gray-300 mb-1 block">
                Length (cm)
              </label>
              <input
                type="number"
                name="length"
                onChange={formik.handleChange}
                placeholder="e.g. 40 (cm)"
                value={formik.values.length}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700"
              />
            </div>
            <div>
              <label className="text-sm text-gray-300 mb-1 block">
                Breadth (cm)
              </label>
              <input
                type="number"
                name="breadth"
                onChange={formik.handleChange}
                value={formik.values.breadth}
                placeholder="e.g. 30 (cm)"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700"
              />
            </div>
            <div>
              <label className="text-sm text-gray-300 mb-1 block">
                Height (cm)
              </label>
              <input
                type="number"
                name="height"
                onChange={formik.handleChange}
                placeholder="e.g. 20 (cm)"
                value={formik.values.height}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700"
              />
            </div>
          </div>

          {/* COD */}
          <div className="flex items-center gap-2 mt-4">
            <input
              type="checkbox"
              name="cod"
              onChange={formik.handleChange}
              checked={formik.values.cod}
              className="w-4 h-4 accent-blue-600"
            />
            <label className="text-sm text-gray-300">
              Cash on Delivery (COD)
            </label>
          </div>

          {/* Pickup Time */}
          <div>
            <label className="text-sm text-gray-300 mb-1 block">
              Pickup Time
            </label>
            <div className="relative">
              <input
                type="datetime-local"
                name="pickupTime"
                onChange={formik.handleChange}
                value={formik.values.pickupTime}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700"
              />
              <Calendar className="absolute top-3 right-4 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full transition py-3 rounded-lg font-medium ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Fetching Pricing..." : "Book Package"}
          </button>
        </form>
      </div>

      {/* Recommendations */}
      {data.length > 0 && <CourierRecommendation couriers={data} />}

      {/* Pricing List */}
      {Array.isArray(data) && data.length > 0 && (
        <CourierPricingList couriers={data} />
      )}
    </div>
  );
};

export default PackageBooking;
