
// import React, { useState } from "react";
// import { Lock, Eye } from "lucide-react";

// export default function PrivacySection() {
//   const [showCode, setShowCode] = useState(false);

//   return (
//     <section className="bg-white py-20">
//       <div className="max-w-5xl mx-auto px-6 text-center">
//         {/* Badge */}
//         <div className="inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium mb-5">
//           Privacy First
//         </div>

//         {/* Heading */}
//         <h2 className="text-3xl font-bold text-gray-900">
//           Your Privacy, Our Priority
//         </h2>
//         <p className="text-lg text-gray-700 mt-1">
//           உங்கள் தனியுரிமை, எங்கள் முன்னுரிமை
//         </p>
//         <p className="text-sm text-gray-500 mt-2">
//           Secure code system ensures your documents are accessed only by authorized shops
//         </p>

//         {/* Main Content */}
//         <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
//           {/* LEFT SIDE */}
//           <div className="space-y-6 text-left">
//             {/* How It Works */}
//             <div className="flex gap-4">
//               <div className="bg-green-500 text-white p-3 rounded-lg">
//                 <Lock size={22} />
//               </div>
//               <div>
//                 <h3 className="font-semibold text-gray-800">How It Works</h3>
//                 <p className="text-sm text-gray-600">
//                   After uploading your documents, you receive a unique secure code.
//                   Only you and the selected shop have access to this code.
//                 </p>
//               </div>
//             </div>

//             {/* Show at Shop */}
//             <div className="flex gap-4">
//               <div className="bg-blue-500 text-white p-3 rounded-lg">
//                 <Eye size={22} />
//               </div>
//               <div>
//                 <h3 className="font-semibold text-gray-800">Show at Shop</h3>
//                 <p className="text-sm text-gray-600">
//                   Share this code at the shop counter or with the agent.
//                   They process only the documents you authorized.
//                 </p>
//               </div>
//             </div>

//             {/* Features List */}
//             <ul className="text-sm text-gray-700 space-y-1 pl-1 mt-4">
//               <li>✅ End-to-end encrypted</li>
//               <li>✅ Auto-expires after use</li>
//               <li>✅ No document sharing without code</li>
//             </ul>
//           </div>

//           {/* RIGHT SIDE */}
//           <div className="bg-gray-50 border border-gray-200 rounded-xl shadow-sm p-8 text-center">
//             <p className="text-sm text-gray-500 mb-2">Your Secure Code</p>
            
//             <div className="text-3xl font-mono font-bold tracking-widest mb-5">
//               {showCode ? "X7B9K2" : "••••••"}
//             </div>

//             <button
//               onClick={() => setShowCode(!showCode)}
//               className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition"
//             >
//               {showCode ? "Hide Code" : "Show Code"}
//             </button>

//             {/* Order Info */}
//             <div className="mt-6 text-sm text-gray-600 space-y-1">
//               <p>
//                 <span className="font-medium">Order ID:</span> #001234
//               </p>
//               <p>
//                 <span className="font-medium">Expires in:</span>{" "}
//                 <span className="text-red-500">48 hours</span>
//               </p>
//             </div>
//             <p className="mt-5 text-xs text-gray-400">
//               *This is a demo. Actual codes are generated after order placement.
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import React, { useState } from "react";
import { Lock, Eye, Shield, CheckCircle, Clock, Hash } from "lucide-react";

