import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:5000/api";

// Shop data for bulk insert (id and image REMOVED for backend)
const EXISTING_SHOPS = [
  {
    name: "Digital Print Solutions",
    address: "Tech Park, Velachery, Chennai",
    services: "Digital Printing, High-Res Scanning, Color Services",
    rating: 4.7,
    reviews: 128,
    distance: "1.5 km",
    waitTime: "6 min",
    open: true,
    established: "Since 2017",
    clientBase: "400+ Corporate",
    efficiency: "96% Success Rate",
    serviceLevel: "Enterprise",
    premiumPartner: true,
    contact: "+91 98765 43210",
    email: "info@digitalprintsolutions.com",
    workingHours: {
      weekdays: "8:00 AM - 9:00 PM",
      weekends: "9:00 AM - 8:00 PM",
    },
  },
  {
    name: "Corporate Document Center",
    address: "Financial District, T Nagar, Chennai",
    services: "Color Printing, Lamination, Binding Services",
    rating: 4.6,
    reviews: 95,
    distance: "1.2 km",
    waitTime: "8 min",
    open: true,
    established: "Since 2015",
    clientBase: "300+ Businesses",
    efficiency: "95% Success Rate",
    serviceLevel: "Enterprise",
    premiumPartner: true,
    contact: "+91 87654 32109",
    email: "support@corporatedoc.com",
    workingHours: {
      weekdays: "9:00 AM - 8:00 PM",
      weekends: "10:00 AM - 6:00 PM",
    },
  },
  {
    name: "Smart Xerox Center",
    address: "Anna Nagar, Chennai",
    services: "Xerox, Printing, Scanning",
    rating: 4.5,
    reviews: 87,
    distance: "0.8 km",
    waitTime: "5 min",
    open: true,
    established: "Since 2018",
    clientBase: "250+ Clients",
    efficiency: "94% Success Rate",
    serviceLevel: "Standard",
    premiumPartner: false,
    contact: "+91 76543 21098",
    email: "smartxerox@email.com",
    workingHours: {
      weekdays: "8:30 AM - 8:30 PM",
      weekends: "9:00 AM - 7:00 PM",
    },
  },
  {
    name: "Speed Print & Xerox",
    address: "T Nagar, Chennai",
    services: "Color Print, Lamination",
    rating: 4.2,
    reviews: 76,
    distance: "1.2 km",
    waitTime: "10 min",
    open: true,
    established: "Since 2016",
    clientBase: "200+ Clients",
    efficiency: "92% Success Rate",
    serviceLevel: "Standard",
    premiumPartner: false,
    contact: "+91 65432 10987",
    email: "speedprint@email.com",
    workingHours: {
      weekdays: "9:00 AM - 8:00 PM",
      weekends: "9:30 AM - 6:30 PM",
    },
  },
  {
    name: "Copy World",
    address: "Adyar, Chennai",
    services: "Xerox, Binding, Printout",
    rating: 4.7,
    reviews: 112,
    distance: "0.5 km",
    waitTime: "7 min",
    open: false,
    established: "Since 2019",
    clientBase: "180+ Clients",
    efficiency: "93% Success Rate",
    serviceLevel: "Standard",
    premiumPartner: false,
    contact: "+91 54321 09876",
    email: "copyworld@email.com",
    workingHours: {
      weekdays: "8:00 AM - 8:00 PM",
      weekends: "9:00 AM - 7:00 PM",
    },
  },
  {
    name: "Express Xerox Point",
    address: "Tambaram, Chennai",
    services: "Online Applications, Printouts",
    rating: 4.0,
    reviews: 64,
    distance: "2.1 km",
    waitTime: "12 min",
    open: true,
    established: "Since 2020",
    clientBase: "150+ Clients",
    efficiency: "90% Success Rate",
    serviceLevel: "Standard",
    premiumPartner: false,
    contact: "+91 43210 98765",
    email: "expressxerox@email.com",
    workingHours: {
      weekdays: "8:00 AM - 9:00 PM",
      weekends: "8:30 AM - 8:00 PM",
    },
  },
  {
    name: "Quick Print Hub",
    address: "Velachery, Chennai",
    services: "Xerox, Color Print, Scan",
    rating: 4.6,
    reviews: 89,
    distance: "1.5 km",
    waitTime: "9 min",
    open: true,
    established: "Since 2019",
    clientBase: "220+ Clients",
    efficiency: "94% Success Rate",
    serviceLevel: "Standard",
    premiumPartner: false,
    contact: "+91 32109 87654",
    email: "quickprinthub@email.com",
    workingHours: {
      weekdays: "8:30 AM - 8:30 PM",
      weekends: "9:00 AM - 7:00 PM",
    },
  },
  {
    name: "Bright Xerox Shop",
    address: "Porur, Chennai",
    services: "Xerox, Photo Copy, Printing",
    rating: 4.1,
    reviews: 71,
    distance: "3.2 km",
    waitTime: "15 min",
    open: true,
    established: "Since 2017",
    clientBase: "190+ Clients",
    efficiency: "91% Success Rate",
    serviceLevel: "Standard",
    premiumPartner: false,
    contact: "+91 21098 76543",
    email: "brightxerox@email.com",
    workingHours: {
      weekdays: "9:00 AM - 8:00 PM",
      weekends: "9:30 AM - 6:30 PM",
    },
  },
  {
    name: "Green Print & Copy",
    address: "Guindy, Chennai",
    services: "Xerox, Online Services",
    rating: 4.4,
    reviews: 83,
    distance: "0.9 km",
    waitTime: "8 min",
    open: false,
    established: "Since 2021",
    clientBase: "160+ Clients",
    efficiency: "92% Success Rate",
    serviceLevel: "Standard",
    premiumPartner: false,
    contact: "+91 10987 65432",
    email: "greenprint@email.com",
    workingHours: {
      weekdays: "8:00 AM - 8:00 PM",
      weekends: "9:00 AM - 7:00 PM",
    },
  },
  {
    name: "Digital Doc Center",
    address: "Mylapore, Chennai",
    services: "Scanning, Lamination, Printing",
    rating: 4.8,
    reviews: 134,
    distance: "1.8 km",
    waitTime: "11 min",
    open: true,
    established: "Since 2015",
    clientBase: "280+ Clients",
    efficiency: "96% Success Rate",
    serviceLevel: "Enterprise",
    premiumPartner: true,
    contact: "+91 98765 12340",
    email: "digitaldoc@email.com",
    workingHours: {
      weekdays: "8:00 AM - 9:00 PM",
      weekends: "9:00 AM - 8:00 PM",
    },
  },
  {
    name: "Speedy Copy",
    address: "Anna Nagar, Chennai",
    services: "Xerox, Printing",
    rating: 4.3,
    reviews: 78,
    distance: "0.9 km",
    waitTime: "6 min",
    open: true,
    established: "Since 2018",
    clientBase: "210+ Clients",
    efficiency: "93% Success Rate",
    serviceLevel: "Standard",
    premiumPartner: false,
    contact: "+91 87654 01234",
    email: "speedycopy@email.com",
    workingHours: {
      weekdays: "8:30 AM - 8:30 PM",
      weekends: "9:00 AM - 7:00 PM",
    },
  },
  {
    name: "PrintPro",
    address: "T Nagar, Chennai",
    services: "Lamination, Binding",
    rating: 4.2,
    reviews: 69,
    distance: "1.1 km",
    waitTime: "10 min",
    open: true,
    established: "Since 2016",
    clientBase: "200+ Clients",
    efficiency: "92% Success Rate",
    serviceLevel: "Standard",
    premiumPartner: false,
    contact: "+91 76543 90123",
    email: "printpro@email.com",
    workingHours: {
      weekdays: "9:00 AM - 8:00 PM",
      weekends: "9:30 AM - 6:30 PM",
    },
  },
  {
    name: "Xpress Docs",
    address: "Adyar, Chennai",
    services: "Color Print, Scan",
    rating: 4.5,
    reviews: 91,
    distance: "0.7 km",
    waitTime: "8 min",
    open: false,
    established: "Since 2019",
    clientBase: "170+ Clients",
    efficiency: "94% Success Rate",
    serviceLevel: "Standard",
    premiumPartner: false,
    contact: "+91 65432 89012",
    email: "xpressdocs@email.com",
    workingHours: {
      weekdays: "8:00 AM - 8:00 PM",
      weekends: "9:00 AM - 7:00 PM",
    },
  },
  {
    name: "Copy & Go",
    address: "Tambaram, Chennai",
    services: "Printing, Xerox",
    rating: 4.0,
    reviews: 62,
    distance: "2.0 km",
    waitTime: "13 min",
    open: true,
    established: "Since 2020",
    clientBase: "140+ Clients",
    efficiency: "89% Success Rate",
    serviceLevel: "Standard",
    premiumPartner: false,
    contact: "+91 54321 78901",
    email: "copyandgo@email.com",
    workingHours: {
      weekdays: "8:00 AM - 9:00 PM",
      weekends: "8:30 AM - 8:00 PM",
    },
  },
  {
    name: "PrintXpress",
    address: "Velachery, Chennai",
    services: "Scanning, Xerox",
    rating: 4.6,
    reviews: 85,
    distance: "1.6 km",
    waitTime: "9 min",
    open: true,
    established: "Since 2018",
    clientBase: "230+ Clients",
    efficiency: "95% Success Rate",
    serviceLevel: "Standard",
    premiumPartner: false,
    contact: "+91 43210 67890",
    email: "printxpress@email.com",
    workingHours: {
      weekdays: "8:30 AM - 8:30 PM",
      weekends: "9:00 AM - 7:00 PM",
    },
  },
  {
    name: "Xerox Point",
    address: "Porur, Chennai",
    services: "Binding, Copy",
    rating: 4.1,
    reviews: 73,
    distance: "3.3 km",
    waitTime: "16 min",
    open: true,
    established: "Since 2017",
    clientBase: "185+ Clients",
    efficiency: "90% Success Rate",
    serviceLevel: "Standard",
    premiumPartner: false,
    contact: "+91 32109 56789",
    email: "xeroxpoint@email.com",
    workingHours: {
      weekdays: "9:00 AM - 8:00 PM",
      weekends: "9:30 AM - 6:30 PM",
    },
  },
  {
    name: "QuickCopy",
    address: "Guindy, Chennai",
    services: "Print, Scan",
    rating: 4.4,
    reviews: 79,
    distance: "1.0 km",
    waitTime: "7 min",
    open: false,
    established: "Since 2021",
    clientBase: "155+ Clients",
    efficiency: "93% Success Rate",
    serviceLevel: "Standard",
    premiumPartner: false,
    contact: "+91 21098 45678",
    email: "quickcopy@email.com",
    workingHours: {
      weekdays: "8:00 AM - 8:00 PM",
      weekends: "9:00 AM - 7:00 PM",
    },
  },
  {
    name: "Digital Prints",
    address: "Mylapore, Chennai",
    services: "Color Print, Laminating",
    rating: 4.8,
    reviews: 121,
    distance: "1.7 km",
    waitTime: "10 min",
    open: true,
    established: "Since 2016",
    clientBase: "270+ Clients",
    efficiency: "97% Success Rate",
    serviceLevel: "Enterprise",
    premiumPartner: true,
    contact: "+91 10987 34567",
    email: "digitalprints@email.com",
    workingHours: {
      weekdays: "8:00 AM - 9:00 PM",
      weekends: "9:00 AM - 8:00 PM",
    },
  },
  {
    name: "Express Prints",
    address: "Anna Nagar, Chennai",
    services: "Xerox, Scanning",
    rating: 4.3,
    reviews: 82,
    distance: "0.8 km",
    waitTime: "5 min",
    open: true,
    established: "Since 2019",
    clientBase: "195+ Clients",
    efficiency: "94% Success Rate",
    serviceLevel: "Standard",
    premiumPartner: false,
    contact: "+91 98765 23456",
    email: "expressprints@email.com",
    workingHours: {
      weekdays: "8:30 AM - 8:30 PM",
      weekends: "9:00 AM - 7:00 PM",
    },
  },
  {
    name: "Fast Copy",
    address: "T Nagar, Chennai",
    services: "Printing, Copy",
    rating: 4.2,
    reviews: 74,
    distance: "1.2 km",
    waitTime: "11 min",
    open: true,
    established: "Since 2017",
    clientBase: "205+ Clients",
    efficiency: "92% Success Rate",
    serviceLevel: "Standard",
    premiumPartner: false,
    contact: "+91 87654 12345",
    email: "fastcopy@email.com",
    workingHours: {
      weekdays: "9:00 AM - 8:00 PM",
      weekends: "9:30 AM - 6:30 PM",
    },
  },
  {
    name: "Print Hub",
    address: "Adyar, Chennai",
    services: "Scan, Color Print",
    rating: 4.5,
    reviews: 88,
    distance: "0.6 km",
    waitTime: "7 min",
    open: false,
    established: "Since 2020",
    clientBase: "165+ Clients",
    efficiency: "95% Success Rate",
    serviceLevel: "Standard",
    premiumPartner: false,
    contact: "+91 76543 01234",
    email: "printhub@email.com",
    workingHours: {
      weekdays: "8:00 AM - 8:00 PM",
      weekends: "9:00 AM - 7:00 PM",
    },
  },
  {
    name: "Copy Center",
    address: "Tambaram, Chennai",
    services: "Xerox, Laminating",
    rating: 4.0,
    reviews: 67,
    distance: "2.2 km",
    waitTime: "14 min",
    open: true,
    established: "Since 2018",
    clientBase: "145+ Clients",
    efficiency: "88% Success Rate",
    serviceLevel: "Standard",
    premiumPartner: false,
    contact: "+91 65432 90123",
    email: "copycenter@email.com",
    workingHours: {
      weekdays: "8:00 AM - 9:00 PM",
      weekends: "8:30 AM - 8:00 PM",
    },
  },
  {
    name: "Smart Copy Corner",
    address: "Velachery, Chennai",
    services: "Printing, Scan, Binding",
    rating: 4.3,
    reviews: 81,
    distance: "1.3 km",
    waitTime: "8 min",
    open: true,
    established: "Since 2019",
    clientBase: "215+ Clients",
    efficiency: "94% Success Rate",
    serviceLevel: "Standard",
    premiumPartner: false,
    contact: "+91 54321 89012",
    email: "smartcopy@email.com",
    workingHours: {
      weekdays: "8:30 AM - 8:30 PM",
      weekends: "9:00 AM - 7:00 PM",
    },
  },
  {
    name: "Elite Print House",
    address: "Porur, Chennai",
    services: "Photo Copy, Color Print",
    rating: 4.4,
    reviews: 77,
    distance: "3.0 km",
    waitTime: "15 min",
    open: true,
    established: "Since 2016",
    clientBase: "195+ Clients",
    efficiency: "93% Success Rate",
    serviceLevel: "Standard",
    premiumPartner: false,
    contact: "+91 43210 78901",
    email: "eliteprint@email.com",
    workingHours: {
      weekdays: "9:00 AM - 8:00 PM",
      weekends: "9:30 AM - 6:30 PM",
    },
  },
  {
    name: "Modern Xerox Studio",
    address: "Guindy, Chennai",
    services: "Scan, Binding",
    rating: 4.5,
    reviews: 86,
    distance: "1.0 km",
    waitTime: "6 min",
    open: false,
    established: "Since 2021",
    clientBase: "160+ Clients",
    efficiency: "96% Success Rate",
    serviceLevel: "Standard",
    premiumPartner: false,
    contact: "+91 32109 67890",
    email: "modernxerox@email.com",
    workingHours: {
      weekdays: "8:00 AM - 8:00 PM",
      weekends: "9:00 AM - 7:00 PM",
    },
  },
  {
    name: "DocuFast",
    address: "Mylapore, Chennai",
    services: "Online Print, Scanning",
    rating: 4.7,
    reviews: 105,
    distance: "1.6 km",
    waitTime: "9 min",
    open: true,
    established: "Since 2015",
    clientBase: "290+ Clients",
    efficiency: "97% Success Rate",
    serviceLevel: "Enterprise",
    premiumPartner: true,
    contact: "+91 21098 56789",
    email: "docufast@email.com",
    workingHours: {
      weekdays: "8:00 AM - 9:00 PM",
      weekends: "9:00 AM - 8:00 PM",
    },
  },
  {
    name: "PaperWorks",
    address: "Anna Nagar, Chennai",
    services: "Copy, Lamination",
    rating: 4.2,
    reviews: 72,
    distance: "0.9 km",
    waitTime: "7 min",
    open: true,
    established: "Since 2018",
    clientBase: "200+ Clients",
    efficiency: "92% Success Rate",
    serviceLevel: "Standard",
    premiumPartner: false,
    contact: "+91 10987 45678",
    email: "paperworks@email.com",
    workingHours: {
      weekdays: "8:30 AM - 8:30 PM",
      weekends: "9:00 AM - 7:00 PM",
    },
  },
  {
    name: "QuickDoc",
    address: "T Nagar, Chennai",
    services: "Xerox, Scan, Print",
    rating: 4.3,
    reviews: 79,
    distance: "1.1 km",
    waitTime: "10 min",
    open: true,
    established: "Since 2017",
    clientBase: "210+ Clients",
    efficiency: "93% Success Rate",
    serviceLevel: "Standard",
    premiumPartner: false,
    contact: "+91 98765 34567",
    email: "quickdoc@email.com",
    workingHours: {
      weekdays: "9:00 AM - 8:00 PM",
      weekends: "9:30 AM - 6:30 PM",
    },
  },
  {
    name: "Star Print Zone",
    address: "Adyar, Chennai",
    services: "Binding, Copy, Color Print",
    rating: 4.6,
    reviews: 94,
    distance: "0.7 km",
    waitTime: "8 min",
    open: true,
    established: "Since 2019",
    clientBase: "175+ Clients",
    efficiency: "95% Success Rate",
    serviceLevel: "Standard",
    premiumPartner: false,
    contact: "+91 87654 23456",
    email: "starprint@email.com",
    workingHours: {
      weekdays: "8:00 AM - 8:00 PM",
      weekends: "9:00 AM - 7:00 PM",
    },
  },
  {
    name: "CopyCity",
    address: "Tambaram, Chennai",
    services: "Xerox, Lamination",
    rating: 4.1,
    reviews: 68,
    distance: "2.4 km",
    waitTime: "13 min",
    open: true,
    established: "Since 2020",
    clientBase: "150+ Clients",
    efficiency: "89% Success Rate",
    serviceLevel: "Standard",
    premiumPartner: false,
    contact: "+91 76543 12345",
    email: "copycity@email.com",
    workingHours: {
      weekdays: "8:00 AM - 9:00 PM",
      weekends: "8:30 AM - 8:00 PM",
    },
  },
];

