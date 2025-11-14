import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TrackOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState(null);
  const [trackingData, setTrackingData] = useState(null);

  const handleTrack = (e) => {
    e.preventDefault();

    // Mock tracking data with detailed information including delivery agents
    const mockTrackingData = {
      ORD123: {
        status: "Order Placed",
        statusIcon: "📝",
        progress: 25,
        steps: [
          {
            stage: "Order Confirmed",
            completed: true,
            timestamp: "2024-01-15 10:30 AM",
            icon: "✅",
          },
          {
            stage: "Processing",
            completed: true,
            timestamp: "2024-01-15 11:45 AM",
            icon: "⚙️",
          },
          {
            stage: "Quality Check",
            completed: false,
            timestamp: "Expected: 2024-01-16",
            icon: "🔍",
          },
          {
            stage: "Dispatched",
            completed: false,
            timestamp: "Expected: 2024-01-17",
            icon: "🚚",
          },
          {
            stage: "Delivered",
            completed: false,
            timestamp: "Expected: 2024-01-18",
            icon: "📦",
          },
        ],
        customer: {
          name: "John Doe",
          phone: "+91 98765 43210",
          address: "123 Main Street, Chennai, Tamil Nadu - 600001",
        },
        service: "Documentation - Bulk Xerox & Print",
        estimatedDelivery: "2024-01-18",
        orderDate: "2024-01-15",
        deliveryAgent: null,
      },
      ORD456: {
        status: "In Transit",
        statusIcon: "🚚",
        progress: 60,
        steps: [
          {
            stage: "Order Confirmed",
            completed: true,
            timestamp: "2024-01-14 09:15 AM",
            icon: "✅",
          },
          {
            stage: "Processing",
            completed: true,
            timestamp: "2024-01-14 10:30 AM",
            icon: "⚙️",
          },
          {
            stage: "Quality Check",
            completed: true,
            timestamp: "2024-01-14 02:15 PM",
            icon: "✅",
          },
          {
            stage: "Dispatched",
            completed: true,
            timestamp: "2024-01-15 11:00 AM",
            icon: "🚚",
          },
          {
            stage: "Delivered",
            completed: false,
            timestamp: "Expected: 2024-01-16",
            icon: "📦",
          },
        ],
        customer: {
          name: "Sarah Wilson",
          phone: "+91 87654 32109",
          address: "456 Park Avenue, Coimbatore, Tamil Nadu - 641001",
        },
        service: "Government - Driving License",
        estimatedDelivery: "2024-01-16",
        orderDate: "2024-01-14",
        deliveryAgent: {
          name: "Raj Kumar",
          phone: "+91 91234 56789",
          vehicle: "TN 07 AB 1234",
          rating: "4.8 ★",
          photo: "👨‍💼",
          currentLocation: "Near Gandhipuram",
          eta: "30-45 mins",
          liveTracking: true,
        },
      },
      ORD789: {
        status: "Delivered",
        statusIcon: "✅",
        progress: 100,
        steps: [
          {
            stage: "Order Confirmed",
            completed: true,
            timestamp: "2024-01-12 03:20 PM",
            icon: "✅",
          },
          {
            stage: "Processing",
            completed: true,
            timestamp: "2024-01-12 04:45 PM",
            icon: "⚙️",
          },
          {
            stage: "Quality Check",
            completed: true,
            timestamp: "2024-01-13 10:30 AM",
            icon: "✅",
          },
          {
            stage: "Dispatched",
            completed: true,
            timestamp: "2024-01-13 02:15 PM",
            icon: "🚚",
          },
          {
            stage: "Delivered",
            completed: true,
            timestamp: "2024-01-14 11:30 AM",
            icon: "📦",
          },
        ],
        customer: {
          name: "Michael Raj",
          phone: "+91 76543 21098",
          address: "789 Gandhi Road, Madurai, Tamil Nadu - 625001",
        },
        service: "International - Passport Services",
        estimatedDelivery: "2024-01-14",
        orderDate: "2024-01-12",
        deliveryAgent: {
          name: "Suresh Babu",
          phone: "+91 92345 67890",
          vehicle: "TN 09 CD 5678",
          rating: "4.9 ★",
          photo: "👨‍💻",
          currentLocation: "Delivered",
          eta: "Delivered",
          liveTracking: false,
        },
      },
      ORD999: {
        status: "Out for Delivery",
        statusIcon: "🛵",
        progress: 80,
        steps: [
          {
            stage: "Order Confirmed",
            completed: true,
            timestamp: "2024-01-16 09:00 AM",
            icon: "✅",
          },
          {
            stage: "Processing",
            completed: true,
            timestamp: "2024-01-16 10:15 AM",
            icon: "⚙️",
          },
          {
            stage: "Quality Check",
            completed: true,
            timestamp: "2024-01-16 01:30 PM",
            icon: "✅",
          },
          {
            stage: "Dispatched",
            completed: true,
            timestamp: "2024-01-16 03:45 PM",
            icon: "🚚",
          },
          {
            stage: "Delivered",
            completed: false,
            timestamp: "Expected: Today",
            icon: "📦",
          },
        ],
        customer: {
          name: "Priya Sharma",
          phone: "+91 83456 78901",
          address: "321 Lake View Road, Ooty, Tamil Nadu - 643001",
        },
        service: "Healthcare - Health Insurance",
        estimatedDelivery: "2024-01-16",
        orderDate: "2024-01-16",
        deliveryAgent: {
          name: "Arun Patel",
          phone: "+91 94567 89012",
          vehicle: "TN 33 EF 9012",
          rating: "4.7 ★",
          photo: "👨‍🚀",
          currentLocation: "2 km away",
          eta: "15-20 mins",
          liveTracking: true,
        },
      },
    };

    const data = mockTrackingData[orderId];
    if (data) {
      setStatus(data.status);
      setTrackingData(data);
    } else {
      setStatus("Order not found");
      setTrackingData(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Order Placed":
        return "from-blue-500 to-blue-600";
      case "In Transit":
        return "from-cyan-500 to-blue-500";
      case "Out for Delivery":
        return "from-orange-500 to-amber-500";
      case "Delivered":
        return "from-green-500 to-emerald-500";
      default:
        return "from-gray-500 to-slate-500";
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case "Order Placed":
        return "bg-blue-500/10 border-blue-500/20";
      case "In Transit":
        return "bg-cyan-500/10 border-cyan-500/20";
      case "Out for Delivery":
        return "bg-orange-500/10 border-orange-500/20";
      case "Delivered":
        return "bg-green-500/10 border-green-500/20";
      default:
        return "bg-gray-500/10 border-gray-500/20";
    }
  };

  const handleCallAgent = (phone) => {
    window.open(`tel:${phone}`, "_self");
  };

  const handleMessageAgent = (phone) => {
    window.open(`https://wa.me/${phone.replace("+", "")}`, "_blank");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-900 px-3 sm:px-4 md:px-6 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-4xl mx-auto py-4 sm:py-8 md:py-10"
      >
        {/* Main Content Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl ring-1 ring-gray-300 transition-all duration-300 hover:shadow-xl hover:sm:shadow-2xl  overflow-hidden mx-2 sm:mx-0">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 sm:px-6 md:px-8 py-4 sm:py-6 text-white">
            <div className="text-center">
              <motion.h1
                className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Track Your Order
              </motion.h1>
              <motion.p
                className="text-blue-100 text-sm sm:text-base md:text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Enter your Order ID to track real-time status
              </motion.p>
            </div>
          </div>

          {/* Search Section */}
          <div className="p-4 sm:p-6 md:p-8">
            <form onSubmit={handleTrack} className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Enter Order ID (e.g., ORD123, ORD456...)"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value.toUpperCase())}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                  <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm sm:text-base">
                    🔍
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-white shadow-lg hover:shadow-blue-500/30 transition-all duration-300 whitespace-nowrap text-sm sm:text-base"
                >
                  Track Order
                </motion.button>
              </div>
            </form>

            <AnimatePresence>
              {status && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="mt-6 sm:mt-8 space-y-4 sm:space-y-6"
                >
                  {/* Status Card */}
                  <div
                    className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 ${getStatusBgColor(
                      status
                    )} backdrop-blur-sm`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 sm:mb-6">
                      <div className="mb-3 sm:mb-0">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                          Order #{orderId}
                        </h3>
                        <p className="text-gray-600 text-base sm:text-lg mt-1">
                          {trackingData?.service}
                        </p>
                      </div>
                      <div className="text-left sm:text-right">
                        <div
                          className={`text-xl sm:text-2xl font-bold bg-gradient-to-r ${getStatusColor(
                            status
                          )} bg-clip-text text-transparent`}
                        >
                          {status} {trackingData?.statusIcon}
                        </div>
                        <p className="text-gray-500 text-xs sm:text-sm mt-1">
                          Ordered on: {trackingData?.orderDate}
                        </p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4 sm:mb-6">
                      <div className="flex justify-between text-gray-600 text-sm sm:text-base mb-2">
                        <span className="font-medium">Progress</span>
                        <span className="font-semibold">
                          {trackingData?.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${trackingData?.progress}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`h-2 sm:h-3 rounded-full bg-gradient-to-r ${getStatusColor(
                            status
                          )} shadow-md`}
                        />
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="space-y-3 sm:space-y-4">
                      <h4 className="font-semibold text-gray-800 text-base sm:text-lg">
                        Order Timeline
                      </h4>
                      {trackingData?.steps.map((step, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start space-x-3 sm:space-x-4"
                        >
                          <div
                            className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-lg ${
                              step.completed
                                ? "bg-green-500 text-white shadow-lg"
                                : "bg-gray-100 text-gray-400 border border-gray-200"
                            }`}
                          >
                            {step.completed ? "✓" : step.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div
                              className={`font-semibold text-sm sm:text-base ${
                                step.completed
                                  ? "text-gray-900"
                                  : "text-gray-600"
                              } truncate`}
                            >
                              {step.stage}
                            </div>
                            <div className="text-gray-500 text-xs sm:text-sm">
                              {step.timestamp}
                            </div>
                          </div>
                          {step.completed && (
                            <div className="text-green-500 font-medium text-xs sm:text-sm flex items-center shrink-0">
                              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mr-1 sm:mr-2"></span>
                              Done
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Agent Section */}
                  {trackingData?.deliveryAgent && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 sm:mb-6">
                        <h4 className="font-semibold text-gray-800 text-base sm:text-lg flex items-center mb-2 sm:mb-0">
                          <span className="mr-2 text-xl sm:text-2xl">🚚</span>
                          Delivery Agent
                          {trackingData.deliveryAgent.liveTracking && (
                            <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full border border-green-200 font-medium">
                              Live
                            </span>
                          )}
                        </h4>
                        <div className="text-left sm:text-right">
                          <div className="text-cyan-600 font-bold text-lg sm:text-xl">
                            {trackingData.deliveryAgent.eta}
                          </div>
                          <div className="text-gray-600 text-xs sm:text-sm">
                            Estimated Arrival
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                        {/* Agent Profile */}
                        <div className="flex items-center space-x-3 sm:space-x-4">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-xl sm:text-2xl text-white shadow-lg">
                            {trackingData.deliveryAgent.photo}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-bold text-gray-900 text-base sm:text-lg truncate">
                              {trackingData.deliveryAgent.name}
                            </div>
                            <div className="text-amber-600 font-medium text-xs sm:text-sm">
                              {trackingData.deliveryAgent.rating}
                            </div>
                            <div className="text-gray-600 text-xs sm:text-sm truncate">
                              {trackingData.deliveryAgent.vehicle}
                            </div>
                          </div>
                        </div>

                        {/* Current Status */}
                        <div className="space-y-1 sm:space-y-2">
                          <div className="text-gray-600 text-xs sm:text-sm font-medium">
                            Current Location
                          </div>
                          <div className="font-semibold text-gray-900 text-sm sm:text-base flex items-center">
                            <span className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full mr-2 sm:mr-3 animate-pulse"></span>
                            <span className="truncate">
                              {trackingData.deliveryAgent.currentLocation}
                            </span>
                          </div>
                          {trackingData.deliveryAgent.liveTracking && (
                            <div className="text-cyan-600 text-xs sm:text-sm flex items-center font-medium">
                              <span className="mr-1">📍</span>
                              Live location updating
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-row sm:flex-col gap-2 sm:gap-3">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              handleCallAgent(trackingData.deliveryAgent.phone)
                            }
                            className="flex-1 sm:flex-none px-3 sm:px-4 py-2 sm:py-3 bg-green-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-green-500/30 transition-all duration-300 flex items-center justify-center space-x-2 text-xs sm:text-sm"
                          >
                            <span className="text-sm sm:text-lg">📞</span>
                            <span>Call Agent</span>
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              handleMessageAgent(
                                trackingData.deliveryAgent.phone
                              )
                            }
                            className="flex-1 sm:flex-none px-3 sm:px-4 py-2 sm:py-3 bg-blue-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-blue-500/30 transition-all duration-300 flex items-center justify-center space-x-2 text-xs sm:text-sm"
                          >
                            <span className="text-sm sm:text-lg">💬</span>
                            <span>Message</span>
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* No Agent Assigned Message */}
                  {status === "Order Placed" &&
                    !trackingData?.deliveryAgent && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-blue-50 border border-blue-200 text-center"
                      >
                        <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">
                          ⏳
                        </div>
                        <div className="text-blue-700 font-bold text-base sm:text-lg mb-1 sm:mb-2">
                          Delivery Agent Not Yet Assigned
                        </div>
                        <p className="text-blue-600 text-xs sm:text-sm">
                          Your order is being processed. A delivery agent will
                          be assigned soon and you'll be notified.
                        </p>
                      </motion.div>
                    )}

                  {/* Customer & Delivery Info */}
                  {trackingData && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                      {/* Customer Information */}
                      <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gray-50 border border-gray-200">
                        <h4 className="font-semibold text-gray-800 text-base sm:text-lg mb-3 sm:mb-4 flex items-center">
                          <span className="mr-2 text-lg sm:text-xl">👤</span>
                          Customer Information
                        </h4>
                        <div className="space-y-3 sm:space-y-4">
                          <div>
                            <div className="text-gray-600 text-xs sm:text-sm font-medium">
                              Name
                            </div>
                            <div className="text-gray-900 font-semibold text-sm sm:text-base">
                              {trackingData.customer.name}
                            </div>
                          </div>
                          <div>
                            <div className="text-gray-600 text-xs sm:text-sm font-medium">
                              Phone
                            </div>
                            <div className="text-gray-900 font-semibold text-sm sm:text-base">
                              {trackingData.customer.phone}
                            </div>
                          </div>
                          <div>
                            <div className="text-gray-600 text-xs sm:text-sm font-medium">
                              Address
                            </div>
                            <div className="text-gray-900 font-semibold text-xs sm:text-sm">
                              {trackingData.customer.address}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Delivery Information */}
                      <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gray-50 border border-gray-200">
                        <h4 className="font-semibold text-gray-800 text-base sm:text-lg mb-3 sm:mb-4 flex items-center">
                          <span className="mr-2 text-lg sm:text-xl">📅</span>
                          Delivery Information
                        </h4>
                        <div className="space-y-3 sm:space-y-4">
                          <div>
                            <div className="text-gray-600 text-xs sm:text-sm font-medium">
                              Service Type
                            </div>
                            <div className="text-gray-900 font-semibold text-sm sm:text-base">
                              {trackingData.service}
                            </div>
                          </div>
                          <div>
                            <div className="text-gray-600 text-xs sm:text-sm font-medium">
                              Order Date
                            </div>
                            <div className="text-gray-900 font-semibold text-xs sm:text-sm">
                              {trackingData.orderDate}
                            </div>
                          </div>
                          <div>
                            <div className="text-gray-600 text-xs sm:text-sm font-medium">
                              Estimated Delivery
                            </div>
                            <div className="text-gray-900 font-semibold text-xs sm:text-sm">
                              {trackingData.estimatedDelivery}
                            </div>
                          </div>
                          <div>
                            <div className="text-gray-600 text-xs sm:text-sm font-medium">
                              Current Status
                            </div>
                            <div
                              className={`font-bold text-sm sm:text-base ${
                                status === "Delivered"
                                  ? "text-green-600"
                                  : status === "Out for Delivery"
                                  ? "text-orange-600"
                                  : status === "In Transit"
                                  ? "text-cyan-600"
                                  : "text-blue-600"
                              }`}
                            >
                              {status} {trackingData.statusIcon}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Support Info */}
                  <div className="text-center p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100">
                    <p className="text-gray-600 text-xs sm:text-sm">
                      Need help? Contact our support team at{" "}
                      <span className="text-blue-600 font-semibold">
                        support@onetapservices.com
                      </span>{" "}
                      or call{" "}
                      <span className="text-blue-600 font-semibold">
                        +91 98765 43210
                      </span>
                    </p>
                  </div>
                </motion.div>
              )}

              {status === "Order not found" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 sm:mt-6 text-center p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-red-50 border border-red-200"
                >
                  <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">❌</div>
                  <div className="text-red-700 font-bold text-base sm:text-lg mb-1 sm:mb-2">
                    Order Not Found
                  </div>
                  <p className="text-red-600 text-xs sm:text-sm">
                    Please check your Order ID and try again. Valid IDs: ORD123,
                    ORD456, ORD789, ORD999
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TrackOrder;
