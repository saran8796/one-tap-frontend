import { Link } from "react-router-dom";

const Banner = () => {
  // const floatingIcons = [
  //   { icon: "📄", position: "top-20 left-10", delay: "delay-0" },
  //   { icon: "🚚", position: "top-40 right-20", delay: "delay-1000" },
  //   { icon: "🚁", position: "bottom-40 left-20", delay: "delay-500" },
  // ];
//   return (
//     <div className="relative h-screen">
//       <div className="absolute inset-0">
//         <div className="fixed inset-0 -z-10">
//           {/* Video Element */}
//           <video
//             autoPlay
//             muted
//             loop
//             playsInline
//             className="w-full h-full object-cover"
//             poster="https://images.unsplash.com/photo-1579546929662-711aa81148cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
//           >
//             <source src="/videos/delivery-background.mp4" type="video/mp4" />
//             <source src="/videos/delivery-background.webm" type="video/webm" />
//             {/* Fallback gradient */}
//             <div className="w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600" />
//           </video>

//           {/* Overlay for readability */}
//           <div className="absolute inset-0 bg-black/50" />
//           <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20" />

//           {/* Floating Elements */}
//           {/* <div className="absolute inset-0 pointer-events-none">
//         {floatingIcons.map((item, index) => (
//           <div
//             key={index}
//             className={absolute ${item.position} animate-bounce-slow ${item.delay}}
//           >
//             <div className="text-2xl bg-white/20 backdrop-blur-sm p-4 rounded-2xl shadow-2xl border border-white/30">
//               {item.icon}
//             </div>
//           </div>
//         ))}
//       </div> */}

//           {/* Custom Animations */}
//           {/* <style jsx>{`
//         @keyframes bounce-slow {
//           0%,
//           100% {
//             transform: translateY(0);
//           }
//           50% {
//             transform: translateY(-20px);
//           }
//         }
//         .animate-bounce-slow {
//           animation: bounce-slow 6s ease-in-out infinite;
//         }
//       `}</style> */}
//         </div>
//       </div>

//       <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-green-400/20">
//         <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
//           <div className="text-center px-3 w-fit max-w-fit">
//             {/* Location */}
//             <div className="flex justify-center">
//               <div className="bg-white/15 backdrop-blur-md w-fit px-3 py-2 rounded-full border mb-6 border-white/30 shadow-2xl">
//                 <div className="flex items-center justify-center gap-2 text-white ">
//                   <svg
//                     className="w-5 h-5"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                     />
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                     />
//                   </svg>
//                   <span className="font-small text-1xl">
//                     Serving Villages & Cities Across Tamil Nadu
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Title */}
//             <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
//                 Digital Docs
//               </span>
//               <br />
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-pink-400">
//                 Physical Delivery
//               </span>
//             </h1>

//             {/* Description */}
//             <p className="text-gray-200 text-xl mb-12 leading-relaxed max-w-2xl mx-auto">
//               Xerox, printing & government services made simple.
//               <br />
//               <p className="font-bold">No queues. No hassle. Just results.</p>
//             </p>

//             {/* Button */}
//             <button className="px-10 py-5 bg-amber-500 hover:bg-amber-600 rounded-full text-white font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 flex items-center gap-3 mx-auto">
//               Explore More!
//               <svg
//                 className="w-5 h-5"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M17 8l4 4m0 0l-4 4m4-4H3"
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Banner;


return (
    <div className="relative h-screen">
      <div className="absolute inset-0">
        <div className="fixed inset-0 -z-10">
          {/* Video Element */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1579546929662-711aa81148cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          >
            <source src="/videos/delivery-background.mp4" type="video/mp4" />
            <source src="/videos/delivery-background.webm" type="video/webm" />
            {/* Fallback gradient */}
            <div className="w-full h-full bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900" />
          </video>

          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-purple-900/30 to-blue-900/40" />

          {/* Floating Elements */}
          {/* <div className="absolute inset-0 pointer-events-none">
        {floatingIcons.map((item, index) => (
          <div
            key={index}
            className={absolute ${item.position} animate-bounce-slow ${item.delay}}
          >
            <div className="text-2xl bg-white/20 backdrop-blur-sm p-4 rounded-2xl shadow-2xl border border-white/30">
              {item.icon}
            </div>
          </div>
        ))}
      </div> */}

          {/* Custom Animations */}
          {/* <style jsx>{`
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 6s ease-in-out infinite;
        }
      `}</style> */}
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/20 via-purple-900/20 to-blue-900/20">
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <div className="text-center px-3 w-fit max-w-fit">
            {/* Location */}
            <div className="flex justify-center">
              <div className="bg-slate-800/60 backdrop-blur-md w-fit px-3 py-2 rounded-full border mb-6 border-slate-700/50 shadow-2xl">
                <div className="flex items-center justify-center gap-2 text-slate-200 ">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="font-small text-1xl">
                    Serving Villages & Cities Across Tamil Nadu
                  </span>
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                Digital Docs
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400">
                Physical Delivery
              </span>
            </h1>

            {/* Description */}
            <p className="text-slate-300 text-xl mb-12 leading-relaxed max-w-2xl mx-auto">
              Xerox, printing & government services made simple.
              <br />
              <span className="font-bold text-slate-100">No queues. No hassle. Just results.</span>
            </p>

            {/* Button */}
            <Link to="/login" className="px-10 w-60 py-4 bg-gradient-to-r from-cyan-300 to-blue-400 hover:from-cyan-500 hover:to-blue-500 rounded-full text-white font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 flex items-center gap-3 mx-auto backdrop-blur-sm border border-cyan-400/30">
              Explore More!
              <svg
                className="w-5 h-5"
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
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;