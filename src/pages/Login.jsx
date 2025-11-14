import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [role, setRole] = useState("customer");
  const [loginRole, setLoginRole] = useState("customer");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Validate passwords match
  const validatePasswords = () => {
    if (!isLogin && password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return false;
    }
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long!");
      return false;
    }
    return true;
  };

  // Validate mobile number
  const validateMobile = (number) => {
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(number);
  };

  // Handle registration + send OTP
  const handleRegisterAndSendOtp = async () => {
    if (!validatePasswords()) {
      setLoading(false);
      return;
    }

    if (!validateMobile(mobile)) {
      setMessage("Please enter a valid 10-digit mobile number!");
      setLoading(false);
      return;
    }

    setLoading(true);
    setMessage("Creating account and sending OTP...");

    try {
      // Register new user
      const registerRes = await fetch(
        "https://one-tap-backend.vercel.app/api/users/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            password,
            mobile,
            address,
            role,
          }),
        }
      );
      const registerData = await registerRes.json();

      if (!registerRes.ok) {
        setMessage(registerData.message || "Registration failed.");
        setLoading(false);
        return;
      }

      // Send OTP email
      const otpRes = await fetch(
        "https://one-tap-backend.vercel.app/api/users/send-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, mobile }),
        }
      );
      const otpData = await otpRes.json();

      if (otpRes.ok) {
        setOtpSent(true);
        setMessage("OTP sent to your email and mobile!");
      } else {
        setMessage(otpData.message || "Failed to send OTP");
      }
    } catch (err) {
      setMessage("Server error. Try again.");
    }

    setLoading(false);
  };

  // Handle login
  const handleLogin = async () => {
    setLoading(true);
    setMessage("Signing in...");

    try {
      const res = await fetch(
        "https://one-tap-backend.vercel.app/api/users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, role: loginRole }),
        }
      );

      console.log("Logging in with", { email, password, role: loginRole });

      const data = await res.json();

      if (res.ok) {
        if (data.user.role === "customer") {
          localStorage.setItem("token", data.token);
          localStorage.setItem("userId", data.user._id);
          localStorage.setItem("userName", data.user.name);
          localStorage.setItem("userEmail", data.user.email);
          localStorage.setItem("userMobile", data.user.mobile);
          localStorage.setItem("userAddress", data.user.address);
          localStorage.setItem("userRole", data.user.role);
        } else if (data.user.role === "vendor") {
          localStorage.setItem("token", data.token);
          localStorage.setItem("shopId", data.user._id);
          localStorage.setItem("shopName", data.user.name);
          localStorage.setItem("shopEmail", data.user.email);
          localStorage.setItem("shopMobile", data.user.mobile);
          localStorage.setItem("shopAddress", data.user.address);
          localStorage.setItem("userRole", data.user.role);
        }

        setMessage("Login successful!");

        // Redirect based on role
        setTimeout(() => {
          switch (data.user.role) {
            case "vendor":
              navigate("/vendor");
              break;
            case "admin":
              navigate("/admin");
              break;
            case "customer":
            default:
              navigate("/");
          }
        }, 1000);
      } else {
        setMessage(data.message || "Login failed.");
      }
    } catch (err) {
      setMessage("Server error while logging in.");
    }

    setLoading(false);
  };

  // Handle OTP verification after registration
  const handleVerifyOtp = async () => {
    setLoading(true);
    setMessage("Verifying OTP...");

    try {
      const res = await fetch(
        "https://one-tap-backend.vercel.app/api/users/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ OTP verified! Redirecting to login...");
        setTimeout(() => toggleAuthMode(), 1200);
      } else {
        setMessage("❌ " + data.message);
      }
    } catch (err) {
      setMessage("Server error during OTP verification.");
    }

    setLoading(false);
  };

  // Main form action
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin && !validatePasswords()) {
      return;
    }

    if (isLogin) {
      await handleLogin();
    } else {
      if (otpSent) {
        await handleVerifyOtp();
      } else {
        await handleRegisterAndSendOtp();
      }
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setName("");
    setMobile("");
    setRole("customer");
    setLoginRole("customer");
    setOtp("");
    setAddress("");
    setOtpSent(false);
    setMessage("");
  };

  const getRoleIcon = (roleName) => {
    switch (roleName) {
      case "customer":
        return "👤";
      case "vendor":
        return "🏪";
      case "admin":
        return "⚙️";
      default:
        return "👤";
    }
  };

  const getRoleDescription = (roleName) => {
    switch (roleName) {
      case "customer":
        return "Shop and place orders";
      case "vendor":
        return "Sell your products";
      case "admin":
        return "Manage platform operations";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {isLogin ? "Welcome Back" : "Join Us Today"}
            </h2>
            <p className="text-gray-600">
              {isLogin
                ? "Sign in to your account"
                : "Create your account in seconds"}
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-sky-500 rounded-full mx-auto mt-4"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection for Both Login and Register */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                I want to {isLogin ? "login as" : "sign up as"}
              </label>
              <div className="grid grid-cols-2 gap-3">
                {["customer", "vendor"].map((roleOption) => (
                  <button
                    key={roleOption}
                    type="button"
                    onClick={() =>
                      isLogin ? setLoginRole(roleOption) : setRole(roleOption)
                    }
                    className={`p-3 rounded-xl border-2 transition-all duration-200 text-center ${
                      (isLogin ? loginRole : role) === roleOption
                        ? "border-blue-500 bg-blue-50 text-blue-700 shadow-md transform scale-105"
                        : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300 hover:bg-gray-100"
                    } ${
                      roleOption === "admin"
                        ? "opacity-60 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={roleOption === "admin"}
                  >
                    <div className="text-lg mb-1">
                      {getRoleIcon(roleOption)}
                    </div>
                    <div className="text-xs font-semibold capitalize">
                      {roleOption}
                    </div>
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 text-center">
                {getRoleDescription(isLogin ? loginRole : role)}
              </p>
            </div>

            {/* Name Field - Register Only */}
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    👤
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
            )}

            {/* Mobile Field - Register Only */}
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Mobile Number
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    📱
                  </span>
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) =>
                      setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
                    }
                    placeholder="Enter 10-digit mobile number"
                    required
                    pattern="[0-9]{10}"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  📧
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Address */}
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Address
                </label>
                <textarea
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your complete address"
                  required
                  rows="3"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 resize-none"
                />
              </div>
            )}

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔒
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  minLength="6"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Confirm Password - Register Only */}
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    ✅
                  </span>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    required
                    minLength="6"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
            )}

            {/* OTP Field - Register Only */}
            {!isLogin && otpSent && (
              <div className="space-y-2 animate-fade-in">
                <label className="text-sm font-semibold text-gray-700">
                  Verification Code
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    🔑
                  </span>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    placeholder="Enter 6-digit code"
                    maxLength="6"
                    required
                    className="w-full pl-12 pr-4 py-3 bg-blue-50 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Enter the verification code sent to your email and mobile
                </p>
              </div>
            )}

            {/* Message Display */}
            {message && (
              <div
                className={`p-3 rounded-xl text-center text-sm font-medium ${
                  message.includes("❌")
                    ? "bg-red-50 text-red-700 border border-red-200"
                    : message.includes("✅")
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-blue-50 text-blue-700 border border-blue-200"
                }`}
              >
                {message}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 px-4 rounded-xl font-semibold text-white transition-all duration-200 transform hover:scale-105 shadow-lg ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-400 to-sky-500 hover:from-blue-500 hover:to-sky-600 hover:shadow-xl"
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin mr-2"></div>
                  {isLogin
                    ? "Logging in..."
                    : otpSent
                    ? "Verifying..."
                    : "Creating Account..."}
                </div>
              ) : isLogin ? (
                `Sign in as ${loginRole}`
              ) : otpSent ? (
                "Verify OTP"
              ) : (
                `Create ${role} Account`
              )}
            </button>
          </form>

          {/* Toggle Auth Mode */}
          <div className="text-center mt-8 pt-6 border-t border-gray-200">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={toggleAuthMode}
                className="ml-2 font-semibold text-blue-400 hover:text-sky-500 transition-colors duration-200 hover:underline"
              >
                {isLogin ? "Sign up now" : "Sign in here"}
              </button>
            </p>
          </div>

          {/* Additional Info */}
          <div className="text-center mt-4">
            <p className="text-xs text-gray-500">
              By continuing, you agree to our Terms and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
