import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';

const CombinedCategoryPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Rice Cooker'); // Default category
  const [visibleCount, setVisibleCount] = useState(8);

  // Filters
  const [brandFilter, setBrandFilter] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minRating, setMinRating] = useState('');
  const [sortPrice, setSortPrice] = useState('');

  useEffect(() => {
    fetch('/All post data/post.json')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        const uniqueCategories = [...new Set(data.map(p => p.category).filter(Boolean))];
        setCategories(uniqueCategories);
      })
      .catch(err => console.error(err));
  }, []);

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
  }, [visibleCount, products, selectedCategory, brandFilter, minPrice, maxPrice, minRating, sortPrice]);

  let filteredProducts = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : [];

  // Apply filters
  filteredProducts = filteredProducts.filter(p => {
    return (
      (!brandFilter || p.brand === brandFilter) &&
      (!minPrice || p.price >= parseFloat(minPrice)) &&
      (!maxPrice || p.price <= parseFloat(maxPrice)) &&
      (!minRating || p.rating >= parseFloat(minRating))
    );
  });

  // Apply sorting
  if (sortPrice === 'low') filteredProducts.sort((a, b) => a.price - b.price);
  if (sortPrice === 'high') filteredProducts.sort((a, b) => b.price - a.price);

  // Get unique brands for filter dropdown
  const brands = [...new Set(filteredProducts.map(p => p.brand).filter(Boolean))];

  return (
    <div className="w-11/12 md:w-10/12 mx-auto py-16">
      <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-12 text-center drop-shadow-md">
        Product Categories
      </h1>

      {/* Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
        {categories.map((category, idx) => (
          <button
            key={idx}
            onClick={() => {
              setSelectedCategory(category);
              setVisibleCount(8);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`relative bg-gradient-to-br from-indigo-200 to-indigo-400 rounded-3xl shadow-lg transform hover:scale-105 transition-transform duration-300 overflow-hidden flex flex-col items-center justify-center p-8 h-48 font-bold text-white text-xl ${
              selectedCategory === category ? 'ring-4 ring-indigo-500' : ''
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Filters */}
      {selectedCategory && (
        <div className="mb-8 flex flex-wrap gap-4 items-center justify-center">
          <select
            value={brandFilter}
            onChange={e => setBrandFilter(e.target.value)}
            className="border p-2 rounded-md"
          >
            <option value="">All Brands</option>
            {brands.map((b, i) => (
              <option key={i} value={b}>
                {b}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={e => setMinPrice(e.target.value)}
            className="border p-2 rounded-md w-24"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={e => setMaxPrice(e.target.value)}
            className="border p-2 rounded-md w-24"
          />

          <input
            type="number"
            placeholder="Min Rating"
            value={minRating}
            onChange={e => setMinRating(e.target.value)}
            className="border p-2 rounded-md w-24"
            min="0"
            max="5"
          />

          <select
            value={sortPrice}
            onChange={e => setSortPrice(e.target.value)}
            className="border p-2 rounded-md"
          >
            <option value="">Sort by Price</option>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </select>

          <button
            onClick={() => {
              setBrandFilter('');
              setMinPrice('');
              setMaxPrice('');
              setMinRating('');
              setSortPrice('');
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Products Grid */}
      {selectedCategory && (
        <>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredProducts.slice(0, visibleCount).map(item => (
                <div
                  key={item.id}
                  className="relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-shadow duration-300 cursor-pointer flex flex-col overflow-hidden group"
                >
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

                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold text-indigo-700 mb-2">{item.name}</h3>
                    <p className="text-gray-600 flex-grow text-sm mb-2">{item.description}</p>

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

                      <div className="flex gap-2">
                        <button
                          className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full transition-transform duration-300 hover:scale-110 shadow-lg"
                        >
                          <FaShoppingCart size={18} />
                        </button>
                        <button
                          className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-transform duration-300 hover:scale-110 shadow-md"
                        >
                          <FaHeart className="text-red-600" size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No products found in this category.</p>
          )}

          {visibleCount >= filteredProducts.length && filteredProducts.length > 0 && (
            <p className="text-center mt-10 text-gray-500 font-medium">
              You've reached the end of {selectedCategory} products.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default CombinedCategoryPage;
