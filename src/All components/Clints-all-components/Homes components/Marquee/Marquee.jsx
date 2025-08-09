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
    FaInfoCircle
} from "react-icons/fa";
 
import "./marquee.css";

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
        <div className=" w-full font-sans">
            {/* Top Info Row - Date Left, Time Right */}
            <div className="flex bg-gradient-to-r from-blue-400 via-red-300 to-cyan-400 justify-between items-center px-6 py-2 text-white text-sm">
                <div className="flex items-center text-black  gap-2">
                    <FaCalendarAlt className="text-yellow-400" />
                    <span>{dateTime.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-4">
                    🚚 <span>Free Shipping on orders above $99</span>

                    <span>•</span>

                    💳 <span>Secure Payment Options Available</span>
                </div>
                <div className="flex items-center gap-2">
                    <FaClock className="text-green-400" />
                    <span className="text-purple-500">{dateTime.toLocaleTimeString()}</span>
                </div>
            </div>

            {/* Main Marquee */}
            <div className="marquee-wrapper bg-gradient-to-r from-blue-900 via-purple-900 to-gray-900 py-3 shadow-lg relative">
                {/* Left Decorative Icon */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl drop-shadow-lg">
                    <FaLaptop />
                </div>

                {/* Right Decorative Icon */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl drop-shadow-lg">
                    <FaLaptop />
                </div>

                {/* Scrolling Items */}
                <div className="marquee">
                    {[...items, ...items].map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-2  text-white text-lg font-semibold px-6 hover:text-yellow-300 transition-colors"
                        >
                            <span className="text-xl">{item.icon}</span>
                            <span>{item.text}</span>
                        </div>
                    ))}
                </div>
            </div>

            
        </div>
    );
};

export default Marquee;
