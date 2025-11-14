import React, { useEffect, useState } from "react";
import { acceptRequestAndCreateOrder } from "../../../utility/api";

const getShopId = () => localStorage.getItem("shopId") || "";

export default function NotificationTab() {
  const shopId = getShopId();
  const [notifications, setNotifications] = useState([]);

  const [filter, setFilter] = useState("all"); // all, pending, accepted, rejected
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Filter notifications based on status and search
  const filteredNotifications = notifications.filter((notification) => {
    const matchesStatus = filter === "all" || notification.status === filter;
    const matchesSearch =
      notification.customerName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      notification.requestType
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      notification.requestDetails
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  // Handle accept request
  const handleAcceptRequest = async (notificationId) => {
    setIsLoading(true);
    try {
      const { booking, order } = await acceptRequestAndCreateOrder(
        notificationId
      );

      // Update notification status in UI
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === booking._id || notif.id === booking.id
            ? { ...notif, status: "accepted" }
            : notif
        )
      );

      // Optionally, add newly created order to another orders list
      setOrders((prev) => [order, ...prev]);
    } catch (error) {
      alert("Failed to accept request. Try again!");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle reject request
  const handleRejectRequest = async (notificationId) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === notificationId ? { ...notif, status: "rejected" } : notif
        )
      );

      console.log(`Request ${notificationId} rejected`);
    } catch (error) {
      console.error("Failed to reject request:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
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

  // Get request statistics
  const getStats = () => {
    const total = notifications.length;
    const pending = notifications.filter((n) => n.status === "pending").length;
    const accepted = notifications.filter(
      (n) => n.status === "accepted"
    ).length;
    const rejected = notifications.filter(
      (n) => n.status === "rejected"
    ).length;

    return { total, pending, accepted, rejected };
  };

  const stats = getStats();

  // Fetch bookings for this shop
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const res = await fetch(
          `http://localhost:5000/api/servicebookings?shopId=${shopId}`
        );
        const data = await res.json();
        // Transform or map data if needed for your UI
        setNotifications(
          data.bookings.map((booking) => ({
            id: booking._id,
            customerName: booking.userName,
            customerPhone: booking.userMobile,
            requestType: booking.service,
            requestDetails: booking.extraItem || booking.additionalInfo || "",
            status: booking.status || "pending", // default/fallback
            timestamp: booking.createdAt || booking.created_at,
            documents:
              booking.documents && booking.documents.length
                ? booking.documents.map((doc) => doc.originalName || doc)
                : [],
          }))
        );
      } catch (err) {
        setNotifications([]);
      }
      setIsLoading(false);
    }
    if (shopId) fetchData();
  }, [shopId]);

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Customer Requests
          </h1>
          <p className="text-gray-600 mt-1">
            {stats.pending} pending requests • {stats.total} total requests
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-green-600 hover:text-green-700 font-medium">
            Mark All as Read
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Requests
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by customer name, request type..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Status
            </label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="all">All Requests</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Request Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow"
          >
            {/* Header with Status */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-start mb-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    notification.status
                  )}`}
                >
                  {notification.status.charAt(0).toUpperCase() +
                    notification.status.slice(1)}
                </span>
              </div>

              <h3 className="font-bold text-gray-900 text-lg mb-1">
                {notification.requestType}
              </h3>
              <p className="text-gray-600 text-sm">
                {notification.requestDetails}
              </p>
            </div>

            {/* Customer Information */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">
                    {notification.customerName.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {notification.customerName}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {notification.customerPhone}
                  </p>
                </div>
              </div>
              <p className="text-gray-500 text-sm">
                Requested {formatTime(notification.timestamp)}
              </p>
            </div>

            {/* Documents */}
            <div className="p-4 border-b border-gray-200">
              <h4 className="font-medium text-gray-900 text-sm mb-2">
                Required Documents:
              </h4>
              <div className="flex flex-wrap gap-1">
                {notification.documents.map((doc, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                  >
                    {doc}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-4">
              {notification.status === "Pending" ? (
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleAcceptRequest(notification.id)}
                    disabled={isLoading}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Processing..." : "Accept"}
                  </button>
                  <button
                    onClick={() => handleRejectRequest(notification.id)}
                    disabled={isLoading}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Processing..." : "Reject"}
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <span
                    className={`text-sm font-medium ${
                      notification.status === "accepted"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    Request {notification.status}
                  </span>
                  <p className="text-gray-500 text-xs mt-1">
                    {formatTime(notification.timestamp)}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredNotifications.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🔔</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {searchTerm || filter !== "all"
              ? "No matching requests"
              : "No requests yet"}
          </h3>
          <p className="text-gray-600">
            {searchTerm || filter !== "all"
              ? "Try adjusting your search or filters"
              : "Customer requests will appear here when they submit new service requests"}
          </p>
        </div>
      )}

      {/* Stats Summary */}
      {/* <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Request Summary
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
            <p className="text-gray-600 text-sm">Total Requests</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-xl">
            <p className="text-2xl font-bold text-yellow-600">
              {stats.pending}
            </p>
            <p className="text-gray-600 text-sm">Pending</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <p className="text-2xl font-bold text-green-600">
              {stats.accepted}
            </p>
            <p className="text-gray-600 text-sm">Accepted</p>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-xl">
            <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
            <p className="text-gray-600 text-sm">Rejected</p>
          </div>
        </div>
      </div> */}
    </div>
  );
}
