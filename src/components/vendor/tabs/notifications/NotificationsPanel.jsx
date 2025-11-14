import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import NotificationItem from "./NotificationItem";
import { NotificationSound } from "../../../../utility/NotificationSound";

const socket = io("http://localhost:5000");

const NotificationsPanel = ({
  shopId,
  onViewAllNotifications,
  onRefresh,
  limit = 3,
}) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(new Set());
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mostRecentNotificationId, setMostRecentNotificationId] =
    useState(null);

  const soundManager = useRef(null);

  // Initialize sound manager
  useEffect(() => {
    soundManager.current = new NotificationSound();

    return () => {
      if (soundManager.current) {
        soundManager.current.destroy();
      }
    };
  }, []);

  // Fetch initial notifications
  useEffect(() => {
    async function fetchNotifications() {
      if (!shopId) return;

      setIsLoading(true);
      try {
        const res = await fetch(
          `http://localhost:5000/api/servicebookings?shopId=${shopId}`
        );
        const data = await res.json();

        const fetchedNotifications = data.bookings
          .filter((booking) => booking.status !== "accepted")
          .map((booking) => ({
            id: booking._id,
            customerName: booking.userName,
            customerPhone: booking.userMobile,
            requestType: booking.service,
            requestDetails: booking.extraItem || booking.additionalInfo || "",
            status: booking.status || "pending",
            timestamp: booking.createdAt || booking.created_at,
            documents: booking.documents || [],
            type: "new_request",
            priority: "medium",
          }));

        // Sort by timestamp (newest first) and limit
        const sortedNotifications = fetchedNotifications.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        const limitedNotifications = sortedNotifications.slice(0, limit);

        setNotifications(limitedNotifications);

        // Mark all as unread initially and set the most recent one
        const unreadIds = new Set(
          limitedNotifications.map((notif) => notif.id)
        );
        setUnreadNotifications(unreadIds);

        // Set the most recent notification for glowing effect
        if (limitedNotifications.length > 0) {
          setMostRecentNotificationId(limitedNotifications[0].id);
        }
      } catch (err) {
        console.error("Error fetching notifications:", err);
        setNotifications([]);
        setUnreadNotifications(new Set());
        setMostRecentNotificationId(null);
      }
      setIsLoading(false);
    }

    fetchNotifications();
  }, [shopId, limit]);

  // Handle new notifications from socket
  useEffect(() => {
    const handleNewServiceRequest = (data) => {
      console.log("⚡ New notification received:", data);

      const newNotification = {
        id: data._id || `new-${Date.now()}`,
        customerName: data.userName || "New Customer",
        customerPhone: data.userMobile || "",
        requestType: data.service || "New Service",
        requestDetails: data.extraItem || data.additionalInfo || "",
        status: data.status || "pending",
        timestamp: data.createdAt || new Date().toISOString(),
        documents: data.documents || [],
        type: "new_request",
        priority: "high",
      };

      // ✅ Only add to notifications if NOT accepted
      if (newNotification.status !== "accepted") {
        setMostRecentNotificationId(newNotification.id);

        setUnreadNotifications((prev) => {
          const newUnread = new Set(prev);
          newUnread.add(newNotification.id);
          return newUnread;
        });

        setNotifications((prev) => [newNotification, ...prev].slice(0, limit));

        // Start notification sound if needed
        if (soundManager.current) {
          soundManager.current.playLoop();
          setIsSoundPlaying(true);
        }

        if (onRefresh) onRefresh();
      }
    };

    socket.on("new_service_request", handleNewServiceRequest);

    return () => {
      socket.off("new_service_request", handleNewServiceRequest);
    };
  }, [limit, onRefresh]);

  const handleNotificationClick = (notificationId) => {
    // Mark notification as read
    setUnreadNotifications((prev) => {
      const newUnread = new Set(prev);
      newUnread.delete(notificationId);

      // Stop sound if no more unread notifications
      if (newUnread.size === 0 && soundManager.current) {
        soundManager.current.stop();
        setIsSoundPlaying(false);
      }

      return newUnread;
    });

    // If the clicked notification was the most recent glowing one,
    // remove the glow effect by clearing the most recent ID
    if (notificationId === mostRecentNotificationId) {
      setMostRecentNotificationId(null);
    }

    console.log(`View notification: ${notificationId}`);
  };

  const handleStopSound = () => {
    if (soundManager.current) {
      soundManager.current.stop();
      setIsSoundPlaying(false);
    }
  };

  // Check if we should play sound (when there are unread notifications)
  useEffect(() => {
    if (
      unreadNotifications.size > 0 &&
      soundManager.current &&
      !isSoundPlaying
    ) {
      soundManager.current.playLoop();
      setIsSoundPlaying(true);
    }
  }, [unreadNotifications.size, isSoundPlaying]);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Request Notifications
        </h2>
        <div className="flex items-center space-x-3">
          {/* Sound Indicator */}
          {/* {isSoundPlaying && (
            <div className="flex items-center space-x-2 bg-red-50 border border-red-200 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
              <span className="animate-pulse">🔊</span>
              <span>New!</span>
              <button
                onClick={handleStopSound}
                className="ml-1 bg-red-500 hover:bg-red-600 text-white px-2 py-0.5 rounded text-xs transition-colors"
              >
                Stop
              </button>
            </div>
          )} */}

          {/* Unread Counter */}
          {unreadNotifications.size > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-bounce">
              {unreadNotifications.size} new
            </span>
          )}

          <button
            onClick={onViewAllNotifications}
            className="text-green-600 hover:text-green-700 font-medium"
          >
            View All
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          // Loading skeleton
          Array.from({ length: limit }).map((_, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-xl animate-pulse"
            >
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))
        ) : notifications.length > 0 ? (
          notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              isUnread={unreadNotifications.has(notification.id)}
              isGlowing={notification.id === mostRecentNotificationId}
              onClick={handleNotificationClick}
            />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No notifications yet
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPanel;
