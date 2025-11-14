import React, { useState, useEffect, useMemo } from "react";
import StatusBadge from "../common/StatusBadge";

// Utility API functions (put in utils/api.js or inside this file if preferred)
const API_BASE = "http://localhost:5000/api";

const fetchOrders = async (shopId) => {
  const response = await fetch(`${API_BASE}/orders?shopId=${shopId}`);
  if (!response.ok) throw new Error("Failed to fetch orders");
  const { orders } = await response.json();
  return orders;
};

const fetchOrderDetails = async (orderId) => {
  const response = await fetch(`${API_BASE}/orders/${orderId}`);
  if (!response.ok) throw new Error("Failed to fetch order details");
  const { order } = await response.json();
  return order;
};

const updateOrderStatus = async (orderId, newStatus) => {
  const response = await fetch(`${API_BASE}/orders/${orderId}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: newStatus }),
  });
  if (!response.ok) throw new Error("Failed to update status");
  const { order } = await response.json();
  return order;
};

export default function OrdersTab({ shopId }) {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [updateStatus, setUpdateStatus] = useState("");

  // Fetch orders initially
  useEffect(() => {
    if (!shopId) return;
    setIsLoading(true);
    fetchOrders(shopId)
      .then(setOrders)
      .catch((e) => alert(e.message))
      .finally(() => setIsLoading(false));
  }, [shopId]);

  // Derived stats
  const orderStats = useMemo(() => {
    const total = orders.length;
    const completed = orders.filter((o) => o.status === "completed").length;
    const inProgress = orders.filter((o) => o.status === "in-progress").length;
    const pending = orders.filter((o) => o.status === "pending").length;
    const cancelled = orders.filter((o) => o.status === "cancelled").length;
    return { total, completed, inProgress, pending, cancelled };
  }, [orders]);

  // Search/Filter/Sort
  const filteredAndSortedOrders = useMemo(() => {
    let filtered = orders.filter((order) => {
      const matchesSearch =
        order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.service?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${order._id}`.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    // Sorting logic
    filtered.sort((a, b) => {
      let aValue, bValue;
      switch (sortBy) {
        case "date":
          aValue = new Date(a.date);
          bValue = new Date(b.date);
          break;
        case "amount":
          aValue = Number(a.amount);
          bValue = Number(b.amount);
          break;
        case "customer":
          aValue = a.customerName?.toLowerCase() || "";
          bValue = b.customerName?.toLowerCase() || "";
          break;
        case "deadline":
          aValue = new Date(a.deadline);
          bValue = new Date(b.deadline);
          break;
        default:
          aValue = a[sortBy];
          bValue = b[sortBy];
      }
      if (sortOrder === "asc") return aValue > bValue ? 1 : -1;
      else return bValue > aValue ? 1 : -1;
    });

    return filtered;
  }, [orders, searchTerm, statusFilter, sortBy, sortOrder]);

  // Modal handlers
  const openDetailsModal = async (order) => {
    setIsLoading(true);
    // Fetch latest details from backend
    const fullOrder = await fetchOrderDetails(order._id);
    setSelectedOrder(fullOrder);
    setIsDetailsModalOpen(true);
    setIsLoading(false);
  };

  const openUpdateModal = (order) => {
    setSelectedOrder(order);
    setUpdateStatus(order.status);
    setIsUpdateModalOpen(true);
  };

  const closeModals = () => {
    setIsDetailsModalOpen(false);
    setIsUpdateModalOpen(false);
    setSelectedOrder(null);
    setUpdateStatus("");
  };

  // Update status handler
  const handleStatusUpdate = async (e) => {
    e.preventDefault();
    if (
      !selectedOrder ||
      !updateStatus ||
      updateStatus === selectedOrder.status
    )
      return;
    setIsLoading(true);
    try {
      const updated = await updateOrderStatus(selectedOrder._id, updateStatus);
      setOrders((prev) =>
        prev.map((o) => (o._id === updated._id ? updated : o))
      );
      closeModals();
    } catch (err) {
      alert("Failed to update status: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Options for status transitions
  const getAvailableStatusOptions = (currentStatus) => {
    const statusFlow = {
      pending: ["in-progress", "cancelled"],
      "in-progress": ["completed", "cancelled"],
      completed: [],
      cancelled: ["pending"],
    };
    return statusFlow[currentStatus] || [];
  };

  // CSV Export logic
  const exportOrders = () => {
    const csvContent = [
      [
        "Order ID",
        "Customer",
        "Service",
        "Amount",
        "Status",
        "Date",
        "Deadline",
      ],
      ...filteredAndSortedOrders.map((order) => [
        order._id,
        order.customerName,
        order.service,
        order.amount,
        order.status,
        order.date,
        order.deadline,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `orders-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600 mt-1">
            {orderStats.total} total • {orderStats.completed} completed •{" "}
            {orderStats.inProgress} in progress
          </p>
        </div>
        <button
          onClick={exportOrders}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-medium transition-colors whitespace-nowrap"
        >
          Export Orders
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Orders
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by customer, service, or order ID..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="date">Date</option>
              <option value="customer">Customer</option>
              <option value="amount">Amount</option>
              <option value="deadline">Deadline</option>
            </select>
          </div>
        </div>
        {/* Sort Order Toggle */}
        <div className="flex items-center space-x-2 mt-4">
          <span className="text-sm text-gray-700">Order:</span>
          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="text-green-600 hover:text-green-700 font-medium text-sm"
          >
            {sortOrder === "asc" ? "↑ Ascending" : "↓ Descending"}
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deadline
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAndSortedOrders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="font-medium text-green-600 block">
                      {order._id}
                    </span>
                    <span className="text-gray-500 text-sm block">
                      {order.date ? new Date(order.date).toLocaleString() : ""}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">
                      {order.customerName}
                    </span>{" "}
                    <br />
                    <span className="text-gray-500 text-sm">
                      {order.customerPhone}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">
                      {order.service}
                    </span>{" "}
                    <br />
                    <span className="text-gray-500 text-sm">
                      {order.documents?.length || 0} document(s)
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {order.amount || "—"}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {order.deadline
                      ? new Date(order.deadline).toLocaleDateString()
                      : "--"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col space-y-2 min-w-[100px]">
                      <button
                        onClick={() => openUpdateModal(order)}
                        disabled={isLoading}
                        className="bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => openDetailsModal(order)}
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                      >
                        Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredAndSortedOrders.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📦</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {searchTerm || statusFilter !== "all"
                ? "No matching orders"
                : "No orders yet"}
            </h3>
            <p className="text-gray-600">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filters"
                : "Orders will appear here once customers start booking your services"}
            </p>
          </div>
        )}
      </div>

      {/* Update Status Modal */}
      {isUpdateModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Update Order Status
              </h2>
              <div className="mb-6">
                <p className="text-gray-600 mb-2">
                  <strong>Order:</strong> {selectedOrder._id}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Customer:</strong> {selectedOrder.customerName}
                </p>
                <p className="text-gray-600">
                  <strong>Service:</strong> {selectedOrder.service}
                </p>
              </div>
              <form onSubmit={handleStatusUpdate}>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Update Status
                  </label>
                  <select
                    value={updateStatus}
                    onChange={(e) => setUpdateStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  >
                    <option value="">Select status...</option>
                    <option value={selectedOrder.status}>
                      Current: {selectedOrder.status}
                    </option>
                    {getAvailableStatusOptions(selectedOrder.status).map(
                      (status) => (
                        <option key={status} value={status}>
                          {status.charAt(0).toUpperCase() +
                            status.slice(1).replace("-", " ")}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={closeModals}
                    className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={
                      isLoading ||
                      !updateStatus ||
                      updateStatus === selectedOrder.status
                    }
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isLoading ? "Updating..." : "Update Status"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {isDetailsModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Order Details
                  </h2>
                  <p className="text-gray-600 mt-1">{selectedOrder._id}</p>
                </div>
                <button
                  onClick={closeModals}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Order Information */}
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Customer Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Customer Name
                        </label>
                        <p className="text-gray-900 font-medium">
                          {selectedOrder.customerName}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <p className="text-gray-900 font-medium">
                          {selectedOrder.customerPhone}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <p className="text-gray-900 font-medium">
                          {selectedOrder.customerEmail || "Not provided"}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Order Date
                        </label>
                        <p className="text-gray-900 font-medium">
                          {selectedOrder.date
                            ? new Date(selectedOrder.date).toLocaleString()
                            : ""}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Service Details
                    </h3>
                    <p className="font-medium text-gray-800 mb-2">
                      {selectedOrder.service}
                    </p>
                    <p className="text-gray-700">
                      {selectedOrder.serviceDescription || "—"}
                    </p>
                    <p className="text-gray-700 bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-2">
                      {selectedOrder.notes || "No special instructions"}
                    </p>
                  </div>
                </div>
                {/* Documents and Summary */}
                <div className="space-y-6">
                  <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Order Summary
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Amount:</span>
                        <span className="font-semibold text-gray-900">
                          {selectedOrder.amount || "—"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <StatusBadge status={selectedOrder.status} />
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Deadline:</span>
                        <span className="font-semibold text-gray-900">
                          {selectedOrder.deadline
                            ? new Date(
                                selectedOrder.deadline
                              ).toLocaleDateString()
                            : "--"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Uploaded Documents
                    </h3>
                    <div className="space-y-3">
                      {(selectedOrder.documents ?? []).map((doc, idx) => (
                        <div
                          key={doc._id || idx}
                          className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <span className="text-blue-600 text-sm">📄</span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 text-sm">
                                {doc.originalName || doc.name}
                              </p>
                              <p className="text-gray-500 text-xs">
                                {doc.type}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Close Button */}
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={closeModals}
                      className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
