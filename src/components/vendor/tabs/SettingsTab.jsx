import React, { useState } from "react";

export default function SettingsTab({ vendor: initialVendor }) {
  const [vendor, setVendor] = useState(initialVendor);
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");
  const [editingHoursIndex, setEditingHoursIndex] = useState(null);
  const [tempHours, setTempHours] = useState("");

  const [businessHours, setBusinessHours] = useState([
    { day: "Monday", open: "9:00 AM", close: "6:00 PM", closed: false },
    { day: "Tuesday", open: "9:00 AM", close: "6:00 PM", closed: false },
    { day: "Wednesday", open: "9:00 AM", close: "6:00 PM", closed: false },
    { day: "Thursday", open: "9:00 AM", close: "6:00 PM", closed: false },
    { day: "Friday", open: "9:00 AM", close: "6:00 PM", closed: false },
    { day: "Saturday", open: "10:00 AM", close: "4:00 PM", closed: false },
    { day: "Sunday", open: "", close: "", closed: true },
  ]);

  // Handle business information changes
  const handleVendorChange = (field, value) => {
    setVendor((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Start editing business hours
  const startEditingHours = (index) => {
    const hours = businessHours[index];
    if (hours.closed) {
      setTempHours("Closed");
    } else {
      setTempHours(`${hours.open} - ${hours.close}`);
    }
    setEditingHoursIndex(index);
  };

  // Save business hours
  const saveBusinessHours = (index) => {
    if (tempHours.toLowerCase() === "closed") {
      setBusinessHours((prev) =>
        prev.map((h, i) =>
          i === index ? { ...h, open: "", close: "", closed: true } : h
        )
      );
    } else {
      const [open, close] = tempHours.split(" - ");
      if (open && close) {
        setBusinessHours((prev) =>
          prev.map((h, i) =>
            i === index
              ? { ...h, open: open.trim(), close: close.trim(), closed: false }
              : h
          )
        );
      }
    }
    setEditingHoursIndex(null);
    setTempHours("");
  };

  // Cancel editing hours
  const cancelEditingHours = () => {
    setEditingHoursIndex(null);
    setTempHours("");
  };

  // Toggle day closed status
  const toggleDayClosed = (index) => {
    setBusinessHours((prev) =>
      prev.map((h, i) => (i === index ? { ...h, closed: !h.closed } : h))
    );
  };

  // Handle time change for specific day
  const handleTimeChange = (index, field, value) => {
    setBusinessHours((prev) =>
      prev.map((h, i) => (i === index ? { ...h, [field]: value } : h))
    );
  };

  // Save all settings
  const handleSaveSettings = async () => {
    setIsLoading(true);
    setSaveStatus("saving");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Here you would typically make an API call to save the settings
      console.log("Saving vendor settings:", { vendor, businessHours });

      setSaveStatus("success");
      setTimeout(() => setSaveStatus(""), 3000);
    } catch (error) {
      console.error("Failed to save settings:", error);
      setSaveStatus("error");
      setTimeout(() => setSaveStatus(""), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  // Format business hours for display
  const formatBusinessHours = (hours) => {
    if (hours.closed) return "Closed";
    return `${hours.open} - ${hours.close}`;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Vendor Settings</h1>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="space-y-8">
          {/* Business Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Business Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Name *
                </label>
                <input
                  type="text"
                  value={vendor.name}
                  onChange={(e) => handleVendorChange("name", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter business name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={vendor.email}
                  onChange={(e) => handleVendorChange("email", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="business@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={vendor.phone}
                  onChange={(e) => handleVendorChange("phone", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="+91 98765 43210"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Address *
                </label>
                <textarea
                  value={vendor.address}
                  onChange={(e) =>
                    handleVendorChange("address", e.target.value)
                  }
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter complete business address"
                />
              </div>
            </div>
          </div>

          {/* Business Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Business Description
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                About Your Business
              </label>
              <textarea
                value={vendor.description || ""}
                onChange={(e) =>
                  handleVendorChange("description", e.target.value)
                }
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Describe your services, expertise, and what makes your business unique..."
              />
              <p className="text-gray-500 text-sm mt-2">
                This description will be visible to customers on your profile.
              </p>
            </div>
          </div>

          {/* Business Hours */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Business Hours
              </h3>
              <button
                onClick={() => {
                  // Reset all hours to default
                  setBusinessHours([
                    {
                      day: "Monday",
                      open: "9:00 AM",
                      close: "6:00 PM",
                      closed: false,
                    },
                    {
                      day: "Tuesday",
                      open: "9:00 AM",
                      close: "6:00 PM",
                      closed: false,
                    },
                    {
                      day: "Wednesday",
                      open: "9:00 AM",
                      close: "6:00 PM",
                      closed: false,
                    },
                    {
                      day: "Thursday",
                      open: "9:00 AM",
                      close: "6:00 PM",
                      closed: false,
                    },
                    {
                      day: "Friday",
                      open: "9:00 AM",
                      close: "6:00 PM",
                      closed: false,
                    },
                    {
                      day: "Saturday",
                      open: "10:00 AM",
                      close: "4:00 PM",
                      closed: false,
                    },
                    { day: "Sunday", open: "", close: "", closed: true },
                  ]);
                }}
                className="text-green-600 hover:text-green-700 text-sm font-medium"
              >
                Reset to Default
              </button>
            </div>

            <div className="space-y-3">
              {businessHours.map((hours, index) => (
                <div
                  key={hours.day}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-xl"
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <span className="font-medium text-gray-900 w-24">
                      {hours.day}
                    </span>

                    {editingHoursIndex === index ? (
                      <div className="flex items-center space-x-3 flex-1">
                        <input
                          type="text"
                          value={tempHours}
                          onChange={(e) => setTempHours(e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          placeholder="e.g., 9:00 AM - 6:00 PM or Closed"
                        />
                        <button
                          onClick={() => saveBusinessHours(index)}
                          className="text-green-600 hover:text-green-700 font-medium"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEditingHours}
                          className="text-gray-600 hover:text-gray-700"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-4 flex-1">
                        {hours.closed ? (
                          <span className="text-gray-500">Closed</span>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <select
                              value={hours.open}
                              onChange={(e) =>
                                handleTimeChange(index, "open", e.target.value)
                              }
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            >
                              <option value="8:00 AM">8:00 AM</option>
                              <option value="9:00 AM">9:00 AM</option>
                              <option value="10:00 AM">10:00 AM</option>
                              <option value="11:00 AM">11:00 AM</option>
                            </select>
                            <span className="text-gray-500">to</span>
                            <select
                              value={hours.close}
                              onChange={(e) =>
                                handleTimeChange(index, "close", e.target.value)
                              }
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            >
                              <option value="5:00 PM">5:00 PM</option>
                              <option value="6:00 PM">6:00 PM</option>
                              <option value="7:00 PM">7:00 PM</option>
                              <option value="8:00 PM">8:00 PM</option>
                            </select>
                          </div>
                        )}

                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={hours.closed}
                            onChange={() => toggleDayClosed(index)}
                            className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                          />
                          <span className="text-sm text-gray-700">Closed</span>
                        </label>
                      </div>
                    )}
                  </div>

                  {editingHoursIndex !== index && (
                    <button
                      onClick={() => startEditingHours(index)}
                      className="text-green-600 hover:text-green-700 text-sm font-medium ml-4"
                    >
                      Quick Edit
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Service Settings */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Service Settings
            </h3>
            <div className="space-y-4">
              <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-xl">
                <input
                  type="checkbox"
                  checked={vendor.autoAcceptOrders || false}
                  onChange={(e) =>
                    handleVendorChange("autoAcceptOrders", e.target.checked)
                  }
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <div>
                  <span className="font-medium text-gray-900">
                    Auto-accept new orders
                  </span>
                  <p className="text-gray-600 text-sm">
                    Automatically accept incoming orders without manual approval
                  </p>
                </div>
              </label>

              <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-xl">
                <input
                  type="checkbox"
                  checked={vendor.notifications || true}
                  onChange={(e) =>
                    handleVendorChange("notifications", e.target.checked)
                  }
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <div>
                  <span className="font-medium text-gray-900">
                    Email notifications
                  </span>
                  <p className="text-gray-600 text-sm">
                    Receive email alerts for new orders and updates
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Save Button with Status */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <div>
              {saveStatus === "success" && (
                <span className="text-green-600 font-medium">
                  ✓ Settings saved successfully!
                </span>
              )}
              {saveStatus === "error" && (
                <span className="text-red-600 font-medium">
                  ✗ Failed to save settings. Please try again.
                </span>
              )}
              {saveStatus === "saving" && (
                <span className="text-gray-600">Saving changes...</span>
              )}
            </div>

            <button
              onClick={handleSaveSettings}
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
