import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

const services = [
  {
    title: "Bulk Xerox & Print",
    sub: "ஜெராக்ஸ் & பிரிண்ட்",
    desc: "High-quality B&W, Color printing with multiple copy options",
    icon: "print",
    category: "Documentation",
    features: ["High Speed", "Quality Paper", "Binding"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Driving License",
    sub: "உரிமம் & அனுமதி",
    desc: "Complete assistance for new license and renewal processes",
    icon: "car",
    category: "Government",
    features: ["New DL", "Renewal", "Duplicate"],
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Visa & Passport",
    sub: "விசா & பாஸ்போர்ட்",
    desc: "Expert guidance for international travel documents for the customers",
    icon: "plane",
    category: "International",
    features: ["Fresh Passport", "Visa Processing", "Documentation"],
    color: "from-orange-500 to-amber-500",
  },
  {
    title: "Health Cards",
    sub: "சுகாதார அட்டைகள்",
    desc: "Insurance and government health scheme registrations",
    icon: "heart",
    category: "Healthcare",
    features: ["Health Insurance", "Govt Schemes", "Renewal"],
    color: "from-rose-500 to-pink-500",
  },
  {
    title: "Education Certs",
    sub: "கல்வி சான்றிதழ்",
    desc: "Academic document processing and certification services",
    icon: "school",
    category: "Education",
    features: ["Marksheets", "Scholarships", "Verification"],
    color: "from-purple-500 to-violet-500",
  },
  {
    title: "Business Registration",
    sub: "வணிக பதிவு",
    desc: "Complete business registration and compliance services",
    icon: "id",
    category: "Business",
    features: ["GST", "MSME", "FSSAI"],
    color: "from-teal-500 to-cyan-500",
  },
  {
    title: "Online Applications",
    sub: "ஆன்லைன் விண்ணப்பங்கள்",
    desc: "Professional assistance for online form submissions",
    icon: "doc",
    category: "Digital",
    features: ["TNPSC", "College", "Government"],
    color: "from-red-500 to-orange-500",
  },
  {
    title: "Certificates",
    sub: "சான்றிதழ்கள்",
    desc: "Official certificate issuance and attestation services",
    icon: "card",
    category: "Legal",
    features: ["Nativity", "Income", "Community"],
    color: "from-lime-500 to-green-500",
  },
];

function Icon({ name, className = "w-6 h-6" }) {
  const icons = {
    print: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
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
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 10-4 0v1m4 0a2 2 0 004 0m-4 0a2 2 0 10-4 0m4 0v1m-4 0a2 2 0 00-4 0m4 0v3m0 0h4m-4 0a2 2 0 004 0"
        />
      </svg>
    ),
    car: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    plane: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
        />
      </svg>
    ),
    heart: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
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
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 14l9-5-9-5-9 5 9 5z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
        />
      </svg>
    ),
    doc: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
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
    card: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        />
      </svg>
    ),
  };

  return icons[name] || null;
}

