import { FaShoppingCart } from 'react-icons/fa';
import logo from '../../../../assets/Logo/Logo_large_7f435a99-3203-4e46-976d-678a5aeb8f5c_large.webp'

const Header = () => {
  return (
    <div className="bg-white px-10 py-4 flex justify-between items-center border-b border-gray-200 text-sm">
      {/* Logo and Tagline */}
      <div className="flex items-center gap-2">
        <img src={logo} alt="Logo" className="h-10" />
        <span className="text-gray-500 text-xs -mt-1">Electronic</span>
      </div>

      {/* Search Bar */}
      <div className="flex-1 flex justify-center">
        <div className="relative w-[450px]">
          <input
            type="text"
            placeholder="Search"
            className="w-full border border-gray-300 rounded-full pl-5 pr-12 py-2 text-sm focus:outline-none"
          />
          <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-[6px] rounded-r-full">
            🔍
          </button>
        </div>
      </div>

      {/* Cart Section */}
      <div className="flex items-end gap-2">
        <FaShoppingCart size={20} className="text-black" />
        <div className="flex flex-col items-start leading-none">
          <span className="text-xs font-medium">Shopping Cart</span>
          <span className="text-[13px] text-gray-500 font-semibold">$0.00</span>
        </div>
      </div>
    </div>
  );
};

export default Header;