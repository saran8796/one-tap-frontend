import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// Document requirements mapping (same as before)
const documentRequirements = {
  "Black & White Xerox": ["Physical Document to Scan / Copy"],
  "Colour Printouts": ["Soft Copy (PDF, DOC, JPG)"],
  "Lamination & Binding": ["Printed Document"],
  "Photo Printing": ["Passport-size Photo File"],
  "ID Card Printing": ["ID Design / Template"],
  "Document Scanning": ["Physical Paper / Certificate"],

  "New Learner's License": ["Aadhaar Card", "Passport-size Photo", "Signature"],
  "Permanent License Apply": [
    "Learner's License Copy",
    "Aadhaar Card",
    "Passport-size Photo",
  ],
  "Renewal of License": ["Old License", "Aadhaar Card"],
  "Address or Name Change": [
    "Proof of Address (EB Bill / Rental Agreement)",
    "Aadhaar Card",
  ],
  "Duplicate License": ["FIR / Complaint Copy", "Aadhaar Card"],

  "New Passport Application": [
    "Aadhaar",
    "Birth Certificate",
    "Photo",
    "Address Proof",
  ],
  "Passport Renewal / Re-issue": ["Old Passport", "Aadhaar", "Photo"],
  "Police Verification Assistance": ["Aadhaar", "Address Proof"],
  "Photo & Form Filling Help": ["Softcopy Photo", "Signature"],
  "Appointment Booking Support": ["Passport Number", "Aadhaar"],

  "CM Health Insurance Card (TN)": ["Aadhaar", "Ration Card", "Family Photo"],
  "Ayushman Bharat Card": ["Aadhaar", "Ration Card"],
  "New Health Card Registration": ["Aadhaar", "Family Details"],
  "Renewal / Correction": ["Old Card Copy", "Aadhaar"],
  "Insurance Claim Form Filling": ["Health Card", "Hospital Bill", "Aadhaar"],

  "Marksheet Verification / Duplicate Copy": ["Old Marksheet", "Aadhaar"],
  "Scholarship Application Help": [
    "Aadhaar",
    "Income Certificate",
    "Community Certificate",
  ],
  "Community Certificate for Students": ["Aadhaar", "Parent Community Proof"],
  "Online Result Download & Print": ["Register Number", "Date of Birth"],

  "GST Registration": ["PAN Card", "Aadhaar", "Business Address Proof"],
  "MSME / Udyam Registration": ["Aadhaar", "Business Details"],
  "FSSAI License": ["Aadhaar", "Business Proof", "Shop Photos"],
  "Shop Establishment License": ["Rental Agreement / EB Bill", "Aadhaar"],
  "Trademark / Logo Registration": ["Logo Design", "Business Proof"],
  "PAN for Business": ["Aadhaar", "Photo", "Business Proof"],

  "TNPSC / SSC / RRB Exam Apply": ["Aadhaar", "Photo", "Signature"],
  "College / University Admission": [
    "Marksheets",
    "Transfer Certificate",
    "Aadhaar",
  ],
  "Passport / PAN Online Apply": ["Aadhaar", "Photo", "Signature"],
  "Voter ID Apply / Correction": ["Aadhaar", "Address Proof", "Photo"],
  "Government Scheme Registration": ["Aadhaar", "Ration Card", "Bank Passbook"],
  "Job Application Form Filling": ["Aadhaar", "Resume", "Certificates"],

  "Birth Certificate": ["Hospital Proof", "Parent Aadhaar"],
  "Community Certificate": ["Aadhaar", "Parent Community Proof"],
  "Income Certificate": ["Aadhaar", "Salary Slip / Employer Letter"],
  "Nativity Certificate": ["Aadhaar", "Address Proof"],
  "Residence Proof": ["EB Bill / Rental Agreement"],
  "Death Certificate": ["Doctor Letter", "Aadhaar of Deceased"],

  "Voter ID Services": ["Aadhaar", "Photo", "Address Proof"],
  "Ration Card Update": ["Old Ration Card", "Aadhaar"],
  "Property Document Print": ["Softcopy / EC Number"],
  "TNeGA / eSevai Portal Support": ["Aadhaar", "Mobile Number"],
  "Court Affidavit Typing": ["ID Proof", "Case Details"],
  "General Typing Works": ["Handwritten Notes / Draft"],
};

