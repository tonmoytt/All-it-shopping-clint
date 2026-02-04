import React from 'react';
import { Link } from 'react-router-dom';

const Showpost = ({ data, loading = false }) => {
  if (loading) {
    // Skeleton Card
    return (
      <div className="w-full max-w-[220px] h-[420px] mx-auto bg-white border rounded-md p-2 animate-pulse">
        <div className="h-36 bg-gray-200 rounded mb-3" />
        <div className="h-3 bg-gray-200 rounded mb-2" />
        <div className="h-3 bg-gray-200 rounded w-2/3 mb-3" />
        <div className="h-8 bg-gray-200 rounded mt-auto" />
      </div>
    );
  }

  const { id, name, price, image, oldPrice, rating, colors = [], status } = data;

  return (
    <div
  className="
    relative bg-white border rounded-t-md
    p-4 text-center
    shadow-sm hover:shadow-lg transition
    w-full max-w-[220px] mx-auto
    flex flex-col h-[280px] md:h-[420px]
    group overflow-hidden
  "
>
  {/* Sale / Sold */}
  {status === 'sale' && (
    <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-0.5 rounded-full z-10">
      Sale
    </span>
  )}
  {status === 'sold' && (
    <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded z-10">
      Sold out
    </span>
  )}

  {/* Image with zoom + overlay */}
  <Link to={`/details/${id}`} className="relative h-32 flex items-center justify-center mb-2 overflow-hidden">
    <img
      src={image}
      alt={name}
      className="
        max-h-full max-w-full object-contain
        transition-transform duration-300
        group-hover:scale-110
      "
    />
  </Link>

  {/* Rating */}
  <div className="flex justify-center mb-1">
    {Array.from({ length: 5 }).map((_, idx) => (
      <span
        key={idx}
        className={`text-yellow-400 text-sm ${
          idx < rating ? '' : 'opacity-30'
        }`}
      >
        ★
      </span>
    ))}
  </div>

  {/* Name */}
  <h2 className="text-sm font-semibold text-gray-700 line-clamp-2 min-h-[40px]">
    {name}
  </h2>

  {/* Price */}
  <p className="text-sm my-1">
    {oldPrice && (
      <span className="line-through text-gray-400 mr-2">
        ${oldPrice}
      </span>
    )}
    <span className="text-red-600 font-semibold">${price}</span>
  </p>

  {/* Colors */}
  {colors.length > 0 && (
    <div className="flex justify-center space-x-1 mt-1 mb-2">
      {colors.slice(0, 3).map((color, index) => (
        <span
          key={index}
          className="w-4 h-4 rounded-full border border-gray-300"
          style={{ backgroundColor: color }}
        />
      ))}
      {colors.length > 3 && (
        <span className="text-xs text-gray-500">
          +{colors.length - 3}
        </span>
      )}
    </div>
  )}

  {/* CTA always bottom */}
  <div className="mt-auto w-full">
    <Link to={`/details/${id}`}>
      <button
        className="
          mt-3 w-full relative text-xs font-semibold py-2 rounded-md
          border border-gray-800 text-gray-800
          overflow-hidden group
        "
      >
        <span className="relative z-10 uppercase group-hover:text-white transition">
          More Info
        </span>
        <span className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
      </button>
    </Link>
  </div>
</div>
  );
};

export default Showpost;