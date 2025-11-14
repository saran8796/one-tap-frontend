import React from "react";
import { Link } from "react-router-dom";

export default function VendorHeader({ vendor }) {
  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">OT</span>
            </div>
            <span className="font-bold text-gray-900">OneTap Vendor</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/vendor/dashboard"
              className="text-gray-700 hover:text-green-600 font-medium"
            >
              Dashboard
            </Link>
            <Link
              to="/vendor/orders"
              className="text-gray-700 hover:text-green-600 font-medium"
            >
              Orders
            </Link>
            <Link
              to="/vendor/services"
              className="text-gray-700 hover:text-green-600 font-medium"
            >
              Services
            </Link>
            <Link
              to="/vendor/analytics"
              className="text-gray-700 hover:text-green-600 font-medium"
            >
              Analytics
            </Link>
          </div>

          {/* Vendor Menu */}
          <div className="flex items-center space-x-4">
            {/* Notification Bell */}
            <button className="relative p-2 text-gray-600 hover:text-green-600">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-5 5v-5zM10.5 3.75a6 6 0 010 11.25M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3"
                />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Vendor Avatar */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">D</span>
              </div>
              <span className="text-gray-700 font-medium">{vendor.name}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
