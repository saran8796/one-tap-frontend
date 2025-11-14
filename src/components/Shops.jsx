import React from "react";
import { Link } from "react-router-dom";

// 🏪 15 Dummy Shops Data
const shops = [
  {
    id: 1,
    name: "Digital Print Solutions",
    address: "Tech Park, Velachery",
    services: "Digital Printing, Scanning",
    rating: 4.7,
    reviews: 128,
    distance: "1.5 km",
    waitTime: "6 min",
    schedule: true,
    image: "🖨",
    established: "2017",
    clientBase: "400+",
    efficiency: "96%",
    serviceLevel: "Enterprise",
    premiumPartner: true,
  },
  {
    id: 2,
    name: "Corporate Document Center",
    address: "Financial District, T Nagar",
    services: "Color Print, Lamination",
    rating: 4.6,
    reviews: 95,
    distance: "1.2 km",
    waitTime: "8 min",
    schedule: true,
    image: "📄",
    established: "2015",
    clientBase: "300+",
    efficiency: "95%",
    serviceLevel: "Enterprise",
    premiumPartner: true,
  },
  {
    id: 3,
    name: "Smart Xerox Center",
    address: "Anna Nagar",
    services: "Xerox, Printing",
    rating: 4.5,
    reviews: 87,
    distance: "0.8 km",
    waitTime: "5 min",
    schedule: true,
    image: "🖨",
    established: "2018",
    clientBase: "250+",
    efficiency: "94%",
    serviceLevel: "Standard",
    premiumPartner: false,
  },
  {
    id: 4,
    name: "Speed Print & Xerox",
    address: "T Nagar",
    services: "Color Print, Lamination",
    rating: 4.2,
    reviews: 76,
    distance: "1.2 km",
    waitTime: "10 min",
    schedule: true,
    image: "📄",
    established: "2016",
    clientBase: "200+",
    efficiency: "92%",
    serviceLevel: "Standard",
    premiumPartner: false,
  },
  {
    id: 5,
    name: "Copy World",
    address: "Adyar",
    services: "Xerox, Binding",
    rating: 4.7,
    reviews: 112,
    distance: "0.5 km",
    waitTime: "7 min",
    schedule: false,
    image: "📑",
    established: "2019",
    clientBase: "180+",
    efficiency: "93%",
    serviceLevel: "Standard",
    premiumPartner: false,
  },
  {
    id: 6,
    name: "Express Xerox Point",
    address: "Tambaram",
    services: "Online Applications",
    rating: 4.0,
    reviews: 64,
    distance: "2.1 km",
    waitTime: "12 min",
    schedule: true,
    image: "⚡",
    established: "2020",
    clientBase: "150+",
    efficiency: "90%",
    serviceLevel: "Standard",
    premiumPartner: false,
  },
  {
    id: 7,
    name: "Quick Print Hub",
    address: "Velachery",
    services: "Xerox, Color Print",
    rating: 4.6,
    reviews: 89,
    distance: "1.5 km",
    waitTime: "9 min",
    schedule: true,
    image: "🏪",
    established: "2019",
    clientBase: "220+",
    efficiency: "94%",
    serviceLevel: "Standard",
    premiumPartner: false,
  },
  {
    id: 8,
    name: "Bright Xerox Shop",
    address: "Porur",
    services: "Xerox, Photo Copy",
    rating: 4.1,
    reviews: 71,
    distance: "3.2 km",
    waitTime: "15 min",
    schedule: true,
    image: "✨",
    established: "2017",
    clientBase: "190+",
    efficiency: "91%",
    serviceLevel: "Standard",
    premiumPartner: false,
  },
  {
    id: 9,
    name: "Green Print & Copy",
    address: "Guindy",
    services: "Xerox, Online",
    rating: 4.4,
    reviews: 83,
    distance: "0.9 km",
    waitTime: "8 min",
    schedule: false,
    image: "🌿",
    established: "2021",
    clientBase: "160+",
    efficiency: "92%",
    serviceLevel: "Standard",
    premiumPartner: false,
  },
  {
    id: 10,
    name: "Digital Doc Center",
    address: "Mylapore",
    services: "Scanning, Lamination",
    rating: 4.8,
    reviews: 134,
    distance: "1.8 km",
    waitTime: "11 min",
    schedule: true,
    image: "💻",
    established: "2015",
    clientBase: "280+",
    efficiency: "96%",
    serviceLevel: "Enterprise",
    premiumPartner: true,
  },
];

