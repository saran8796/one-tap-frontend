import React, { useState } from "react";

const ShopManagement = () => {
  const [shops, setShops] = useState([]);
  const [newShop, setNewShop] = useState({
    id: "",
    name: "",
    address: "",
    services: "",
    rating: "",
    reviews: "",
    distance: "",
    waitTime: "",
    open: true,
    image: "",
    established: "",
    clientBase: "",
    efficiency: "",
    serviceLevel: "Standard",
    premiumPartner: false,
    contact: "",
    email: "",
    workingHours: {
      weekdays: "",
      weekends: "",
    },
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("workingHours.")) {
      const field = name.split(".")[1];
      setNewShop((prev) => ({
        ...prev,
        workingHours: {
          ...prev.workingHours,
          [field]: value,
        },
      }));
    } else {
      setNewShop((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleAddShop = (e) => {
    e.preventDefault();
    const shopWithId = {
      ...newShop,
      id: shops.length + 1,
      rating: parseFloat(newShop.rating),
      reviews: parseInt(newShop.reviews),
    };

    setShops((prev) => [...prev, shopWithId]);
    setNewShop({
      id: "",
      name: "",
      address: "",
      services: "",
      rating: "",
      reviews: "",
      distance: "",
      waitTime: "",
      open: true,
      image: "",
      established: "",
      clientBase: "",
      efficiency: "",
      serviceLevel: "Standard",
      premiumPartner: false,
      contact: "",
      email: "",
      workingHours: {
        weekdays: "",
        weekends: "",
      },
    });
  };

  const handleDeleteShop = (id) => {
    setShops((prev) => prev.filter((shop) => shop.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Shop Management
          </h1>
          <p className="text-gray-600">Add and manage printing shops</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Add Shop Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Add New Shop
            </h2>

            <form onSubmit={handleAddShop} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Shop Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newShop.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={newShop.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Services *
                  </label>
                  <input
                    type="text"
                    name="services"
                    value={newShop.services}
                    onChange={handleInputChange}
                    required
                    placeholder="Comma separated services"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    name="contact"
                    value={newShop.contact}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={newShop.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rating (0-5) *
                  </label>
                  <input
                    type="number"
                    name="rating"
                    value={newShop.rating}
                    onChange={handleInputChange}
                    min="0"
                    max="5"
                    step="0.1"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reviews Count *
                  </label>
                  <input
                    type="number"
                    name="reviews"
                    value={newShop.reviews}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Distance *
                  </label>
                  <input
                    type="text"
                    name="distance"
                    value={newShop.distance}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., 1.5 km"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Wait Time *
                  </label>
                  <input
                    type="text"
                    name="waitTime"
                    value={newShop.waitTime}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., 10 min"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Established *
                  </label>
                  <input
                    type="text"
                    name="established"
                    value={newShop.established}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Since 2020"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Client Base *
                  </label>
                  <input
                    type="text"
                    name="clientBase"
                    value={newShop.clientBase}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., 200+ Clients"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Efficiency *
                  </label>
                  <input
                    type="text"
                    name="efficiency"
                    value={newShop.efficiency}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., 95% Success Rate"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Service Level *
                  </label>
                  <select
                    name="serviceLevel"
                    value={newShop.serviceLevel}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Standard">Standard</option>
                    <option value="Enterprise">Enterprise</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Emoji/Image *
                  </label>
                  <input
                    type="text"
                    name="image"
                    value={newShop.image}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., 🖨️"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Weekdays Working Hours *
                  </label>
                  <input
                    type="text"
                    name="workingHours.weekdays"
                    value={newShop.workingHours.weekdays}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., 8:00 AM - 9:00 PM"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Weekends Working Hours *
                  </label>
                  <input
                    type="text"
                    name="workingHours.weekends"
                    value={newShop.workingHours.weekends}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., 9:00 AM - 8:00 PM"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="open"
                    checked={newShop.open}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Currently Open
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="premiumPartner"
                    checked={newShop.premiumPartner}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Premium Partner
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
              >
                Add Shop
              </button>
            </form>
          </div>

          {/* Shops List */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Managed Shops ({shops.length})
            </h2>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {shops.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No shops added yet
                </p>
              ) : (
                shops.map((shop) => (
                  <div
                    key={shop.id}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <span className="text-2xl">{shop.image}</span>
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {shop.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {shop.address}
                          </p>
                          <p className="text-sm text-gray-500">
                            {shop.services}
                          </p>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-sm text-gray-500">
                              ⭐ {shop.rating}
                            </span>
                            <span className="text-sm text-gray-500">
                              📞 {shop.contact}
                            </span>
                            <span
                              className={`text-sm ${
                                shop.open ? "text-green-600" : "text-red-600"
                              }`}
                            >
                              {shop.open ? "🟢 Open" : "🔴 Closed"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteShop(shop.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopManagement;
