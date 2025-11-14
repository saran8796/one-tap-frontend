import React, { useState } from "react";

export default function VendorSidebar({
  vendor,
  activeTab,
  setActiveTab,
  calculateAverageRating,
  reviews,
}) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "orders", label: "Orders", icon: "📦" },
    { id: "services", label: "Services", icon: "🛠️" },
    {
      id: "notifications",
      label: "Notifications",
      icon: "🔔",
      notifications: 6,
    },
    { id: "reviews", label: "Reviews", icon: "⭐" },
    { id: "earnings", label: "Earnings", icon: "💰" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div
      className={`${
        isSidebarExpanded ? "lg:min-w-80" : "lg:min-w-25"
      } transition-all duration-500`}
    >
      <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8 h-[calc(100vh-4rem)] flex flex-col">
        {/* Expand/Collapse Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-6 bg-white border border-gray-200 rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow z-10"
        >
          <span className="text-gray-600 text-sm">
            {isSidebarExpanded ? "‹" : "›"}
          </span>
        </button>

        {/* Vendor Profile Summary */}
        <div className="text-center mb-8">
          {isSidebarExpanded ? (
            <>
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">D</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900">{vendor.name}</h2>
              <p className="text-gray-600 text-sm">{vendor.email}</p>
              <div className="flex items-center justify-center mt-2">
                <span className="text-yellow-400">⭐</span>
                <span className="text-gray-700 font-medium ml-1">
                  {calculateAverageRating()} ({reviews.length} reviews)
                </span>
              </div>
              <p className="text-gray-500 text-sm mt-2">
                Member since {vendor.joinedDate}
              </p>
            </>
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-white font-bold">D</span>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Menu with Scrollbar */}
        <nav
          className={`flex-1 overflow-y-auto space-y-2 ${
            isSidebarExpanded ? "pr-2" : ""
          }  scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100`}
        >
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center ${
                !isSidebarExpanded ? "justify-center" : ""
              } space-x-3 px-4 py-3 rounded-xl text-left transition-colors ${
                activeTab === item.id
                  ? "bg-green-50 text-green-600 border border-green-200"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {isSidebarExpanded && (
                <span className="font-medium">{item.label}</span>
              )}
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <button
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left text-red-600 hover:bg-red-50 mt-4 border border-red-200 ${
            !isSidebarExpanded ? "justify-center" : ""
          }`}
        >
          <span className="text-lg">🚪</span>
          {isSidebarExpanded && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
}
