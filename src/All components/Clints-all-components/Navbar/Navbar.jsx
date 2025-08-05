import { useEffect, useRef, useState } from 'react';
import { FaBars, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';



const Navbar = () => {
    

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
     const dropdownRef = useRef(null);

    const handleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleItemClick = () => {
        setIsDropdownOpen(false);
    };

    
  // ✅ Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
    return (
        <div className="bg-black text-white text-sm px-20 py-2 flex justify-between items-center">
            {/* ALL CATEGORIES + Menu */}
            <div className="relative">
                <div className="bg-yellow-300 text-black px-5 py-[8px] flex items-center gap-2 font-semibold rounded-sm w-64">
                    <FaBars className="text-lg" />
                    <span className="uppercase text-md tracking-wide">All Categories</span>
                </div>

                {/* Always Visible Menu */}
                <div className="absolute top-[100%] left-0 w-64 bg-white text-black shadow-xl py-3 mt-1 z-50">
                    <ul className="space-y-3 px-5 text-[16px] font-sans leading-5">
                        <li className="flex justify-between items-center border-b border-gray-200 pb-4 text-gray-700">
                            <span className="flex items-center gap-2">Electronic <span className="text-[8px] bg-black text-white px-[6px] rounded">NEW</span></span>
                            <FaChevronRight className="text-xs text-gray-400" />
                        </li>
                        <li className="border-b border-gray-200 pb-4 text-gray-700">Blogs</li>
                        <li className="flex justify-between items-center border-b border-gray-200 pb-4 text-gray-700">
                            <span className="flex items-center gap-2">Accessories <span className="text-[8px] bg-green-500 text-white px-[6px] rounded">SALE</span></span>
                            <FaChevronRight className="text-xs text-gray-400" />
                        </li>
                        <li className="border-b border-gray-200 pb-4 text-gray-700">Collection</li>
                        <li className="border-b border-gray-200 pb-4 text-gray-700">Contact</li>
                        <li className="border-b border-gray-200 pb-4 text-gray-700">Included Pages</li>
                        <li className="border-b border-gray-200 pb-4 text-gray-700">Aboutus</li>
                        <li className="text-gray-700">FAQs</li>
                    </ul>
                </div>
            </div>

            {/* Middle Menu */}
             <ul className="flex gap-7 items-center text-[13px] font-semibold uppercase tracking-wide mx-auto">
      <li>
        <a href="#" className="text-gray-300 hover:text-yellow-400 pb-1">About us</a>
      </li>
      <li>
        <a href="#" className="text-gray-300 hover:text-yellow-400 pb-1">Collection</a>
      </li>
      <li>
        <a href="#" className="text-gray-300 hover:text-yellow-400 pb-1">Contact</a>
      </li>
      <li>
        <a href="#" className="text-gray-300 hover:text-yellow-400 pb-1">Blog</a>
      </li>
      <li>
        <a href="#" className="text-gray-300 hover:text-yellow-400 pb-1">Shop</a>
      </li>
      <li>
        <a href="#" className="text-gray-300 hover:text-yellow-400 pb-1">Services</a>
      </li>

      {/* ✅ View More Dropdown */}
      <li className="relative group list-none" ref={dropdownRef}>
        <button
          onClick={handleDropdown}
          className="flex items-center gap-1 text-[13px] text-gray-300 hover:text-yellow-400 transition duration-300"
        >
          View More
          <FaChevronRight
            className={`transform transition duration-300 ${
              isDropdownOpen ? "rotate-90 text-yellow-400" : ""
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        <div
          className={`absolute top-6 left-0 w-40 bg-white shadow-lg rounded-md overflow-hidden transition-all duration-300 ease-in-out border border-gray-200 z-50 ${
            isDropdownOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
          }`}
        >
          <Link
            to="/product"
            onClick={handleItemClick}
            className="block px-4 py-2 hover:bg-gray-100 text-gray-700 transition"
          >
            Product
          </Link>
          <Link
            to="/category"
            onClick={handleItemClick}
            className="block px-4 py-2 hover:bg-gray-100 text-gray-700 transition"
          >
            Category
          </Link>
        </div>
      </li>
    </ul>

            {/* Offer Animation Text Removed */}
            <div className="relative overflow-hidden w-[240px] h-[40px] flex items-center justify-center">
                <div className="bg-yellow-400 text-black font-bold text-[14px] px-4 py-2 ">
                    <p className='animate-offerText'>FLAT 10% OFF ALL iPhone</p>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