const ShopAndServiceManagement = () => {
  const [shops, setShops] = useState([]);
  const [newShop, setNewShop] = useState({
    name: "",
    address: "",
    rating: "",
    reviews: "",
    open: true,
    established: "",
    clientBase: "",
    efficiency: "",
    serviceLevel: "Standard",
    premiumPartner: false,
    contact: "",
    email: "",
    workingHours: { weekdays: "", weekends: "" },
  });
  const [masterServices, setMasterServices] = useState([]);
  const [activeTab, setActiveTab] = useState("shops");
  const [loadingShop, setLoadingShop] = useState(false);

  // Service assign mode
  const [selectedShopId, setSelectedShopId] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [assigning, setAssigning] = useState(false);

  // Load shops and all services
  useEffect(() => {
    fetch(`${API_URL}/shops`)
      .then((res) => res.json())
      .then((data) => setShops(data));
  }, []);
  useEffect(() => {
    if (activeTab === "services" || assigning) {
      fetch(`${API_URL}/service-master`)
        .then((res) => res.json())
        .then((data) => setMasterServices(data));
    }
  }, [activeTab, assigning]);

  const handleShopInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("workingHours.")) {
      const field = name.split(".")[1];
      setNewShop((prev) => ({
        ...prev,
        workingHours: { ...prev.workingHours, [field]: value },
      }));
    } else {
      setNewShop((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleAddShop = async (e) => {
    e.preventDefault();
    setLoadingShop(true);
    try {
      const res = await fetch(`${API_URL}/shops`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newShop),
      });
      if (res.ok) {
        const shop = await res.json();
        setShops((prev) => [...prev, shop]);
        setNewShop({
          name: "",
          address: "",
          rating: "",
          reviews: "",
          open: true,
          established: "",
          clientBase: "",
          efficiency: "",
          serviceLevel: "Standard",
          premiumPartner: false,
          contact: "",
          email: "",
          workingHours: { weekdays: "", weekends: "" },
        });
      }
    } finally {
      setLoadingShop(false);
    }
  };

  // Button to bulk add EXISTING_SHOPS without id/image
  const handleAddExistingShops = async () => {
    for (let shop of EXISTING_SHOPS) {
      // Destructure to only allow correct fields
      const {
        name,
        address,
        rating,
        reviews,
        open,
        established,
        clientBase,
        efficiency,
        serviceLevel,
        premiumPartner,
        contact,
        email,
        workingHours,
      } = shop;
      // Only send allowed fields, ignore others (id, image, distance, waitTime, etc)
      const filteredShop = {
        name,
        address,
        rating,
        reviews,
        open,
        established,
        clientBase,
        efficiency,
        serviceLevel,
        premiumPartner,
        contact,
        email,
        workingHours,
      };

      // Basic required field check
      if (!filteredShop.name || !filteredShop.address) {
        console.warn(`Skipping shop (missing name/address):`, shop);
        continue;
      }

      await fetch(`${API_URL}/shops`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filteredShop),
      });
    }
    // Refresh shops after adding
    fetch(`${API_URL}/shops`)
      .then((res) => res.json())
      .then((data) => setShops(data));
  };

  // Service assignment logic
  const startAssignServices = (shopId) => {
    setSelectedShopId(shopId);
    const found = shops.find((s) => s._id === shopId);
    setSelectedServices(found?.services?.map((s) => s._id) || []);
    setAssigning(true);
  };
  const handleServiceCheckbox = (id) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };
  const handleSaveShopServices = async () => {
    await fetch(`${API_URL}/shops/${selectedShopId}/services`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ serviceIds: selectedServices }),
    });
    fetch(`${API_URL}/shops`)
      .then((res) => res.json())
      .then((data) => setShops(data));
    setAssigning(false);
    setSelectedShopId("");
    setSelectedServices([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Shop & Service Management
          </h1>
          <p className="text-gray-600">
            Manage printing shops and assign available service categories
          </p>
        </div>
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab("shops")}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === "shops"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              Shop Management
            </button>
            <button
              onClick={() => setActiveTab("services")}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === "services"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              Assign Services to Shop
            </button>
          </div>
        </div>

        {/* Add/manual shops */}
        {activeTab === "shops" && (
          <div>
            <button
              className="mb-4 px-6 py-2 rounded bg-green-600 text-white font-bold hover:bg-green-800"
              onClick={handleAddExistingShops}
            >
              ➕ Add All Existing Shops
            </button>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Manual form remains unchanged */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Add New Shop
                </h2>
                <form onSubmit={handleAddShop} className="space-y-4">
                  {/* ...same shop input fields as previously... */}
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
                    disabled={loadingShop}
                  >
                    {loadingShop ? "Adding..." : "Add Shop"}
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
                        key={shop._id}
                        className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-800">
                              {shop.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {shop.address}
                            </p>
                            <div className="flex items-center space-x-4 mt-2">
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
                              {shop.premiumPartner && (
                                <span className="text-sm text-yellow-600">
                                  ⭐ Premium
                                </span>
                              )}
                            </div>
                            <div className="text-xs mt-2">
                              Assigned Services:{" "}
                              {shop.services && shop.services.length > 0 ? (
                                shop.services.map((service) => (
                                  <span
                                    className="inline-block bg-gray-100 px-2 py-1 rounded mr-2 mb-1"
                                    key={service._id}
                                  >
                                    {service.title}
                                  </span>
                                ))
                              ) : (
                                <span className="italic text-gray-400">
                                  None
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              {shop.established} | {shop.clientBase}
                            </p>
                            <p className="text-xs text-gray-500">
                              {shop.efficiency}
                            </p>
                            <p className="text-xs text-gray-500">
                              {shop.workingHours.weekdays} (Weekdays);{" "}
                              {shop.workingHours.weekends} (Weekends)
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <button
                              className="text-blue-600 hover:text-blue-800 p-1"
                              onClick={() => startAssignServices(shop._id)}
                            >
                              🛠️ Assign Services
                            </button>
                            <button
                              onClick={() => handleDeleteShop(shop._id)}
                              className="text-red-600 hover:text-red-800 p-1"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Service Assignment UI */}
        {activeTab === "services" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Assign Services to a Shop
            </h2>
            <div className="mb-4">
              <label className="block mb-1 text-gray-700">Select Shop:</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded"
                value={selectedShopId}
                onChange={(e) => startAssignServices(e.target.value)}
              >
                <option value="">-- Select Shop --</option>
                {shops.map((shop) => (
                  <option key={shop._id} value={shop._id}>
                    {shop.name} ({shop.address})
                  </option>
                ))}
              </select>
            </div>
            {assigning && (
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">
                  Select Services to Assign
                </h3>
                <div className="max-h-60 overflow-y-auto space-y-2 mb-4">
                  {masterServices.map((service) => (
                    <label
                      key={service._id}
                      className="flex items-start space-x-2 bg-gray-50 p-2 rounded"
                    >
                      <input
                        type="checkbox"
                        className="mt-1"
                        checked={selectedServices.includes(service._id)}
                        onChange={() => handleServiceCheckbox(service._id)}
                      />
                      <div>
                        <div className="font-semibold text-sm">
                          {service.title}
                          {service.sub ? ` (${service.sub})` : ""}
                        </div>
                        <div className="text-xs text-gray-600">
                          {service.desc}
                        </div>
                        {service.extras?.length > 0 && (
                          <div className="flex flex-wrap mt-1 gap-1">
                            {service.extras.map((extra, idx) => (
                              <span
                                className="px-2 py-1 bg-gray-100 text-xs rounded"
                                key={idx}
                              >
                                {extra.name}{" "}
                                <span className="italic">
                                  {extra.appointmentType}
                                </span>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
                <button
                  onClick={handleSaveShopServices}
                  className="w-full py-3 mt-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
                >
                  Save Assigned Services
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopAndServiceManagement;
