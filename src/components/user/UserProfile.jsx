import React, { useState } from "react";
import NavigationBar from "./NavigationBar";
import DashboardTab from "./tabs/DashboardTab";
import OrdersTab from "./tabs/OrdersTab";
import DocumentsTab from "./tabs/DocumentsTab";
import NotificationsTab from "./tabs/NotificationsTab";
import SettingsTab from "./tabs/SettingsTab";
import { useLocation } from "react-router-dom";

export default function UserProfile() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state || "dashboard");

  const [user] = useState({
    name: "Maria",
    email: "communicationtrainermaria@email.com",
    phone: "+91 98765 43210",
    joinedDate: "15 Jan 2024",
    totalOrders: 0,
    completedOrders: 0,
    pendingOrders: 0,
    cancelledOrders: 0  ,
  });

  const [notifications] = useState([
    // {
    //   id: 1,
    //   type: "success",
    //   title: "Order Completed",
    //   message: "Your passport application has been processed successfully",
    //   time: "2 hours ago",
    //   read: false,
    // },
    // {
    //   id: 2,
    //   type: "info",
    //   title: "Document Required",
    //   message: "Please upload your Aadhaar card for license application",
    //   time: "5 hours ago",
    //   read: true,
    // },
    // {
    //   id: 3,
    //   type: "warning",
    //   title: "Payment Pending",
    //   message: "Complete payment for your recent print order",
    //   time: "1 day ago",
    //   read: true,
    // },
  ]);

  const [orders] = useState([
    // {
    //   id: "ORD-001",
    //   shopName: "Digital Print Solutions",
    //   service: "Passport Application",
    //   status: "completed",
    //   amount: "₹450",
    //   date: "20 Feb 2024",
    //   documents: ["Aadhaar Card", "Photo", "Address Proof"],
    // },
    // {
    //   id: "ORD-002",
    //   shopName: "Smart Xerox Center",
    //   service: "Color Printing",
    //   status: "in-progress",
    //   amount: "₹120",
    //   date: "22 Feb 2024",
    //   documents: ["Document File"],
    // },
    // {
    //   id: "ORD-003",
    //   shopName: "Corporate Document Center",
    //   service: "GST Registration",
    //   status: "pending",
    //   amount: "₹899",
    //   date: "25 Feb 2024",
    //   documents: ["PAN Card", "Aadhaar", "Business Proof"],
    // },
    // {
    //   id: "ORD-004",
    //   shopName: "Quick Print Hub",
    //   service: "Document Scanning",
    //   status: "cancelled",
    //   amount: "₹80",
    //   date: "18 Feb 2024",
    //   documents: ["Physical Documents"],
    // },
  ]);

  const [uploadedDocuments] = useState([
    // {
    //   id: 1,
    //   name: "Aadhaar_Card.pdf",
    //   size: "2.4 MB",
    //   type: "Identity Proof",
    //   uploadDate: "20 Feb 2024",
    //   status: "verified",
    // },
    // {
    //   id: 2,
    //   name: "Passport_Photo.jpg",
    //   size: "1.2 MB",
    //   type: "Photo",
    //   uploadDate: "20 Feb 2024",
    //   status: "verified",
    // },
    // {
    //   id: 3,
    //   name: "Address_Proof.pdf",
    //   size: "3.1 MB",
    //   type: "Address Proof",
    //   uploadDate: "20 Feb 2024",
    //   status: "pending",
    // },
    // {
    //   id: 4,
    //   name: "PAN_Card.pdf",
    //   size: "1.8 MB",
    //   type: "Identity Proof",
    //   uploadDate: "25 Feb 2024",
    //   status: "verified",
    // },
  ]);

  const renderActiveTab = () => {
    const tabProps = {
      user,
      orders,
      notifications,
      uploadedDocuments,
    };

    switch (activeTab) {
      case "dashboard":
        return <DashboardTab {...tabProps} />;
      case "orders":
        return <OrdersTab {...tabProps} />;
      case "documents":
        return <DocumentsTab {...tabProps} />;
      case "notifications":
        return <NotificationsTab {...tabProps} />;
      case "settings":
        return <SettingsTab {...tabProps} />;
      default:
        return <DashboardTab {...tabProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          {renderActiveTab()}
        </div>
      </div>
    </div>
  );
}
