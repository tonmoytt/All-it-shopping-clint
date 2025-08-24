import { useContext, useState, useEffect, useRef } from 'react';
import { FaBars, FaChevronRight, FaMoon, FaSun } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import {
  FaLaptop, FaBlog, FaHeadphones, FaThLarge, FaEnvelope,
  FaFileAlt, FaInfoCircle, FaQuestionCircle
} from "react-icons/fa";
import { FaTimes } from 'react-icons/fa';

import Swal from 'sweetalert2';
import { Authconnect } from '../AuthincationPages/Authincation/Authincation';
import userImg from '../../../assets/Logo/user.png';
import logoutImg from '../../../assets/Logo/l.png';


const Navbar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const { currentUser, SignoutUser } = useContext(Authconnect);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // View More
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false); // All Categories dropdown
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const dropdownRef = useRef(null);
  const categoriesRef = useRef(null);

  // ✅ Scroll logic: navbar fixed থাকবে, শুধু dropdowns close হবে
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      // ✅ Close only dropdowns (not mobile menu)
      setIsDropdownOpen(false);
      setIsCategoriesOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
      if (categoriesRef.current && !categoriesRef.current.contains(e.target)) {
        setIsCategoriesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    { name: 'My Cart', to: '/dashboard' },
  ];

  // Categories items for dropdown
  const categoryItems = [
    { name: 'New Product', badge: 'NEW', to: '/shop' },
    { name: 'New Arrival', to: '/post' },
    { name: 'Populer', badge: 'SALE', to: '/top sell' },
    { name: 'Collection', to: '/collection' },
    { name: 'Contact', to: '/contact' },
    { name: 'Special Offers', to: '/special' },
    { name: 'Aboutus', to: '/about' },
    { name: 'FAQs', to: '/faq' },
  ];

  // Map categories to icons
  const iconMap = {
    Electronic: FaLaptop,
    Blogs: FaBlog,
    Accessories: FaHeadphones,
    Collection: FaThLarge,
    Contact: FaEnvelope,
    "Included Pages": FaFileAlt,
    Aboutus: FaInfoCircle,
    FAQs: FaQuestionCircle
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 
    ${isScrolled ? 'backdrop-blur-md bg-black/80 shadow-lg' : 'bg-black/90'} 
    ${['/', '/collection', '/shop'].includes(location.pathname) ? 'mt-[54px]' : 'mt-0'}
  `}
    >

      <div className="max-w-full px-4 md:px-20 flex flex-wrap items-center justify-between gap-3 py-3">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-white select-none">
          AL-IT
        </Link>

        {/* Middle menu desktop */}
        <nav className="hidden md:flex flex-wrap items-center justify-center gap-6 md:gap-10 text-sm md:text-base uppercase font-medium flex-grow text-white select-none">
          {/* All Categories Menu with Dropdown */}
          <div
            ref={categoriesRef}
            className="relative cursor-pointer group"
            onMouseEnter={() => setIsCategoriesOpen(true)}
            onMouseLeave={() => setIsCategoriesOpen(false)}
          >
            <button
              className="flex items-center gap-2 font-semibold hover:text-yellow-400 transition-colors select-none"
              type="button"
              aria-haspopup="true"
              aria-expanded={isCategoriesOpen}
            >
              <FaBars />
              <span>All Categories</span>
              <FaChevronRight
                className={`transform transition-transform duration-300 ${isCategoriesOpen ? 'rotate-90 text-yellow-400' : ''}`}
              />
            </button>

            <div
              className={`absolute top-full left-0 mt-2 w-56 bg-white text-gray-800 border border-gray-200 rounded-md shadow-xl z-50 transition-all duration-300 ease-out ${isCategoriesOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}
            >
              <ul className="p-4 space-y-3 bg-gray-900/80 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700 w-64">
                {categoryItems.map(({ name, badge }) => {
                  const Icon = iconMap[name] || FaFileAlt; // Fallback icon

                  return (
                    <li
                      key={name}
                      className="relative flex items-center justify-between px-4 py-3 rounded-lg border border-gray-700
                                 bg-gray-800/50 hover:bg-gray-800
                                 transition-all duration-300 ease-in-out transform hover:scale-[1.03]
                                 hover:shadow-[0_0_15px_rgba(255,215,0,0.6)]
                                 group cursor-pointer"
                    >
                      {/* Icon + Name */}
                      <div className="flex items-center gap-3">
                        <Icon className="text-yellow-400 text-lg group-hover:rotate-6 transition-transform duration-300" />
                        <span className="text-gray-200 font-medium group-hover:text-yellow-400 transition-colors duration-300">
                          {name}
                        </span>
                      </div>

                      {/* Badge */}
                      {badge && (
                        <span
                          className={`absolute -top-2 -right-2 px-2 py-0.5 text-xs font-bold rounded-full text-white shadow-md animate-gradient-move ${badge === 'NEW'
                              ? 'bg-gradient-to-r from-green-400 via-yellow-300 to-green-500'
                              : 'bg-gradient-to-r from-red-500 via-pink-500 to-yellow-400'
                            }`}
                        >
                          {badge}
                        </span>
                      )}

                      {/* Chevron */}
                      {(name === 'Electronic' || name === 'Accessories') && (
                        <FaChevronRight className="text-xs text-gray-400 group-hover:text-yellow-400 transition-colors duration-300" />
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Other menu items */}
          {menuItems.map(({ name, to }) => (
            <Link
              key={name}
              to={to}
              className="relative group hover:text-yellow-400 transition"
            >
              {name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}

          {/* View More Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen((p) => !p)}
              className="flex items-center gap-1 cursor-pointer text-gray-300 hover:text-yellow-400 transition font-semibold select-none"
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
              type="button"
            >
              View More
              <FaChevronRight
                className={`transform transition-transform duration-300 ${isDropdownOpen ? 'rotate-90 text-yellow-400' : ''}`}
              />
            </button>
            <div
              className={`absolute top-full left-0 mt-2 w-40 bg-white text-gray-700 border border-gray-200 rounded-md shadow-xl z-50 transition-all duration-300 ease-out ${isDropdownOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}
            >
              <Link
                to="/product"
                onClick={() => setIsDropdownOpen(false)}
                className="block px-4 py-2 text-sm hover:bg-gray-100"
              >
                Product
              </Link>
              <Link
                to="/category"
                onClick={() => setIsDropdownOpen(false)}
                className="block px-4 py-2 text-sm hover:bg-gray-100"
              >
                Category
              </Link>
            </div>
          </div>
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle menu"
          onClick={() => setMobileMenuOpen((p) => !p)}
        >
          <FaBars className="text-xl" />
        </button>

        {/* Offer + Track order desktop */}
        <div className="hidden md:flex items-center gap-4">
          <div className="w-[240px] h-10 flex items-center justify-center bg-yellow-400 font-semibold text-sm rounded-md select-none ">
            <h1 className="animate-offerText whitespace-nowrap">FLAT 10% OFF ALL Blender</h1>
          </div>
          <Link
            to="/track-order"
            className="px-4 py-2 text-sm bg-yellow-400 rounded-md font-semibold text-black hover:shadow-lg transition"
          >
            Track Order
          </Link>
        </div>

        {/* User + Theme toggle desktop */}
        <div className="hidden md:flex items-center gap-4 select-none">
          {currentUser ? (
            <button onClick={handleSignOut} aria-label="Logout" className="focus:outline-none">
              <img className="w-9 h-9 rounded-full object-cover cursor-pointer" src={logoutImg} alt="Logout" />
            </button>
          ) : (
            <Link to="/login" aria-label="Login">
              <img className="w-8 h-8 rounded-full object-cover cursor-pointer" src={userImg} alt="User Login" />
            </Link>
          )}

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="transition-transform duration-300 hover:scale-110"
            title="Toggle theme"
            aria-pressed={isDarkMode}
          >
            {isDarkMode ? (
              <FaSun className="h-5 w-5 cursor-pointer text-yellow-400" />
            ) : (
              <FaMoon className="h-5 w-5 cursor-pointer text-gray-300 hover:text-red-400" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}

      {mobileMenuOpen && (
        <nav
          className="md:hidden fixed inset-0 z-50 flex justify-center bg-gradient-to-r from-orange-300 via-red-300 to-cyan-400 bg-opacity-70 backdrop-blur-md"
          aria-label="Mobile menu"
        >
          <div className="relative bg-gradient-to-b from-blue-900 via-blue-800 to-blue-300 text-gray-100 w-[90vw] max-w-xs py-8 px-6 space-y-6 select-none animate-fadeIn shadow-xl rounded-lg overflow-y-auto max-h-full">

            {/* Close Button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              className="absolute top-2 right-3 text-gray-300 hover:text-blue-400 transition-colors duration-300 focus:outline-none"
            >
              <FaTimes size={20} />
            </button>

            {/* Categories dropdown */}
           <div>
  <button
    onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
    className="flex items-center justify-between w-full font-semibold uppercase text-base tracking-wide hover:text-blue-300 transition-colors duration-300 focus:outline-none"
    aria-expanded={isCategoriesOpen}
  >
    All Categories
    <FaChevronRight
       onClick={(e) => {
                    e.stopPropagation();
                    setIsCategoriesOpen(!isCategoriesOpen); // ✅ Toggle properly
                  }}
      className={`cursor-pointer transform transition-transform duration-300 ${isCategoriesOpen ? 'rotate-90 text-blue-300' : 'text-gray-400'}`}
      size={18}
    />
  </button>

  {isCategoriesOpen && (
    <ul className="pl-5 mt-4 space-y-2 max-h-52 overflow-y-auto text-gray-300 font-medium">
      {categoryItems.map(({ name, badge }) => {
        const Icon = iconMap[name] || FaFileAlt;
        return (
          <li
            key={name}
            onClick={() => {
              setIsCategoriesOpen(false); // ✅ Dropdown close হবে
              setMobileMenuOpen(false); // ✅ Mobile menu close হবে (optional)
            }}
            className="flex justify-between items-center cursor-pointer hover:text-blue-300 transition-colors duration-250 text-base rounded-md px-2 py-1"
          >
            <span className="flex items-center gap-3">
              <Icon className="text-blue-400" />
              {name}
              {badge === 'NEW' && (
                <span className="ml-2 px-2 py-0.5 bg-green-600 text-white text-xs font-semibold rounded-full shadow-sm select-none">
                  NEW
                </span>
              )}
              {badge === 'SALE' && (
                <span className="ml-2 px-2 py-0.5 bg-red-600 text-white text-xs font-semibold rounded-full shadow-sm select-none">
                  SALE
                </span>
              )}
            </span>
            <FaChevronRight className="text-gray-400" size={14} />
          </li>
        );
      })}
    </ul>
  )}
</div>


            {/* Main menu links */}
            <div className="flex flex-col gap-4">
              {menuItems.map(({ name, to }) => {
                const mainIconMap = {
                  Home: FaLaptop,
                  'About us': FaInfoCircle,
                  Collection: FaThLarge,
                  Contact: FaEnvelope,
                  Blog: FaBlog,
                  Shop: FaHeadphones,
                  Services: FaFileAlt,
                };
                const Icon = mainIconMap[name] || FaFileAlt;
                return (
                  <Link
                    key={name}
                    to={to}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex border-t items-center gap-2 uppercase font-semibold tracking-wide hover:text-blue-300 transition-colors duration-300 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <Icon className="text-blue-400" size={15} />
                    {name}
                  </Link>
                );
              })}

              {/* Extra fixed links */}
              <Link
                to="/product"
                onClick={() => setMobileMenuOpen(false)}
                className="flex border-t items-center gap-2 uppercase  font-semibold tracking-wide hover:text-blue-300 transition-colors duration-300 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <FaFileAlt className="text-blue-400" size={15} />
                Product
              </Link>
              <Link
                to="/category"
                onClick={() => setMobileMenuOpen(false)}
                className="flex border-t items-center gap-2 uppercase  font-semibold tracking-wide hover:text-blue-300 transition-colors duration-300 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <FaThLarge className="text-blue-400" size={15} />
                Category
              </Link>
            </div>

            {/* User actions + dark mode toggle */}
            <div className="flex items-center justify-between mt-8 gap-4">
              {currentUser ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleSignOut();
                  }}
                  className="flex items-center gap-3 px-5 py-3 rounded-lg bg-red-700 bg-opacity-90 hover:bg-red-800 shadow-lg transition duration-300 font-semibold text-white tracking-wide select-none"
                >
                  <img
                    className="w-7 h-7 rounded-full object-cover cursor-pointer"
                    src={logoutImg}
                    alt="Logout"
                    draggable={false}
                  />
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-5 py-3 rounded-lg bg-blue-700 bg-opacity-90 hover:bg-blue-800 shadow-lg transition duration-300 font-semibold text-white tracking-wide select-none"
                >
                  <img
                    className="w-7 h-7 rounded-full object-cover"
                    src={userImg}
                    alt="Login"
                    draggable={false}
                  />
                  Login
                </Link>
              )}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-3 rounded-full bg-white bg-opacity-20 hover:bg-opacity-40 shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                title="Toggle theme"
                aria-pressed={isDarkMode}
              >
                {isDarkMode ? (
                  <FaSun className="h-6 w-6 cursor-pointer text-yellow-400" />
                ) : (
                  <FaMoon className="h-6 w-6 cursor-pointer text-gray-400" />
                )}
              </button>
            </div>
          </div>
        </nav>
      )}


    </header>
  );
};

export default Navbar;
