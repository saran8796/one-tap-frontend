import React, { useState } from "react";

export default function ServicesTab({ services: initialServices }) {
  const [services, setServices] = useState(initialServices);
  const [isAddServiceModalOpen, setIsAddServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // New service form state
  const [newService, setNewService] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    estimatedTime: "",
    active: true,
  });

  // Toggle service active status
  const toggleServiceStatus = async (serviceId) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      setServices((prevServices) =>
        prevServices.map((service) =>
          service.id === serviceId
            ? { ...service, active: !service.active }
            : service
        )
      );

      // Here you would typically make an API call to update the service status
      console.log(`Service ${serviceId} status updated`);
    } catch (error) {
      console.error("Failed to update service status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete service
  const deleteService = async (serviceId) => {
    if (!window.confirm("Are you sure you want to delete this service?")) {
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      setServices((prevServices) =>
        prevServices.filter((service) => service.id !== serviceId)
      );

      console.log(`Service ${serviceId} deleted`);
    } catch (error) {
      console.error("Failed to delete service:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewService((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Add new service
  const handleAddService = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const serviceToAdd = {
        id: Date.now(), // In real app, this would come from the backend
        ...newService,
        orders: 0,
        createdAt: new Date().toISOString(),
      };

      setServices((prev) => [serviceToAdd, ...prev]);
      setNewService({
        name: "",
        category: "",
        price: "",
        description: "",
        estimatedTime: "",
        active: true,
      });
      setIsAddServiceModalOpen(false);

      console.log("New service added:", serviceToAdd);
    } catch (error) {
      console.error("Failed to add service:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Edit service
  const handleEditService = (service) => {
    setEditingService(service);
    setNewService({
      name: service.name,
      category: service.category,
      price: service.price.replace("₹", ""),
      description: service.description || "",
      estimatedTime: service.estimatedTime || "",
      active: service.active,
    });
    setIsAddServiceModalOpen(true);
  };

  // Update service
  const handleUpdateService = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      setServices((prevServices) =>
        prevServices.map((service) =>
          service.id === editingService.id
            ? {
                ...service,
                name: newService.name,
                category: newService.category,
                price: `₹${newService.price}`,
                description: newService.description,
                estimatedTime: newService.estimatedTime,
                active: newService.active,
              }
            : service
        )
      );

      setEditingService(null);
      setNewService({
        name: "",
        category: "",
        price: "",
        description: "",
        estimatedTime: "",
        active: true,
      });
      setIsAddServiceModalOpen(false);

      console.log("Service updated:", editingService.id);
    } catch (error) {
      console.error("Failed to update service:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get service statistics
  const getServiceStats = () => {
    const totalServices = services.length;
    const activeServices = services.filter((s) => s.active).length;
    const totalOrders = services.reduce(
      (sum, service) => sum + service.orders,
      0
    );

    return { totalServices, activeServices, totalOrders };
  };

  const stats = getServiceStats();

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Services</h1>
          <p className="text-gray-600 mt-1">
            {stats.activeServices} active services • {stats.totalOrders} total
            orders
          </p>
        </div>
        <button
          onClick={() => {
            setEditingService(null);
            setNewService({
              name: "",
              category: "",
              price: "",
              description: "",
              estimatedTime: "",
              active: true,
            });
            setIsAddServiceModalOpen(true);
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-medium transition-colors"
        >
          Add New Service
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <span className="text-green-600 text-xl">🛠️</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-semibold text-gray-900">
                      {service.name}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        service.active
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {service.active ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {service.category} • {service.price}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {service.orders} orders completed
                    {service.estimatedTime && ` • ${service.estimatedTime}`}
                  </p>
                  {service.description && (
                    <p className="text-gray-600 text-sm mt-1">
                      {service.description}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col space-y-2 ml-4">
                <button
                  onClick={() => handleEditService(service)}
                  disabled={isLoading}
                  className="text-green-600 hover:text-green-700 text-sm font-medium px-3 py-1 hover:bg-green-50 rounded-lg transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => toggleServiceStatus(service.id)}
                  disabled={isLoading}
                  className={`text-sm font-medium px-3 py-1 rounded-lg transition-colors ${
                    service.active
                      ? "text-red-600 hover:text-red-700 hover:bg-red-50"
                      : "text-green-600 hover:text-green-700 hover:bg-green-50"
                  }`}
                >
                  {service.active ? "Deactivate" : "Activate"}
                </button>
                <button
                  onClick={() => deleteService(service.id)}
                  disabled={isLoading}
                  className="text-gray-600 hover:text-red-600 text-sm font-medium px-3 py-1 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {services.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🛠️</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No services yet
          </h3>
          <p className="text-gray-600 mb-4">
            Start by adding your first service to get orders
          </p>
          <button
            onClick={() => setIsAddServiceModalOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-medium"
          >
            Add Your First Service
          </button>
        </div>
      )}

      {/* Add/Edit Service Modal */}
      {isAddServiceModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {editingService ? "Edit Service" : "Add New Service"}
              </h2>

              <form
                onSubmit={
                  editingService ? handleUpdateService : handleAddService
                }
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={newService.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="e.g., Passport Application"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <input
                      type="text"
                      name="category"
                      value={newService.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="e.g., Government Services"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price (₹) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={newService.price}
                      onChange={handleInputChange}
                      required
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="450"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estimated Time
                    </label>
                    <input
                      type="text"
                      name="estimatedTime"
                      value={newService.estimatedTime}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="e.g., 2-3 days"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={newService.description}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Describe your service..."
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="active"
                      checked={newService.active}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <label className="ml-2 text-sm text-gray-700">
                      Activate service immediately
                    </label>
                  </div>
                </div>

                <div className="flex space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsAddServiceModalOpen(false)}
                    className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isLoading
                      ? "Processing..."
                      : editingService
                      ? "Update Service"
                      : "Add Service"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
