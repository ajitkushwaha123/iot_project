import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/reuseableComponents/Sidebar";
import Header from "../components/reuseableComponents/Header";
import Profile from "../Auth/Profile/Profile"; 

const DashboardLayout = () => {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />

      <div className="flex-1 ml-64 flex flex-col overflow-auto">
        <Header />
        <div className="bg-[#0a0311] p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
