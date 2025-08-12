import { FaShoppingCart } from 'react-icons/fa';
import logo from '../../../../assets/Logo/Logo_large_7f435a99-3203-4e46-976d-678a5aeb8f5c_large.webp';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white fixed top-0 left-0 w-full z-50 border-b border-gray-200 px-4 sm:px-8 md:px-10 py-3 flex flex-wrap items-center justify-between gap-4">
      {/* Logo and Tagline */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <img src={logo} alt="Logo" className="h-10" />
        {/* <span className="text-gray-500 text-xs -mt-1">Electronic</span> */}
      </div>

      {/* Search Bar */}
      <div className="flex-1 min-w-[200px] max-w-[600px] w-full sm:w-auto flex justify-center">
        <div className="relative w-full sm:w-[450px]">
          <input
            type="text"
            placeholder="Search"
            className="w-full border border-gray-300 rounded-full pl-5 pr-12 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button
            type="submit"
            className="absolute right-1 top-1/2 -translate-y-1/2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-[6px] rounded-r-full transition"
            aria-label="Search"
          >
            🔍
          </button>
        </div>
      </div>

      {/* Cart Section */}
      <Link to='/dashboard'>
        <div className="flex items-center gap-2 flex-shrink-0">
          <FaShoppingCart size={20} className="text-black" />
          <div className="flex flex-col items-start leading-none">
            <span className="text-xs font-medium">Shopping Cart</span>
            <span className="text-[13px] text-gray-500 font-semibold">$0.00</span>
          </div>
        </div>
      </Link>
    </header>
  );
};

export default Header;
