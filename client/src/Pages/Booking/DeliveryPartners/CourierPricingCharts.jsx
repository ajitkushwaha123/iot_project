import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CourierPricingCharts = ({ couriers }) => {
  if (!Array.isArray(couriers) || couriers.length === 0) return null;

  // Prepare data for bar chart comparison
  const barChartData = couriers.map((c) => ({
    name: c.courier_name,
    Rate: c.rate,
    Delivery: c.delivery_performance,
    Pickup: c.pickup_performance,
    RTO: c.rto_charges,
    Freight: c.freight_charge,
  }));

  return (
    <div className="mx-auto my-8">
      <h1 className="text-3xl font-bold text-center text-white">
        📦 Courier Comparison
      </h1>

      {/* Bar Chart */}
      <div className="bg-gray-900 p-6 rounded-xl shadow-md">
        <h2 className="text-white text-lg font-semibold mb-4">
          💰 Rate Comparison
        </h2>
        <ResponsiveContainer height={300}>
          <BarChart data={barChartData}>
            <XAxis dataKey="name" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Bar dataKey="Rate" fill="#22c55e" />
            <Bar dataKey="Freight" fill="#3b82f6" />
            <Bar dataKey="RTO" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CourierPricingCharts;
