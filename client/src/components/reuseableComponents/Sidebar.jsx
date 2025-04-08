import React, { useState } from "react";
import {
  Home,
  Package,
  ChevronDown,
  LogOut,
  User,
  Settings,
  CreditCard,
  Truck,
  ClipboardList,
} from "lucide-react";
import { useNavigate } from "react-router";

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [activePath, setActivePath] = useState("/dashboard");

  const navigate = useNavigate();

  const toggleMenu = (name) => {
    setOpenMenu(openMenu === name ? null : name);
  };

  const handleNav = (path) => {
    setActivePath(path);
    navigate(path);
    // Add routing logic here if needed
  };

  const menuItems = [
    {
      name: "Home",
      icon: <Home className="w-5 h-5" />,
      path: "/",
    },
    {
      name: "Orders",
      icon: <Package className="w-5 h-5" />,
      subItems: [
        { name: "Create Order", path: "/order/create-order" },
        { name: "All Order", path: "/order/all-orders" },
        { name: "Cancelled Order", path: "/order/all-orders?cancelled=true" },
      ],
    },
    {
      name: "Pickup",
      icon: <Package className="w-5 h-5" />,
      subItems: [
        { name: "Create Pickup", path: "/pickup/create" },
        { name: "Pickup History", path: "/pickup/history" },
        { name: "Pickup Tracking", path: "/pickup/tracking" },
      ],
    },
    // {
    //   name: "Billing",
    //   icon: <CreditCard className="w-5 h-5" />,
    //   subItems: [
    //     { name: "Invoices", path: "/billing/invoices" },
    //     { name: "Transactions", path: "/billing/transactions" },
    //   ],
    // },
    {
      name: "Delivery Partners",
      icon: <Truck className="w-5 h-5" />,
      subItems: [
        { name: "Manage Partners", path: "/partners/manage" },
      ],
    },
    {
      name: "Profile",
      icon: <User className="w-5 h-5" />,
      path: "/profile",
    },
    // {
    //   name: "Settings",
    //   icon: <Settings className="w-5 h-5" />,
    //   path: "/settings",
    // },
  ];

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white flex flex-col justify-between z-40 border-r border-gray-800">
      {/* Top Section */}
      <div className="p-4">
        <div className="text-2xl font-bold mb-6 tracking-wide">
          📦 Packlytics
        </div>

        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              {item.subItems ? (
                <>
                  <button
                    onClick={() => toggleMenu(item.name)}
                    className={`w-full flex items-center justify-between py-3 px-3 rounded-lg hover:bg-gray-800 transition-all text-[15px] ${
                      openMenu === item.name ? "bg-gray-800" : ""
                    }`}
                  >
                    <span className="flex items-center space-x-3">
                      {item.icon}
                      <span>{item.name}</span>
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        openMenu === item.name ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openMenu === item.name && (
                    <ul className="ml-6 mt-1 space-y-1 text-sm text-gray-300 relative pl-3 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-700">
                      {item.subItems.map((sub, i) => (
                        <li key={i}>
                          <button
                            onClick={() => handleNav(sub.path)}
                            className={`block w-full text-left py-2 px-3 rounded-md transition text-[14px] ${
                              activePath === sub.path
                                ? "bg-gray-800 font-semibold border-l-4 border-blue-500 text-white"
                                : "hover:bg-gray-800 hover:text-white"
                            }`}
                          >
                            {sub.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <button
                  onClick={() => handleNav(item.path)}
                  className={`flex items-center space-x-3 py-3 px-3 rounded-lg hover:bg-gray-800 transition-all text-[15px] w-full text-left ${
                    activePath === item.path
                      ? "bg-gray-800 font-semibold border-l-4 border-blue-500"
                      : ""
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Sticky Logout Button */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={() => handleNav("/logout")}
          className="flex items-center space-x-3 py-3 px-3 rounded-lg hover:bg-red-600 transition-all text-[15px] w-full text-left bg-gray-800"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
