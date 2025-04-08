import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, Truck, PhoneCall, Clock } from "lucide-react";

const API_URL = `${import.meta.env.VITE_API_URL}/api`;

const DeliveryPartners = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCouriers = async () => {
      try {
        const res = await axios.get(`${API_URL}/courier/all`);
        setPartners(res?.data?.data?.courier_data || []);
      } catch (error) {
        console.error("Error fetching delivery partners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCouriers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader2 className="animate-spin w-6 h-6 text-gray-400" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-white mb-6">
        🚚 Delivery Partners
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3">
        {partners.map((partner, index) => (
          <div
            key={index}
            className="bg-[#1e1e2f] rounded-2xl shadow-xl p-5 flex flex-col gap-3 hover:shadow-2xl transition-all border border-[#2a2a3d]"
          >
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Truck size={22} className="text-violet-400" />
              {partner?.name}
            </h3>

            <div className="text-sm text-gray-300 space-y-1">
              {/* <p>
                <span className="text-gray-400">Courier:</span>{" "}
                {partner.master_company}
              </p> */}
              <p>
                <span className="text-gray-400">Realtime Tracking:</span>{" "}
                {partner.realtime_tracking}
              </p>
              <p>
                <span className="text-gray-400">Call Before Delivery:</span>{" "}
                {partner.call_before_delivery}
              </p>
              {/* <p>
                <span className="text-gray-400">Contact:</span>{" "}
                {partner.delivery_boy_contact}
              </p> */}
              <p>
                <span className="text-gray-400">POD:</span>{" "}
                {partner.pod_available}
              </p>
              <p>
                <span className="text-gray-400">Min Weight:</span>{" "}
                {partner.min_weight}kg
              </p>
              <p>
                <span className="text-gray-400">Activated On:</span>{" "}
                {partner.activated_date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryPartners;
