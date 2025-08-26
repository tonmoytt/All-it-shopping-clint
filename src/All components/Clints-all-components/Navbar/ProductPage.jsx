import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(8); // initial 8 products

  useEffect(() => {
    fetch('/All post data/post.json')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  const categories = ['all', ...new Set(products.map(p => p.productCategory).filter(Boolean))];

  const filteredProducts = categoryFilter === 'all'
    ? products
    : products.filter(p => p.productCategory === categoryFilter);

  const handleAddToCart = (item) => {
    console.log('Added to cart:', item);
  };

  const handleWishlist = (item) => {
    console.log('Added to wishlist:', item);
  };

  // Infinite Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
        visibleCount < filteredProducts.length
      ) {
        setVisibleCount(prev => prev + 8);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleCount, filteredProducts.length]);

  return (
    <div className="w-11/12 md:w-10/12 mx-auto py-16">
      <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-8 text-center drop-shadow-md">
        Our Products
      </h1>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCategoryFilter(cat);
              setVisibleCount(8); // reset visible count on category change
            }}
            className={`px-4 py-2 rounded-3xl font-semibold text-sm md:text-base transition-colors duration-300 ${
              categoryFilter === cat
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-indigo-500 hover:text-white'
            }`}
          >
            {cat ? cat.charAt(0).toUpperCase() + cat.slice(1) : 'Unknown'}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.slice(0, visibleCount).map((item) => (
            <div
              key={item.id}
              className="relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-shadow duration-300 cursor-pointer flex flex-col overflow-hidden group"
            >
              {/* Image + Overlay */}
              <div className="relative overflow-hidden rounded-t-2xl">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-105"
                />
                <Link
                  to={`/details/${item.id}`}
                  className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-lg font-semibold rounded-t-2xl"
                >
                  View Details
                </Link>
              </div>

              {/* Product Info */}
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-indigo-700 mb-2">{item.name}</h3>
                <p className="text-gray-600 flex-grow text-sm mb-2">{item.description}</p>

                {/* Colors */}
                {item.colors && item.colors.length > 0 && (
                  <div className="flex gap-1 mb-3">
                    {item.colors.map((color, idx) => (
                      <span
                        key={idx}
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: color }}
                      ></span>
                    ))}
                  </div>
                )}

                <div className="mt-2 flex items-center justify-between">
                  <span className="text-red-600 font-bold text-lg">${item.price?.toFixed(2)}</span>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full transition-transform duration-300 hover:scale-110 shadow-lg"
                    >
                      <FaShoppingCart size={18} />
                    </button>
                    <button
                      onClick={() => handleWishlist(item)}
                      className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-transform duration-300 hover:scale-110 shadow-md"
                    >
                      <FaHeart className="text-red-600" size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No products found in this category.</p>
        )}
      </div>

      {/* End Message */}
      {visibleCount >= filteredProducts.length && filteredProducts.length > 0 && (
        <p className="text-center mt-10 text-gray-500 font-medium">You've reached the end of products.</p>
      )}
    </div>
  );
};

export default ProductPage;