// Floating Particles Background
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated Particles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-blue-300/20 rounded-full animate-float-particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${15 + Math.random() * 10}s`,
          }}
        />
      ))}

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-200/10 to-purple-200/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-200/10 to-indigo-200/10 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>

      {/* Geometric Shapes */}
      <div className="absolute top-10 right-10 w-20 h-20 border-2 border-blue-200/20 rounded-lg rotate-45 animate-spin-slow"></div>
      <div className="absolute bottom-20 left-20 w-16 h-16 border-2 border-purple-200/20 rounded-full animate-bounce-slow"></div>
    </div>
  );
}

export default function OurServices() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [setHoveredCard] = useState(null);

  const categories = [
    "All",
    "Documentation",
    "Government",
    "International",
    "Healthcare",
    "Education",
    "Business",
    "Digital",
    "Legal",
  ];

  const filteredServices =
    activeCategory === "All"
      ? services
      : services.filter((service) => service.category === activeCategory);

  const gotoShops = (service) => {
    navigate("/shops", { state: { service } });
  };

  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 pt-24 overflow-hidden">
      {/* Enhanced Background */}
      {/* <FloatingParticles /> */}

      {/* Additional Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100/20 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float-orb"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100/20 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float-orb animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-cyan-100/20 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float-orb animation-delay-4000"></div>

        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
              linear-gradient(90deg, transparent 79px, #ababab 79px, #ababab 81px, transparent 81px),
              linear-gradient(#eee .1em, transparent .1em)
            `,
              backgroundSize: "100px 100px",
            }}
          ></div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-blue-200/50 shadow-lg mb-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold tracking-wider uppercase bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Premium Services
            </span>
            <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-pulse"></div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent">
              Professional
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 mt-2 animate-gradient-x">
              Services
            </span>
          </h1>

          <p className="text-xl text-slate-700 mb-4 font-light">
            தொழில்முறை சேவைகள்
          </p>

          <div className="flex justify-center items-center gap-4 mb-8">
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full"></div>
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full rotate-45 animate-spin-slow"></div>
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full"></div>
          </div>

          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
            Experience premium services with cutting-edge solutions tailored to
            your unique needs
          </p>
        </div>

        {/* Enhanced Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-xl font-medium text-sm transition-all duration-500 border backdrop-blur-sm relative overflow-hidden group ${
                activeCategory === category
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent shadow-2xl shadow-blue-500/25 transform scale-105"
                  : "bg-white/80 text-slate-700 border-slate-300/50 hover:border-blue-400 hover:text-blue-600 hover:shadow-xl"
              }`}
            >
              <span className="relative z-10">{category}</span>
              {activeCategory === category && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              )}
            </button>
          ))}
        </div>

        {/* Enhanced Services Grid with Unique Hover Effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20">
          {filteredServices.map((service, index) => (
            <div
              key={service.title}
              className="group relative cursor-pointer"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => gotoShops(service)}
            >
              {/* Glow Effect */}
              <div
                className={`absolute -inset-1 bg-gradient-to-r ${service.color} rounded-2xl blur opacity-0 group-hover:opacity-20 transition-all duration-500 group-hover:scale-105`}
              ></div>

              {/* Main Card */}
              <div className="relative bg-white/90 backdrop-blur-sm rounded-xl border border-slate-200/60 group-hover:border-transparent transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-blue-500/20 overflow-hidden">
                {/* Animated Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                ></div>

                {/* Header with Icon and Category */}
                <div className="relative p-6 border-b border-slate-100/60 group-hover:border-slate-200/30 transition-colors duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-br ${service.color} text-white shadow-lg transform group-hover:scale-110 transition-all duration-500 relative overflow-hidden`}
                    >
                      <Icon
                        name={service.icon}
                        className="w-5 h-5 relative z-10"
                      />
                      {/* < div className="absolute inset-0 bg-white/20 transform scale-0 group-hover:scale-100 transition-transform duration-500"></div> */}
                    </div>
                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-slate-100/80 text-slate-600 backdrop-blur-sm group-hover:bg-white/90 transition-colors duration-300">
                      {service.category}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-lg mb-2 leading-tight group-hover:text-slate-800 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">
                    {service.sub}
                  </p>
                </div>

                {/* Content */}
                <div className="relative p-6">
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 group-hover:text-slate-700 transition-colors duration-300">
                    {service.desc}
                  </p>

                  {/* Enhanced Features */}
                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 text-sm text-slate-500 group-hover:text-slate-600 transform group-hover:translate-x-1 transition-transform duration-300"
                        style={{ transitionDelay: `${idx * 100}ms` }}
                      >
                        <div
                          className={`w-2 h-2 bg-gradient-to-r ${service.color} rounded-full flex-shrink-0 transform group-hover:scale-125 transition-transform duration-300`}
                        ></div>
                        <span className="leading-tight">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Enhanced CTA Button */}
                  <button className="w-full py-3 px-4 bg-gradient-to-r from-slate-100 to-slate-50 hover:from-blue-50 hover:to-purple-50 text-slate-700 hover:text-blue-600 rounded-lg font-semibold text-sm transition-all duration-500 border border-slate-200/60 hover:border-transparent group-hover:shadow-lg flex items-center justify-center gap-2 backdrop-blur-sm transform group-hover:scale-105 group-hover:-translate-y-1">
                    <span>Get Service</span>
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                </div>

                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-500/20 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-purple-500/20 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-500/20 rounded-bl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-indigo-500/20 rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Stats Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 mb-16 border border-slate-200/60 hover:shadow-xl transition-all duration-500">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              {
                number: `${services.length}+`,
                label: "Services",
                color: "from-blue-500 to-cyan-500",
              },
              {
                number: "0",
                label: "Happy Clients",
                color: "from-green-500 to-emerald-500",
              },
              {
                number: "0%",
                label: "Success Rate",
                color: "from-purple-500 to-violet-500",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
              >
                <div
                  className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
                >
                  {stat.number}
                </div>
                <div className="text-sm font-semibold text-slate-600 uppercase tracking-wider group-hover:text-slate-700 transition-colors">
                  {stat.label}
                </div>
                <div
                  className={`w-8 h-1 bg-gradient-to-r ${stat.color} rounded-full mx-auto mt-3 transform group-hover:scale-110 transition-transform duration-300`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Enhanced CTA Section */}
      {/* <div className="text-center">
        <div className="bg-gradient-to-r from-blue-600/90 to-purple-600/90  p-12 text-white relative overflow-hidden backdrop-blur-sm border border-white/20 hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 group">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 group-hover:scale-105 transition-transform duration-300">
              Ready to Get Started?
            </h2>
            <p className="text-blue-100 text-lg  leading-relaxed group-hover:text-white/90 transition-colors duration-300">
              Experience the difference with our premium services. Let's create
              something amazing together.
            </p>
          </div>
        </div>
      </div> */}
    </section>
  );
}
