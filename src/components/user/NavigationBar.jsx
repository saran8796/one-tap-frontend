import React from "react";
import { Link } from "react-router-dom";

const NavigationBar = ({ activeTab, setActiveTab, user }) => {
  const profileTabs = [
    { id: "dashboard", label: "Home", icon: "📊" },
    { id: "orders", label: "My Orders", icon: "📦" },
    { id: "documents", label: "My Documents", icon: "📄" },
  ];

  return (
    <nav className="bg-white shadow-lg border-b py-2 px-4 sticky top-0 left-0 z-50 border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Navigation */}
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to={"/"} className="flex items-center space-x-4">
            <div className="flex items-center gap-3 group cursor-pointer">
              {/* <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold text-xl shadow-lg transform group-hover:scale-105 transition-all duration-300">
                1Ts
              </div>
              <div className="transform group-hover:translate-x-1 transition-transform duration-300">
                <div className="text-xl font-bold bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent">
                  OneTap Services
                </div>
              </div> */}
              <div className="transform group-hover:scale-110 transition-transform duration-300">
                <div className="text-xl font-bold bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent">
                  <img
                    src="./images/logo.png"
                    width={150}
                    alt="OneTap Services"
                  />
                </div>
              </div>
            </div>
          </Link>

          {/* Main Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {profileTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center cursor-pointer space-x-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {/* Notification Bell */}
            <button
              onClick={() => setActiveTab("notifications")}
              className="p-3 rounded-xl bg-white cursor-pointer hover:bg-blue-50 border border-gray-200 hover:border-blue-200 transition-all duration-300 shadow-sm relative group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600 group-hover:text-blue-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            </button>

            {/* User Avatar */}
            <div
              onClick={() => setActiveTab("settings")}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">M</span>
              </div>
              <span className="text-gray-700 font-medium">{user.name}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
