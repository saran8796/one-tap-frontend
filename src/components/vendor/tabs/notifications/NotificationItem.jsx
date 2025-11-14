import React from "react";
import StatusBadge from "../../common/StatusBadge";

const NotificationItem = ({
  notification,
  isUnread,
  isGlowing, // New prop for glowing effect
  onClick,
}) => {
  // Get notification icon based on type
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
  const getNotificationColor = (priority, isUnread) => {
    const colorClass = isUnread ? "border-l-4" : "border-l-2";

    switch (priority) {
      case "high":
        return `${colorClass} border-l-red-500`;
      case "medium":
        return `${colorClass} border-l-yellow-500`;
      case "low":
        return `${colorClass} border-l-green-500`;
      default:
        return `${colorClass} border-l-gray-400`;
    }
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      if (diffMins < 1) return "Just now";
      if (diffMins < 60) return `${diffMins} min ago`;
      if (diffHours < 24)
        return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
      return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    } catch (error) {
      return "Recently";
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

  // Get glowing effect class - only for the most recent notification
  const getGlowingEffect = (isGlowing) => {
    if (!isGlowing) return "";

    return `
      animate-pulse 
      shadow-lg 
      shadow-blue-500/50 
      ring-2 
      ring-blue-300 
      transform 
      transition-all 
      duration-1000 
      hover:scale-[1.02]
      bg-gradient-to-r from-blue-50 to-white
    `;
  };

  return (
    <div
      className={`
        p-4 
        border 
        border-gray-200 
        rounded-xl 
        hover:bg-gray-50 
        transition-all 
        duration-300 
        cursor-pointer 
        ${getNotificationColor(notification.priority, isUnread)}
        ${getGlowingEffect(isGlowing)}
        ${isUnread ? "bg-blue-50 border-blue-200" : ""}
      `}
      onClick={() => onClick(notification.id)}
    >
      <div className="flex items-start space-x-3">
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            isGlowing
              ? "bg-blue-200 animate-pulse"
              : isUnread
              ? "bg-blue-100"
              : "bg-gray-100"
          }`}
        >
          <span className="text-sm">
            {getNotificationIcon(notification.type)}
            {isGlowing && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
            )}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-gray-900 text-sm">
                {notification.customerName}
                {isGlowing && (
                  <span className="ml-2 text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">
                    NEWEST
                  </span>
                )}
              </h3>
              {isUnread && !isGlowing && (
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </div>
            <span className="text-xs text-gray-500">
              {formatTime(notification.timestamp)}
            </span>
          </div>
          <p className="text-gray-600 text-sm mb-1">
            {getNotificationMessage(notification)}
          </p>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">
              {notification.requestType}
            </span>
            <StatusBadge status={notification.status} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