// Services that require physical appointments
const physicalAppointmentServices = [
  "New Learner's License",
  "Permanent License Apply",
  "Renewal of License",
  "Address or Name Change",
  "Duplicate License",
  "New Passport Application",
  "Passport Renewal / Re-issue",
  "Police Verification Assistance",
  "Appointment Booking Support",
  "CM Health Insurance Card (TN)",
  "Ayushman Bharat Card",
  "New Health Card Registration",
  "Renewal / Correction",
  "Insurance Claim Form Filling",
  "Marksheet Verification / Duplicate Copy",
  "Scholarship Application Help",
  "Community Certificate for Students",
  "GST Registration",
  "MSME / Udyam Registration",
  "FSSAI License",
  "Shop Establishment License",
  "Trademark / Logo Registration",
  "PAN for Business",
  "TNPSC / SSC / RRB Exam Apply",
  "College / University Admission",
  "Passport / PAN Online Apply",
  "Voter ID Apply / Correction",
  "Government Scheme Registration",
  "Job Application Form Filling",
  "Birth Certificate",
  "Community Certificate",
  "Income Certificate",
  "Nativity Certificate",
  "Residence Proof",
  "Death Certificate",
  "Voter ID Services",
  "Ration Card Update",
  "TNeGA / eSevai Portal Support",
  "Court Affidavit Typing",
];

// Services that can be done online (no physical visit required)
const onlineAppointmentServices = [
  "Photo & Form Filling Help",
  "Online Result Download & Print",
  "Property Document Print",
  "General Typing Works",
  "Document Scanning", // Can be done by uploading scanned copies
  "Photo Printing", // Can submit digital photos
  "ID Card Printing", // Can submit design files
  "New Learner's License",
  "Permanent License Apply",
  "Renewal of License",
  "Address or Name Change",
  "Duplicate License",
  "New Passport Application",
  "Passport Renewal / Re-issue",
  "Police Verification Assistance",
  "Appointment Booking Support",
  "CM Health Insurance Card (TN)",
  "Ayushman Bharat Card",
  "New Health Card Registration",
  "Renewal / Correction",
  "Insurance Claim Form Filling",
  "Marksheet Verification / Duplicate Copy",
  "Scholarship Application Help",
  "Community Certificate for Students",
  "GST Registration",
  "MSME / Udyam Registration",
  "FSSAI License",
  "Shop Establishment License",
  "Trademark / Logo Registration",
  "PAN for Business",
  "TNPSC / SSC / RRB Exam Apply",
  "College / University Admission",
  "Passport / PAN Online Apply",
  "Voter ID Apply / Correction",
  "Government Scheme Registration",
  "Job Application Form Filling",
  "Birth Certificate",
  "Community Certificate",
  "Income Certificate",
  "Nativity Certificate",
  "Residence Proof",
  "Death Certificate",
  "Voter ID Services",
  "Ration Card Update",
  "TNeGA / eSevai Portal Support",
  "Court Affidavit Typing",
];

// Mock database structure for vendor availability
const mockVendorAvailability = {
  // This would come from your database
  workingHours: {
    start: "09:00",
    end: "17:00",
    breakStart: "12:00",
    breakEnd: "14:00",
  },
  availableSlots: [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
  ],
  bookedSlots: {
    // Format: "YYYY-MM-DD": ["TIME1", "TIME2", ...]
    [new Date().toISOString().split("T")[0]]: ["10:00", "14:30"], // Today's booked slots
    [new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0]]: [
      "09:00",
      "11:00",
    ], // Tomorrow's booked slots
  },
  holidays: [
    "2024-12-25", // Christmas
    "2024-01-01", // New Year
    // Add more holidays from database
  ],
};

