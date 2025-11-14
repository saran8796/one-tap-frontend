import React from "react";

const SettingsTab = ({ user }) => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>

      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <div className="space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Personal Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue={user.name}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue={user.email}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  defaultValue={user.phone}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Security */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Security
            </h3>
            <div className="space-y-3">
              <button className="w-full text-left p-4 border border-gray-200 rounded-xl hover:bg-gray-50">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">
                    Change Password
                  </span>
                  <span className="text-gray-400">›</span>
                </div>
              </button>
              <button className="w-full text-left p-4 border border-gray-200 rounded-xl hover:bg-gray-50">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">
                    Two-Factor Authentication
                  </span>
                  <span className="text-gray-400">›</span>
                </div>
              </button>
            </div>
          </div>

          {/* Save Button */}
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;
