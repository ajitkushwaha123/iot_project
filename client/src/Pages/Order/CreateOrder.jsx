import React, { useState, useEffect } from "react";
import { useFormik, getIn } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router";

const API_URL = `${import.meta.env.VITE_API_URL}/api`;

const CreateOrder = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const courierName = searchParams.get("courier") || "Xpressbees Surface 2kg";
  const length = parseFloat(searchParams.get("length")) || 0;
  const breadth = parseFloat(searchParams.get("breadth")) || 0;
  const height = parseFloat(searchParams.get("height")) || 0;
  const weight = parseFloat(searchParams.get("weight")) || 0;

  console.log("courier_name", courierName);

  const handleCreateOrder = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/courier/create-order`, data);
      navigate("/order/all-orders");
      return res.data;
    } catch (error) {
      console.error("Error creating order:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateOrderId = () => {
    const randomPart = Math.floor(Math.random() * 900 + 100);
    const timestamp = Date.now().toString().slice(-6);
    return `${timestamp}-${randomPart}`;
  };

  const formik = useFormik({
    initialValues: {
      courierName,
      order_id: generateOrderId(),
      order_date: new Date().toISOString().slice(0, 16),
      pickup_location: "Home",
      comment: "Reseller: M/s Goku",
      billing_customer_name: "Naruto",
      billing_last_name: "Uzumaki",
      billing_address: "House 221B, Leaf Village",
      billing_address_2: "Near Hokage House",
      billing_city: "New Delhi",
      billing_pincode: "110002",
      billing_state: "Delhi",
      billing_country: "India",
      billing_email: "naruto@uzumaki.com",
      billing_phone: "9876543210",
      shipping_is_billing: true,
      order_items: [
        {
          name: "Ninja Headband",
          sku: "NHB-001",
          units: 2,
          selling_price: 450,
          discount: 50,
          tax: 18,
          hsn: "6117",
        },
      ],
      payment_method: "Prepaid",
      sub_total: 900,
      weight,
      length,
      breadth,
      height,
    },
    validationSchema: Yup.object({
      order_id: Yup.string().required("Required"),
      order_date: Yup.string().required("Required"),
      billing_customer_name: Yup.string().required("Required"),
      billing_email: Yup.string().email("Invalid email").required("Required"),
      billing_phone: Yup.string().required("Required"),
    }),
    // enableReinitialize: true,
    onSubmit: async (values) => {
      await handleCreateOrder(values);
    },
  });

  const fieldStyle =
    "w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500";
  const labelStyle = "text-sm text-gray-300 mb-1 block";

  const renderInput = (name, label, type = "text") => {
    const value = getIn(formik.values, name);
    const touched = getIn(formik.touched, name);
    const error = getIn(formik.errors, name);

    return (
      <div>
        <label htmlFor={name} className={labelStyle}>
          {label}
        </label>
        <input
          id={name}
          name={name}
          type={type}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={value}
          placeholder={label}
          className={fieldStyle}
        />
        {touched && error && (
          <div className="text-red-400 text-sm mt-1">{error}</div>
        )}
      </div>
    );
  };

  const renderOrderItems = () => (
    <div className="space-y-6">
      {formik.values.order_items.map((_, index) => (
        <div
          key={index}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-lg"
        >
          {renderInput(`order_items[${index}].name`, "Item Name")}
          {renderInput(`order_items[${index}].sku`, "SKU")}
          {renderInput(`order_items[${index}].units`, "Units", "number")}
          {renderInput(
            `order_items[${index}].selling_price`,
            "Selling Price",
            "number"
          )}
          {renderInput(`order_items[${index}].discount`, "Discount", "number")}
          {renderInput(`order_items[${index}].tax`, "Tax", "number")}
          {renderInput(`order_items[${index}].hsn`, "HSN Code", "number")}
        </div>
      ))}
      <div className="text-right">
        <button
          type="button"
          onClick={() =>
            formik.setFieldValue("order_items", [
              ...formik.values.order_items,
              {
                name: "Ninja Headband",
                sku: "NHB-001",
                units: 1,
                selling_price: 450,
                discount: 0,
                tax: 18,
                hsn: "6117",
              },
            ])
          }
          className="mt-2 text-sm bg-green-600 px-4 py-2 rounded hover:bg-green-700"
        >
          + Add Another Item
        </button>
      </div>
    </div>
  );

  const section = (title) => (
    <h2 className="text-xl font-semibold mt-10 mb-4 border-b border-gray-700 pb-2">
      {title}
    </h2>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-8">
      <form
        onSubmit={formik.handleSubmit}
        className="space-y-10 max-w-5xl mx-auto"
      >
        {section("Order Info")}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {renderInput("order_id", "Order ID")}
          {renderInput("order_date", "Order Date", "datetime-local")}
          {renderInput("pickup_location", "Pickup Location")}
        </div>

        {section("Billing Information")}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderInput("billing_customer_name", "First Name")}
          {renderInput("billing_last_name", "Last Name")}
          {renderInput("billing_address", "Address Line 1")}
          {renderInput("billing_address_2", "Address Line 2")}
          {renderInput("billing_city", "City")}
          {renderInput("billing_state", "State")}
          {renderInput("billing_pincode", "Pincode")}
          {renderInput("billing_country", "Country")}
          {renderInput("billing_email", "Email", "email")}
          {renderInput("billing_phone", "Phone")}
        </div>

        <div className="flex items-center space-x-2 mt-4">
          <input
            id="shipping_is_billing"
            type="checkbox"
            name="shipping_is_billing"
            checked={formik.values.shipping_is_billing}
            onChange={formik.handleChange}
            className="h-5 w-5 accent-blue-500"
          />
          <label
            htmlFor="shipping_is_billing"
            className="text-sm text-gray-300"
          >
            Shipping address is same as billing
          </label>
        </div>

        {section("Order Items")}
        {renderOrderItems()}

        {section("Order Details")}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {renderInput("payment_method", "Payment Method")}
          {renderInput("sub_total", "Subtotal", "number")}
          {renderInput("weight", "Weight (kg)", "number")}
          {renderInput("length", "Length (cm)", "number")}
          {renderInput("breadth", "Breadth (cm)", "number")}
          {renderInput("height", "Height (cm)", "number")}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          {renderInput("courierName", "Courier Provider")}
        </div>

        <div className="text-center pt-6">
          <button
            type="submit"
            disabled={loading}
            className={`${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white font-semibold py-2 px-8 rounded-lg transition`}
          >
            {loading ? "Creating..." : "Create Order"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateOrder;