const services = [
  {
    title: "Bulk Xerox & Print",
    sub: "ஜெராக்ஸ் & பிரிண்ட்",
    desc: "B&W, Color, Multiple copies",
    color: "#3B82F6",
    gradient: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    icon: "print",
    extras: [
      "Black & White Xerox",
      "Colour Printouts",
      "Lamination & Binding",
      "Photo Printing",
      "ID Card Printing",
      "Document Scanning",
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
      "New Learner's License",
      "Permanent License Apply",
      "Renewal of License",
      "Address or Name Change",
      "Duplicate License",
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
      "New Passport Application",
      "Passport Renewal / Re-issue",
      "Police Verification Assistance",
      "Photo & Form Filling Help",
      "Appointment Booking Support",
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
      "CM Health Insurance Card (TN)",
      "Ayushman Bharat Card",
      "New Health Card Registration",
      "Renewal / Correction",
      "Insurance Claim Form Filling",
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
      "Marksheet Verification / Duplicate Copy",
      "Scholarship Application Help",
      "Community Certificate for Students",
      "Online Result Download & Print",
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
      "GST Registration",
      "MSME / Udyam Registration",
      "FSSAI License",
      "Shop Establishment License",
      "PAN for Business",
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
      "TNPSC / SSC / RRB Exam Apply",
      "College / University Admission",
      "Voter ID Apply / Correction",
      "Government Scheme Registration",
      "Job Application Form Filling",
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
      "Community Certificate",
      "Income Certificate",
      "Nativity Certificate",
    ],
  },
];

