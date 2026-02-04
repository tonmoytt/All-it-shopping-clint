import { useContext, useState, useEffect, useRef } from 'react';
import { FaBars, FaChevronRight, FaHome, FaMoon, FaShoppingBag, FaShoppingCart, FaSignInAlt, FaSignOutAlt, FaStar, FaSun, FaTags, FaTimes } from 'react-icons/fa';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  FaLaptop, FaBlog, FaHeadphones, FaThLarge, FaEnvelope,
  FaFileAlt, FaInfoCircle, FaQuestionCircle
} from "react-icons/fa";

import Swal from 'sweetalert2';


import userImg from '../../../assets/Logo/user.png';
import logoutImg from '../../../assets/Logo/l.png';
// import brandName from '../../../assets/Logo/bolod name.jpg';
import { Authconnect } from '../AuthincationPages/Authincation/Authincation';
import logo from '../../../assets/Logo/photo_6055096631536848981_x.jpg'

const Navbar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const { currentUser, SignoutUser } = useContext(Authconnect);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  // const [isScrolled, setIsScrolled] = useState(false);

  const dropdownRef = useRef(null);
  const categoriesRef = useRef(null);


  // mobile menu logo and name style

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

  // ses



  // dark mode
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [isDarkMode]);

  const handleSignOut = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to log out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Log Out!',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await SignoutUser();
          Swal.fire({
            icon: 'success',
            title: 'Logged out!',
            text: 'You have been logged out successfully.',
            timer: 2000,
            showConfirmButton: false,
            navigate: '/'
          });
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: error?.message || 'Logout failed, please try again.',
          });
        }
      }
    });
  };

  const menuItems = [
    { name: 'Home', to: '/' },
    { name: 'About us', to: '/about' },
    { name: 'Collection', to: '/collection' },
    { name: 'Contact', to: '/contact' },
    { name: 'Blog', to: '/blog' },
    { name: 'Shop', to: '/shop' },
    { name: 'My Cart', to: '/mycart' },
  ];

  const categoryItems = [
    { name: 'New Product', badge: 'NEW', to: '/new2' },
    { name: 'New Arrival', to: '/newproducts2' },
    { name: 'Populer', badge: 'SALE', to: '/popular2' },
    { name: 'Collection', to: '/collection2' },
    { name: 'Contact', to: '/contact' },
    { name: 'Special Offers', to: '/special' },
    { name: 'About us', to: '/about' },
    { name: 'FAQs', to: '/faq' },
  ];

  const iconMap = {
    Electronic: FaLaptop,
    Blogs: FaBlog,
    Accessories: FaHeadphones,
    Collection: FaThLarge,
    Contact: FaEnvelope,
    "Included Pages": FaFileAlt,
    AboutUs: FaInfoCircle,
    FAQs: FaQuestionCircle
  };
