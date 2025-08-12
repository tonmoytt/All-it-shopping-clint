import React from 'react';
import { Link } from 'react-router-dom';

const Showpost = ({ data }) => {
  const { id, name, price, image, oldPrice, rating, colors = [], status } = data;

  return (
    <div className="relative bg-white border rounded-md p-4 text-center shadow-sm hover:shadow-lg transition w-full max-w-[220px] mx-auto">
      {/* Sale / Sold Out badge */}
      {status === 'sale' && (
        <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">Sale</span>
      )}
      {status === 'sold' && (
        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded">Sold out</span>
      )}

      {/* Product Image */}
      <img src={image} alt={name} className="w-full h-36 object-contain mb-2" />

      {/* Star Ratings */}
      <div className="flex justify-center mb-1">
        {Array.from({ length: 5 }).map((_, idx) => (
          <span key={idx} className={`text-yellow-400 text-sm ${idx < rating ? '' : 'opacity-30'}`}>&#9733;</span>
        ))}
      </div>

      {/* Product Name */}
      <h2 className="text-sm font-semibold text-gray-700">{name}</h2>

      {/* Price */}
      <p className="text-sm my-1">
        {oldPrice && (
          <span className="line-through text-gray-400 mr-2">${oldPrice}</span>
        )}
        <span className="text-red-600 font-semibold">${price}</span>
      </p>

      {/* Color Dots */}
      {colors.length > 0 && (
        <div className="flex justify-center space-x-1 mt-1 mb-2">
          {colors.slice(0, 3).map((color, index) => (
            <span key={index} className={`w-4 h-4 rounded-full border border-gray-300`} style={{ backgroundColor: color }}></span>
          ))}
          {colors.length > 3 && (
            <span className="text-xs text-gray-500">+{colors.length - 3}</span>
          )}
        </div>
      )}

      {/* Details Button */}
      <Link to={`/details/${id}`}>
        <button className="mt-2 bg-black text-white text-xs px-3 py-1 cursor-pointer rounded hover:bg-gray-800 transition">
          Details
        </button>
      </Link>
    </div>
  );
};

export default Showpost;
