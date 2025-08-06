import { useContext, useEffect, useRef, useState } from 'react';
import { FaBars, FaChevronRight, FaMoon, FaSun, FaUser } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import './navbar.css';
import user from '../../../assets/Logo/user.png'
import logout from '../../../assets/Logo/l.png'
import { Authconnect } from '../AuthincationPages/Authincation/Authincation';
import Swal from 'sweetalert2';

const Navbar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const {currentUser , SignoutUser} =useContext(Authconnect)

  const handleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleItemClick = () => {
    setIsDropdownOpen(false);
  };

  // ✅ Outside click close for dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ✅ Toggle dark mode class on body
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

   const handleSignOut = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to log out!",
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
            text: error.message || 'Logout failed, please try again.',
          });
        }
      }
    });
  };

  return (
    <div className={`  max-w-full ${isDarkMode ? 'dark' : ''}`}>
      <div className="navbar-container bg-black">
        {/* ALL CATEGORIES Button */}
        <div className="relative">
          <div className="category-button">
            <FaBars className="text-lg" />
            <span className="uppercase text-md tracking-wide">All Categories</span>
          </div>

          {isHomePage && (
            <div className="dropdown-menu">
              <ul className="dropdown-list">
                <li className="dropdown-item">
                  <span className="flex items-center gap-2">
                    Electronic <span className="badge-new">NEW</span>
                  </span>
                  <FaChevronRight className="icon-arrow" />
                </li>
                <li className="dropdown-item">Blogs</li>
                <li className="dropdown-item">
                  <span className="flex items-center gap-2">
                    Accessories <span className="badge-sale">SALE</span>
                  </span>
                  <FaChevronRight className="icon-arrow" />
                </li>
                <li className="dropdown-item">Collection</li>
                <li className="dropdown-item">Contact</li>
                <li className="dropdown-item">Included Pages</li>
                <li className="dropdown-item">Aboutus</li>
                <li className="dropdown-item">FAQs</li>
              </ul>
            </div>
          )}
        </div>

        {/* Middle Menu */}
        <ul className="middle-menu text-white">
         <Link to='/'> <li> Home </li></Link>
          <li> About us </li>
          <li> Collection </li>
          <li> Contact </li>
          <li> Blog </li>
          <li> Shop </li>
          <li> Services </li>

          {/* View More Dropdown */}
          <li className="relative group list-none" ref={dropdownRef}>
            <button onClick={handleDropdown} className="dropdown-toggle">
              View More
              <FaChevronRight className={`icon-arrow ${isDropdownOpen ? "rotate" : ""}`} />
            </button>
            <div
              className={`dropdown-content ${isDropdownOpen ? "show" : "hide"}`}
            >
              <Link to="/product" onClick={handleItemClick}>Product</Link>
              <Link to="/category" onClick={handleItemClick}>Category</Link>
            </div>
          </li>
        </ul>

        {/* Offer Text */}
        <div className="offer-text">
          <p className="animate-offerText">FLAT 10% OFF ALL iPhone</p>
        </div>
        <div className='  flex text-end'>

{
  currentUser?  <div className="pl-">
            <button onClick={handleSignOut}>
                <img className='w-9 h-9' src={logout} alt="" /> 
            </button>
          </div>     : 

          <div className="pl-">
            <button>
              <Link to='/login'> <img className='w-8 h-8' src={user} alt="" /></Link>
            </button>
          </div>
}
          

          {/* 🌞/🌙 Toggle Button */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="toggle-theme "
            title="Toggle theme"
          >
            {isDarkMode ? <FaSun className='h-5 w-5' /> : <FaMoon className='h-5 w-5 rounded-full text-yellow-400' />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
