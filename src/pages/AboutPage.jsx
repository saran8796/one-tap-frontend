import React from "react";
import { Link } from "react-router-dom";

export default function AboutPage() {
  const features = [
    {
      icon: "🔐",
      title: "Secure Login",
      description:
        "Quick signup with phone number or email for personalized service",
    },
    {
      icon: "🏪",
      title: "Find Nearby Shops",
      description:
        "Discover verified printing shops near your location with real-time availability",
    },
    {
      icon: "📋",
      title: "Select Services",
      description:
        "Choose from 50+ services including printing, document services, and government applications",
    },
    {
      icon: "📄",
      title: "Upload Documents",
      description:
        "Securely upload required documents through our encrypted platform",
    },
    {
      icon: "📱",
      title: "Real-time Tracking",
      description: "Track your service status from processing to completion",
    },
    {
      icon: "⭐",
      title: "Rate & Review",
      description:
        "Share your experience and help others choose the best services",
    },
  ];

  const benefits = [
    {
      title: "Time Saving",
      description:
        "No more waiting in long queues - get everything done from your phone",
      icon: "⏰",
    },
    {
      title: "Cost Effective",
      description:
        "Compare prices across multiple shops and choose the best deal",
      icon: "💰",
    },
    {
      title: "Secure & Private",
      description:
        "Bank-level encryption for all your documents and personal information",
      icon: "🔒",
    },
    {
      title: "24/7 Availability",
      description:
        "Access services anytime, anywhere with our mobile-first platform",
      icon: "🌙",
    },
    {
      title: "Verified Partners",
      description: "All shops are verified and rated by real customers",
      icon: "✅",
    },
    {
      title: "Instant Support",
      description: "24/7 customer support to help with any issues",
      icon: "💬",
    },
  ];

  const reviews = [
    {
      name: "Rajesh Kumar",
      role: "College Student",
      rating: 5,
      comment:
        "Got my scholarship documents processed in 2 hours! Amazing service!",
      avatar: "👨‍🎓",
    },
    {
      name: "Priya S",
      role: "Office Employee",
      rating: 5,
      comment:
        "Perfect for last-minute document needs. Saved me multiple times!",
      avatar: "👩‍💼",
    },
    {
      name: "Mohan Das",
      role: "Business Owner",
      rating: 4,
      comment:
        "GST registration made so easy. Professional service throughout.",
      avatar: "👨‍💼",
    },
  ];

  const documentUploadSteps = [
    {
      step: 1,
      title: "Select Service",
      description: "Choose the service you need from our extensive catalog",
      icon: "📋",
    },
    {
      step: 2,
      title: "View Requirements",
      description:
        "See exactly which documents are needed for your selected service",
      icon: "📄",
    },
    {
      step: 3,
      title: "Upload Securely",
      description: "Upload documents through our encrypted, secure platform",
      icon: "🔐",
    },
    {
      step: 4,
      title: "Auto Verification",
      description: "Our system automatically verifies document completeness",
      icon: "✅",
    },
    {
      step: 5,
      title: "Real-time Tracking",
      description: "Track your document processing status in real-time",
      icon: "📱",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About OneTap Service
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Revolutionizing document services with technology - Making your life
            simpler, one tap at a time
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-20">
        {/* How It Works Section */}
        <section id="how-it-works" className="space-y-12 scroll-mt-20">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How OneTap Service Works
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Get your document services completed in just 4 simple steps
            </p>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Login & Setup",
                description:
                  "Create your account with phone or email verification",
                icon: "🔐",
                color: "from-blue-500 to-blue-600",
              },
              {
                step: "02",
                title: "Find Shops",
                description:
                  "Discover nearby verified service providers with ratings",
                icon: "🏪",
                color: "from-green-500 to-green-600",
              },
              {
                step: "03",
                title: "Select Service",
                description:
                  "Choose from 50+ services and upload required documents",
                icon: "📋",
                color: "from-purple-500 to-purple-600",
              },
              {
                step: "04",
                title: "Track & Receive",
                description: "Real-time tracking and secure document delivery",
                icon: "📱",
                color: "from-orange-500 to-orange-600",
              },
            ].map((step, index) => (
              <div key={index} className="text-center group">
                <div
                  className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${step.color} text-white flex items-center justify-center text-2xl font-bold group-hover:scale-110 transition-transform duration-300`}
                >
                  {step.step}
                </div>
                <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-2xl shadow-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Upload Documents Section */}
        <section id="upload-docs" className="space-y-12 scroll-mt-20">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Secure Document Upload
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Upload your documents securely with our encrypted platform
            </p>
          </div>

          {/* Upload Steps */}
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {documentUploadSteps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
                    {step.step}
                  </div>
                  <div className="w-12 h-12 mx-auto mb-4 bg-white rounded-xl shadow-lg flex items-center justify-center text-xl absolute -top-2 -right-2">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>

          {/* Security Features */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Bank-Level Security
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: "🔒",
                  title: "End-to-End Encryption",
                  description:
                    "All documents are encrypted during upload, storage, and transmission",
                },
                {
                  icon: "📱",
                  title: "Secure Access",
                  description:
                    "Multi-factor authentication and secure login protocols",
                },
                {
                  icon: "🚫",
                  title: "Auto Deletion",
                  description:
                    "Documents automatically deleted after service completion",
                },
              ].map((feature, index) => (
                <div key={index} className="text-center p-4">
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Supported Documents */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Supported Document Types
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {[
                "PDF Files",
                "JPG/PNG Images",
                "DOC/DOCX Files",
                "All Common Formats",
              ].map((type, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-4 shadow-md border border-gray-200"
                >
                  <div className="text-blue-600 font-semibold">{type}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="space-y-12 scroll-mt-20">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose OneTap Service?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Experience the future of document services with these amazing
              benefits
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { number: "50K+", label: "Happy Customers" },
              { number: "200+", label: "Verified Shops" },
              { number: "50+", label: "Services" },
              { number: "24/7", label: "Support" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
              >
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews Section */}
        <section id="reviews" className="space-y-12 scroll-mt-20">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Real experiences from our valued customers
            </p>
          </div>

          {/* Reviews Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl mr-4">
                    {review.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {review.name}
                    </h3>
                    <p className="text-gray-500 text-sm">{review.role}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      {i < review.rating ? "★" : "☆"}
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 text-sm">{review.comment}</p>
              </div>
            ))}
          </div>

          {/* Overall Rating */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Overall Rating
            </h3>
            <div className="text-4xl text-yellow-400 mb-2">★★★★★</div>
            <div className="text-2xl font-bold text-gray-900 mb-2">4.8/5.0</div>
            <p className="text-gray-600">Based on 2,500+ customer reviews</p>
          </div>
        </section>
      </div>

      {/* CTA Section */}
      <div className="text-center mt-16 bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          Join thousands of satisfied customers who trust OneTap Service for
          their document needs
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/service"
            className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors duration-300"
          >
            Explore Services
          </Link>
          <Link
            to="/shops"
            className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
          >
            Find Nearby Shops
          </Link>
        </div>
      </div>
    </div>
  );
}
