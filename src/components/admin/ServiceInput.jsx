import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:5000/api/service-master";

// Use your merged/enriched master service data here!
const PRE_DEFINED_SERVICES = [
  {
    title: "Bulk Xerox & Print",
    sub: "ஜெராக்ஸ் & பிரிண்ட்",
    desc: "B&W, Color, Multiple copies",
    color: "#3B82F6",
    gradient: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    icon: "print",
    extras: [
      {
        name: "Black & White Xerox",
        appointmentType: "online",
        requiredDocuments: ["Physical Document to Scan / Copy"],
      },
      {
        name: "Colour Printouts",
        appointmentType: "online",
        requiredDocuments: ["Soft Copy (PDF, DOC, JPG)"],
      },
      {
        name: "Lamination & Binding",
        appointmentType: "online",
        requiredDocuments: ["Printed Document"],
      },
      {
        name: "Photo Printing",
        appointmentType: "online",
        requiredDocuments: ["Passport-size Photo File"],
      },
      {
        name: "ID Card Printing",
        appointmentType: "online",
        requiredDocuments: ["ID Design / Template"],
      },
      {
        name: "Document Scanning",
        appointmentType: "online",
        requiredDocuments: ["Physical Paper / Certificate"],
      },
    ],
  },
  {
    title: "Driving License",
    sub: "ஓட்டுநர் உரிமம்",
    desc: "New license or renewal",
    color: "#0D9488",
    gradient: "linear-gradient(135deg, #0D9488 0%, #115E59 100%)",
    icon: "car",
    extras: [
      {
        name: "New Learner's License",
        appointmentType: "physical",
        requiredDocuments: ["Aadhaar Card", "Passport-size Photo", "Signature"],
      },
      {
        name: "Permanent License Apply",
        appointmentType: "physical",
        requiredDocuments: [
          "Learner's License Copy",
          "Aadhaar Card",
          "Passport-size Photo",
        ],
      },
      {
        name: "Renewal of License",
        appointmentType: "physical",
        requiredDocuments: ["Old License", "Aadhaar Card"],
      },
      {
        name: "Address or Name Change",
        appointmentType: "physical",
        requiredDocuments: [
          "Proof of Address (EB Bill / Rental Agreement)",
          "Aadhaar Card",
        ],
      },
      {
        name: "Duplicate License",
        appointmentType: "physical",
        requiredDocuments: ["FIR / Complaint Copy", "Aadhaar Card"],
      },
    ],
  },
  {
    title: "Visa & Passport",
    sub: "விசா & பாஸ்போர்ட்",
    desc: "International documents",
    color: "#F59E0B",
    gradient: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
    icon: "plane",
    extras: [
      {
        name: "New Passport Application",
        appointmentType: "physical",
        requiredDocuments: [
          "Aadhaar",
          "Birth Certificate",
          "Photo",
          "Address Proof",
        ],
      },
      {
        name: "Passport Renewal / Re-issue",
        appointmentType: "physical",
        requiredDocuments: ["Old Passport", "Aadhaar", "Photo"],
      },
      {
        name: "Police Verification Assistance",
        appointmentType: "physical",
        requiredDocuments: ["Aadhaar", "Address Proof"],
      },
      {
        name: "Photo & Form Filling Help",
        appointmentType: "online",
        requiredDocuments: ["Softcopy Photo", "Signature"],
      },
      {
        name: "Appointment Booking Support",
        appointmentType: "physical",
        requiredDocuments: ["Passport Number", "Aadhaar"],
      },
    ],
  },
  {
    title: "Health Cards",
    sub: "சுகாதார அட்டைகள்",
    desc: "Insurance & health schemes",
    color: "#EC4899",
    gradient: "linear-gradient(135deg, #EC4899 0%, #DB2777 100%)",
    icon: "heart",
    extras: [
      {
        name: "CM Health Insurance Card (TN)",
        appointmentType: "physical",
        requiredDocuments: ["Aadhaar", "Ration Card", "Family Photo"],
      },
      {
        name: "Ayushman Bharat Card",
        appointmentType: "physical",
        requiredDocuments: ["Aadhaar", "Ration Card"],
      },
      {
        name: "New Health Card Registration",
        appointmentType: "physical",
        requiredDocuments: ["Aadhaar", "Family Details"],
      },
      {
        name: "Renewal / Correction",
        appointmentType: "physical",
        requiredDocuments: ["Old Card Copy", "Aadhaar"],
      },
      {
        name: "Insurance Claim Form Filling",
        appointmentType: "physical",
        requiredDocuments: ["Health Card", "Hospital Bill", "Aadhaar"],
      },
    ],
  },
  {
    title: "Education Certificates",
    sub: "கல்வி சான்றிதழ்",
    desc: "Marksheets, scholarships",
    color: "#8B5CF6",
    gradient: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)",
    icon: "school",
    extras: [
      {
        name: "Marksheet Verification / Duplicate Copy",
        appointmentType: "physical",
        requiredDocuments: ["Old Marksheet", "Aadhaar"],
      },
      {
        name: "Scholarship Application Help",
        appointmentType: "physical",
        requiredDocuments: [
          "Aadhaar",
          "Income Certificate",
          "Community Certificate",
        ],
      },
      {
        name: "Community Certificate for Students",
        appointmentType: "physical",
        requiredDocuments: ["Aadhaar", "Parent Community Proof"],
      },
      {
        name: "Online Result Download & Print",
        appointmentType: "online",
        requiredDocuments: ["Register Number", "Date of Birth"],
      },
    ],
  },
  {
    title: "Business Registration",
    sub: "வணிக பதிவு",
    desc: "GST, MSME, Udyam, FSSAI registration",
    color: "#10B981",
    gradient: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
    icon: "id",
    extras: [
      {
        name: "GST Registration",
        appointmentType: "physical",
        requiredDocuments: ["PAN Card", "Aadhaar", "Business Address Proof"],
      },
      {
        name: "MSME / Udyam Registration",
        appointmentType: "physical",
        requiredDocuments: ["Aadhaar", "Business Details"],
      },
      {
        name: "FSSAI License",
        appointmentType: "physical",
        requiredDocuments: ["Aadhaar", "Business Proof", "Shop Photos"],
      },
      {
        name: "Shop Establishment License",
        appointmentType: "physical",
        requiredDocuments: ["Rental Agreement / EB Bill", "Aadhaar"],
      },
      {
        name: "PAN for Business",
        appointmentType: "physical",
        requiredDocuments: ["Aadhaar", "Photo", "Business Proof"],
      },
    ],
  },
  {
    title: "Online Applications",
    sub: "ஆன்லைன் விண்ணப்பங்கள்",
    desc: "Government & exam services",
    color: "#F97316",
    gradient: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
    icon: "doc",
    extras: [
      {
        name: "TNPSC / SSC / RRB Exam Apply",
        appointmentType: "physical",
        requiredDocuments: ["Aadhaar", "Photo", "Signature"],
      },
      {
        name: "College / University Admission",
        appointmentType: "physical",
        requiredDocuments: ["Marksheets", "Transfer Certificate", "Aadhaar"],
      },
      {
        name: "Voter ID Apply / Correction",
        appointmentType: "physical",
        requiredDocuments: ["Aadhaar", "Address Proof", "Photo"],
      },
      {
        name: "Government Scheme Registration",
        appointmentType: "physical",
        requiredDocuments: ["Aadhaar", "Ration Card", "Bank Passbook"],
      },
      {
        name: "Job Application Form Filling",
        appointmentType: "physical",
        requiredDocuments: ["Aadhaar", "Resume", "Certificates"],
      },
    ],
  },
  {
    title: "Certificates",
    sub: "சான்றிதழ்கள்",
    desc: "Birth, income, community",
    color: "#84CC16",
    gradient: "linear-gradient(135deg, #84CC16 0%, #65A30D 100%)",
    icon: "card",
    extras: [
      {
        name: "Community Certificate",
        appointmentType: "physical",
        requiredDocuments: ["Aadhaar", "Parent Community Proof"],
      },
      {
        name: "Income Certificate",
        appointmentType: "physical",
        requiredDocuments: ["Aadhaar", "Salary Slip / Employer Letter"],
      },
      {
        name: "Nativity Certificate",
        appointmentType: "physical",
        requiredDocuments: ["Aadhaar", "Address Proof"],
      },
    ],
  },
];

