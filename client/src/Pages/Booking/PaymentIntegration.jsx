import React, { useState } from "react";
import { Wallet2, CreditCard, Landmark, IndianRupee } from "lucide-react";

const PaymentIntegration = () => {
  const [selectedMethod, setSelectedMethod] = useState("upi");

  const methods = [
    { id: "upi", label: "UPI", icon: <Landmark className="w-5 h-5" /> },
    {
      id: "card",
      label: "Credit/Debit Card",
      icon: <CreditCard className="w-5 h-5" />,
    },
    { id: "wallet", label: "Wallet", icon: <Wallet2 className="w-5 h-5" /> },
    {
      id: "cod",
      label: "Cash on Delivery (COD)",
      icon: <IndianRupee className="w-5 h-5" />,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto bg-gray-900 text-white p-8 rounded-2xl shadow-xl mt-10">
      <h2 className="text-2xl font-bold mb-6">💰 Payment Integration</h2>

      <div className="space-y-4 mb-6">
        {methods.map((method) => (
          <label
            key={method.id}
            className={`flex items-center gap-4 border px-4 py-3 rounded-lg cursor-pointer transition ${
              selectedMethod === method.id
                ? "border-blue-500 bg-gray-800"
                : "border-gray-700 hover:bg-gray-800"
            }`}
          >
            <input
              type="radio"
              name="payment"
              value={method.id}
              checked={selectedMethod === method.id}
              onChange={() => setSelectedMethod(method.id)}
              className="accent-blue-600"
            />
            {method.icon}
            <span className="text-sm font-medium">{method.label}</span>
          </label>
        ))}
      </div>

      <button className="w-full bg-blue-600 hover:bg-blue-700 transition py-3 rounded-lg font-medium">
        Proceed to Pay
      </button>
    </div>
  );
};

export default PaymentIntegration;