// mobile menu navbars





  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-black/90 
       
        ${['/', '/collection', '/shop'].includes(location.pathname) ? 'mt-[64px]' : 'mt-0'}
      `}
    >
     <div className="max-w-full mx-auto px-2 lg:px-8 flex items-center justify-between py-2 md:py-3 md:h-16">
  {/* 1. Logo Section - Branding clear rakhar jonno */}
  <Link to="/" className="text-2xl font-extrabold tracking-tighter text-white flex-shrink-0">
  <p
  className="text-base md:text-xl font-bold tracking-wide"
  style={{
    background: "linear-gradient(to bottom, #facc15 0%, #facc15 50%, #10b981 50%, #10b981 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  }}
>
  BN-SHOP
</p>


  </Link>

  {/* 2. Desktop Navigation Menu */}
  <nav className="flex items-center gap-3 lg:gap-8 text-[10px] lg:text-[14px] uppercase font-semibold text-white">
    
    {/* Categories Dropdown */}
    <div
      ref={categoriesRef}
      className="hidden md:flex relative group ml-10" // group use korle hover effect bhalo hoy
      onMouseEnter={() => setIsCategoriesOpen(true)}
      onMouseLeave={() => setIsCategoriesOpen(false)}
    >
      <button className="flex items-center gap-2 hover:text-yellow-400 transition-colors py-2">
        <FaBars className="text-yellow-400" /> 
        <span className="whitespace-nowrap">All Categories</span>
        <FaChevronRight size={10} className={`transition-transform duration-300 ${isCategoriesOpen ? 'rotate-90 text-yellow-400' : ''}`} />
      </button>

      {/* Dropdown Menu - Glassmorphism touch */}
      <div
        className={`absolute top-full -left-2 mt-1 w-64 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl z-50 transition-all duration-300 ${isCategoriesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}
      >
        <ul className="p-3 space-y-1">
          {categoryItems.map(({ name, badge, to }) => {
            const Icon = iconMap[name] || FaFileAlt;
            return (
              <li key={name}>
                <Link
                  to={to}
                  className="flex items-center justify-between px-4 py-2.5 rounded-lg hover:bg-gray-800 transition group/item"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="text-yellow-400 group-hover/item:scale-110 transition-transform" />
                    <span className="capitalize font-normal">{name}</span>
                  </div>
                  {badge && <span className="px-1.5 py-0.5 text-[10px] bg-red-500 text-white rounded font-bold">{badge}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>

    {/* Main menu links - whitespace-nowrap diyechi jeno ek line e thake */}
    {/* {menuItems.map(({ name, to }) => (
      <Link key={name} to={to} className=" whitespace-nowrap hover:text-yellow-400 transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-yellow-400 hover:after:w-full after:transition-all">
        {name}
      </Link>
    ))} */}

    <Link
  to="/"
  className="whitespace-nowrap flex gap-6 hover:text-yellow-400 transition-colors relative
  after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0
  after:h-[2px] after:bg-yellow-400 hover:after:w-full after:transition-all px-2 py-1 border md:border-0 border-gray-700  rounded-md"
>
  Home
</Link>

<Link to="/about" className="hidden md:flex whitespace-nowrap gap-6 hover:text-yellow-400 transition-colors relative
  after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0
  after:h-[2px] after:bg-yellow-400 hover:after:w-full after:transition-all px-2 py-1 border md:border-0 border-gray-700  rounded-md">
  About Us
</Link>

<Link to="/collection" className="hidden md:flex whitespace-nowrap gap-6 hover:text-yellow-400 transition-colors relative
  after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0
  after:h-[2px] after:bg-yellow-400 hover:after:w-full after:transition-all px-2 py-1 border md:border-0 border-gray-700  rounded-md">
  Collection
</Link>

<Link to="/blog" className="hidden md:flex whitespace-nowrap gap-6 hover:text-yellow-400 transition-colors relative
  after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0
  after:h-[2px] after:bg-yellow-400 hover:after:w-full after:transition-all px-2 py-1 border md:border-0 border-gray-700  rounded-md">
  Blog
</Link>

<Link to="/shop" className="whitespace-nowrap flex gap-6 hover:text-yellow-400 transition-colors relative
  after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0
  after:h-[2px] after:bg-yellow-400 hover:after:w-full after:transition-all px-2 py-1 border md:border-0 border-gray-700  rounded-md">
  Shop
</Link>

<Link to="/contact" className="hidden md:flex whitespace-nowrap gap-6 hover:text-yellow-400 transition-colors relative
  after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0
  after:h-[2px] after:bg-yellow-400 hover:after:w-full after:transition-all px-2 py-1 border md:border-0 border-gray-700  rounded-md">
  Contact
</Link>

<Link to="/mycart" className="whitespace-nowrap flex gap-6 hover:text-yellow-400 transition-colors relative
  after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0
  after:h-[2px] after:bg-yellow-400 hover:after:w-full after:transition-all px-2 py-1 border md:border-0 border-gray-700  rounded-md" >
  My Cart
</Link>


    {/* View more Dropdown */}
    <div
      className="hidden md:flex relative"
      onMouseEnter={() => setIsDropdownOpen(true)}
      onMouseLeave={() => setIsDropdownOpen(false)}
    >
      {/* Button */}
      <button className="flex items-center gap-1 hover:text-yellow-400 transition-colors py-2">
        <span className="whitespace-nowrap">More</span>
        <FaChevronRight
          size={10}
          className={`transition-transform ${
            isDropdownOpen ? "rotate-90 text-yellow-400" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      <div
        className={`absolute top-full right-0 mt-2 w-44 bg-white text-gray-800 rounded-lg shadow-xl overflow-hidden z-50 transition-all duration-200
        ${
          isDropdownOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible translate-y-2"
        }`}
      >
        <Link
          to="/product"
          className="block text-[13px] px-3 py-2 hover:bg-gray-100 border-b border-gray-50 transition font-mono"
        >
          Product List
        </Link>

        <Link
          to="/category"
          className="block text-[13px] px-3 py-2 hover:bg-gray-100 transition font-mono"
        >
          All-Categories
        </Link>
      </div>
    </div>
  </nav>

  {/* 3. Desktop Right Actions */}
  <div className="hidden ml-6 md:flex items-center gap-3 lg:gap-4 flex-shrink-0">
    {/* Promo Tag */}
    <div className="hidden lg:block px-3 py-1.5 bg-yellow-400/10 border border-yellow-400/30 rounded-full font-bold text-[11px] text-yellow-400">
      ⚡ 10% OFF First order
    </div>
    
    {/* <Link to="/track-order" className="whitespace-nowrap px-4 py-2 text-xs lg:text-sm bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg font-bold transition-transform active:scale-95">
      Track Order
    </Link> */}

    {/* Auth & Theme */}
    <div className="flex items-center gap-3 border-l border-gray-700 pl-4 ml-2">
      {currentUser ? (
        <button onClick={handleSignOut} title="Logout" className="hover:opacity-80 transition">
          <img src={logoutImg} className="w-9 h-9 rounded-full border-2 border-gray-700" alt="Logout" />
        </button>
      ) : (
        <Link to="/login" title="Login" className="hover:opacity-80 transition">
          <img src={userImg} className="w-8 h-8 rounded-full border border-gray-600" alt="Login" />
        </Link>
      )}
      
      <button 
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="p-2 hover:bg-gray-800 rounded-full transition-colors"
      >
        {isDarkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-300" />}
      </button>
    </div>
  </div>
  
{/* navbar phone */}


  

  {/* Mobile menu button */}
  <button className="md:hidden text-white hover:bg-gray-800 rounded-lg" onClick={() => setMobileMenuOpen(true)}>
    <FaBars size={15} />
  </button>
</div>



      {/* Mobile menu */}
      {/* Mobile menu */}
  {mobileMenuOpen && (
  <nav className="md:hidden fixed inset-0 bg-black/90 backdrop-blur-lg z-[9999] overflow-y-auto">
    <div className="relative bg-gradient-to-b from-white-900 to-blue-900 text-white w-72 min-h-screen p-6 rounded-r-xl shadow-xl space-y-8">

      {/* Logo + Close */}
      <div className="flex items-center justify-between mb-6">
        <button className='flex'>
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
        </button>

        <button
          onClick={() => setMobileMenuOpen(false)}
          className="text-white hover:text-red-400 transition"
        >
          <FaTimes size={26} />
        </button>
      </div>

      

      {/* Categories */}
      <div className="mt-2">
        <button
          onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
          className="flex items-center justify-between w-full font-bold text-lg hover:text-yellow-400 transition"
        >
          <span>All Categories</span>
          <FaChevronRight className={`transition-transform ${isCategoriesOpen ? "rotate-90 text-yellow-400" : ""}`} />
        </button>
        {isCategoriesOpen && (
          <ul className="mt-4 space-y-3 shadow-md bg-blue-900  rounded-b-md shadow-cyan-400">
            {categoryItems.map(({ name, badge, to }) => {
              let Icon;
              switch(name) {
                case "New Product": Icon = FaLaptop; break;
                case "New Arrival": Icon = FaLaptop; break;
                case "Populer": Icon = FaStar; break;
                case "Collection": Icon = FaThLarge; break;
                case "Contact": Icon = FaEnvelope; break;
                case "Special Offers": Icon = FaTags; break;
                case "AboutUs": Icon = FaInfoCircle; break;
                case "FAQs": Icon = FaQuestionCircle; break;
                default: Icon = FaFileAlt;
              }
              return (
                <li key={name}>
                  <Link
                    to={to}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-blue-800 rounded-lg transition"
                  >
                    <Icon className="text-yellow-400 text-lg" />
                    <span className="text-md font-medium">{name}</span>
                    {badge && (
                      <span className="ml-auto px-2 py-0.5 text-xs bg-red-500 rounded-full">{badge}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Main Menu Links */}
      <div className="flex flex-col gap-3 mt-4">
        {menuItems.map(({ name, to }) => {
          let Icon;
          switch(name) {
            case "Home": Icon = FaHome; break;
            case "About us": Icon = FaInfoCircle; break;
            case "Collection": Icon = FaThLarge; break;
            case "Contact": Icon = FaEnvelope; break;
            case "Blog": Icon = FaBlog; break;
            case "Shop": Icon = FaShoppingCart; break;
            case "My Cart": Icon = FaShoppingBag; break;
            default: Icon = FaFileAlt;
          }
          return (
            <Link
              key={name}
              to={to}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-blue-800 rounded-lg text-lg font-semibold transition"
            >
              <Icon className="text-yellow-400" />
              <span>{name}</span>
            </Link>
          );
        })}
      </div>

      {/* User + Theme */}
      <div className="flex items-center justify-between pt-6 border-t border-white/30 mt-6">
        {currentUser ? (
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold text-white transition"
          >
            <FaSignOutAlt /> Logout
          </button>
        ) : (
          <Link
            to="/login"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-white transition"
          >
            <FaSignInAlt /> Login
          </Link>
        )}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition"
        >
          {isDarkMode ? <FaSun className="text-yellow-400 text-lg" /> : <FaMoon className="text-gray-200 text-lg" />}
        </button>
      </div>
    </div>
  </nav>
)}



    </header>
  );
};

export default Navbar;