const ServiceInput = () => {
  const [masterServices, setMasterServices] = useState([]);
  const [customOpen, setCustomOpen] = useState(false);
  const [custom, setCustom] = useState({
    title: "",
    sub: "",
    desc: "",
    color: "#3B82F6",
    gradient: "",
    icon: "",
    extras: [],
  });
  const [newExtra, setNewExtra] = useState({
    name: "",
    appointmentType: "online",
    requiredDocuments: [],
  });
  const [newDocument, setNewDocument] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setMasterServices(data))
      .catch(() => setMasterServices([]));
  }, []);

  const handleUpsertAll = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`${API_URL}/upsert-many`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ services: PRE_DEFINED_SERVICES }),
      });
      if (res.ok) {
        setMessage("Predefined services updated/added!");
        const updated = await fetch(API_URL).then((r) => r.json());
        setMasterServices(updated);
      } else {
        setMessage("Failed to update services");
      }
    } finally {
      setLoading(false);
    }
  };

  // Custom Service Handler
  const handleAddCustomExtra = () => {
    if (newExtra.name.trim()) {
      setCustom((prev) => ({
        ...prev,
        extras: [...prev.extras, { ...newExtra }],
      }));
      setNewExtra({
        name: "",
        appointmentType: "online",
        requiredDocuments: [],
      });
    }
  };

  const handleRemoveCustomExtra = (idx) => {
    setCustom((prev) => ({
      ...prev,
      extras: prev.extras.filter((_, i) => i !== idx),
    }));
  };

  const handleAddRequiredDocument = () => {
    if (newDocument.trim()) {
      setNewExtra((prev) => ({
        ...prev,
        requiredDocuments: [...prev.requiredDocuments, newDocument.trim()],
      }));
      setNewDocument("");
    }
  };

  const handleRemoveRequiredDocument = (idx) => {
    setNewExtra((prev) => ({
      ...prev,
      requiredDocuments: prev.requiredDocuments.filter((_, i) => i !== idx),
    }));
  };

  const handleCustomSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`${API_URL}/custom`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(custom),
      });
      if (res.ok) {
        setMessage("Custom service added!");
        setCustom({
          title: "",
          sub: "",
          desc: "",
          color: "#3B82F6",
          gradient: "",
          icon: "",
          extras: [],
        });
        const updated = await fetch(API_URL).then((r) => r.json());
        setMasterServices(updated);
        setCustomOpen(false);
      } else {
        const error = await res.json();
        setMessage(error.message || "Failed to add custom service.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Master Services Management
          </h1>
          <p className="text-gray-600 mb-2">
            Maintain the complete list of all supported services for every shop.
          </p>
          <button
            onClick={handleUpsertAll}
            className="inline-block py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update/Add All Predefined Services"}
          </button>
          <button
            onClick={() => setCustomOpen(true)}
            className="ml-4 inline-block py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 font-semibold"
          >
            + Add Custom Service
          </button>
          {message && (
            <div className="mt-3 px-4 py-2 bg-blue-50 text-blue-800 rounded">
              {message}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Master Service List ({masterServices.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {masterServices.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No services yet!</p>
            ) : (
              masterServices.map((service) => (
                <div
                  key={service._id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: service.color || "#3B82F6" }}
                    />
                    <h4 className="font-semibold text-gray-800">
                      {service.title}
                    </h4>
                    <span className="text-sm text-gray-500">
                      {service.sub && `(${service.sub})`}
                    </span>
                    <span className="ml-2 text-xs bg-gray-100 px-2 rounded">
                      {service.icon}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-1">
                    {service.desc}
                  </div>
                  <div className="mt-2">
                    {service.extras.map((extra, idx) => (
                      <div key={idx} className="mb-2 bg-gray-50 p-2 rounded">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-xs text-gray-700 font-semibold">
                            {extra.name}
                          </span>
                          <span className="text-xs text-gray-500 px-2 py-1 rounded bg-blue-50">
                            {extra.appointmentType}
                          </span>
                        </div>
                        <div className="ml-4 text-xs text-gray-600">
                          Documents:{" "}
                          {extra.requiredDocuments &&
                          extra.requiredDocuments.length > 0 ? (
                            extra.requiredDocuments.map((doc, i) => (
                              <span
                                key={i}
                                className="inline-block mr-2 mb-1 bg-gray-100 px-2 py-1 rounded"
                              >
                                {doc}
                              </span>
                            ))
                          ) : (
                            <span className="italic text-gray-400">None</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Custom Service Modal */}
        {customOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 shadow-xl max-w-lg w-full relative">
              <button
                className="absolute top-3 right-3 text-gray-700"
                onClick={() => setCustomOpen(false)}
              >
                ✕
              </button>
              <h2 className="text-xl font-bold mb-2 text-gray-800">
                Add Custom Service
              </h2>
              <form onSubmit={handleCustomSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={custom.title}
                    onChange={(e) =>
                      setCustom((c) => ({ ...c, title: e.target.value }))
                    }
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Tamil Title
                  </label>
                  <input
                    type="text"
                    name="sub"
                    value={custom.sub}
                    onChange={(e) =>
                      setCustom((c) => ({ ...c, sub: e.target.value }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Description *
                  </label>
                  <input
                    type="text"
                    name="desc"
                    value={custom.desc}
                    onChange={(e) =>
                      setCustom((c) => ({ ...c, desc: e.target.value }))
                    }
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <label className="block text-sm text-gray-700 mb-1">
                      Icon
                    </label>
                    <input
                      type="text"
                      name="icon"
                      value={custom.icon}
                      onChange={(e) =>
                        setCustom((c) => ({ ...c, icon: e.target.value }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm text-gray-700 mb-1">
                      Color
                    </label>
                    <input
                      type="color"
                      name="color"
                      value={custom.color}
                      onChange={(e) =>
                        setCustom((c) => ({ ...c, color: e.target.value }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                  </div>
                </div>

                {/* Add sub-services (extras) */}
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Add Sub-service
                  </label>
                  <div className="flex flex-wrap gap-2 items-center mb-2">
                    <input
                      type="text"
                      placeholder="Sub-service name"
                      value={newExtra.name}
                      onChange={(e) =>
                        setNewExtra((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded"
                    />
                    <select
                      value={newExtra.appointmentType}
                      onChange={(e) =>
                        setNewExtra((prev) => ({
                          ...prev,
                          appointmentType: e.target.value,
                        }))
                      }
                      className="py-2 px-2 border border-gray-300 rounded"
                    >
                      <option value="online">Online</option>
                      <option value="physical">Physical</option>
                    </select>
                    <button
                      type="button"
                      className="px-3 py-2 bg-green-600 text-white rounded"
                      onClick={handleAddCustomExtra}
                    >
                      Add
                    </button>
                  </div>
                  <label className="block text-xs mb-1">
                    Required Documents
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Document name"
                      value={newDocument}
                      onChange={(e) => setNewDocument(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded"
                    />
                    <button
                      type="button"
                      className="px-2 py-1 bg-blue-400 text-white rounded"
                      onClick={handleAddRequiredDocument}
                    >
                      Add Doc
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {newExtra.requiredDocuments.map((doc, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded"
                      >
                        <span className="text-xs">{doc}</span>
                        <button
                          type="button"
                          className="text-red-500 text-xs"
                          onClick={() => handleRemoveRequiredDocument(idx)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                  {/* List extras added for the service */}
                  <div className="space-y-2 max-h-40 overflow-y-auto mt-2">
                    {custom.extras.map((extra, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between bg-gray-50 px-3 py-1 rounded"
                      >
                        <span className="text-xs font-semibold">
                          {extra.name} ({extra.appointmentType})
                        </span>
                        <span className="text-xs">
                          {extra.requiredDocuments.join(", ")}
                        </span>
                        <button
                          type="button"
                          className="text-red-600 hover:text-red-800"
                          onClick={() => handleRemoveCustomExtra(idx)}
                        >
                          🗑️
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 mt-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add Custom Service"}
                </button>
              </form>
              {message && (
                <div className="mt-3 px-4 py-2 bg-blue-50 text-blue-800 rounded">
                  {message}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceInput;
