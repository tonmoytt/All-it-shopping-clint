import { FaShoppingCart, FaSearch } from 'react-icons/fa'; // FaSearch use kora better
import logo from '../../../../assets/Logo/photo_6055096631536848981_x.jpg';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Header = () => {

// brand name 
const [speed, setSpeed] = useState("3s");
  const [isDark, setIsDark] = useState(false);

  // scroll speed control
  useEffect(() => {
    const handleScroll = () => {
      setSpeed(window.scrollY > 50 ? "1.5s" : "3s");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // dark / light detect
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkTheme();
    window.addEventListener("click", checkTheme);
    return () => window.removeEventListener("click", checkTheme);
  }, []);


  const location = useLocation();
  
  // ✅ Routes logic
  const showHeader = ["/", "/collection", "/shop"].includes(location.pathname);

  if (!showHeader) return null; // Component render e hobe na jodi path match na kore

  return (
    <header className="bg-white fixed top-0 left-0 w-full z-50 border-b border-gray-200 shadow-sm ">
      <div className="max-w-8xl  mx-auto px-3 lg:px-12 py-2 h-16 flex items-center justify-between gap-4">
        
        {/* 1. Logo Section */}
       <Link to="/" className="flex items-center gap-1 flex-shrink-0 group">
          <div className="relative">
             <img src={logo} alt="Brand Logo" className="h-12 w-12 md:h-16 md:w-16 rounded-full object-cover border " />
          </div>
          
    {/* brand name  */}
    <div className="flex flex-col justify-center group">
      {/* inline keyframes */}
      <style>
        {`
          @keyframes verticalGradient {
            0% { background-position: 0% 0%; }
            50% { background-position: 0% 100%; }
            100% { background-position: 0% 0%; }
          }
        `}
      </style>

      <h1
        className="text-xl md:text-3xl font-serif font-bold tracking-tight leading-none"
        style={{
          background: isDark
            ? "linear-gradient(180deg, #22d3ee, #6366f1, #a855f7)"
            : "linear-gradient(180deg, #facc15, #f59e0b, #92400e)",
          backgroundSize: "100% 300%",
          animation: `verticalGradient ${speed} ease-in-out infinite`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          transition: "all .3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.animationPlayState = "paused";
          e.currentTarget.style.textShadow =
            "0 0 18px rgba(168,85,247,0.6)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.animationPlayState = "running";
          e.currentTarget.style.textShadow = "none";
        }}
      >
        Bongo
        <span
          style={{
            background: isDark
              ? "linear-gradient(180deg, #34d399, #10b981, #065f46)"
              : "linear-gradient(180deg, #fb7185, #e11d48, #881337)",
            backgroundSize: "100% 300%",
            animation: `verticalGradient ${speed} ease-in-out infinite reverse`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Nex
        </span>
      </h1>

      <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-gray-400 to-transparent mt-1"></div>

      <p className="text-[6px] md:text-[10px] tracking-[0.25em] uppercase text-gray-400 font-medium mt-1">
        Trusted Luxury Shop
      </p>
    </div>
        </Link>

        {/* 2. Search Bar - Desktop Only (Hidden on mobile) */}
        <div className=" md:flex flex-1 justify-center max-w-xl md:max-w-lg">
          <form className="relative w-full">
            <input
              type="text"
              placeholder="Search "
              className="w-full border text-black border-gray-300 rounded-full pl-4 md:pl-3 pr-5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
            />
            <button
              type="submit"
              className="absolute right-0 top-0 bottom-0 bg-pink-500 hover:bg-pink-600 text-white px-2 md:px-3 rounded-r-full transition flex items-center justify-center"
              aria-label="Search"
            >
              <FaSearch size={14} />
            </button>
          </form>
        </div>

        {/* 3. Action Icons / Cart Section */}
        <div className="flex items-center gap-4">
          {/* Mobile Search Icon (Optional: can be added for mobile search popup) */}
          {/* <button className="md:hidden text-gray-600">
            <FaSearch size={20} />
          </button> */}

          <Link 
            to='/dashboard' 
            className="flex items-center gap-2 group hover:text-pink-500 transition"
          >
            <div className="relative">
              <FaShoppingCart size={24} className="text-gray-800 group-hover:text-pink-500" />
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">0</span>
            </div>
            <div className="hidden sm:flex flex-col items-start leading-none">
              <span className="text-[11px] font-medium text-gray-500 uppercase">My Cart</span>
              <span className="text-[13px] font-bold text-gray-900">$0.00</span>
            </div>
          </Link>
        </div>

      </div>
    </header>
  );
};

export default Header;