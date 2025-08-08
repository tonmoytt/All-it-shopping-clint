import { useContext, useState, useEffect, useRef } from 'react';
import { FaBars, FaChevronRight, FaMoon, FaSun } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Authconnect } from '../AuthincationPages/Authincation/Authincation';
import userImg from '../../../assets/Logo/user.png';
import logoutImg from '../../../assets/Logo/l.png';
import './navbar.css';

const Navbar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const { currentUser, SignoutUser } = useContext(Authconnect);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // For View More
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false); // For All Categories dropdown
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const dropdownRef = useRef(null);
  const categoriesRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target)
      ) {
        setIsDropdownOpen(false);
      }
      if (
        categoriesRef.current && !categoriesRef.current.contains(e.target)
      ) {
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
    { name: 'Shop', to: '/' },
    { name: 'Services', to: '/' },
  ];

  // Categories items for dropdown
  const categoryItems = [
    { name: 'Electronic', badge: 'NEW' },
    { name: 'Blogs' },
    { name: 'Accessories', badge: 'SALE' },
    { name: 'Collection' },
    { name: 'Contact' },
    { name: 'Included Pages' },
    { name: 'Aboutus' },
    { name: 'FAQs' },
  ];

  return (
    <header
      className={`fixed top-0 mt-16 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'backdrop-blur-md bg-black/80 shadow-lg' : 'bg-black/90'
      }`}
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
                className={`transform transition-transform duration-300 ${
                  isCategoriesOpen ? 'rotate-90 text-yellow-400' : ''
                }`}
              />
            </button>

            <div
              className={`absolute top-full left-0 mt-2 w-56 bg-white text-gray-800 border border-gray-200 rounded-md shadow-xl z-50 transition-all duration-300 ease-out ${
                isCategoriesOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
              }`}
            >
              <ul className="p-4 space-y-2">
                {categoryItems.map(({ name, badge }) => (
                  <li
                    key={name}
                    className="flex justify-between items-center cursor-pointer hover:text-yellow-400 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      {name}
                      {badge === 'NEW' && (
                        <span className="badge-new">NEW</span>
                      )}
                      {badge === 'SALE' && (
                        <span className="badge-sale">SALE</span>
                      )}
                    </span>
                    {(name === 'Electronic' || name === 'Accessories') && (
                      <FaChevronRight className="text-xs text-gray-400" />
                    )}
                  </li>
                ))}
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
                className={`transform transition-transform duration-300 ${
                  isDropdownOpen ? 'rotate-90 text-yellow-400' : ''
                }`}
              />
            </button>
            <div
              className={`absolute top-full left-0 mt-2 w-40 bg-white text-gray-700 border border-gray-200 rounded-md shadow-xl z-50 transition-all duration-300 ease-out ${
                isDropdownOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
              }`}
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
          <h1 className='animate-offerText whitespace-nowrap'>FLAT 10% OFF ALL iPhone</h1>  
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
              <img className="w-9 h-9 rounded-full object-cover" src={logoutImg} alt="Logout" />
            </button>
          ) : (
            <Link to="/login" aria-label="Login">
              <img className="w-8 h-8 rounded-full object-cover" src={userImg} alt="User Login" />
            </Link>
          )}

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="transition-transform duration-300 hover:scale-110"
            title="Toggle theme"
            aria-pressed={isDarkMode}
          >
            {isDarkMode ? (
              <FaSun className="h-5 w-5 text-yellow-400" />
            ) : (
              <FaMoon className="h-5 w-5 text-gray-300" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-black/95 text-white px-4 py-4 space-y-4 select-none animate-fadeIn">
          {/* Categories dropdown in mobile as collapsible */}
          <div className="mb-3">
            <button
              onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
              className="flex items-center justify-between w-full font-semibold uppercase text-base hover:text-yellow-400 transition"
              aria-expanded={isCategoriesOpen}
            >
              All Categories
              <FaChevronRight
                className={`transform transition-transform duration-300 ${
                  isCategoriesOpen ? 'rotate-90 text-yellow-400' : ''
                }`}
              />
            </button>
            {isCategoriesOpen && (
              <ul className="pl-4 mt-2 space-y-2 text-gray-300">
                {categoryItems.map(({ name, badge }) => (
                  <li
                    key={name}
                    className="flex justify-between items-center cursor-pointer hover:text-yellow-400 transition-colors"
                  >
                    <span className="flex items-center gap-2">{name}
                      {badge === 'NEW' && <span className="badge-new">NEW</span>}
                      {badge === 'SALE' && <span className="badge-sale">SALE</span>}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {menuItems.map(({ name, to }) => (
            <Link
              key={name}
              to={to}
              onClick={() => setMobileMenuOpen(false)}
              className="block uppercase text-base font-semibold hover:text-yellow-400 transition"
            >
              {name}
            </Link>
          ))}

          <Link
            to="/product"
            onClick={() => setMobileMenuOpen(false)}
            className="block uppercase text-base font-semibold hover:text-yellow-400 transition"
          >
            Product
          </Link>
          <Link
            to="/category"
            onClick={() => setMobileMenuOpen(false)}
            className="block uppercase text-base font-semibold hover:text-yellow-400 transition"
          >
            Category
          </Link>

          <div className="flex items-center justify-between mt-4 gap-4">
            {currentUser ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleSignOut();
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-red-600 font-semibold hover:bg-red-700 transition"
              >
                <img className="w-7 h-7 rounded-full object-cover" src={logoutImg} alt="Logout" />
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 font-semibold hover:bg-blue-700 transition"
              >
                <img className="w-7 h-7 rounded-full object-cover" src={userImg} alt="Login" />
                Login
              </Link>
            )}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition"
              title="Toggle theme"
              aria-pressed={isDarkMode}
            >
              {isDarkMode ? (
                <FaSun className="h-5 w-5 text-yellow-400" />
              ) : (
                <FaMoon className="h-5 w-5 text-gray-300" />
              )}
            </button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
