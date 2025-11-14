import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Load username from localStorage
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) setUserName(storedName);
  }, []);

  // Close profile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userMobile");
    localStorage.removeItem("userAddress");
    setUserName("");
    navigate("/");
  };

  const handleNotificationTab = () => {
    navigate("/usernotifi");
    setIsProfileOpen(false);
  };

  const handleMyOrders = () => {
    navigate("/user", { state: "orders" });
    setIsProfileOpen(false);
  };

  return (
    <header className="w-full bg-gradient-to-r from-white to-blue-50 border-b-2 border-blue-100 sticky top-0 left-0 z-50 shadow-sm">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* LEFT: Brand */}
          <Link to={"/"} className="flex items-center space-x-4">
            <div className="flex items-center gap-3 group cursor-pointer">
              {/* <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold text-xl shadow-lg transform group-hover:scale-105 transition-all duration-300">
                1Ts
              </div> */}
              <div className="transform group-hover:scale-110 transition-transform duration-300">
                <div className="text-xl font-bold bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent">
                  <img
                    src="./images/logo.png"
                    width={150}
                    alt="OneTap Services"
                  />
                </div>
              </div>
            </div>
          </Link>

          {/* CENTER: Menu Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm">
            <Link
              to="/request"
              className="group flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-all duration-300"
            >
              <div className="p-2 rounded-xl bg-blue-50 group-hover:bg-blue-100 transition-colors duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    d="M12 4v16m8-8H4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </div>
              Request Service
            </Link>

            <Link
              to="/track"
              className="group flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-all duration-300"
            >
              <div className="p-2 rounded-xl bg-blue-50 group-hover:bg-blue-100 transition-colors duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </div>
              Track Order
            </Link>

            <Link
              to="/upload"
              className="group flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-all duration-300"
            >
              <div className="p-2 rounded-xl bg-blue-50 group-hover:bg-blue-100 transition-colors duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    d="M4 16v2a2 2 0 002 2h12M4 12h16M4 8h16"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </div>
              About
            </Link>
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <button
              onClick={handleNotificationTab}
              className="p-3 rounded-xl bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-200 transition-all duration-300 shadow-sm relative group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600 group-hover:text-blue-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            </button>

            {/* Profile or Login */}
            {userName ? (
              <div className="relative" ref={dropdownRef}>
                <div
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center text-blue-700 font-bold text-lg border-2 border-white shadow-lg group-hover:scale-105 transition-transform duration-300">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                </div>

                {isProfileOpen && (
                  <div className="absolute right-0 top-14 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 py-3 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm text-gray-500">Welcome back,</p>
                      <p className="text-lg font-semibold text-blue-800">
                        {userName}
                      </p>
                    </div>

                    <button
                      onClick={handleMyOrders}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-red-50 transition-all duration-300 group"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-red-500 hover:text-red-600 transition-colors duration-200"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.8}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 22a2 2 0 002-2H10a2 2 0 002 2zm6-6V10a6 6 0 00-12 0v6l-1.5 1.5a1 1 0 00.7 1.7h14.6a1 1 0 00.7-1.7L18 16z"
                        />
                      </svg>

                      <span>My Orders</span>
                    </button>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-red-50 transition-all duration-300 group"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 16l-4-4m0 0l4-4m-4 4h14"
                        />
                      </svg>
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to={"/login"}
                className="bg-gradient-to-r from-blue-600 to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Sign In
              </Link>
            )}

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isMobileOpen && (
          <div className="lg:hidden bg-white rounded-xl shadow-lg mt-2 p-4 space-y-3">
            <Link
              to="/request"
              className="block text-gray-700 hover:text-blue-600"
            >
              Request Service
            </Link>
            <Link
              to="/track"
              className="block text-gray-700 hover:text-blue-600"
            >
              Track Order
            </Link>
            <Link
              to="/upload"
              className="block text-gray-700 hover:text-blue-600"
            >
              About
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