export default function PrivacySection() {
  const [showCode, setShowCode] = useState(false);
  const [isCodeRevealing, setIsCodeRevealing] = useState(false);

  const handleShowCode = () => {
    if (!showCode) {
      setIsCodeRevealing(true);
      setTimeout(() => {
        setShowCode(true);
        setIsCodeRevealing(false);
      }, 600);
    } else {
      setShowCode(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 py-20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float-slow"></div>
        <div className="absolute bottom-10 right-10 w-12 h-12 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      {/* Security Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        {/* Enhanced Badge */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
          <Shield className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
          <span>Privacy First Guarantee</span>
        </div>

        {/* Enhanced Heading Section */}
        <div className="mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-emerald-900 bg-clip-text text-transparent mb-4">
            Your Privacy, Our Priority
          </h2>
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 shadow-sm mb-3">
            <span className="text-lg text-gray-700 font-medium">உங்கள் தனியுரிமை, எங்கள் முன்னுரிமை</span>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Military-grade encryption ensures your documents are accessed <span className="font-semibold text-blue-600">only</span> by authorized shops
          </p>
        </div>

        {/* Enhanced Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* LEFT SIDE - Enhanced */}
          <div className="space-y-8 text-left">
            {/* How It Works Card */}
            <div className="group bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 hover:border-blue-200/50 hover:scale-105">
              <div className="flex gap-5 items-start">
                <div className="flex-shrink-0">
                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Lock size={24} />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-xl text-gray-800 mb-3 group-hover:text-green-700 transition-colors duration-300">
                    How It Works
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    After uploading your documents, you receive a <span className="font-semibold text-green-600">unique secure code</span>. 
                    Only you and the selected shop have access to this encrypted code.
                  </p>
                </div>
              </div>
            </div>

            {/* Show at Shop Card */}
            <div className="group bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 hover:border-blue-200/50 hover:scale-105">
              <div className="flex gap-5 items-start">
                <div className="flex-shrink-0">
                  <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Eye size={24} />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-xl text-gray-800 mb-3 group-hover:text-blue-700 transition-colors duration-300">
                    Show at Shop
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Share this code at the shop counter or with the agent. 
                    They can <span className="font-semibold text-blue-600">only process</span> the documents you specifically authorized.
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced Features List */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200/50 shadow-lg">
              <h4 className="font-bold text-gray-800 mb-4 text-lg flex items-center gap-2">
                <CheckCircle className="text-green-500 w-5 h-5" />
                Security Features
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-white/80 rounded-lg hover:bg-white transition-colors duration-200 group/feature">
                  <div className="w-2 h-2 bg-green-500 rounded-full group-hover/feature:scale-150 transition-transform duration-300"></div>
                  <span className="text-gray-700 font-medium">End-to-end encrypted transmission</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/80 rounded-lg hover:bg-white transition-colors duration-200 group/feature">
                  <div className="w-2 h-2 bg-orange-500 rounded-full group-hover/feature:scale-150 transition-transform duration-300"></div>
                  <span className="text-gray-700 font-medium">Auto-expires after single use</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/80 rounded-lg hover:bg-white transition-colors duration-200 group/feature">
                  <div className="w-2 h-2 bg-red-500 rounded-full group-hover/feature:scale-150 transition-transform duration-300"></div>
                  <span className="text-gray-700 font-medium">Zero document sharing without code</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Enhanced */}
          <div className="bg-gradient-to-br from-gray-400 via-blue-700 to-purple-700 rounded-3xl shadow-2xl p-8 text-center border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 group/card">
            {/* Card Header */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-4">
                <Hash className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-medium">Your Secure Code</span>
              </div>
              
              {/* Code Display */}
              <div className={`bg-black/30 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/10 transition-all duration-500 ${isCodeRevealing ? 'scale-110' : 'scale-100'}`}>
                <div className="text-4xl font-mono font-bold tracking-widest mb-2">
                  {showCode ? (
                    <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                      X7B9K2
                    </span>
                  ) : (
                    <span className="text-white/40">••••••</span>
                  )}
                </div>
                <div className="text-white/60 text-sm">
                  {showCode ? 'Secure access code active' : 'Click to reveal code'}
                </div>
              </div>

              {/* Show/Hide Button */}
              <button
                onClick={handleShowCode}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 group/button flex items-center justify-center gap-3"
              >
                <Eye className="w-5 h-5 group-hover/button:scale-110 transition-transform duration-300" />
                {showCode ? "Hide Code" : "Reveal Secure Code"}
              </button>
            </div>

            {/* Enhanced Order Info */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="space-y-4">
                <div className="flex items-center justify-between group/info">
                  <span className="text-white/70 text-sm font-medium">Order ID</span>
                  <span className="text-white font-mono font-bold group-hover/info:text-cyan-300 transition-colors duration-300">#001234</span>
                </div>
                <div className="flex items-center justify-between group/info">
                  <span className="text-white/70 text-sm font-medium flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Expires in
                  </span>
                  <span className="text-red-400 font-semibold animate-pulse">48 hours</span>
                </div>
              </div>
            </div>

            {/* Footer Note */}
            <p className="mt-6 text-white/40 text-xs text-center">
              * This is a demo interface. Actual codes are generated with 256-bit encryption after order placement.
            </p>
          </div>
        </div>

        {/* Security Badges */}
        <div className="mt-16 flex flex-wrap justify-center gap-6">
          {['256-bit Encryption', 'GDPR Compliant', 'Zero Data Retention', 'End-to-End Secure'].map((badge, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-700 font-medium hover:shadow-lg transition-all duration-300 hover:scale-105">
              ✅ {badge}
            </div>
          ))}
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(90deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(45deg); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}