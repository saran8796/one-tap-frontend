import React, { useState, useEffect } from "react";

export default function NotificationsTab() {
  const [notifications, setNotifications] = useState([]);
  const [hoveredNotification, setHoveredNotification] = useState(null);

  // Initialize notifications from localStorage or use default data
  useEffect(() => {
    localStorage.clear();
    const savedNotifications = localStorage.getItem("userNotifications");
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
      console.log(savedNotifications);
    } else {
      const initialNotifications = [
        // {
        //   id: 1,
        //   type: "service_request",
        //   title: "PAN Card Update Request",
        //   message:
        //     "Your PAN card update request has been submitted to DocAssist Services",
        //   timestamp: "2024-02-20T10:30:00",
        //   isRead: false,
        //   status: "accepted",
        //   serviceDetails: {
        //     requestType: "PAN Card Update",
        //     requestDetails: "Update PAN card details for new address",
        //     shopName: "DocAssist Services",
        //     shopAddress: "123 Business Street, Chennai",
        //     shopPhone: "+91 98765 43210",
        //     documents: ["Aadhaar Card", "Current PAN", "Address Proof"],
        //     submittedDate: "2024-02-20T10:30:00",
        //     responseDate: "2024-02-20T11:45:00",
        //     trackingId: "ORD001",
        //     estimatedCompletion: "2024-02-25",
        //     serviceFee: "₹500",
        //     vendorMessage:
        //       "Your PAN card update request has been accepted. Documents are under verification.",
        //   },
        // },
        // {
        //   id: 2,
        //   type: "service_request",
        //   title: "Bulk Printing Request",
        //   message:
        //     "Your bulk printing request was declined by PrintPro Solutions",
        //   timestamp: "2024-02-20T09:15:00",
        //   isRead: false,
        //   status: "rejected",
        //   serviceDetails: {
        //     requestType: "Bulk Printing",
        //     requestDetails: "Print 500 visiting cards with new design",
        //     shopName: "PrintPro Solutions",
        //     shopAddress: "456 Print Lane, Bangalore",
        //     shopPhone: "+91 98765 43211",
        //     documents: ["Design File", "Contact Details"],
        //     submittedDate: "2024-02-20T09:15:00",
        //     responseDate: "2024-02-20T14:20:00",
        //     trackingId: null,
        //     rejectionReason:
        //       "Design file resolution is too low for quality printing",
        //     vendorMessage:
        //       "Unfortunately, your printing request could not be processed due to design quality issues.",
        //   },
        // },
        // {
        //   id: 3,
        //   type: "service_request",
        //   title: "Document Notarization",
        //   message:
        //     "Your document notarization is in progress at LegalDocs Notary",
        //   timestamp: "2024-02-19T16:45:00",
        //   isRead: false,
        //   status: "in-progress",
        //   serviceDetails: {
        //     requestType: "Document Notarization",
        //     requestDetails: "Notarize property documents for registration",
        //     shopName: "LegalDocs Notary",
        //     shopAddress: "789 Legal Avenue, Mumbai",
        //     shopPhone: "+91 98765 43212",
        //     documents: ["Property Deed", "ID Proof", "Witness Statements"],
        //     submittedDate: "2024-02-19T16:45:00",
        //     responseDate: "2024-02-20T10:15:00",
        //     trackingId: "ORD002",
        //     estimatedCompletion: "2024-02-22",
        //     serviceFee: "₹1,200",
        //     progress: 60,
        //     vendorMessage:
        //       "Your document notarization is scheduled. Please visit our office with original documents.",
        //   },
        // },
        // {
        //   id: 4,
        //   type: "service_request",
        //   title: "GST Registration",
        //   message: "Your GST registration request is under review",
        //   timestamp: "2024-02-19T14:20:00",
        //   isRead: false,
        //   status: "pending",
        //   serviceDetails: {
        //     requestType: "GST Registration",
        //     requestDetails: "New GST registration for business startup",
        //     shopName: "TaxEasy Consultants",
        //     shopAddress: "321 Tax Street, Delhi",
        //     shopPhone: "+91 98765 43213",
        //     documents: [
        //       "PAN Card",
        //       "Aadhaar",
        //       "Business Proof",
        //       "Bank Statement",
        //     ],
        //     submittedDate: "2024-02-19T14:20:00",
        //     responseDate: null,
        //     trackingId: null,
        //     vendorMessage:
        //       "Your GST registration request is under review by our team.",
        //   },
        // },
        // {
        //   id: 5,
        //   type: "service_update",
        //   title: "Service Completed",
        //   message: "Your passport application has been completed successfully",
        //   timestamp: "2024-02-20T16:45:00",
        //   isRead: false,
        //   status: "completed",
        //   serviceDetails: {
        //     requestType: "Passport Application",
        //     requestDetails: "Fresh passport application with tatkal service",
        //     shopName: "Passport Seva Kendra",
        //     shopAddress: "555 Passport Road, Hyderabad",
        //     shopPhone: "+91 98765 43214",
        //     documents: ["Aadhaar Card", "Birth Certificate", "Address Proof"],
        //     submittedDate: "2024-02-19T11:00:00",
        //     responseDate: "2024-02-19T15:30:00",
        //     completionDate: "2024-02-20T16:45:00",
        //     trackingId: "ORD003",
        //     serviceFee: "₹2,500",
        //     vendorMessage:
        //       "Passport application processed successfully! Your passport will be delivered soon.",
        //   },
        // },
        // {
        //   id: 6,
        //   type: "promotional",
        //   title: "Special Offer",
        //   message: "Get 20% off on all document services this week!",
        //   timestamp: "2024-02-18T10:00:00",
        //   isRead: false,
        //   status: null,
        // },
        // {
        //   id: 7,
        //   type: "system",
        //   title: "Welcome to DocAssist",
        //   message: "Thank you for registering with our service platform",
        //   timestamp: "2024-02-17T09:00:00",
        //   isRead: false,
        //   status: null,
        // },
      ];
      setNotifications(initialNotifications);
      localStorage.setItem(
        "userNotifications",
        JSON.stringify(initialNotifications)
      );
    }
  }, []);

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("userNotifications", JSON.stringify(notifications));
  }, [notifications]);

  const [selectedNotification, setSelectedNotification] = useState(null);

  // Mark notification as read
  const markAsRead = (notificationId) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === notificationId ? { ...notif, isRead: true } : notif
      )
    );
  };

  // Mark all as read and clear read notifications
  const markAllAsRead = () => {
    // First mark all as read
    const updatedNotifications = notifications.map((notif) => ({
      ...notif,
      isRead: true,
    }));
    setNotifications(updatedNotifications);

    // After a short delay, remove all read notifications
    setTimeout(() => {
      setNotifications([]);
      localStorage.removeItem("userNotifications");
    }, 1000);
  };

  // Clear individual notification when marked as read
  const clearNotification = (notificationId) => {
    setNotifications((prev) =>
      prev.filter((notif) => notif.id !== notificationId)
    );
  };

  // Quick action - mark as read without opening modal
  const handleQuickRead = (notificationId, e) => {
    e.stopPropagation();
    markAsRead(notificationId);
    setTimeout(() => {
      clearNotification(notificationId);
    }, 500);
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "accepted":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "in-progress":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return "⏳";
      case "accepted":
        return "✅";
      case "rejected":
        return "❌";
      case "in-progress":
        return "🔄";
      case "completed":
        return "🎉";
      default:
        return "📋";
    }
  };

  // Get notification icon
  const getNotificationIcon = (type) => {
    switch (type) {
      case "service_request":
        return "📋";
      case "service_update":
        return "🔔";
      case "promotional":
        return "🎁";
      case "system":
        return "⚙️";
      default:
        return "📢";
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

  // Format date for display
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get unread notifications count
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="space-y-6 p-10">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600 mt-1">
            {unreadCount} unread notifications
          </p>
        </div>
        <div className="flex items-center space-x-4">
          {notifications.length > 0 && (
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Clear All Notifications
            </button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-2xl shadow-sm border-2 transition-all duration-300 cursor-pointer
                ${
                  !notification.isRead
                    ? "border-l-4 border-l-green-500 shadow-md"
                    : "border-gray-100"
                }
                ${
                  hoveredNotification === notification.id
                    ? "transform -translate-y-1 shadow-xl border-green-200 scale-[1.02]"
                    : "hover:shadow-lg hover:border-green-100"
                }`}
              onMouseEnter={() => setHoveredNotification(notification.id)}
              onMouseLeave={() => setHoveredNotification(null)}
              onClick={() => {
                setSelectedNotification(notification);
                if (!notification.isRead) {
                  markAsRead(notification.id);
                  // Clear the notification after 2 seconds if it's read
                  setTimeout(() => {
                    clearNotification(notification.id);
                  }, 2000);
                }
              }}
            >
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  {/* Notification Icon with Hover Effect */}
                  <div className="flex-shrink-0">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        hoveredNotification === notification.id
                          ? "bg-green-100 transform scale-110"
                          : "bg-gray-100"
                      }`}
                    >
                      <span
                        className={`text-xl transition-all duration-300 ${
                          hoveredNotification === notification.id
                            ? "transform scale-125"
                            : ""
                        }`}
                      >
                        {getNotificationIcon(notification.type)}
                      </span>
                    </div>
                  </div>

                  {/* Notification Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3
                          className={`font-semibold text-lg mb-1 transition-colors duration-200 ${
                            !notification.isRead
                              ? "text-gray-900"
                              : "text-gray-700"
                          } ${
                            hoveredNotification === notification.id
                              ? "text-green-700"
                              : ""
                          }`}
                        >
                          {notification.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {notification.message}
                        </p>
                      </div>

                      <div className="flex items-center space-x-3 ml-4">
                        {notification.status && (
                          <span
                            className={`px-3 py-1.5 rounded-full text-sm font-medium border ${getStatusColor(
                              notification.status
                            )} transition-all duration-200 ${
                              hoveredNotification === notification.id
                                ? "transform scale-105 shadow-sm"
                                : ""
                            }`}
                          >
                            <span className="flex items-center space-x-1.5">
                              <span>{getStatusIcon(notification.status)}</span>
                              <span>
                                {notification.status.charAt(0).toUpperCase() +
                                  notification.status.slice(1)}
                              </span>
                            </span>
                          </span>
                        )}
                        <span className="text-gray-500 text-sm whitespace-nowrap bg-gray-50 px-2 py-1 rounded-lg">
                          {formatTime(notification.timestamp)}
                        </span>
                      </div>
                    </div>

                    {/* Service Details Preview */}
                    {notification.serviceDetails && (
                      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mt-3 transition-all duration-200 hover:bg-gray-100">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className="font-medium text-gray-900">
                              {notification.serviceDetails.requestType}
                            </span>
                            <p className="text-gray-600 text-sm mt-1">
                              {notification.serviceDetails.shopName}
                            </p>
                          </div>
                          {notification.serviceDetails.trackingId && (
                            <span className="px-3 py-1.5 bg-green-100 text-green-800 rounded-lg text-sm font-mono font-bold border border-green-200">
                              {notification.serviceDetails.trackingId}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm">
                          {notification.serviceDetails.requestDetails}
                        </p>
                      </div>
                    )}

                    {/* Quick Actions */}
                    <div
                      className={`flex items-center justify-between mt-4 pt-3 border-t border-gray-100 transition-all duration-200 ${
                        hoveredNotification === notification.id
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    >
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>Click to view details</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => handleQuickRead(notification.id, e)}
                          className="px-3 py-1.5 text-xs bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 font-medium"
                        >
                          Mark as Read
                        </button>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border-2 border-dashed border-gray-200">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔔</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              No notifications
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              You're all caught up! New notifications will appear here when you
              have service updates or messages.
            </p>
          </div>
        )}
      </div>

      {/* Notification Detail Modal */}
      {selectedNotification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">
                    {getNotificationIcon(selectedNotification.type)}
                  </span>
                  <h2 className="text-xl font-bold text-gray-900">
                    {selectedNotification.title}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedNotification(null)}
                  className="text-gray-400 hover:text-gray-600 text-lg transition-colors duration-200"
                >
                  ✕
                </button>
              </div>
              <p className="text-gray-600 mt-2">
                {formatDate(selectedNotification.timestamp)}
              </p>
            </div>

            <div className="p-6 space-y-6">
              {/* Message */}
              <div>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {selectedNotification.message}
                </p>
              </div>

              {/* Service Details */}
              {selectedNotification.serviceDetails && (
                <div className="space-y-6">
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Service Request Details
                    </h3>

                    {/* Status and Tracking */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Status
                        </label>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl">
                            {getStatusIcon(selectedNotification.status)}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                              selectedNotification.status
                            )}`}
                          >
                            {selectedNotification.status
                              .charAt(0)
                              .toUpperCase() +
                              selectedNotification.status.slice(1)}
                          </span>
                        </div>
                      </div>
                      {selectedNotification.serviceDetails.trackingId && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Order ID
                          </label>
                          <p className="text-green-600 font-mono font-bold text-lg">
                            {selectedNotification.serviceDetails.trackingId}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Shop Information */}
                    <div className="bg-blue-50 rounded-lg p-4 mb-4 border border-blue-200">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Service Provider
                      </h4>
                      <p className="text-gray-900 font-medium">
                        {selectedNotification.serviceDetails.shopName}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {selectedNotification.serviceDetails.shopAddress}
                      </p>
                      <p className="text-gray-600 text-sm">
                        Phone: {selectedNotification.serviceDetails.shopPhone}
                      </p>
                    </div>

                    {/* Request Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Service Type
                        </label>
                        <p className="text-gray-900">
                          {selectedNotification.serviceDetails.requestType}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Submitted On
                        </label>
                        <p className="text-gray-900">
                          {formatDate(
                            selectedNotification.serviceDetails.submittedDate
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Request Description */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Request Details
                      </label>
                      <p className="text-gray-900">
                        {selectedNotification.serviceDetails.requestDetails}
                      </p>
                    </div>

                    {/* Vendor Message */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Vendor Message
                      </label>
                      <p className="text-gray-700">
                        {selectedNotification.serviceDetails.vendorMessage}
                      </p>
                    </div>

                    {/* Additional Information */}
                    {(selectedNotification.serviceDetails.estimatedCompletion ||
                      selectedNotification.serviceDetails.serviceFee) && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {selectedNotification.serviceDetails
                          .estimatedCompletion && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Estimated Completion
                            </label>
                            <p className="text-gray-900">
                              {formatDate(
                                selectedNotification.serviceDetails
                                  .estimatedCompletion
                              )}
                            </p>
                          </div>
                        )}
                        {selectedNotification.serviceDetails.serviceFee && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Service Fee
                            </label>
                            <p className="text-green-600 font-bold text-lg">
                              {selectedNotification.serviceDetails.serviceFee}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Progress Bar */}
                    {selectedNotification.status === "in-progress" &&
                      selectedNotification.serviceDetails.progress && (
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Progress
                          </label>
                          <div className="flex items-center space-x-3">
                            <div className="flex-1 bg-gray-200 rounded-full h-3">
                              <div
                                className="bg-green-600 h-3 rounded-full transition-all duration-300"
                                style={{
                                  width: `${selectedNotification.serviceDetails.progress}%`,
                                }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-700">
                              {selectedNotification.serviceDetails.progress}%
                            </span>
                          </div>
                        </div>
                      )}

                    {/* Rejection Reason */}
                    {selectedNotification.status === "rejected" &&
                      selectedNotification.serviceDetails.rejectionReason && (
                        <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                          <label className="block text-sm font-medium text-red-700 mb-2">
                            Rejection Reason
                          </label>
                          <p className="text-red-700">
                            {
                              selectedNotification.serviceDetails
                                .rejectionReason
                            }
                          </p>
                        </div>
                      )}

                    {/* Documents */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Required Documents
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {selectedNotification.serviceDetails.documents.map(
                          (doc, index) => (
                            <span
                              key={index}
                              className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm border border-gray-200"
                            >
                              {doc}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setSelectedNotification(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
              >
                Close
              </button>
              {selectedNotification.serviceDetails?.trackingId && (
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors duration-200">
                  Track Order
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
