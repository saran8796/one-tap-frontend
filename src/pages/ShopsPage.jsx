import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Maps2 from "../components/MapLoop";

// 🏪 30 Complete Shop Data with Full Details
const shops = [
  {
    id: 1,
    name: "Digital Print Solutions",
    address: "Tech Park, Velachery, Chennai",
    services: "Digital Printing, High-Res Scanning, Color Services",
    rating: 4.7,
    reviews: 128,
    distance: "1.5 km",
    waitTime: "6 min",
    open: true,
    image: "🖨",
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
    id: 2,
    name: "Corporate Document Center",
    address: "Financial District, T Nagar, Chennai",
    services: "Color Printing, Lamination, Binding Services",
    rating: 4.6,
    reviews: 95,
    distance: "1.2 km",
    waitTime: "8 min",
    open: true,
    image: "📄",
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
    id: 3,
    name: "Smart Xerox Center",
    address: "Anna Nagar, Chennai",
    services: "Xerox, Printing, Scanning",
    rating: 4.5,
    reviews: 87,
    distance: "0.8 km",
    waitTime: "5 min",
    open: true,
    image: "🖨",
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
    id: 4,
    name: "Speed Print & Xerox",
    address: "T Nagar, Chennai",
    services: "Color Print, Lamination",
    rating: 4.2,
    reviews: 76,
    distance: "1.2 km",
    waitTime: "10 min",
    open: true,
    image: "📄",
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
    id: 5,
    name: "Copy World",
    address: "Adyar, Chennai",
    services: "Xerox, Binding, Printout",
    rating: 4.7,
    reviews: 112,
    distance: "0.5 km",
    waitTime: "7 min",
    open: false,
    image: "📑",
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
    id: 6,
    name: "Express Xerox Point",
    address: "Tambaram, Chennai",
    services: "Online Applications, Printouts",
    rating: 4.0,
    reviews: 64,
    distance: "2.1 km",
    waitTime: "12 min",
    open: true,
    image: "⚡",
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
    id: 7,
    name: "Quick Print Hub",
    address: "Velachery, Chennai",
    services: "Xerox, Color Print, Scan",
    rating: 4.6,
    reviews: 89,
    distance: "1.5 km",
    waitTime: "9 min",
    open: true,
    image: "🏪",
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
    id: 8,
    name: "Bright Xerox Shop",
    address: "Porur, Chennai",
    services: "Xerox, Photo Copy, Printing",
    rating: 4.1,
    reviews: 71,
    distance: "3.2 km",
    waitTime: "15 min",
    open: true,
    image: "✨",
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
    id: 9,
    name: "Green Print & Copy",
    address: "Guindy, Chennai",
    services: "Xerox, Online Services",
    rating: 4.4,
    reviews: 83,
    distance: "0.9 km",
    waitTime: "8 min",
    open: false,
    image: "🌿",
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
    id: 10,
    name: "Digital Doc Center",
    address: "Mylapore, Chennai",
    services: "Scanning, Lamination, Printing",
    rating: 4.8,
    reviews: 134,
    distance: "1.8 km",
    waitTime: "11 min",
    open: true,
    image: "💻",
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
    id: 11,
    name: "Speedy Copy",
    address: "Anna Nagar, Chennai",
    services: "Xerox, Printing",
    rating: 4.3,
    reviews: 78,
    distance: "0.9 km",
    waitTime: "6 min",
    open: true,
    image: "📠",
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
    id: 12,
    name: "PrintPro",
    address: "T Nagar, Chennai",
    services: "Lamination, Binding",
    rating: 4.2,
    reviews: 69,
    distance: "1.1 km",
    waitTime: "10 min",
    open: true,
    image: "📝",
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
    id: 13,
    name: "Xpress Docs",
    address: "Adyar, Chennai",
    services: "Color Print, Scan",
    rating: 4.5,
    reviews: 91,
    distance: "0.7 km",
    waitTime: "8 min",
    open: false,
    image: "📂",
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
    id: 14,
    name: "Copy & Go",
    address: "Tambaram, Chennai",
    services: "Printing, Xerox",
    rating: 4.0,
    reviews: 62,
    distance: "2.0 km",
    waitTime: "13 min",
    open: true,
    image: "✂",
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
    id: 15,
    name: "PrintXpress",
    address: "Velachery, Chennai",
    services: "Scanning, Xerox",
    rating: 4.6,
    reviews: 85,
    distance: "1.6 km",
    waitTime: "9 min",
    open: true,
    image: "🖨",
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
    id: 16,
    name: "Xerox Point",
    address: "Porur, Chennai",
    services: "Binding, Copy",
    rating: 4.1,
    reviews: 73,
    distance: "3.3 km",
    waitTime: "16 min",
    open: true,
    image: "📑",
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
    id: 17,
    name: "QuickCopy",
    address: "Guindy, Chennai",
    services: "Print, Scan",
    rating: 4.4,
    reviews: 79,
    distance: "1.0 km",
    waitTime: "7 min",
    open: false,
    image: "⚡",
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
    id: 18,
    name: "Digital Prints",
    address: "Mylapore, Chennai",
    services: "Color Print, Laminating",
    rating: 4.8,
    reviews: 121,
    distance: "1.7 km",
    waitTime: "10 min",
    open: true,
    image: "💻",
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
    id: 19,
    name: "Express Prints",
    address: "Anna Nagar, Chennai",
    services: "Xerox, Scanning",
    rating: 4.3,
    reviews: 82,
    distance: "0.8 km",
    waitTime: "5 min",
    open: true,
    image: "📠",
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
    id: 20,
    name: "Fast Copy",
    address: "T Nagar, Chennai",
    services: "Printing, Copy",
    rating: 4.2,
    reviews: 74,
    distance: "1.2 km",
    waitTime: "11 min",
    open: true,
    image: "📝",
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
    id: 21,
    name: "Print Hub",
    address: "Adyar, Chennai",
    services: "Scan, Color Print",
    rating: 4.5,
    reviews: 88,
    distance: "0.6 km",
    waitTime: "7 min",
    open: false,
    image: "📂",
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
    id: 22,
    name: "Copy Center",
    address: "Tambaram, Chennai",
    services: "Xerox, Laminating",
    rating: 4.0,
    reviews: 67,
    distance: "2.2 km",
    waitTime: "14 min",
    open: true,
    image: "✂",
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
    id: 23,
    name: "Smart Copy Corner",
    address: "Velachery, Chennai",
    services: "Printing, Scan, Binding",
    rating: 4.3,
    reviews: 81,
    distance: "1.3 km",
    waitTime: "8 min",
    open: true,
    image: "🖨",
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
    id: 24,
    name: "Elite Print House",
    address: "Porur, Chennai",
    services: "Photo Copy, Color Print",
    rating: 4.4,
    reviews: 77,
    distance: "3.0 km",
    waitTime: "15 min",
    open: true,
    image: "📘",
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
    id: 25,
    name: "Modern Xerox Studio",
    address: "Guindy, Chennai",
    services: "Scan, Binding",
    rating: 4.5,
    reviews: 86,
    distance: "1.0 km",
    waitTime: "6 min",
    open: false,
    image: "🖱",
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
    id: 26,
    name: "DocuFast",
    address: "Mylapore, Chennai",
    services: "Online Print, Scanning",
    rating: 4.7,
    reviews: 105,
    distance: "1.6 km",
    waitTime: "9 min",
    open: true,
    image: "🧾",
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
    id: 27,
    name: "PaperWorks",
    address: "Anna Nagar, Chennai",
    services: "Copy, Lamination",
    rating: 4.2,
    reviews: 72,
    distance: "0.9 km",
    waitTime: "7 min",
    open: true,
    image: "📜",
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
    id: 28,
    name: "QuickDoc",
    address: "T Nagar, Chennai",
    services: "Xerox, Scan, Print",
    rating: 4.3,
    reviews: 79,
    distance: "1.1 km",
    waitTime: "10 min",
    open: true,
    image: "📋",
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
    id: 29,
    name: "Star Print Zone",
    address: "Adyar, Chennai",
    services: "Binding, Copy, Color Print",
    rating: 4.6,
    reviews: 94,
    distance: "0.7 km",
    waitTime: "8 min",
    open: true,
    image: "💫",
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
    id: 30,
    name: "CopyCity",
    address: "Tambaram, Chennai",
    services: "Xerox, Lamination",
    rating: 4.1,
    reviews: 68,
    distance: "2.4 km",
    waitTime: "13 min",
    open: true,
    image: "🏙",
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

export default function Shops() {
  const [filterPlace, setFilterPlace] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(false);

  const filteredShops = shops.filter((shop) => {
    const matchesPlace =
      filterPlace === "All" ||
      shop.address.toLowerCase().includes(filterPlace.toLowerCase());
    const matchesSearch =
      shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPlace && matchesSearch;
  });

  const shopsToShow = filteredShops.slice(0, visibleCount);
  const hasMoreShops = visibleCount < filteredShops.length;
  const totalShops = filteredShops.length;

  const handleShowMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prevCount) => Math.min(prevCount + 4, totalShops));
      setLoading(false);
    }, 500);
  };

  const handleShowLess = () => {
    setVisibleCount(4);
  };

  const handleScheduleService = (shop) => {
    alert(
      `Scheduling service for ${shop.name}\nContact: ${shop.contact}\nEmail: ${shop.email}`
    );
    // Here you can implement your scheduling logic
    // For example: navigate to scheduling page, open modal, etc.
  };

  useEffect(() => {
    setVisibleCount(4);
  }, [filterPlace, searchQuery]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Header */}

      <div className="map-wrap flex justify-center">
        {/* Background Map */}
        <div className="map-background">
          <Maps2 />
        </div>

        {/* Text Content Overlay */}
        <div className="map-text-overlay flex justify-center items-center">
          <div>
            <h2 className="text-5xl font-bold mb-4">
              Professional Printing Partners
            </h2>
            <p className="text-lg max-w-3xl mx-auto ">
              Connect with certified business printing centers offering
              enterprise-grade solutions for all your corporate document needs.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">🔍</span>
                </div>
                <input
                  type="text"
                  placeholder="Search by shop name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200"
                />
              </div>
            </div>

            <div className="w-full md:w-auto">
              <select
                value={filterPlace}
                onChange={(e) => setFilterPlace(e.target.value)}
                className="w-full md:w-auto px-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200"
              >
                <option value="All">All Areas</option>
                <option value="Anna Nagar">Anna Nagar</option>
                <option value="T Nagar">T Nagar</option>
                <option value="Adyar">Adyar</option>
                <option value="Tambaram">Tambaram</option>
                <option value="Velachery">Velachery</option>
                <option value="Porur">Porur</option>
                <option value="Guindy">Guindy</option>
                <option value="Mylapore">Mylapore</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-gray-700">
            <span className="font-semibold text-blue-600">{totalShops}</span>{" "}
            shops found
            {filterPlace !== "All" && (
              <span>
                {" "}
                in{" "}
                <span className="font-semibold text-blue-600">
                  {filterPlace}
                </span>
              </span>
            )}
          </div>
          <div className="text-sm text-gray-500">
            Showing{" "}
            <span className="text-blue-600 font-medium">
              {shopsToShow.length}
            </span>{" "}
            of {totalShops}
          </div>
        </div>

        {/* Shop Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {shopsToShow.map((shop) => (
            <div
              key={shop.id}
              className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* Card Header */}
              <div className="p-5 border-b border-gray-100">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900">
                    {shop.name}
                  </h3>
                  <div className="flex items-center space-x-2">
                    {shop.premiumPartner && (
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        Premium Partner
                      </span>
                    )}
                    <div
                      className={`px-2.5 py-0.5 rounded text-xs font-medium ${
                        shop.open
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {shop.open ? "OPEN" : "CLOSED"}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-gray-600">
                  <span>📍</span>
                  <span>{shop.address}</span>
                </div>
              </div>

              {/* Business Details */}
              <div className="p-5 border-b border-gray-100">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">
                      Business Location
                    </div>
                    <div className="font-medium">
                      {shop.address.split(",")[0]}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">
                      Client Base
                    </div>
                    <div className="font-medium">{shop.clientBase}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">
                      Established
                    </div>
                    <div className="font-medium">{shop.established}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Efficiency</div>
                    <div className="font-medium">{shop.efficiency}</div>
                  </div>
                </div>
              </div>

              {/* Core Services */}
              <div className="p-5 border-b border-gray-100">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">
                  CORE SERVICES
                </h4>
                <p className="text-gray-700">{shop.services}</p>
              </div>

              {/* Footer with Single Schedule Service Button */}
              <div className="p-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Distance</div>
                      <div className="font-medium">{shop.distance}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Wait Time</div>
                      <div className="font-medium">{shop.waitTime}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Service Level</div>
                      <div className="font-medium">{shop.serviceLevel}</div>
                    </div>

                    <Link
                      to="/Allservice"
                      state={{ shop: shop }}
                      className={`px-6 py-3 font-medium rounded-lg transition-all duration-200 text-center block ${
                        shop.open
                          ? "bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none"
                      }`}
                    >
                      {shop.open ? "Schedule Service" : "Currently Closed"}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More / Show Less Buttons */}
        <div className="text-center mb-8">
          {hasMoreShops && (
            <button
              onClick={handleShowMore}
              disabled={loading}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mx-auto"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Loading...
                </>
              ) : (
                `Show More (${totalShops - visibleCount} remaining)`
              )}
            </button>
          )}

          {visibleCount > 4 && (
            <button
              onClick={handleShowLess}
              className="mt-4 px-6 py-2 text-blue-600 hover:text-blue-800 font-medium rounded-lg transition-colors duration-200"
            >
              Show Less
            </button>
          )}
        </div>

        {/* Enterprise Features */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 mb-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Professional Network
            </h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Enterprise-grade solutions trusted by leading businesses and
              corporations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🔒",
                title: "Secure & Confidential",
                description:
                  "Enterprise-grade security for all your sensitive business documents",
              },
              {
                icon: "⚡",
                title: "Rapid Turnaround",
                description:
                  "Express services with guaranteed delivery timelines",
              },
              {
                icon: "💎",
                title: "Premium Quality",
                description:
                  "Professional-grade equipment and materials for superior results",
              },
              {
                icon: "🔄",
                title: "Scalable Solutions",
                description: "From single documents to bulk corporate orders",
              },
              {
                icon: "📊",
                title: "Detailed Reporting",
                description:
                  "Comprehensive service analytics and usage reports",
              },
              {
                icon: "🌟",
                title: "Dedicated Support",
                description:
                  "Professional account management and technical support",
              },
            ].map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 group-hover:bg-blue-100 transition-colors duration-200">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Results Summary */}
        <div className="text-center py-6 border-t border-gray-200">
          <div className="text-gray-600">
            <span className="font-medium">{totalShops}</span> shops available •
            <span className="text-green-600 font-medium ml-2">
              {shops.filter((shop) => shop.open).length} open now
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
