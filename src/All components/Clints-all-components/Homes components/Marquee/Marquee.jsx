import React, { useState, useEffect } from "react";
import {
  FaLaptop,
  FaMobileAlt,
  FaHeadphonesAlt,
  FaKeyboard,
  FaMouse,
  FaTabletAlt,
  FaClock,
  FaCalendarAlt,
} from "react-icons/fa";
import "./Marquee.css";

const Marquee = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const items = [
    { icon: <FaLaptop />, text: "Latest Gaming Laptops" },
    { icon: <FaMobileAlt />, text: "Smartphones & Accessories" },
    { icon: <FaHeadphonesAlt />, text: "Noise Cancelling Headphones" },
    { icon: <FaKeyboard />, text: "RGB Mechanical Keyboards" },
    { icon: <FaMouse />, text: "High DPI Gaming Mice" },
    { icon: <FaTabletAlt />, text: "Latest Android & iOS Tablets" },
  ];

  return (
    <div className="hidden md:flex flex-col max-w-7xl mx-auto w-full font-sans select-none px-4 pt-6">
      {/* Top Info Bar */}
      <div className="info-bar" aria-label="Information Bar">
        <div className="info-card" title="Date">
          <FaCalendarAlt />
          <span>{dateTime.toLocaleDateString()}</span>
        </div>
        <div className="divider-dot" />
        <div className="info-card" title="Shipping Info">
          <span role="img" aria-label="Shipping">
            🚚
          </span>
          <span>Free Shipping over $99</span>
        </div>
        <div className="divider-dot" />
        <div className="info-card" title="Payment">
          <span role="img" aria-label="Payment">
            💳
          </span>
          <span>Secure Payment Options</span>
        </div>
        <div className="divider-dot" />
        <div className="info-card" title="Time">
          <FaClock />
          <span>{dateTime.toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Marquee */}
      <div className="marquee-wrapper" aria-label="Trending products marquee">
        <div className="marquee" role="list">
          {[...items, ...items].map((item, idx) => (
            <div
              key={idx}
              className="marquee-item"
              role="listitem"
              aria-hidden={idx >= items.length}
            >
              {item.icon}
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
