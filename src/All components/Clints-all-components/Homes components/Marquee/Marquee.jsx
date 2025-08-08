import React from "react";
import {
  FaLeaf,
  FaAppleAlt,
  FaCarrot,
  FaCoffee,
  FaFish,
  FaBreadSlice,
  FaInfoCircle
} from "react-icons/fa";
import "./marquee.css";

const Marquee = () => {
  const items = [
    { icon: <FaLeaf />, text: "Fresh Vegetables" },
    { icon: <FaAppleAlt />, text: "Organic Fruits" },
    { icon: <FaCarrot />, text: "Healthy Foods" },
    { icon: <FaCoffee />, text: "Premium Coffee" },
    { icon: <FaFish />, text: "Seafood Specials" },
    { icon: <FaBreadSlice />, text: "Bakery Fresh" },
  ];

  return (
    <div className="max-w-7xl mx-auto mt-16">
      {/* Top Info Row */}
      <div className="flex items-center justify-center gap-2 bg-green-700 text-white py-1 text-sm font-medium">
        <FaInfoCircle className="text-yellow-300" />
        <span>Latest Updates • Fresh stock arriving daily!</span>
      </div>

      {/* Marquee Section */}
      <div className="marquee-wrapper bg-gradient-to-r from-green-500 via-lime-500 to-green-500 py-3 shadow-lg">
        {/* Left icon */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl drop-shadow-lg">
          <FaLeaf />
        </div>

        {/* Right icon */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl drop-shadow-lg">
          <FaLeaf />
        </div>

        {/* Marquee Content */}
        <div className="marquee">
          {[...items, ...items].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-white text-lg font-semibold px-6"
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Info Row */}
      <div className="flex items-center justify-center gap-2 bg-green-700 text-white py-1 text-sm font-medium">
        <span>📦 Free delivery on orders above $50</span>
      </div>
    </div>
  );
};

export default Marquee;
