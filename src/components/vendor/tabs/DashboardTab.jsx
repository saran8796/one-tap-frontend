import React, { useEffect, useState } from "react";
import StatsCard from "../common/StatsCard";
import StatusBadge from "../common/StatusBadge";

import { io } from "socket.io-client";
import NotificationsPanel from "./notifications/NotificationsPanel";
const socket = io("http://localhost:5000");

export default function DashboardTab({
  vendor,
  reviews,
  earnings,
  onRefresh,
  isLoading,
  onViewAllOrders,
  onViewAllReviews,
  onViewAllNotifications,
}) {
  const stats = [
    {
      label: "Total Earnings",
      value: "₹0",
      icon: "💰",
    },
    {
      label: "Active Orders",
      value: vendor.activeOrders,
      icon: "📦",
    },
    {
      label: "Completed Orders",
      value: vendor.completedOrders,
      icon: "✅",
    },
    {
      label: "Pending Requests",
      value: vendor.pendingRequests,
      icon: "⏳",
    },
  ];

  // Mock recent notifications data
  // const recentNotifications = [
  //   {
  //     id: 1,
  //     type: "new_request",
  //     customerName: "Rajesh Kumar",
  //     service: "Passport Application",
  //     timestamp: "2024-02-20T10:30:00",
  //     status: "pending",
  //     priority: "high",
  //   },
  //   {
  //     id: 2,
  //     type: "status_update",
  //     customerName: "Priya Sharma",
  //     service: "Color Printing",
  //     timestamp: "2024-02-20T09:15:00",
  //     status: "pending",
  //     priority: "medium",
  //   },
  //   {
  //     id: 3,
  //     type: "document_request",
  //     customerName: "Amit Patel",
  //     service: "GST Registration",
  //     timestamp: "2024-02-19T16:45:00",
  //     status: "pending",
  //     priority: "high",
  //   },
  // ];

  const getShopId = () => localStorage.getItem("shopId") || "";

  const shopId = getShopId();
  const [recentNotifications, setRecentNotifications] = useState([]);
  const [_isLoading, set_IsLoading] = useState(false);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    async function fetchRecentOrders() {
      if (!shopId) {
        setRecentOrders([]);
        return;
      }
      try {
        // Fetch all, then slice, or adjust the API to accept a limit param
        const res = await fetch(
          `http://localhost:5000/api/orders?shopId=${shopId}`
        );
        const data = await res.json();
        // Newest first by default, otherwise, sort by createdAt/date
        const sorted = (data.orders ?? []).sort(
          (a, b) =>
            new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt)
        );
        setRecentOrders(sorted.slice(0, 3)); // Just top 3
      } catch (err) {
        setRecentOrders([]);
      }
    }
    fetchRecentOrders();
  }, [shopId]);

  useEffect(() => {
    async function fetchData() {
      set_IsLoading(true);
      try {
        const res = await fetch(
          `http://localhost:5000/api/servicebookings?shopId=${shopId}`
        );
        const data = await res.json();
        // Transform or map data if needed for your UI
        setRecentNotifications(
          data.bookings.map((booking) => ({
            id: booking._id,
            customerName: booking.userName,
            customerPhone: booking.userMobile,
            requestType: booking.service,
            requestDetails: booking.extraItem || booking.additionalInfo || "",
            status: booking.status || "pending",
            timestamp: booking.createdAt || booking.created_at,
            documents:
              booking.documents && booking.documents.length
                ? booking.documents.map((doc) => doc.originalName || doc)
                : [],
            type: "new_request", // <-- ADD THIS
            priority: "medium", // <-- ADD THIS
          }))
        );
      } catch (err) {
        setRecentNotifications([]);
      }
      set_IsLoading(false);
    }
    if (shopId) fetchData();
  }, [shopId]);

  useEffect(() => {
    console.log("helo");
    
    if (!shopId) return; // Listen to the "new_service_request" event from the server

    socket.on("new_service_request", (data) => {
      // Check if event is for the current shop
      if (data.shopId === shopId) {
        // Optional: Play notification sound
        notificationSound.play(); // Create new notification object (same shape as your existing ones)

        const newNotification = {
          id: Date.now().toString(), // or other unique ID strategy
          customerName: data.userName,
          customerPhone: data.userMobile,
          requestType: data.service,
          requestDetails: "", // You can fill additional info as per your need
          status: "pending",
          timestamp: data.time,
          documents: [],
          type: "new_request",
          priority: "medium",
        }; // Prepend new notification

        setRecentNotifications((prev) =>
          [newNotification, ...prev].slice(0, 3)
        );
      }
    }); // Clean up on unmount

    return () => socket.off("new_service_request");
  }, [shopId]);

  const notificationSound = new Audio("/notification.wav");

  const getNotificationIcon = (type) => {
    switch (type) {
      case "new_request":
        return "🆕";
      case "status_update":
        return "🔄";
      case "document_request":
        return "📄";
      case "payment_received":
        return "💰";
      default:
        return "🔔";
    }
  };

  // Get notification color based on priority
  const getNotificationColor = (priority) => {
    switch (priority) {
      case "high":
        return "border-l-red-400";
      case "medium":
        return "border-l-yellow-400";
      case "low":
        return "border-l-green-400";
      default:
        return "border-l-gray-400";
    }
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins} min ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    } else {
      return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    }
  };

  // Get notification message based on type
  const getNotificationMessage = (notification) => {
    switch (notification.type) {
      case "new_request":
        return `New service request for ${notification.requestType}`;
      case "status_update":
        return `Order status updated to ${notification.status}`;
      case "document_request":
        return `Additional documents required for ${notification.requestType}`;
      case "payment_received":
        return `Payment received for ${notification.requestType}`;
      default:
        return `Notification for ${notification.requestType}`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Refresh Button */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Vendor Dashboard</h1>
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          <span>{isLoading ? "🔄" : "🔄"}</span>
          <span>{isLoading ? "Refreshing..." : "Refresh"}</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Recent Orders & Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
            <button
              onClick={onViewAllOrders}
              className="text-green-600 hover:text-green-700 font-medium"
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentOrders.length === 0 ? (
              <div className="text-gray-500 p-2">No recent orders</div>
            ) : (
              recentOrders.map((order) => (
                <div
                  key={order._id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() =>
                    console.log(`View order details: ${order._id}`)
                  }
                >
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {order.service}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {order.customerName}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Due:{" "}
                      {order.deadline
                        ? new Date(order.deadline).toLocaleString()
                        : "--"}
                    </p>
                  </div>
                  <div className="text-right">
                    <StatusBadge status={order.status} />
                    <p className="text-gray-900 font-semibold mt-1">
                      {order.amount}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Notifications */}
        {/* <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Request Notifications
            </h2>
            <button
              onClick={onViewAllNotifications}
              className="text-green-600 hover:text-green-700 font-medium"
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer border-l-4 ${getNotificationColor(
                  notification.priority
                )}`}
                onClick={() =>
                  console.log(`View notification: ${notification.id}`)
                }
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-sm">
                      {getNotificationIcon(notification.type)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 text-sm">
                        {notification.customerName}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {formatTime(notification.timestamp)}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-1">
                      {getNotificationMessage(notification)}
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">
                        {notification.service}
                      </span>
                      <StatusBadge status={notification.status} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        <NotificationsPanel
          shopId={getShopId()}
          onViewAllNotifications={onViewAllNotifications}
          onRefresh={onRefresh}
          limit={3}
        />
      </div>

      {/* Recent Reviews */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Recent Reviews</h2>
          <button
            onClick={onViewAllReviews}
            className="text-green-600 hover:text-green-700 font-medium"
          >
            View All
          </button>
        </div>
        <div className="space-y-4">
          {reviews.slice(0, 2).map((review) => (
            <div
              key={review.id}
              className="border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-gray-900">
                      {review.customerName}
                    </h3>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={
                            i < review.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }
                        >
                          ⭐
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{review.service}</p>
                  <p className="text-gray-700">{review.comment}</p>
                  <p className="text-gray-500 text-sm mt-2">{review.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      {/* <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-xl text-left hover:bg-green-50 hover:border-green-200 transition-colors">
            <div className="text-2xl mb-2">📦</div>
            <h3 className="font-semibold text-gray-900">Add New Service</h3>
            <p className="text-gray-600 text-sm">
              Create a new service offering
            </p>
          </button>
          <button className="p-4 border border-gray-200 rounded-xl text-left hover:bg-blue-50 hover:border-blue-200 transition-colors">
            <div className="text-2xl mb-2">📊</div>
            <h3 className="font-semibold text-gray-900">View Analytics</h3>
            <p className="text-gray-600 text-sm">
              Detailed performance reports
            </p>
          </button>
          <button className="p-4 border border-gray-200 rounded-xl text-left hover:bg-purple-50 hover:border-purple-200 transition-colors">
            <div className="text-2xl mb-2">👥</div>
            <h3 className="font-semibold text-gray-900">Manage Staff</h3>
            <p className="text-gray-600 text-sm">Team member access</p>
          </button>
        </div>
      </div> */}
    </div>
  );
}
