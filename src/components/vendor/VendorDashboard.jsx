import React, { useState, useEffect } from "react";
import VendorHeader from "./VendorHeader";
import VendorSidebar from "./VendorSidebar";
import DashboardTab from "./tabs/DashboardTab";
import OrdersTab from "./tabs/OrdersTab";
import ServicesTab from "./tabs/ServicesTab";
import ReviewsTab from "./tabs/ReviewsTab";
import EarningsTab from "./tabs/EarningsTab";
import SettingsTab from "./tabs/SettingsTab";
import NotificationTab from "./tabs/NotificationTab";

export default function VendorDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isLoading, setIsLoading] = useState(true);
  const [vendor, setVendor] = useState({
    name: localStorage.getItem("shopName"),
    email: localStorage.getItem("shopEmail"),
    phone: localStorage.getItem("shopMobile"),
    joinedDate: "10 Jan 2024",
    address: localStorage.getItem("shopAddress"),
    rating: 0,
    totalEarnings: "₹0",
    activeOrders: 0,
    completedOrders: 0,
    pendingRequests: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [earnings, setEarnings] = useState([]);

  // Simulate API data fetching
  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Set mock data

        setServices([
          {
            id: 1,
            name: "Passport Application",
            category: "Government Services",
            price: "₹450",
            active: true,
            orders: 45,
            description:
              "Complete passport application processing and submission",
            estimatedTime: "3-5 days",
          },
          {
            id: 2,
            name: "Color Printing",
            category: "Printing Services",
            price: "₹120",
            active: true,
            orders: 89,
            description: "High quality color printing services",
            estimatedTime: "1 day",
          },
          {
            id: 3,
            name: "Document Scanning",
            category: "Digital Services",
            price: "₹80",
            active: true,
            orders: 67,
            description: "Convert physical documents to digital format",
            estimatedTime: "2-3 hours",
          },
          {
            id: 4,
            name: "GST Registration",
            category: "Business Services",
            price: "₹899",
            active: false,
            orders: 12,
            description: "GST registration and compliance services",
            estimatedTime: "5-7 days",
          },
        ]);

        // setReviews([
        //   {
        //     id: 1,
        //     customerName: "Rajesh Kumar",
        //     rating: 5,
        //     comment: "Excellent service! Quick and professional.",
        //     date: "20 Feb 2024",
        //     service: "Passport Application",
        //   },
        //   {
        //     id: 2,
        //     customerName: "Priya Sharma",
        //     rating: 4,
        //     comment:
        //       "Good quality printing, but delivery was slightly delayed.",
        //     date: "18 Feb 2024",
        //     service: "Color Printing",
        //   },
        //   {
        //     id: 3,
        //     customerName: "Amit Patel",
        //     rating: 5,
        //     comment: "Very professional and fast service. Highly recommended!",
        //     date: "15 Feb 2024",
        //     service: "Document Scanning",
        //   },
        // ]);

        setEarnings([
          { month: "Jan", earnings: 0 },
          { month: "Feb", earnings: 0 },
          { month: "Mar", earnings: 0 },
          { month: "Apr", earnings: 0 },
        ]);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Update vendor stats when orders change
  useEffect(() => {
    if (recentOrders.length > 0) {
      const activeOrders = recentOrders.filter(
        (order) => order.status === "in-progress"
      ).length;
      const completedOrders = recentOrders.filter(
        (order) => order.status === "completed"
      ).length;

      setVendor((prev) => ({
        ...prev,
        activeOrders,
        completedOrders: prev.completedOrders + completedOrders, // Accumulate completed orders
      }));
    }
  }, [recentOrders]);

  // Calculate total earnings from earnings data
  useEffect(() => {
    if (earnings.length > 0) {
      const totalEarnings = earnings.reduce(
        (sum, month) => sum + month.earnings,
        0
      );
      setVendor((prev) => ({
        ...prev,
        totalEarnings: `₹${totalEarnings.toLocaleString()}`,
      }));
    }
  }, [earnings]);

  const calculateAverageRating = () => {
    if (reviews.length === 0) return "0.0";
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  // Handle order status update
  const handleOrderStatusUpdate = (orderId, newStatus) => {
    setRecentOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  // Handle service updates
  const handleServiceUpdate = (updatedServices) => {
    setServices(updatedServices);
  };

  // Handle vendor settings update
  const handleVendorUpdate = (updatedVendor) => {
    setVendor(updatedVendor);
  };

  // Refresh dashboard data
  const refreshDashboard = async () => {
    setIsLoading(true);
    try {
      // Simulate API call to refresh data
      await new Promise((resolve) => setTimeout(resolve, 800));
      console.log("Dashboard data refreshed");
    } catch (error) {
      console.error("Error refreshing dashboard:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderActiveTab = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dashboard data...</p>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case "dashboard":
        return (
          <DashboardTab
            vendor={vendor}
            recentOrders={recentOrders}
            reviews={reviews}
            earnings={earnings}
            onRefresh={refreshDashboard}
            isLoading={isLoading}
            onViewAllOrders={() => setActiveTab("orders")}
            onViewAllReviews={() => setActiveTab("reviews")}
            onViewAllNotifications={() => setActiveTab("notifications")}
          />
        );
      case "orders":
        return (
          <OrdersTab
            // recentOrders={recentOrders}
            // onOrderStatusUpdate={handleOrderStatusUpdate}
            shopId={"69039f957336d51e6dfe1eb8"}
          />
        );
      case "services":
        return (
          <ServicesTab
            services={services}
            onServicesUpdate={handleServiceUpdate}
          />
        );
      case "reviews":
        return (
          <ReviewsTab
            reviews={reviews}
            calculateAverageRating={calculateAverageRating}
          />
        );
      case "notifications":
        return <NotificationTab />;
      case "earnings":
        return <EarningsTab vendor={vendor} earnings={earnings} />;
      case "settings":
        return (
          <SettingsTab vendor={vendor} onVendorUpdate={handleVendorUpdate} />
        );
      default:
        return (
          <DashboardTab
            vendor={vendor}
            reviews={reviews}
            earnings={earnings}
            onRefresh={refreshDashboard}
            isLoading={isLoading}
            onViewAllOrders={() => setActiveTab("orders")}
            onViewAllReviews={() => setActiveTab("reviews")}
            onViewAllNotifications={() => setActiveTab("notifications")}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Uncomment if you want to use VendorHeader */}
      {/* <VendorHeader vendor={vendor} /> */}

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <VendorSidebar
            vendor={vendor}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            calculateAverageRating={calculateAverageRating}
            reviews={reviews}
          />

          {/* Main Content */}
          <div className="flex-1">{renderActiveTab()}</div>
        </div>
      </div>
    </div>
  );
}