export default function Shops() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-100 py-8 px-4 relative overflow-hidden">
      {/* Unique Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large Circles - Darker */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-200 rounded-full opacity-30 blur-xl"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-200 rounded-full opacity-40 blur-xl"></div>

        {/* Medium Circles */}
        <div className="absolute top-1/3 right-10 w-60 h-60 bg-slate-200 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute bottom-1/4 left-10 w-52 h-52 bg-blue-300 rounded-full opacity-25 blur-xl"></div>

        {/* Small Floating Shapes */}
        <div className="absolute top-1/4 left-10 w-12 h-12 bg-blue-300 rounded-lg opacity-20 animate-float"></div>
        <div
          className="absolute top-1/2 right-20 w-8 h-8 bg-indigo-300 rounded-full opacity-25 animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-1/3 left-1/4 w-10 h-10 bg-slate-300 rounded-lg opacity-20 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-3/4 right-1/3 w-6 h-6 bg-blue-400 rounded-full opacity-30 animate-float"
          style={{ animationDelay: "1.5s" }}
        ></div>

        {/* Grid Pattern Overlay - More Visible */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

        {/* Subtle Scan Lines Effect */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(transparent_0px,transparent_1px,rgba(99,102,241,0.03)_1px,rgba(99,102,241,0.03)_2px)]"></div>
      </div>

      {/* Printer Icons Background - More Visible */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-10 left-5 text-4xl">🖨️</div>
        <div className="absolute top-40 right-10 text-3xl">📄</div>
        <div className="absolute bottom-20 left-20 text-4xl">📑</div>
        <div className="absolute bottom-40 right-1/4 text-3xl">🖨️</div>
        <div className="absolute top-1/3 left-1/3 text-2xl">📄</div>
        <div className="absolute top-2/3 right-20 text-3xl">📊</div>
        <div className="absolute bottom-10 left-1/2 text-2xl">🖨️</div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Heading with Background */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/60 to-transparent rounded-2xl -m-4 transform rotate-1"></div>
          <div className="relative">
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
              Premium Printing Shops
            </h1>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto leading-relaxed">
              Discover the best printing services near you with our curated
              selection of premium partners
            </p>

            {/* Decorative Elements */}
            <div className="flex justify-center items-center space-x-2 mt-4">
              <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
              <div
                className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Cards Grid with Enhanced Container */}
        <div className="relative mb-12">
          {/* Background Glow Effect - Darker */}
          <div className="absolute inset-0 bg-blue-300/30 rounded-3xl blur-3xl -z-10 transform scale-105"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {shops.map((shop) => (
              <div
                key={shop.id}
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/70 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden group"
              >
                {/* Premium Partner Ribbon */}
                {shop.premiumPartner && (
                  <div className="absolute -right-8 top-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-xs font-bold px-8 py-1 transform rotate-45 z-10 shadow-lg">
                    PREMIUM
                  </div>
                )}

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/8 group-hover:to-indigo-500/15 transition-all duration-500 rounded-2xl"></div>

                {/* Card Header */}
                <div className="p-4 border-b border-gray-200/60 relative z-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-gray-900 text-sm leading-tight group-hover:text-blue-800 transition-colors duration-300 pr-2">
                      {shop.name}
                    </h3>
                    <div className="flex flex-col items-end space-y-1">
                      {shop.premiumPartner && (
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full border border-yellow-300">
                          ⭐
                        </span>
                      )}
                      <div
                        className={`px-2 py-1 rounded-full text-xs font-semibold border ${
                          shop.schedule
                            ? "bg-green-100 text-green-800 border-green-300"
                            : "bg-red-100 text-red-800 border-red-300"
                        }`}
                      >
                        {shop.schedule ? "Opened" : "Closed"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-gray-700 text-xs">
                    <span className="text-blue-600">📍</span>
                    <span className="truncate">
                      {shop.address.split(",")[0]}
                    </span>
                  </div>
                </div>

                {/* Business Details */}
                <div className="p-4 border-b border-gray-200/60 relative z-5">
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="text-center p-2 bg-blue-100/60 rounded-lg border border-blue-200/50">
                      <div className="text-xs text-gray-600 font-medium">
                        Since
                      </div>
                      <div className="font-bold text-blue-800 text-sm">
                        {shop.established}
                      </div>
                    </div>
                    <div className="text-center p-2 bg-indigo-100/60 rounded-lg border border-indigo-200/50">
                      <div className="text-xs text-gray-600 font-medium">
                        Clients
                      </div>
                      <div className="font-bold text-indigo-800 text-sm">
                        {shop.clientBase}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-800 font-medium bg-gray-100/60 rounded-lg px-3 py-2 border border-gray-200">
                    🛠️ {shop.services}
                  </div>
                </div>

                {/* Footer */}
                <div className="p-4 relative z-5">
                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <div className="text-xs text-gray-600 font-medium">
                        Distance
                      </div>
                      <div className="font-bold text-gray-900 text-sm">
                        {shop.distance}
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-xs text-gray-600 font-medium">
                        Rating
                      </div>
                      <div className="font-bold text-yellow-700 text-sm flex items-center justify-center">
                        {shop.rating}
                        <span className="ml-1">⭐</span>
                      </div>
                    </div>

                    <Link
                      to={shop.schedule ? "/service" : ""}
                      state={{ shop: shop }}
                      className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-300 transform group-hover:scale-105 ${
                        shop.schedule
                          ? "bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white shadow-lg hover:shadow-xl"
                          : "bg-gray-500 text-gray-300 cursor-not-allowed"
                      }`}
                    >
                      {shop.schedule ? "schedule" : "Unavailable"}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Explore More Button */}
        <div className="text-center relative">
          {/* Background Glow - Darker */}
          <div className="absolute inset-0 flex justify-center">
            <div className="w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -mt-32"></div>
          </div>

          <Link
            to="/shops"
            className="relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1 group"
          >
            <span className="relative z-10">Explore More Shops</span>
            <svg
              className="w-5 h-5 relative z-10 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>

            {/* Button Shine Effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          </Link>

          {/* Decorative Dots - Darker */}
          <div className="flex justify-center space-x-2 mt-6">
            {[1, 2, 3].map((dot) => (
              <div
                key={dot}
                className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                style={{ animationDelay: `${dot * 0.2}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
