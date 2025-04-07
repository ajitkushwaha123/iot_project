import React from "react";
import Sidebar from "../components/reuseableComponents/Sidebar";
import Header from "../components/reuseableComponents/Header";

const Home = () => {
  return (
    <div className="w-full border-primary border-b-4  text-white bg-black bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <Sidebar />
      <Header />
    </div>
  );
};

export default Home;
