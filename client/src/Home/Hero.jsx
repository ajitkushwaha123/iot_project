import React from "react";
import { NavLink } from "react-router-dom";
import Header from "../components/reuseableComponents/Header";

const Hero = () => {
  return (
    <section className="relative bg-slate-900 from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white h-screen flex flex-col overflow-hidden">
      <header className="flex justify-between items-center px-6 py-2 bg-gray-900 text-white shadow-md">
        <div className="flex items-center text-2xl font-bold tracking-wide">
          📦 <span className="ml-2">Packlytics</span>
        </div>

        <Header />
      </header>

      <div className="flex justify-center h-screen items-center">
        <div className="absolute -top-20 -left-20 w-[300px] h-[300px] bg-blue-800 rounded-full opacity-20 blur-2xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-[250px] h-[250px] bg-indigo-700 rounded-full opacity-15 blur-2xl animate-pulse" />
        <div className="absolute top-1/3 left-[10%] w-[150px] h-[150px] bg-cyan-500 rounded-full opacity-10 blur-3xl" />
        <div className="absolute bottom-[20%] left-[40%] w-[180px] h-[180px] bg-purple-600 rounded-full opacity-10 blur-3xl" />
        <div className="absolute top-[10%] right-[30%] w-[120px] h-[120px] bg-blue-400 rounded-full opacity-10 blur-2xl" />
        {/* Content */}
        <div className="relative z-10 text-center px-6 sm:px-8 lg:px-10 max-w-5xl">
          <h1 className="text-4xl sm:text-6xl font-bold leading-tight tracking-tight mb-6">
            Optimize Your Packaging with{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
              Data-Driven Insights
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8">
            Use smart analytics to enhance efficiency, minimize waste, and
            improve your packaging workflow.
          </p>
          <div className="flex justify-center items-center">
            <NavLink
              to={"/package-booking"}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium text-base sm:text-lg py-3 px-6 sm:px-8 rounded-lg transition-all duration-300"
            >
              Get Started
            </NavLink>

            <NavLink
              to={"/login"}
              className="inline-block ml-3 bg-blue-600 hover:bg-blue-700 text-white font-medium text-base sm:text-lg py-3 px-6 sm:px-8 rounded-lg transition-all duration-300"
            >
              Login
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
