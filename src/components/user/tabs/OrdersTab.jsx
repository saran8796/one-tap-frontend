import React, { useState } from "react";

export default function OrdersTab() {
  const [orders, setOrders] = useState([
    // {
    //   id: 1,
    //   orderId: "ORD001",
    //   serviceType: "PAN Card Update",
    //   serviceDescription:
    //     "Update PAN card details for new address verification",
    //   shopName: "DocAssist Services",
    //   shopLocation: "Chennai",
    //   orderDate: "2024-02-20T10:30:00",
    //   status: "completed", // pending, accepted, in-progress, completed, cancelled
    //   amount: "₹500",
    //   estimatedCompletion: "2024-02-25",
    //   completionDate: "2024-02-24T15:20:00",
    //   trackingId: "TRK001",
    //   documents: ["Aadhaar Card", "Current PAN", "Address Proof"],
    //   vendorNotes:
    //     "PAN card updated successfully and dispatched via registered post.",
    //   progress: 100,
    // },
    // {
    //   id: 2,
    //   orderId: "ORD002",
    //   serviceType: "Bulk Visiting Cards",
    //   serviceDescription: "Print 500 visiting cards with premium quality paper",
    //   shopName: "PrintPro Solutions",
    //   shopLocation: "Bangalore",
    //   orderDate: "2024-02-21T14:20:00",
    //   status: "in-progress",
    //   amount: "₹1,200",
    //   estimatedCompletion: "2024-02-26",
    //   completionDate: null,
    //   trackingId: "TRK002",
    //   documents: ["Design File", "Contact Details", "Company Logo"],
    //   vendorNotes: "Design approved. Printing in progress. 60% completed.",
    //   progress: 60,
    // },
    // {
    //   id: 3,
    //   orderId: "ORD003",
    //   serviceType: "Document Notarization",
    //   serviceDescription:
    //     "Notarize property documents for registration process",
    //   shopName: "LegalDocs Notary",
    //   shopLocation: "Mumbai",
    //   orderDate: "2024-02-22T09:15:00",
    //   status: "accepted",
    //   amount: "₹800",
    //   estimatedCompletion: "2024-02-28",
    //   completionDate: null,
    //   trackingId: "TRK003",
    //   documents: ["Property Deed", "ID Proof", "Witness Statements"],
    //   vendorNotes:
    //     "Documents received and under verification. Appointment scheduled.",
    //   progress: 20,
    // },
    // {
    //   id: 4,
    //   orderId: "ORD004",
    //   serviceType: "GST Registration",
    //   serviceDescription:
    //     "New GST registration for business startup with legal consultation",
    //   shopName: "TaxEasy Consultants",
    //   shopLocation: "Delhi",
    //   orderDate: "2024-02-22T16:45:00",
    //   status: "pending",
    //   amount: "₹2,500",
    //   estimatedCompletion: "2024-03-05",
    //   completionDate: null,
    //   trackingId: null,
    //   documents: ["PAN Card", "Aadhaar", "Business Proof", "Bank Statement"],
    //   vendorNotes:
    //     "Waiting for vendor confirmation. Usually responds within 24 hours.",
    //   progress: 10,
    // },
    // {
    //   id: 5,
    //   orderId: "ORD005",
    //   serviceType: "Passport Application",
    //   serviceDescription:
    //     "Fresh passport application with tatkal service and document verification",
    //   shopName: "Passport Seva Kendra",
    //   shopLocation: "Hyderabad",
    //   orderDate: "2024-02-19T11:30:00",
    //   status: "cancelled",
    //   amount: "₹3,000",
    //   estimatedCompletion: "2024-02-29",
    //   completionDate: null,
    //   trackingId: null,
    //   documents: [
    //     "Aadhaar Card",
    //     "Birth Certificate",
    //     "Address Proof",
    //     "Photos",
    //   ],
    //   vendorNotes: "Order cancelled by user before processing.",
    //   progress: 0,
    // },
    // {
    //   id: 6,
    //   orderId: "ORD006",
    //   serviceType: "Company Incorporation",
    //   serviceDescription:
    //     "Private limited company registration with all legal formalities",
    //   shopName: "BusinessCorp Services",
    //   shopLocation: "Pune",
    //   orderDate: "2024-02-18T13:20:00",
    //   status: "completed",
    //   amount: "₹15,000",
    //   estimatedCompletion: "2024-02-25",
    //   completionDate: "2024-02-23T11:15:00",
    //   trackingId: "TRK006",
    //   documents: ["Director PAN", "Address Proof", "MOA", "AOA"],
    //   vendorNotes:
    //     "Company successfully incorporated. CIN number generated and documents dispatched.",
    //   progress: 100,
    // },
    // {
    //   id: 7,
    //   orderId: "ORD007",
    //   serviceType: "Digital Signature Certificate",
    //   serviceDescription: "Class 3 DSC for tender filing and business purposes",
    //   shopName: "DSC Solutions",
    //   shopLocation: "Kolkata",
    //   orderDate: "2024-02-23T10:00:00",
    //   status: "in-progress",
    //   amount: "₹1,500",
    //   estimatedCompletion: "2024-02-27",
    //   completionDate: null,
    //   trackingId: "TRK007",
    //   documents: ["PAN Card", "Aadhaar Card", "Photo", "Application Form"],
    //   vendorNotes:
    //     "DSC application submitted to certifying authority. Under processing.",
    //   progress: 40,
    // },
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);

  // Sort orders by most recent first
  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
  );

  // Get status color and text
  const getStatusInfo = (status) => {
    switch (status) {
      case "pending":
        return { color: "bg-yellow-100 text-yellow-800", text: "Pending" };
      case "accepted":
        return { color: "bg-blue-100 text-blue-800", text: "Accepted" };
      case "in-progress":
        return { color: "bg-purple-100 text-purple-800", text: "In Progress" };
      case "completed":
        return { color: "bg-green-100 text-green-800", text: "Completed" };
      case "cancelled":
        return { color: "bg-red-100 text-red-800", text: "Cancelled" };
      default:
        return { color: "bg-gray-100 text-gray-800", text: "Unknown" };
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return "⏳";
      case "accepted":
        return "✅";
      case "in-progress":
        return "🔄";
      case "completed":
        return "🎉";
      case "cancelled":
        return "❌";
      default:
        return "📋";
    }
  };

  // Format date
  const formatDate = (timestamp) => {
    if (!timestamp) return "-";
    return new Date(timestamp).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Format date with time
  const formatDateTime = (timestamp) => {
    if (!timestamp) return "-";
    return new Date(timestamp).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6 p-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-600 mt-1">
            Track and manage your service orders
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
            New Service Request
          </button>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-700">
          <div className="col-span-3">Order Details</div>
          <div className="col-span-2">Vendor</div>
          <div className="col-span-2">Date & Amount</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-3">Progress</div>
        </div>

        {/* Orders List */}
        <div className="divide-y divide-gray-200">
          {sortedOrders.map((order) => {
            const statusInfo = getStatusInfo(order.status);
            return (
              <div
                key={order.id}
                className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => setSelectedOrder(order)}
              >
                {/* Order Details */}
                <div className="col-span-3">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {order.serviceType.charAt(0)}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-gray-900 truncate">
                        {order.serviceType}
                      </p>
                      <p className="text-gray-500 text-sm truncate">
                        {order.serviceDescription}
                      </p>
                      <p className="text-green-600 font-mono text-sm font-bold">
                        {order.orderId}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Vendor */}
                <div className="col-span-2">
                  <p className="font-medium text-gray-900">{order.shopName}</p>
                  <p className="text-gray-500 text-sm">{order.shopLocation}</p>
                </div>

                {/* Date & Amount */}
                <div className="col-span-2">
                  <p className="text-gray-900">{formatDate(order.orderDate)}</p>
                  <p className="text-green-600 font-bold">{order.amount}</p>
                </div>

                {/* Status */}
                <div className="col-span-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">
                      {getStatusIcon(order.status)}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}
                    >
                      {statusInfo.text}
                    </span>
                  </div>
                </div>

                {/* Progress */}
                <div className="col-span-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${order.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700 min-w-8">
                      {order.progress}%
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs mt-1">
                    Est: {formatDate(order.estimatedCompletion)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Order Details - {selectedOrder.orderId}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {selectedOrder.serviceType}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600 text-lg"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Order Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Service Type
                    </label>
                    <p className="text-gray-900 font-medium">
                      {selectedOrder.serviceType}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Service Description
                    </label>
                    <p className="text-gray-600">
                      {selectedOrder.serviceDescription}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Order Date
                    </label>
                    <p className="text-gray-900">
                      {formatDateTime(selectedOrder.orderDate)}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Vendor
                    </label>
                    <p className="text-gray-900 font-medium">
                      {selectedOrder.shopName}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {selectedOrder.shopLocation}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Amount
                    </label>
                    <p className="text-green-600 font-bold text-xl">
                      {selectedOrder.amount}
                    </p>
                  </div>
                  {selectedOrder.trackingId && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tracking ID
                      </label>
                      <p className="text-blue-600 font-mono font-bold">
                        {selectedOrder.trackingId}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Status and Progress */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Order Status
                    </label>
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">
                        {getStatusIcon(selectedOrder.status)}
                      </span>
                      <div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            getStatusInfo(selectedOrder.status).color
                          }`}
                        >
                          {getStatusInfo(selectedOrder.status).text}
                        </span>
                        <p className="text-gray-600 text-sm mt-1">
                          {selectedOrder.status === "completed" &&
                          selectedOrder.completionDate
                            ? `Completed on ${formatDate(
                                selectedOrder.completionDate
                              )}`
                            : selectedOrder.status === "in-progress"
                            ? `Estimated completion: ${formatDate(
                                selectedOrder.estimatedCompletion
                              )}`
                            : `Expected completion: ${formatDate(
                                selectedOrder.estimatedCompletion
                              )}`}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Progress
                    </label>
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-green-600 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${selectedOrder.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-700 min-w-12">
                        {selectedOrder.progress}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vendor Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vendor Notes & Updates
                </label>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <p className="text-gray-700">{selectedOrder.vendorNotes}</p>
                </div>
              </div>

              {/* Documents */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Required Documents
                </label>
                <div className="flex flex-wrap gap-2">
                  {selectedOrder.documents.map((doc, index) => (
                    <span
                      key={index}
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm border border-gray-200"
                    >
                      {doc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Order Timeline
                </label>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-600">Order Placed</span>
                    <span className="text-gray-900 font-medium">
                      {formatDateTime(selectedOrder.orderDate)}
                    </span>
                  </div>
                  {selectedOrder.estimatedCompletion && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">
                        Estimated Completion
                      </span>
                      <span className="text-gray-900 font-medium">
                        {formatDate(selectedOrder.estimatedCompletion)}
                      </span>
                    </div>
                  )}
                  {selectedOrder.completionDate && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Actual Completion</span>
                      <span className="text-gray-900 font-medium">
                        {formatDateTime(selectedOrder.completionDate)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
              >
                Close
              </button>
              {selectedOrder.status === "in-progress" && (
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
                  Contact Vendor
                </button>
              )}
              {selectedOrder.trackingId && (
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                  Track Order
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {sortedOrders.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">📦</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No orders yet
          </h3>
          <p className="text-gray-600 mb-4">
            Get started by placing your first service request
          </p>
          <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
            Browse Services
          </button>
        </div>
      )}
    </div>
  );
}
