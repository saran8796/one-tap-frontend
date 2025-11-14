import React from "react";

const DashboardTab = ({ user, orders }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in-progress":
        return "In Progress";
      case "pending":
        return "Pending";
      case "cancelled":
        return "Cancelled";
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">
        Welcome back, {user.name}!
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Total Orders",
            value: user.totalOrders,
            color: "blue",
            icon: "📦",
          },
          {
            label: "Completed",
            value: user.completedOrders,
            color: "green",
            icon: "✅",
          },
          {
            label: "Pending",
            value: user.pendingOrders,
            color: "yellow",
            icon: "⏳",
          },
          {
            label: "Cancelled",
            value: user.cancelledOrders,
            color: "red",
            icon: "❌",
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <span className="text-2xl">{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
          <button className="text-blue-600 hover:text-blue-700 font-medium">
            View All
          </button>
        </div>
        <div className="space-y-4">
          {orders.slice(0, 3).map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-xl"
            >
              <div>
                <h3 className="font-semibold text-gray-900">{order.service}</h3>
                <p className="text-gray-600 text-sm">{order.shopName}</p>
                <p className="text-gray-500 text-sm">{order.date}</p>
              </div>
              <div className="text-right">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    order.status
                  )}`}
                >
                  {getStatusText(order.status)}
                </span>
                <p className="text-gray-900 font-semibold mt-1">
                  {order.amount}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;
