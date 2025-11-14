import React from "react";

export default function EarningsTab({ vendor, earnings }) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Earnings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Total Earnings Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Total Earnings
          </h3>
          <p className="text-3xl font-bold text-green-600">
            {vendor.totalEarnings}
          </p>
          <p className="text-gray-600 text-sm mt-2">All time earnings</p>
        </div>

        {/* This Month */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            This Month
          </h3>
          <p className="text-3xl font-bold text-gray-900">₹0</p>
          <p className="text-green-600 text-sm mt-2">+0%</p>
        </div>

        {/* Payouts */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Next Payout
          </h3>
          <p className="text-3xl font-bold text-blue-600">₹0</p>
          <p className="text-gray-600 text-sm mt-2">Processing on 1 Dec</p>
        </div>
      </div>

      {/* Earnings Chart */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Earnings History
        </h2>
        <div className="space-y-4">
          {earnings.map((month, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-gray-600 w-20">{month.month}</span>
              <div className="flex-1 mx-4">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-500 h-3 rounded-full"
                    style={{
                      width: `${(month.earnings / 50000) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
              <span className="font-semibold text-gray-900 w-20 text-right">
                ₹{month.earnings.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
