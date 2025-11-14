import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RequestService = () => {
  const [form, setForm] = useState({
    userName: "",
    userEmail: "",
    userMobile: "",
    service: "",
    extraItem: "",
    additionalInfo: "",
    appointmentType: "in-person",
    appointmentDate: "",
    appointmentTime: "",
    shopId: "",
    userLocation: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  // Update current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }

    if (name === "service") {
      setForm((prev) => ({
        ...prev,
        extraItem: "",
        appointmentType: "in-person",
      }));
    }

    if (name === "appointmentDate") {
      setForm((prev) => ({ ...prev, appointmentTime: "" }));
    }

    if (name === "extraItem") {
      const service = serviceOptions[form.service]?.find(
        (s) => s.value === value
      );
      if (service) {
        setForm((prev) => ({
          ...prev,
          appointmentType: service.requiresInPerson
            ? "in-person"
            : service.allowsHomeVisit
            ? "home-visit"
            : "in-person",
        }));
      }
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 0:
        if (!form.userName.trim()) newErrors.userName = "Name is required";
        else if (form.userName.trim().length < 2)
          newErrors.userName = "Name must be at least 2 characters";
        break;
      case 1:
        if (!form.userEmail.trim()) newErrors.userEmail = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(form.userEmail))
          newErrors.userEmail = "Email is invalid";
        if (!form.userMobile.trim())
          newErrors.userMobile = "Mobile number is required";
        else if (!/^\d{10}$/.test(form.userMobile))
          newErrors.userMobile = "Mobile number must be 10 digits";
        break;
      case 2:
        if (!form.service)
          newErrors.service = "Please select a service category";
        break;
      case 3:
        if (!form.extraItem)
          newErrors.extraItem = "Please select a service type";
        break;
      case 4:
        if (!isAppointmentSectionEnabled()) break;

        if (!form.appointmentType)
          newErrors.appointmentType = "Please select appointment type";

        const service = getCurrentService();
        if (
          service &&
          service.requiresInPerson &&
          form.appointmentType === "online"
        ) {
          newErrors.appointmentType = "This service requires in-person visit";
        }

        if (!form.appointmentDate)
          newErrors.appointmentDate = "Please select appointment date";
        else if (
          new Date(form.appointmentDate) < new Date().setHours(0, 0, 0, 0)
        ) {
          newErrors.appointmentDate = "Please select a future date";
        }

        if (!form.appointmentTime)
          newErrors.appointmentTime = "Please select appointment time";
        else {
          const availableSlots = getAvailableTimeSlots();
          if (!availableSlots.includes(form.appointmentTime)) {
            newErrors.appointmentTime = "Selected time is no longer available";
          }
        }

        if (form.appointmentType === "in-person" && !form.shopId) {
          newErrors.shopId = "Please select branch location";
        }
        break;
      case 5:
        if (!form.additionalInfo.trim())
          newErrors.additionalInfo = "Please provide some details";
        else if (form.additionalInfo.trim().length < 10)
          newErrors.additionalInfo =
            "Please provide more details (min. 10 characters)";
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    form.shopId = "69039f957336d51e6dfe1eb8";

    try {
      const response = await fetch(
        "http://localhost:5000/api/servicebookings",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      const result = await response.json();
      if (response.ok && result.success) {
        setSubmitted(true);
      } else {
        setErrors({ ...errors, api: result.message || "Submission failed!" });
      }
    } catch (err) {
      setErrors({
        ...errors,
        api: "Failed to submit request. Please try again.",
      });
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const steps = [
    { title: "Personal", icon: "👤", field: "userName" },
    { title: "Contact", icon: "📱", fields: ["userEmail", "userMobile"] },
    { title: "Category", icon: "📂", field: "service" },
    { title: "Service", icon: "🛠️", field: "extraItem" },
    {
      title: "Appointment",
      icon: "📅",
      fields: ["appointmentDate", "appointmentTime"],
    },
    { title: "Details", icon: "📝", field: "additionalInfo" },
  ];

  const serviceCategories = [
    {
      id: "documentation",
      label: "Documentation",
      icon: "🖨️",
      description: "Printing & Xerox services",
      color: "from-blue-400 to-blue-600",
    },
    {
      id: "government",
      label: "Government",
      icon: "🏛️",
      description: "License and permit services",
      color: "from-blue-500 to-purple-600",
    },
    {
      id: "international",
      label: "International",
      icon: "🌍",
      description: "Visa and passport services",
      color: "from-blue-600 to-indigo-600",
    },
    {
      id: "healthcare",
      label: "Healthcare",
      icon: "🏥",
      description: "Health card registrations",
      color: "from-indigo-500 to-blue-600",
    },
    {
      id: "education",
      label: "Education",
      icon: "🎓",
      description: "Certificate services",
      color: "from-purple-500 to-blue-600",
    },
    {
      id: "business",
      label: "Business",
      icon: "💼",
      description: "Registration and compliance",
      color: "from-blue-700 to-indigo-700",
    },
    {
      id: "digital",
      label: "Digital",
      icon: "💻",
      description: "Online application assistance",
      color: "from-blue-500 to-indigo-500",
    },
    {
      id: "legal",
      label: "Legal",
      icon: "⚖️",
      description: "Official certificates",
      color: "from-indigo-600 to-blue-600",
    },
  ];

  const serviceOptions = {
    documentation: [
      {
        value: "bulk_xerox",
        label: "🖨️ Bulk Xerox & Print",
        description: "High-quality B&W and Color printing",
        requiresInPerson: false,
        allowsHomeVisit: false,
        requiresSignature: false,
      },
      {
        value: "document_scanning",
        label: "📄 Document Scanning",
        description: "Professional document digitization",
        requiresInPerson: true,
        allowsHomeVisit: true,
        requiresSignature: false,
      },
      {
        value: "binding",
        label: "📚 Binding Services",
        description: "Spiral, thermal, and hardcover binding",
        requiresInPerson: true,
        allowsHomeVisit: false,
        requiresSignature: false,
      },
      {
        value: "lamination",
        label: "📋 Lamination Services",
        description: "Document protection and preservation",
        requiresInPerson: true,
        allowsHomeVisit: false,
        requiresSignature: false,
      },
      {
        value: "photo_printing",
        label: "🖼️ Photo Printing",
        description: "High-quality photo prints",
        requiresInPerson: false,
        allowsHomeVisit: false,
        requiresSignature: false,
      },
    ],
    government: [
      {
        value: "driving_license",
        label: "🚗 Driving License",
        description: "New application and renewal",
        requiresInPerson: true,
        allowsHomeVisit: false,
        requiresSignature: true,
        requiresBiometric: true,
      },
      {
        value: "vehicle_registration",
        label: "🚙 Vehicle Registration",
        description: "RC book and transfer services",
        requiresInPerson: true,
        allowsHomeVisit: false,
        requiresSignature: true,
      },
      {
        value: "aadhaar",
        label: "🆔 Aadhaar Services",
        description: "Enrollment and update",
        requiresInPerson: true,
        allowsHomeVisit: false,
        requiresSignature: false,
        requiresBiometric: true,
      },
      {
        value: "ration_card",
        label: "🛒 Ration Card",
        description: "New application and modification",
        requiresInPerson: false,
        allowsHomeVisit: true,
        requiresSignature: true,
      },
    ],
    international: [
      {
        value: "passport",
        label: "📘 Passport Services",
        description: "Fresh and renewal applications",
        requiresInPerson: true,
        allowsHomeVisit: false,
        requiresSignature: true,
        requiresBiometric: true,
      },
      {
        value: "visa_processing",
        label: "🌐 Visa Processing",
        description: "Tourist, business, and student visas",
        requiresInPerson: false,
        allowsHomeVisit: false,
        requiresSignature: false,
      },
      {
        value: "travel_insurance",
        label: "✈️ Travel Insurance",
        description: "International travel coverage",
        requiresInPerson: false,
        allowsHomeVisit: false,
        requiresSignature: false,
      },
    ],
    healthcare: [
      {
        value: "health_insurance",
        label: "🏥 Health Insurance",
        description: "Policy purchase and renewal",
        requiresInPerson: false,
        allowsHomeVisit: false,
        requiresSignature: false,
      },
      {
        value: "govt_health_schemes",
        label: "💊 Govt Health Schemes",
        description: "Ayushman Bharat and state schemes",
        requiresInPerson: false,
        allowsHomeVisit: true,
        requiresSignature: true,
      },
      {
        value: "insurance_claim",
        label: "💰 Insurance Claim",
        description: "Claim processing assistance",
        requiresInPerson: false,
        allowsHomeVisit: true,
        requiresSignature: true,
      },
    ],
    education: [
      {
        value: "marksheet_attestation",
        label: "📊 Marksheet",
        description: "Academic document verification",
        requiresInPerson: false,
        allowsHomeVisit: true,
        requiresSignature: false,
      },
      {
        value: "scholarship",
        label: "🎓 Scholarship Applications",
        description: "Government and private scholarships",
        requiresInPerson: false,
        allowsHomeVisit: true,
        requiresSignature: true,
      },
      {
        value: "admission_consultation",
        label: "🏫 Admission Consultation",
        description: "College and university admissions",
        requiresInPerson: false,
        allowsHomeVisit: true,
        requiresSignature: false,
      },
    ],
    business: [
      {
        value: "gst_registration",
        label: "📊 GST Registration",
        description: "New GSTIN and modifications",
        requiresInPerson: false,
        allowsHomeVisit: false,
        requiresSignature: true,
      },
      {
        value: "company_registration",
        label: "💼 Company Registration",
        description: "Private and public limited",
        requiresInPerson: true,
        allowsHomeVisit: false,
        requiresSignature: true,
      },
    ],
    digital: [
      {
        value: "tnpsc_applications",
        label: "📝 TNPSC Applications",
        description: "Government exam forms",
        requiresInPerson: false,
        allowsHomeVisit: false,
        requiresSignature: false,
      },
      {
        value: "college_admissions",
        label: "🎓 College Admissions",
        description: "Online application assistance",
        requiresInPerson: false,
        allowsHomeVisit: false,
        requiresSignature: false,
      },
      {
        value: "govt_schemes",
        label: "📱 Govt Scheme Applications",
        description: "Various government schemes",
        requiresInPerson: false,
        allowsHomeVisit: true,
        requiresSignature: true,
      },
      {
        value: "online_bill_payment",
        label: "💳 Online Bill Payment",
        description: "Utility and tax payments",
        requiresInPerson: false,
        allowsHomeVisit: false,
        requiresSignature: false,
      },
    ],
    legal: [
      {
        value: "community_certificate",
        label: "👥 Community Certificate",
        description: "Caste and community proof",
        requiresInPerson: false,
        allowsHomeVisit: false,
        requiresSignature: false,
      },
      {
        value: "nativity_certificate",
        label: "🏠 Nativity Certificate",
        description: "Residence proof",
        requiresInPerson: false,
        allowsHomeVisit: false,
        requiresSignature: true,
      },
      {
        value: "marriage_certificate",
        label: "💑 Marriage Certificate",
        description: "Registration and certificate",
        requiresInPerson: true,
        allowsHomeVisit: false,
        requiresSignature: true,
      },
    ],
  };

  const appointmentTypes = [
    {
      value: "in-person",
      label: "🏢 In-Person Visit",
      description: "Visit our branch office",
      icon: "🏢",
    },
    {
      value: "home-visit",
      label: "🏠 Home Visit",
      description: "Agent visits your location",
      icon: "🏠",
    },
    {
      value: "online",
      label: "💻 Online Consultation",
      description: "Video call or chat",
      icon: "💻",
    },
  ];

  const branchLocations = [
    {
      value: "69036208c35681ac21a8c402",
      label: "T Nagar",
      address: "123 MG Road, T Nagar, Chennai",
    },
    {
      value: "69036208c35681ac21a8c40a",
      label: "Porur",
      address: "456 Mount Road, Porur, Chennai",
    },
    {
      value: "69036208c35681ac21a8c406",
      label: "Tambaram",
      address: "789 GST Road, Tambaram, Chennai",
    },
    {
      value: "69036208c35681ac21a8c408",
      label: "Velachery",
      address: "321 Velachery Main Road, Chennai",
    },
    {
      value: "69036207c35681ac21a8c400",
      label: "Anna Nagar",
      address: "654 3rd Avenue, Anna Nagar, Chennai",
    },
  ];

  const timeSlots = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
  ];

  // Get current selected service
  const getCurrentService = () => {
    if (!form.service || !form.extraItem) return null;
    return serviceOptions[form.service]?.find(
      (s) => s.value === form.extraItem
    );
  };

  // Get available appointment types based on service
  const getAvailableAppointmentTypes = () => {
    const service = getCurrentService();
    if (!service) return appointmentTypes;

    return appointmentTypes.filter((type) => {
      if (type.value === "in-person") return true;
      if (type.value === "home-visit") return service.allowsHomeVisit;
      if (type.value === "online") return !service.requiresInPerson;
      return false;
    });
  };

  // Check if appointment section should be enabled
  const isAppointmentSectionEnabled = () => {
    const service = getCurrentService();
    return (
      service &&
      (service.requiresInPerson ||
        service.allowsHomeVisit ||
        !service.requiresInPerson)
    );
  };

  // Enhanced time slots with current time validation
  const getAvailableTimeSlots = () => {
    if (!form.appointmentDate) return timeSlots;

    const selectedDate = new Date(form.appointmentDate);
    const today = new Date(currentDateTime);

    const isToday = selectedDate.toDateString() === today.toDateString();

    if (!isToday) return timeSlots;

    const currentTime = today.getHours() * 60 + today.getMinutes();
    return timeSlots.filter((slot) => {
      const [time, period] = slot.split(" ");
      let [hours, minutes] = time.split(":").map(Number);

      if (period === "PM" && hours !== 12) hours += 12;
      if (period === "AM" && hours === 12) hours = 0;

      const slotMinutes = hours * 60 + minutes;
      return slotMinutes > currentTime + 30;
    });
  };

  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date.toISOString().split("T")[0]);
      }
    }
    return dates;
  };

  const isStepComplete = (stepIndex) => {
    const step = steps[stepIndex];
    if (step.field) {
      return form[step.field] && !errors[step.field];
    }
    if (step.fields) {
      return step.fields.every((field) => form[field] && !errors[field]);
    }
    return false;
  };

  const getSelectedServiceLabel = () => {
    if (!form.service || !form.extraItem) return "";
    const service = serviceOptions[form.service]?.find(
      (s) => s.value === form.extraItem
    );
    return service ? service.label : "";
  };

  const getSelectedBranchLabel = () => {
    if (!form.shopId) return "";
    const branch = branchLocations.find((b) => b.value === form.shopId);
    return branch ? branch.label : "";
  };

  const formatAppointmentDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-900 px-4 sm:px-6 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-4xl mx-auto py-8"
      >
        {/* Main Content Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 text-white">
            <div className="text-center">
              <motion.h1
                className="text-3xl sm:text-4xl font-bold mb-3"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Request Service
              </motion.h1>
              <motion.p
                className="text-blue-100 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Complete the form below to schedule your service appointment
              </motion.p>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 sm:p-8">
            {/* Progress Steps */}
            <div className="flex justify-between items-center mb-8 relative">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center z-10 flex-1"
                >
                  <motion.div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 text-xs sm:text-sm font-semibold transition-all duration-500 relative ${
                      index <= currentStep
                        ? "bg-gradient-to-r from-blue-300 to-purple-300 border-blue-300 text-white shadow-lg shadow-blue-500/30"
                        : "border-gray-300 text-gray-400 bg-gray-50"
                    } ${
                      isStepComplete(index)
                        ? "ring-2 ring-blue-400 ring-offset-2 ring-offset-white"
                        : ""
                    }`}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {step.icon}
                    {isStepComplete(index) && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full flex items-center justify-center"
                      >
                        <span className="text-[8px] sm:text-xs text-white">
                          ✓
                        </span>
                      </motion.div>
                    )}
                  </motion.div>
                  <span
                    className={`text-xs mt-2 transition-all duration-300 text-center px-1 ${
                      index <= currentStep
                        ? "text-gray-900 font-medium"
                        : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
              ))}
              {/* Progress Line */}
              <div className="absolute top-4 sm:top-5 left-0 right-0 h-1 bg-gray-200 -z-10 rounded-full">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg shadow-blue-500/30"
                  initial={{ width: "0%" }}
                  animate={{
                    width: `${(currentStep / (steps.length - 1)) * 100}%`,
                  }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="text-center mb-8">
                    <motion.h2
                      className="text-2xl sm:text-3xl font-bold text-gray-900"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {steps[currentStep].title} Information
                    </motion.h2>
                    <motion.p
                      className="text-gray-600 mt-2 text-sm sm:text-base"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      Step {currentStep + 1} of {steps.length}
                    </motion.p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <AnimatePresence mode="wait">
                      {/* Step 1: Personal Information */}
                      {currentStep === 0 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -50 }}
                          className="space-y-4"
                        >
                          <div>
                            <label className="block mb-3 text-sm font-medium text-gray-700">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              name="userName"
                              value={form.userName}
                              onChange={handleChange}
                              required
                              className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 ${
                                errors.userName
                                  ? "bg-red-50 border-red-300 focus:ring-red-300 focus:border-transparent"
                                  : "bg-gray-50 border-gray-200 focus:ring-blue-500 focus:border-transparent"
                              }`}
                              placeholder="Enter your full name"
                            />
                            <AnimatePresence>
                              {errors.userName && (
                                <motion.p
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  className="text-red-600 text-xs mt-2 flex items-center"
                                >
                                  ⚠️ {errors.userName}
                                </motion.p>
                              )}
                            </AnimatePresence>
                          </div>
                          <div>
                            <label className="block mb-3 text-sm font-medium text-gray-700">
                              Address *
                            </label>
                            <input
                              type="text"
                              name="userLocation"
                              value={form.userLocation}
                              onChange={handleChange}
                              required
                              className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 ${
                                errors.userLocation
                                  ? "bg-red-50 border-red-300 focus:ring-red-300 focus:border-transparent"
                                  : "bg-gray-50 border-gray-200 focus:ring-blue-500 focus:border-transparent"
                              }`}
                              placeholder="Enter your Address"
                            />
                            <AnimatePresence>
                              {errors.userLocation && (
                                <motion.p
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  className="text-red-600 text-xs mt-2 flex items-center"
                                >
                                  ⚠️ {errors.userLocation}
                                </motion.p>
                              )}
                            </AnimatePresence>
                          </div>
                        </motion.div>
                      )}

                      {/* Step 2: Contact Information */}
                      {currentStep === 1 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -50 }}
                          className="space-y-4"
                        >
                          <div>
                            <label className="block mb-3 text-sm font-medium text-gray-700">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              name="userEmail"
                              value={form.userEmail}
                              onChange={handleChange}
                              required
                              className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 ${
                                errors.userEmail
                                  ? "bg-red-50 border-red-300 focus:ring-red-300 focus:border-transparent"
                                  : "bg-gray-50 border-gray-200 focus:ring-blue-500 focus:border-transparent"
                              }`}
                              placeholder="your.email@example.com"
                            />
                            <AnimatePresence>
                              {errors.userEmail && (
                                <motion.p
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  className="text-red-600 text-xs mt-2 flex items-center"
                                >
                                  ⚠️ {errors.userEmail}
                                </motion.p>
                              )}
                            </AnimatePresence>
                          </div>
                          <div>
                            <label className="block mb-3 text-sm font-medium text-gray-700">
                              Mobile Number *
                            </label>
                            <input
                              type="tel"
                              name="userMobile"
                              value={form.userMobile}
                              onChange={handleChange}
                              required
                              maxLength="10"
                              className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 ${
                                errors.userMobile
                                  ? "bg-red-50 border-red-300 focus:ring-red-300 focus:border-transparent"
                                  : "bg-gray-50 border-gray-200 focus:ring-blue-500 focus:border-transparent"
                              }`}
                              placeholder="Enter 10-digit mobile number"
                            />
                            <AnimatePresence>
                              {errors.userMobile && (
                                <motion.p
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  className="text-red-600 text-xs mt-2 flex items-center"
                                >
                                  ⚠️ {errors.userMobile}
                                </motion.p>
                              )}
                            </AnimatePresence>
                          </div>
                        </motion.div>
                      )}

                      {/* Step 3: Service Category */}
                      {currentStep === 2 && (
                        <motion.div
                          key="step3"
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -50 }}
                          className="space-y-4"
                        >
                          <div>
                            <label className="block mb-3 text-sm font-medium text-gray-700">
                              Select Service Category *
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {serviceCategories.map((category) => (
                                <motion.label
                                  key={category.id}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                                    form.service === category.id
                                      ? "bg-blue-50 border-blue-500 shadow-lg shadow-blue-500/20"
                                      : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name="service"
                                    value={category.id}
                                    checked={form.service === category.id}
                                    onChange={handleChange}
                                    className="hidden"
                                  />
                                  <div className="flex items-center space-x-4 w-full">
                                    <div
                                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center text-lg text-white shadow-lg`}
                                    >
                                      {category.icon}
                                    </div>
                                    <div className="flex-1">
                                      <div className="font-medium text-gray-900">
                                        {category.label}
                                      </div>
                                      <div className="text-xs text-gray-600 mt-1">
                                        {category.description}
                                      </div>
                                    </div>
                                    <div
                                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                        form.service === category.id
                                          ? "border-blue-500 bg-blue-500"
                                          : "border-gray-400"
                                      }`}
                                    >
                                      {form.service === category.id && (
                                        <motion.div
                                          initial={{ scale: 0 }}
                                          animate={{ scale: 1 }}
                                          className="w-2 h-2 bg-white rounded-full"
                                        />
                                      )}
                                    </div>
                                  </div>
                                </motion.label>
                              ))}
                            </div>
                            <AnimatePresence>
                              {errors.service && (
                                <motion.p
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  className="text-red-600 text-xs mt-2 flex items-center"
                                >
                                  ⚠️ {errors.service}
                                </motion.p>
                              )}
                            </AnimatePresence>
                          </div>
                        </motion.div>
                      )}

                      {/* Step 4: Specific Service */}
                      {currentStep === 3 && (
                        <motion.div
                          key="step4"
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -50 }}
                          className="space-y-4"
                        >
                          <div>
                            <label className="block mb-3 text-sm font-medium text-gray-700">
                              Select Specific Service *
                            </label>
                            <div className="grid gap-3">
                              {form.service &&
                                serviceOptions[form.service]?.map((option) => (
                                  <motion.label
                                    key={option.value}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                                      form.extraItem === option.value
                                        ? "bg-blue-50 border-blue-500 shadow-lg shadow-blue-500/20"
                                        : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                                    }`}
                                  >
                                    <input
                                      type="radio"
                                      name="extraItem"
                                      value={option.value}
                                      checked={form.extraItem === option.value}
                                      onChange={handleChange}
                                      className="hidden"
                                    />
                                    <div className="flex items-center space-x-3 w-full">
                                      <div
                                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                          form.extraItem === option.value
                                            ? "border-blue-500 bg-blue-500"
                                            : "border-gray-400"
                                        }`}
                                      >
                                        {form.extraItem === option.value && (
                                          <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="w-2 h-2 bg-white rounded-full"
                                          />
                                        )}
                                      </div>
                                      <div className="flex-1">
                                        <div className="font-medium text-gray-900">
                                          {option.label}
                                        </div>
                                        <div className="text-xs text-gray-600 mt-1">
                                          {option.description}
                                        </div>
                                      </div>
                                    </div>
                                  </motion.label>
                                ))}
                            </div>
                            <AnimatePresence>
                              {errors.extraItem && (
                                <motion.p
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  className="text-red-600 text-xs mt-2 flex items-center"
                                >
                                  ⚠️ {errors.extraItem}
                                </motion.p>
                              )}
                            </AnimatePresence>
                          </div>
                        </motion.div>
                      )}

                      {/* Step 5: Appointment Booking */}
                      {currentStep === 4 && (
                        <motion.div
                          key="step5"
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -50 }}
                          className="space-y-6"
                        >
                          {/* Service Requirements Notice */}
                          {getCurrentService() && (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="p-4 bg-blue-50 border border-blue-200 rounded-xl"
                            >
                              <div className="flex items-start space-x-3">
                                <div className="text-blue-600 text-lg">ℹ️</div>
                                <div className="flex-1">
                                  <div className="text-blue-800 font-semibold text-sm">
                                    Service Requirements
                                  </div>
                                  <div className="text-blue-700 text-xs mt-1">
                                    {getCurrentService().requiresBiometric &&
                                      "• Biometric verification required\n"}
                                    {getCurrentService().requiresSignature &&
                                      "• Physical signature required\n"}
                                    {getCurrentService().requiresInPerson &&
                                      "• In-person visit mandatory\n"}
                                    {getCurrentService().allowsHomeVisit &&
                                      "• Home visit option available"}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}

                          {/* Appointment Type Selection - Conditionally Rendered */}
                          {isAppointmentSectionEnabled() && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                            >
                              <label className="block mb-3 text-sm font-medium text-gray-700">
                                Appointment Type *
                              </label>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {getAvailableAppointmentTypes().map((type) => (
                                  <motion.label
                                    key={type.value}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                                      form.appointmentType === type.value
                                        ? "bg-blue-50 border-blue-500 shadow-lg shadow-blue-500/20"
                                        : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                                    } ${
                                      !getAvailableAppointmentTypes().some(
                                        (t) => t.value === type.value
                                      )
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                    }`}
                                  >
                                    <input
                                      type="radio"
                                      name="appointmentType"
                                      value={type.value}
                                      checked={
                                        form.appointmentType === type.value
                                      }
                                      onChange={handleChange}
                                      className="hidden"
                                      disabled={
                                        !getAvailableAppointmentTypes().some(
                                          (t) => t.value === type.value
                                        )
                                      }
                                    />
                                    <div className="flex items-center space-x-3 w-full">
                                      <div
                                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                          form.appointmentType === type.value
                                            ? "border-blue-500 bg-blue-500"
                                            : "border-gray-400"
                                        }`}
                                      >
                                        {form.appointmentType ===
                                          type.value && (
                                          <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="w-2 h-2 bg-white rounded-full"
                                          />
                                        )}
                                      </div>
                                      <div className="flex-1">
                                        <div className="font-medium text-gray-900 flex items-center space-x-2">
                                          <span>{type.icon}</span>
                                          <span>{type.label}</span>
                                        </div>
                                        <div className="text-xs text-gray-600 mt-1">
                                          {type.description}
                                        </div>
                                      </div>
                                    </div>
                                  </motion.label>
                                ))}
                              </div>
                              <AnimatePresence>
                                {errors.appointmentType && (
                                  <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="text-red-600 text-xs mt-2 flex items-center"
                                  >
                                    ⚠️ {errors.appointmentType}
                                  </motion.p>
                                )}
                              </AnimatePresence>
                            </motion.div>
                          )}

                          {/* Branch Location - Only for in-person */}
                          {form.appointmentType === "in-person" &&
                            isAppointmentSectionEnabled() && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                              >
                                <label className="block mb-3 text-sm font-medium text-gray-700">
                                  Select Branch Location *
                                </label>
                                <div className="grid gap-3">
                                  {branchLocations.map((branch, i) => (
                                    <motion.label
                                      key={i}
                                      whileHover={{ scale: 1.02 }}
                                      whileTap={{ scale: 0.98 }}
                                      className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                                        form.shopId === branch.value
                                          ? "bg-blue-50 border-blue-500 shadow-lg shadow-blue-500/20"
                                          : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                                      }`}
                                    >
                                      <input
                                        type="radio"
                                        name="shopId"
                                        value={branch.value}
                                        checked={form.shopId === branch.value}
                                        onChange={handleChange}
                                        className="hidden"
                                      />
                                      <div className="flex items-center space-x-3 w-full">
                                        <div
                                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                            form.shopId === branch.value
                                              ? "border-blue-500 bg-blue-500"
                                              : "border-gray-400"
                                          }`}
                                        >
                                          {form.shopId === branch.value && (
                                            <motion.div
                                              initial={{ scale: 0 }}
                                              animate={{ scale: 1 }}
                                              className="w-2 h-2 bg-white rounded-full"
                                            />
                                          )}
                                        </div>
                                        <div className="flex-1">
                                          <div className="font-medium text-gray-900">
                                            {branch.label}
                                          </div>
                                          <div className="text-xs text-gray-600 mt-1">
                                            {branch.address}
                                          </div>
                                        </div>
                                      </div>
                                    </motion.label>
                                  ))}
                                </div>
                                <AnimatePresence>
                                  {errors.shopId && (
                                    <motion.p
                                      initial={{ opacity: 0, y: -10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0, y: -10 }}
                                      className="text-red-600 text-xs mt-2 flex items-center"
                                    >
                                      ⚠️ {errors.shopId}
                                    </motion.p>
                                  )}
                                </AnimatePresence>
                              </motion.div>
                            )}

                          {/* Date and Time Selection - Only when appointment needed */}
                          {isAppointmentSectionEnabled() && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                            >
                              <div>
                                <label className="block mb-3 text-sm font-medium text-gray-700">
                                  Preferred Date *
                                </label>
                                <select
                                  name="appointmentDate"
                                  value={form.appointmentDate}
                                  onChange={handleChange}
                                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 text-gray-900 focus:outline-none focus:ring-2 ${
                                    errors.appointmentDate
                                      ? "bg-red-50 border-red-300 focus:ring-red-300 focus:border-transparent"
                                      : "bg-gray-50 border-gray-200 focus:ring-blue-500 focus:border-transparent"
                                  }`}
                                >
                                  <option value="">Select a date</option>
                                  {getAvailableDates().map((date) => (
                                    <option key={date} value={date}>
                                      {formatAppointmentDate(date)}
                                    </option>
                                  ))}
                                </select>
                                <AnimatePresence>
                                  {errors.appointmentDate && (
                                    <motion.p
                                      initial={{ opacity: 0, y: -10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0, y: -10 }}
                                      className="text-red-600 text-xs mt-2 flex items-center"
                                    >
                                      ⚠️ {errors.appointmentDate}
                                    </motion.p>
                                  )}
                                </AnimatePresence>
                              </div>

                              <div>
                                <label className="block mb-3 text-sm font-medium text-gray-700">
                                  Preferred Time *
                                </label>
                                <select
                                  name="appointmentTime"
                                  value={form.appointmentTime}
                                  onChange={handleChange}
                                  disabled={!form.appointmentDate}
                                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 text-gray-900 focus:outline-none focus:ring-2 ${
                                    errors.appointmentTime
                                      ? "bg-red-50 border-red-300 focus:ring-red-300 focus:border-transparent"
                                      : "bg-gray-50 border-gray-200 focus:ring-blue-500 focus:border-transparent"
                                  } ${
                                    !form.appointmentDate
                                      ? "opacity-50 cursor-not-allowed"
                                      : ""
                                  }`}
                                >
                                  <option value="">
                                    {form.appointmentDate
                                      ? "Select a time"
                                      : "Select date first"}
                                  </option>
                                  {getAvailableTimeSlots().map((time) => (
                                    <option key={time} value={time}>
                                      {time}{" "}
                                      {getAvailableTimeSlots().length === 0 &&
                                        form.appointmentDate &&
                                        " - No slots available"}
                                    </option>
                                  ))}
                                </select>
                                {form.appointmentDate &&
                                  getAvailableTimeSlots().length === 0 && (
                                    <p className="text-amber-600 text-xs mt-2">
                                      ⚠️ No available time slots for selected
                                      date
                                    </p>
                                  )}
                                <AnimatePresence>
                                  {errors.appointmentTime && (
                                    <motion.p
                                      initial={{ opacity: 0, y: -10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0, y: -10 }}
                                      className="text-red-600 text-xs mt-2 flex items-center"
                                    >
                                      ⚠️ {errors.appointmentTime}
                                    </motion.p>
                                  )}
                                </AnimatePresence>
                              </div>
                            </motion.div>
                          )}

                          {/* Appointment Summary */}
                          {isAppointmentSectionEnabled() &&
                            form.appointmentDate &&
                            form.appointmentTime && (
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 bg-green-50 border border-green-200 rounded-xl"
                              >
                                <div className="text-center">
                                  <div className="text-green-700 font-semibold flex items-center justify-center space-x-2">
                                    <span>✅</span>
                                    <span>Appointment Scheduled</span>
                                  </div>
                                  <div className="text-gray-700 text-sm mt-2 space-y-1">
                                    <div>
                                      📅{" "}
                                      {formatAppointmentDate(
                                        form.appointmentDate
                                      )}{" "}
                                      at {form.appointmentTime}
                                    </div>
                                    <div>
                                      {form.appointmentType === "in-person" &&
                                      form.shopId ? (
                                        <>🏢 {getSelectedBranchLabel()}</>
                                      ) : form.appointmentType ===
                                        "home-visit" ? (
                                        <>🏠 Home Visit Service</>
                                      ) : (
                                        <>💻 Online Consultation</>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            )}

                          {/* No Appointment Needed Notice */}
                          {!isAppointmentSectionEnabled() &&
                            getCurrentService() && (
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 bg-gray-50 border border-gray-200 rounded-xl text-center"
                              >
                                <div className="text-gray-600">
                                  <div className="font-semibold">
                                    📧 Service Request Only
                                  </div>
                                  <div className="text-sm mt-1">
                                    This service doesn't require an appointment.
                                    We'll contact you to proceed with your
                                    request.
                                  </div>
                                </div>
                              </motion.div>
                            )}
                        </motion.div>
                      )}

                      {/* Step 6: Additional Details */}
                      {currentStep === 5 && (
                        <motion.div
                          key="step6"
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -50 }}
                          className="space-y-4"
                        >
                          <div>
                            <label className="block mb-3 text-sm font-medium text-gray-700">
                              Additional Details *
                            </label>
                            <textarea
                              name="additionalInfo"
                              value={form.additionalInfo}
                              onChange={handleChange}
                              rows="5"
                              placeholder="Please describe your request in detail. Include any specific requirements, documents you have, preferred timeline, or any other relevant information..."
                              className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 resize-none ${
                                errors.additionalInfo
                                  ? "bg-red-50 border-red-300 focus:ring-red-300 focus:border-transparent"
                                  : "bg-gray-50 border-gray-200 focus:ring-blue-500 focus:border-transparent"
                              }`}
                            />
                            <div className="flex justify-between items-center mt-2">
                              <AnimatePresence>
                                {errors.additionalInfo && (
                                  <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="text-red-600 text-xs flex items-center"
                                  >
                                    ⚠️ {errors.additionalInfo}
                                  </motion.p>
                                )}
                              </AnimatePresence>
                              <span
                                className={`text-xs ${
                                  form.additionalInfo.length < 10
                                    ? "text-gray-500"
                                    : "text-green-600"
                                }`}
                              >
                                {form.additionalInfo.length}/10
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                      <motion.button
                        type="button"
                        onClick={prevStep}
                        disabled={currentStep === 0}
                        className={`px-4 sm:px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 ${
                          currentStep === 0
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300 hover:shadow-lg"
                        }`}
                        whileHover={currentStep !== 0 ? { scale: 1.05 } : {}}
                        whileTap={currentStep !== 0 ? { scale: 0.95 } : {}}
                      >
                        <span>←</span>
                        <span className="hidden sm:inline">Back</span>
                      </motion.button>

                      <div className="text-xs text-gray-600 text-center">
                        <div>
                          Step {currentStep + 1} of {steps.length}
                        </div>
                        {form.extraItem && (
                          <div className="text-blue-600 mt-1 font-medium">
                            {getSelectedServiceLabel()}
                          </div>
                        )}
                      </div>

                      {currentStep < steps.length - 1 ? (
                        <motion.button
                          type="button"
                          onClick={nextStep}
                          className="px-4 sm:px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-medium text-white shadow-lg hover:shadow-blue-500/30 transition-all duration-300 flex items-center space-x-2"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span className="hidden sm:inline">Next</span>
                          <span>→</span>
                        </motion.button>
                      ) : (
                        <motion.button
                          type="submit"
                          onClick={handleSubmit}
                          className="px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-medium text-white shadow-lg hover:shadow-blue-500/30 transition-all duration-300 flex items-center space-x-2"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span>🚀</span>
                          <span>Submit Request</span>
                        </motion.button>
                      )}
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, type: "spring" }}
                  className="text-center space-y-6 py-8"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                    className="text-6xl"
                  >
                    🎉
                  </motion.div>

                  <div>
                    <motion.h2
                      className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {isAppointmentSectionEnabled()
                        ? "Appointment Confirmed!"
                        : "Request Submitted!"}
                    </motion.h2>
                    <motion.p
                      className="text-gray-600 leading-relaxed text-sm sm:text-base"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      Thank you{" "}
                      <span className="text-blue-600 font-semibold">
                        {form.userName}
                      </span>
                      !
                      <br />
                      {isAppointmentSectionEnabled() ? (
                        <>
                          Your appointment for{" "}
                          <span className="text-purple-600 font-semibold">
                            {getSelectedServiceLabel()}
                          </span>{" "}
                          has been scheduled.
                          <br />
                          <br />
                          <span className="text-blue-700 font-semibold">
                            📅 {formatAppointmentDate(form.appointmentDate)} at{" "}
                            {form.appointmentTime}
                          </span>
                          <br />
                          {form.appointmentType === "in-person" ? (
                            <span className="text-green-600">
                              🏢 {getSelectedBranchLabel()}
                            </span>
                          ) : form.appointmentType === "home-visit" ? (
                            <span className="text-indigo-600">
                              🏠 Home Visit Service
                            </span>
                          ) : (
                            <span className="text-indigo-600">
                              💻 Online Consultation
                            </span>
                          )}
                        </>
                      ) : (
                        <>
                          Your request for{" "}
                          <span className="text-purple-600 font-semibold">
                            {getSelectedServiceLabel()}
                          </span>{" "}
                          has been received.
                          <br />
                          We'll contact you shortly to proceed with your
                          service.
                        </>
                      )}
                      <br />
                      <br />
                      Confirmation has been sent to{" "}
                      <span className="text-blue-600">
                        {form.userEmail}
                      </span>{" "}
                      and{" "}
                      <span className="text-blue-600">{form.userMobile}</span>.
                    </motion.p>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-3"
                  >
                    <motion.button
                      onClick={() => {
                        setSubmitted(false);
                        setCurrentStep(0);
                        setForm({
                          userName: "",
                          userEmail: "",
                          userMobile: "",
                          service: "",
                          extraItem: "",
                          additionalInfo: "",
                          appointmentType: "in-person",
                          appointmentDate: "",
                          appointmentTime: "",
                          shopId: "",
                          userLocation: "",
                        });
                        setErrors({});
                      }}
                      className="w-full px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold text-white shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      ✨{" "}
                      {isAppointmentSectionEnabled()
                        ? "Book Another Appointment"
                        : "Submit Another Request"}
                    </motion.button>
                    <button
                      onClick={() => window.print()}
                      className="px-6 py-2 text-gray-500 hover:text-gray-700 text-sm transition-all duration-300"
                    >
                      📄 Print Confirmation
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RequestService;
