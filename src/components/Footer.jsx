import { Truck, Shield, Star, Clock, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12">
      {/* Features Banner */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-white">Fast Delivery</h3>
            </div>
            <p className="text-slate-300">
              Next-day delivery across Tamil Nadu
            </p>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-600 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-white">Secure & Safe</h3>
            </div>
            <p className="text-slate-300">Your documents are protected</p>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-amber-600 rounded-lg">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-white">Rated 4.9/5</h3>
            </div>
            <p className="text-slate-300">By 2000+ satisfied customers</p>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 mb-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4">
              OneTap Services
            </h2>
            <p className="text-slate-300 mb-6">
              Digital Docs, Physical Delivery. Serving Villages & Cities across
              Tamil Nadu.
            </p>
            <div className="flex items-center gap-3 text-slate-300 bg-slate-800 p-3 rounded-lg">
              <div className="p-2 bg-green-600 rounded-lg">
                <Clock className="w-4 h-4 text-white" />
              </div>
              <span className="font-medium">24/7 Customer Support</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Services</h3>
            <ul className="space-y-2 text-slate-300">
              <li className="hover:text-white cursor-pointer">
                Xerox & Printing
              </li>
              <li className="hover:text-white cursor-pointer">
                Govt Documents
              </li>
              <li className="hover:text-white cursor-pointer">Lamination</li>
              <li className="hover:text-white cursor-pointer">
                Photo Printing
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-2 text-slate-300">
              <li className="hover:text-white cursor-pointer">About Us</li>
              <li className="hover:text-white cursor-pointer">Careers</li>
              <li className="hover:text-white cursor-pointer">Partners</li>
              <li className="hover:text-white cursor-pointer">Contact</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
            <div className="space-y-2 text-slate-300">
              <div className="flex items-center gap-2 hover:text-white cursor-pointer">
                <Phone className="w-4 h-4 text-blue-400" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2 hover:text-white cursor-pointer">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>support@onetap.com</span>
              </div>
              <div className="flex items-center gap-2 hover:text-white cursor-pointer">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>Tamil Nadu</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-8 border-t border-slate-700">
          <div className="text-slate-400 text-sm">
            © {new Date().getFullYear()} OneTap Services. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
