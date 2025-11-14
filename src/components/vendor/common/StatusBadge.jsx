import React from "react";

export default function StatusBadge({ status }) {
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
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
        status
      )}`}
    >
      {getStatusText(status)}
    </span>
  );
}