// Unique Icon Components with modern design
function Icon({ name, className = "w-6 h-6" }) {
  const icons = {
    print: (
      <svg
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
        />
      </svg>
    ),
    id: (
      <svg
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
        />
      </svg>
    ),
    card: (
      <svg
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <rect x="2" y="5" width="20" height="14" rx="2" strokeWidth={1.5} />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M2 10h20M6 14h4"
        />
      </svg>
    ),
    car: (
      <svg
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 13l1.5-4.5A2 2 0 016.4 7h11.2a2 2 0 011.9 1.5L21 13"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M5 19a2 2 0 100-4 2 2 0 000 4zm14 0a2 2 0 100-4 2 2 0 000 4z"
        />
      </svg>
    ),
    plane: (
      <svg
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M2 16l20-8-8 8-4 4-2-4-6-4z"
        />
      </svg>
    ),
    heart: (
      <svg
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
    school: (
      <svg
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M12 14l9-5-9-5-9 5 9 5z" />
        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
        />
      </svg>
    ),
    doc: (
      <svg
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
    more: (
      <svg
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 6v.01M12 12v.01M12 18v.01"
        />
      </svg>
    ),
    calendar: (
      <svg
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
    clock: (
      <svg
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    online: (
      <svg
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
        />
      </svg>
    ),
  };

  return icons[name] || null;
}

// Floating Action Button Component
function FloatingActionButton({ onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 group"
      aria-label={label}
    >
      <Icon name={icon} className="w-6 h-6" />
      <span className="absolute -top-8 right-0 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        {label}
      </span>
    </button>
  );
}

// Enhanced Mobile-Responsive Document Modal
function DocumentModal({ isOpen, onClose, service, extraItem }) {
  const [uploadedDocuments, setUploadedDocuments] = useState({});
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [requestStatus, setRequestStatus] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [appointmentType, setAppointmentType] = useState(""); // 'physical' or 'online'
  const [currentStep, setCurrentStep] = useState(1);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const [shopId, setshopId] = useState("69039f957336d51e6dfe1eb8");

  const requiresPhysicalAppointment =
    physicalAppointmentServices.includes(extraItem);
  const canBeOnline = onlineAppointmentServices.includes(extraItem);
  const requiresAppointment = requiresPhysicalAppointment || canBeOnline;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Reset state when modal opens
      setUploadedDocuments({});
      setAdditionalInfo("");
      setRequestStatus(null);
      setAppointmentDate("");
      setAppointmentTime("");
      setAppointmentType(
        requiresPhysicalAppointment ? "physical" : canBeOnline ? "online" : ""
      );
      setCurrentStep(1);
      setAvailableSlots([]);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, requiresPhysicalAppointment, canBeOnline]);

  // Fetch available slots when date changes
  useEffect(() => {
    if (appointmentDate && appointmentType === "physical") {
      fetchAvailableSlots(appointmentDate);
    }
  }, [appointmentDate, appointmentType]);

  // Mock API call to fetch available slots from database
  const fetchAvailableSlots = async (date) => {
    setLoadingSlots(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // This would be replaced with actual API call to your backend
    const available = calculateAvailableSlots(date);
    setAvailableSlots(available);
    setLoadingSlots(false);
  };

  // Calculate available slots based on vendor availability and current time
  const calculateAvailableSlots = (date) => {
    const today = new Date().toISOString().split("T")[0];
    const selectedDate = date;
    const now = new Date();
    const currentTime =
      now.getHours().toString().padStart(2, "0") +
      ":" +
      now.getMinutes().toString().padStart(2, "0");

    let slots = [...mockVendorAvailability.availableSlots];

    // If selected date is today, filter out past times
    if (selectedDate === today) {
      slots = slots.filter((slot) => slot > currentTime);
    }

    // Remove booked slots
    const bookedSlots = mockVendorAvailability.bookedSlots[selectedDate] || [];
    slots = slots.filter((slot) => !bookedSlots.includes(slot));

    return slots;
  };

  const formatTimeSlot = (time) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  if (!isOpen) return null;

  const documents = documentRequirements[extraItem] || [];

  const handleFileUpload = (documentName, file) => {
    setUploadedDocuments((prev) => ({
      ...prev,
      [documentName]: file,
    }));
  };

  const removeFile = (documentName) => {
    setUploadedDocuments((prev) => {
      const newDocs = { ...prev };
      delete newDocs[documentName];
      return newDocs;
    });
  };

  const allDocumentsUploaded = documents.every((doc) => uploadedDocuments[doc]);
  const isAppointmentComplete =
    !requiresAppointment ||
    appointmentType === "online" ||
    (appointmentType === "physical" && appointmentDate && appointmentTime);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!allDocumentsUploaded) {
      setRequestStatus("error");
      return;
    }
    if (requiresAppointment && !isAppointmentComplete) {
      setCurrentStep(2);
      return;
    }

    // Prepare form data for file upload
    const formData = new FormData();
    Object.keys(uploadedDocuments).forEach((docName, i) => {
      formData.append(
        "documents",
        uploadedDocuments[docName],
        docName + "-" + uploadedDocuments[docName].name
      );
    });

    // Add booking data fields
    formData.append("userName", localStorage.getItem("userName") || "");
    formData.append("userEmail", localStorage.getItem("userEmail") || "");
    formData.append("userMobile", localStorage.getItem("userMobile") || "");
    formData.append("service", service?.title || "");
    formData.append("extraItem", extraItem || "");
    formData.append("additionalInfo", additionalInfo || "");
    formData.append("appointmentType", appointmentType || "");
    formData.append("appointmentDate", appointmentDate || "");
    formData.append("appointmentTime", appointmentTime || "");
    formData.append("shopId", shopId || "");
    formData.append("userLocation", localStorage.getItem("userAddress") || "");
    formData.append("timestamp", new Date().toISOString());

    try {
      await fetch("http://localhost:5000/api/servicebookings", {
        method: "POST",
        body: formData,
      });
      setCurrentStep(3);
      setTimeout(() => onClose(), 3000);
    } catch (err) {
      setRequestStatus("error");
    }
  };

  const getFileIcon = (fileName) => {
    const ext = fileName?.split(".").pop()?.toLowerCase();
    if (["pdf"].includes(ext)) return "📄";
    if (["jpg", "jpeg", "png", "gif"].includes(ext)) return "🖼️";
    if (["doc", "docx"].includes(ext)) return "📝";
    return "📎";
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    return maxDate.toISOString().split("T")[0];
  };

  const isDateDisabled = (date) => {
    const day = new Date(date).getDay();
    // Disable Sundays (0) - adjust based on your vendor's working days
    return day === 0 || mockVendorAvailability.holidays.includes(date);
  };

  const renderDocumentsStep = () => (
    <>
      <div>
        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Icon name="doc" className="w-5 h-5 text-blue-500 mr-2" />
          Upload Required Documents
        </h4>
        <div className="space-y-4">
          {documents.map((doc, index) => (
            <div
              key={index}
              className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100/50"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700 font-medium text-sm">
                    {doc}
                  </span>
                </div>
                {uploadedDocuments[doc] && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Uploaded ✓
                  </span>
                )}
              </div>

              {uploadedDocuments[doc] ? (
                <div className="flex items-center justify-between bg-white rounded-lg p-3 border">
                  <div className="flex items-center space-x-2 flex-1 min-w-0">
                    <span className="text-lg">
                      {getFileIcon(uploadedDocuments[doc].name)}
                    </span>
                    <span className="text-sm text-gray-700 truncate flex-1">
                      {uploadedDocuments[doc].name}
                    </span>
                    <span className="text-xs text-gray-500 flex-shrink-0">
                      {(uploadedDocuments[doc].size / (1024 * 1024)).toFixed(2)}{" "}
                      MB
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(doc)}
                    className="text-red-500 hover:text-red-700 transition-colors p-1 rounded ml-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors cursor-pointer bg-white">
                  <input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) handleFileUpload(doc, file);
                    }}
                    className="hidden"
                    id={`file-upload-${index}`}
                    accept=".png,.jpg,.jpeg,.pdf,.doc,.docx"
                  />
                  <label
                    htmlFor={`file-upload-${index}`}
                    className="cursor-pointer block"
                  >
                    <svg
                      className="w-6 h-6 text-gray-400 mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="text-sm text-gray-600 mb-1">
                      Click to upload {doc}
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, PDF, DOC up to 10MB
                    </p>
                  </label>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {documents.length > 0 && (
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Upload Progress
            </span>
            <span className="text-sm text-gray-600">
              {Object.keys(uploadedDocuments).length} / {documents.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${
                  (Object.keys(uploadedDocuments).length / documents.length) *
                  100
                }%`,
              }}
            ></div>
          </div>
          {!allDocumentsUploaded && (
            <p className="text-xs text-red-600 mt-2">
              Please upload all required documents to proceed
            </p>
          )}
        </div>
      )}

      <div>
        <label
          htmlFor="additionalInfo"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Additional Information (Optional)
        </label>
        <textarea
          id="additionalInfo"
          rows={3}
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none text-sm"
          placeholder="Any additional details or special requirements..."
        />
      </div>
    </>
  );

  const renderAppointmentStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="calendar" className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Schedule {appointmentType === "online" ? "Online" : "Physical"}{" "}
          Appointment
        </h3>
        <p className="text-gray-600">
          {appointmentType === "online"
            ? `We'll contact you via phone/email for your ${extraItem} service`
            : `Please select a date and time for your ${extraItem} service`}
        </p>
      </div>

      {/* Appointment Type Selection */}
      {requiresPhysicalAppointment && canBeOnline && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Appointment Type
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setAppointmentType("physical")}
              className={`p-4 border rounded-xl text-sm font-medium transition-all ${
                appointmentType === "physical"
                  ? "bg-blue-500 text-white border-blue-500 shadow-md"
                  : "bg-white text-gray-700 border-gray-300 hover:border-blue-300 hover:bg-blue-50"
              }`}
            >
              <Icon name="calendar" className="w-5 h-5 mx-auto mb-2" />
              Physical Visit
            </button>
            <button
              type="button"
              onClick={() => setAppointmentType("online")}
              className={`p-4 border rounded-xl text-sm font-medium transition-all ${
                appointmentType === "online"
                  ? "bg-green-500 text-white border-green-500 shadow-md"
                  : "bg-white text-gray-700 border-gray-300 hover:border-green-300 hover:bg-green-50"
              }`}
            >
              <Icon name="online" className="w-5 h-5 mx-auto mb-2" />
              Online Service
            </button>
          </div>
        </div>
      )}

      {/* Physical Appointment Details */}
      {appointmentType === "physical" && (
        <>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-3 flex items-center">
              <Icon name="calendar" className="w-4 h-4 text-blue-500 mr-2" />
              Select Date
            </label>
            <input
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              min={getMinDate()}
              max={getMaxDate()}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
            />
            <p className="text-xs text-gray-500 mt-2">
              Available from today to 30 days ahead. Sundays and holidays are
              not available.
            </p>
          </div>

          {appointmentDate && (
            <div>
              <label className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                <Icon name="clock" className="w-4 h-4 text-blue-500 mr-2" />
                Select Time Slot
                {loadingSlots && (
                  <span className="ml-2 text-xs text-gray-500">
                    Loading available slots...
                  </span>
                )}
              </label>
              {availableSlots.length > 0 ? (
                <div className="grid grid-cols-3 gap-2">
                  {availableSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setAppointmentTime(time)}
                      className={`p-3 border rounded-lg text-sm font-medium transition-all ${
                        appointmentTime === time
                          ? "bg-blue-500 text-white border-blue-500 shadow-md"
                          : "bg-white text-gray-700 border-gray-300 hover:border-blue-300 hover:bg-blue-50"
                      }`}
                    >
                      {formatTimeSlot(time)}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500 bg-gray-50 rounded-lg">
                  <p>
                    No available slots for this date. Please choose another
                    date.
                  </p>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Online Appointment Confirmation */}
      {appointmentType === "online" && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 text-center">
          <Icon
            name="online"
            className="w-12 h-12 text-green-600 mx-auto mb-4"
          />
          <h4 className="text-lg font-semibold text-green-800 mb-2">
            Online Service Confirmation
          </h4>
          <p className="text-green-700 text-sm">
            Your {extraItem} service will be processed online. Our executive
            will contact you within 24 hours to complete the process. No
            physical visit required.
          </p>
        </div>
      )}

      {/* Selected Appointment Summary */}
      {appointmentDate && appointmentTime && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="calendar" className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-green-800">
                Appointment Scheduled
              </p>
              <p className="text-sm text-green-700">
                {new Date(appointmentDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                at {formatTimeSlot(appointmentTime)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderSuccessStep = () => (
    <div className="text-center py-8">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg
          className="w-8 h-8 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {requiresAppointment
          ? `${
              appointmentType === "online" ? "Online Service" : "Appointment"
            } Booked Successfully!`
          : "Request Sent Successfully!"}
      </h3>
      <p className="text-gray-600 mb-4">
        {requiresAppointment
          ? appointmentType === "online"
            ? `Your online ${extraItem} service has been scheduled. We will contact you shortly.`
            : `Your appointment for ${extraItem} is confirmed. We will contact you shortly.`
          : "We will process your request and contact you shortly."}
      </p>
      {requiresAppointment &&
        appointmentType === "physical" &&
        appointmentDate &&
        appointmentTime && (
          <div className="bg-blue-50 rounded-xl p-4 inline-block">
            <p className="text-sm font-medium text-blue-800">
              📅 {new Date(appointmentDate).toLocaleDateString()} at{" "}
              {formatTimeSlot(appointmentTime)}
            </p>
          </div>
        )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/20">
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm p-6 border-b border-gray-200/50 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-gray-900 truncate">
                {extraItem}
              </h3>
              <p className="text-sm text-gray-600 mt-1 truncate">
                {service?.title}
              </p>

              <div className="flex items-center space-x-2 mt-3">
                <div
                  className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${
                    currentStep >= 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  1
                </div>
                <div
                  className={`flex-1 h-1 ${
                    currentStep >= 2 ? "bg-blue-500" : "bg-gray-200"
                  }`}
                ></div>
                <div
                  className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${
                    currentStep >= 2
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  2
                </div>
                {requiresAppointment && (
                  <>
                    <div
                      className={`flex-1 h-1 ${
                        currentStep >= 3 ? "bg-blue-500" : "bg-gray-200"
                      }`}
                    ></div>
                    <div
                      className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${
                        currentStep >= 3
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      3
                    </div>
                  </>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100 ml-4"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit}>
            {currentStep === 1 && renderDocumentsStep()}
            {currentStep === 2 && renderAppointmentStep()}
            {currentStep === 3 && renderSuccessStep()}

            {(currentStep === 1 || currentStep === 2) && (
              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-4 mt-6">
                <div className="flex items-start space-x-3">
                  <svg
                    className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                  <div>
                    <p className="text-sm text-yellow-800 font-medium">
                      Important
                    </p>
                    <p className="text-sm text-yellow-700 mt-1">
                      {appointmentType === "physical"
                        ? "Please bring original documents for verification along with one photocopy of each for your appointment."
                        : "Please keep your documents ready for online verification."}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {requestStatus === "error" && (
              <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-4 mt-6">
                <div className="flex items-center space-x-3">
                  <svg
                    className="w-5 h-5 text-red-600 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-sm text-red-700">
                    Please upload all required documents before submitting your
                    request.
                  </p>
                </div>
              </div>
            )}

            {currentStep !== 3 && (
              <div className="flex flex-col sm:flex-row gap-3 pt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={
                    currentStep === 1
                      ? !allDocumentsUploaded
                      : !isAppointmentComplete
                  }
                  className={`flex-1 px-4 py-3 rounded-xl transition-all font-medium text-sm shadow-lg ${
                    (
                      currentStep === 1
                        ? allDocumentsUploaded
                        : isAppointmentComplete
                    )
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl transform hover:-translate-y-0.5"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {currentStep === 1
                    ? requiresAppointment
                      ? "Continue to Appointment"
                      : "Submit Request"
                    : requiresAppointment
                    ? `Confirm ${
                        appointmentType === "online"
                          ? "Online Service"
                          : "Appointment"
                      }`
                    : "Submit Request"}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

// Service Card Component
function ServiceCard({ service, isExpanded, onToggle, onServiceClick }) {
  const visibleExtras = isExpanded
    ? service.extras
    : service.extras.slice(0, 3);

  return (
    <div className="group relative bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/50 hover:border-white/80">
      <div className="h-full flex flex-col">
        <div
          className="p-6 text-white relative overflow-hidden cursor-pointer"
          onClick={onToggle}
          style={{ background: service.gradient }}
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Icon name={service.icon} className="w-6 h-6 text-white" />
              </div>
              <div className="text-white/80 text-sm font-medium">
                {service.sub}
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">{service.title}</h3>
            <p className="text-white/90 text-sm">{service.desc}</p>
          </div>

          <div
            className={`absolute bottom-4 right-4 transform transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        <div className="p-6 flex-1">
          <div className="space-y-3">
            {visibleExtras.map((extra, i) => {
              const requiresPhysical =
                physicalAppointmentServices.includes(extra);
              const canBeOnline = onlineAppointmentServices.includes(extra);

              return (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    onServiceClick(service, extra);
                  }}
                  className="w-full text-left p-3 rounded-xl bg-gray-50 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 border border-gray-200 hover:border-blue-200 transition-all duration-300 group hover:scale-105"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700 flex-1 pr-2">
                      {extra}
                    </span>
                    <div className="flex items-center space-x-2">
                      {requiresPhysical && !canBeOnline && (
                        <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full flex items-center">
                          <Icon name="calendar" className="w-3 h-3 mr-1" />
                          Visit
                        </span>
                      )}
                      {canBeOnline && requiresPhysical && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center">
                          <Icon name="online" className="w-3 h-3 mr-1" />
                          Visit / Online
                        </span>
                      )}
                      {canBeOnline && !requiresPhysical && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center">
                          <Icon name="online" className="w-3 h-3 mr-1" />
                          Online
                        </span>
                      )}
                      <svg
                        className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors flex-shrink-0 transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </div>
                  </div>
                </button>
              );
            })}

            {service.extras.length > 3 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle();
                }}
                className="w-full py-3 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 rounded-xl font-medium text-sm transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
              >
                <span>
                  {isExpanded
                    ? "Show Less"
                    : `View All ${service.extras.length} Services`}
                </span>
                <svg
                  className={`w-4 h-4 transform transition-transform duration-300 ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500 pointer-events-none"></div>
    </div>
  );
}

export default function Services() {
  const { state } = useLocation();

  // console.log(state.shop);
  // console.log(localStorage.getItem("userId"));
  // console.log(localStorage.getItem("userName"));
  // console.log(localStorage.getItem("userEmail"));
  // console.log(localStorage.getItem("userMobile"));
  // console.log(localStorage.getItem("userAddress"));

  const [expandedCards, setExpandedCards] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedExtra, setSelectedExtra] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [setIsScrolled] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setIsScrolled(window.scrollY > 50);
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  const toggleCard = (index) => {
    setExpandedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const openModal = (service, extra) => {
    setSelectedService(service);
    setSelectedExtra(extra);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedService(null);
    setSelectedExtra("");
  };

  const filteredServices = services.filter(
    (service) =>
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.sub.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.extras.some((extra) =>
        extra.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/30">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-indigo-200 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-10 animate-pulse delay-500"></div>
        </div>

        <div className="text-center py-22">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Our Services
          </h1>
          <p className="text-xl text-gray-600">எங்கள் சேவைகள்</p>
        </div>

        <main className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 pl-14 pr-6 bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl shadow-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 placeholder-gray-500 text-gray-700"
                />
                <svg
                  className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr">
              {filteredServices.map((service, index) => (
                <ServiceCard
                  key={index}
                  service={service}
                  index={index}
                  isExpanded={expandedCards[index]}
                  onToggle={() => toggleCard(index)}
                  onServiceClick={openModal}
                />
              ))}
            </div>

            {filteredServices.length === 0 && (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 text-gray-400 bg-white/50 rounded-3xl flex items-center justify-center">
                  <svg
                    className="w-12 h-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No services found
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Try adjusting your search terms or browse through our service
                  categories.
                </p>
              </div>
            )}
          </div>
        </main>

        <FloatingActionButton
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          icon="more"
          label="Back to Top"
        />
      </div>

      <DocumentModal
        isOpen={modalOpen}
        onClose={closeModal}
        service={selectedService}
        extraItem={selectedExtra}
      />
    </>
  );
}
