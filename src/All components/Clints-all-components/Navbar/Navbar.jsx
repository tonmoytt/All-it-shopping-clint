import { useContext, useState, useEffect, useRef } from 'react';
import { FaBars, FaChevronRight, FaHome, FaMoon, FaShoppingBag, FaShoppingCart, FaSignInAlt, FaSignOutAlt, FaStar, FaSun, FaTags, FaTimes } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import {
  FaLaptop, FaBlog, FaHeadphones, FaThLarge, FaEnvelope,
  FaFileAlt, FaInfoCircle, FaQuestionCircle
} from "react-icons/fa";

import Swal from 'sweetalert2';

import userImg from '../../../assets/Logo/user.png';
import logoutImg from '../../../assets/Logo/l.png';
import { Authconnect } from '../AuthincationPages/Authincation/Authincation';
import logo from '../../../assets/Logo/Logo_large_7f435a99-3203-4e46-976d-678a5aeb8f5c_large.webp'

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
    { name: 'Aboutus', to: '/about' },
    { name: 'FAQs', to: '/faq' },
  ];

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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-black/90 
       
        ${['/', '/collection', '/shop'].includes(location.pathname) ? 'mt-[54px]' : 'mt-0'}
      `}
    >
      <div className="max-w-full px-4 md:px-20 flex items-center justify-between py-3">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-white">AL-IT</Link>

        {/* Desktop menu */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-10 text-sm lg:text-base uppercase font-medium text-white">
          {/* Categories */}
          <div
            ref={categoriesRef}
            className="relative"
            onMouseEnter={() => setIsCategoriesOpen(true)}
            onMouseLeave={() => setIsCategoriesOpen(false)}
          >
            <button className="flex items-center gap-2 font-semibold hover:text-yellow-400">
              <FaBars /> All Categories
              <FaChevronRight className={`transition-transform ${isCategoriesOpen ? 'rotate-90 text-yellow-400' : ''}`} />
            </button>
            {/* dropdown */}
            <div
              className={`absolute top-full left-0 mt-2 w-56 transition-all duration-300 ${isCategoriesOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            >
              <ul className="p-4 space-y-3 bg-gray-900/90 rounded-xl border border-gray-700 w-64">
                {categoryItems.map(({ name, badge, to }) => {
                  const Icon = iconMap[name] || FaFileAlt;
                  return (
                    <li key={name}>
                      <Link
                        to={to}
                        className="flex items-center justify-between px-4 py-3 rounded-lg bg-gray-800/60 hover:bg-gray-800 transition"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="text-yellow-400" />
                          <span>{name}</span>
                        </div>
                        {badge && <span className="px-2 py-0.5 text-xs bg-red-500 rounded-full">{badge}</span>}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Main menu */}
          {menuItems.map(({ name, to }) => (
            <Link key={name} to={to} className="relative hover:text-yellow-400">
              {name}
            </Link>
          ))}

          {/* View more */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1 font-semibold hover:text-yellow-400"
            >
              View More
              <FaChevronRight className={`transition-transform ${isDropdownOpen ? 'rotate-90 text-yellow-400' : ''}`} />
            </button>
            <div
              className={`absolute top-full left-0 mt-2 w-40 bg-white text-gray-700 rounded-md shadow-xl transition-all ${isDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            >
              <Link to="/product" className="block px-4 py-2 hover:bg-gray-100">Product</Link>
              <Link to="/category" className="block px-4 py-2 hover:bg-gray-100">Category</Link>
            </div>
          </div>
        </nav>

        {/* Mobile menu button */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(true)}>
          <FaBars size={22} />
        </button>

        {/* Desktop right actions */}
        <div className="hidden md:flex items-center gap-4">
          <div className="px-3 py-2 bg-yellow-400 rounded-md font-semibold text-sm">10% OFF Blender</div>
          <Link to="/track-order" className="px-4 py-2 text-sm bg-yellow-400 rounded-md font-semibold text-black">Track Order</Link>
          {currentUser ? (
            <button onClick={handleSignOut}>
              <img src={logoutImg} className="w-9 h-9 rounded-full" alt="Logout" />
            </button>
          ) : (
            <Link to="/login">
              <img src={userImg} className="w-8 h-8 rounded-full" alt="Login" />
            </Link>
          )}
          <button onClick={() => setIsDarkMode(!isDarkMode)}>
            {isDarkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-300" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {/* Mobile menu */}
  {mobileMenuOpen && (
  <nav className="md:hidden fixed inset-0 bg-black/90 backdrop-blur-lg z-[9999] overflow-y-auto">
    <div className="relative bg-gradient-to-b from-blue-900 to-blue-900 text-white w-80 min-h-screen p-6 rounded-r-xl shadow-xl space-y-8">

      {/* Logo + Close */}
      <div className="flex items-center justify-between mb-6">
        <button>
          <img src={logo} alt="Logo" className="w-28" />
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
                case "Aboutus": Icon = FaInfoCircle; break;
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
