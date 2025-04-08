import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/reuseableComponents/Header";

const HomeLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 overflow-auto">
      {/* Top Navigation */}
      

      {/* Main Outlet */}
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default HomeLayout;
