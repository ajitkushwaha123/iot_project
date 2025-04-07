import { useFormik } from "formik";
import { Calendar } from "lucide-react";
import axios from "axios";
import { useState } from "react";
import CourierPricingList from "./DeliveryPartners/CourierPricingList";
import CourierRecommendation from "./DeliveryPartners/CourierRecommendation";

const API_URL = `${import.meta.env.VITE_API_URL}/api`;

const PackageBooking = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); // 🔹 Loading state

  const getPricing = async (values) => {
    try {
      const res = await axios.get(`${API_URL}/courier/get-pricing`, {
        params: {
          cod: values.cod,
          pickup_postcode: values.pickup_postcode,
          delivery_postcode: values.delivery_postcode,
          weight: values.weight,
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
      pickupAddress: "",
      deliveryAddress: "",
      pickup_postcode: "",
      delivery_postcode: "",
      weight: "",
      cod: false,
      pickupTime: "",
    },
    onSubmit: async (values) => {
      setLoading(true); // 🔹 Start loading
      const pricing = await getPricing(values);
      if (pricing) {
        setData(pricing.data.data.available_courier_companies);
      }
      setLoading(false); // 🔹 Stop loading
    },
  });

  return (
    <div>
      <div className="w-full max-w-6xl mx-auto bg-gray-900 text-white shadow-xl rounded-xl my-5 p-8">
        <h2 className="text-2xl font-semibold mb-6 tracking-wide">
          📦 Package Booking
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm text-gray-300 mb-1 block">
              Pickup Address
            </label>
            <input
              type="text"
              name="pickupAddress"
              onChange={formik.handleChange}
              value={formik.values.pickupAddress}
              placeholder="Enter pickup address"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Delivery Address */}
          <div>
            <label className="text-sm text-gray-300 mb-1 block">
              Delivery Address
            </label>
            <input
              type="text"
              name="deliveryAddress"
              onChange={formik.handleChange}
              value={formik.values.deliveryAddress}
              placeholder="Enter delivery address"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Postcodes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-300 mb-1 block">
                Pickup Postcode
              </label>
              <input
                type="text"
                name="pickup_postcode"
                onChange={formik.handleChange}
                value={formik.values.pickup_postcode}
                placeholder="Enter pickup postcode"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-sm text-gray-300 mb-1 block">
                Delivery Postcode
              </label>
              <input
                type="text"
                name="delivery_postcode"
                onChange={formik.handleChange}
                value={formik.values.delivery_postcode}
                placeholder="Enter delivery postcode"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Weight & COD */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-300 mb-1 block">
                Weight (kg)
              </label>
              <input
                type="number"
                name="weight"
                onChange={formik.handleChange}
                value={formik.values.weight}
                placeholder="Enter package weight"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex items-center gap-2 mt-8">
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
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
              />
              <Calendar className="absolute top-3 right-4 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Submit */}
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

      {data.length > 0 && <CourierRecommendation couriers={data} />}

      {/* Display courier list */}
      {Array.isArray(data) && data.length > 0 && (
        <CourierPricingList couriers={data} />
      )}
    </div>
  );
};

export default PackageBooking;
