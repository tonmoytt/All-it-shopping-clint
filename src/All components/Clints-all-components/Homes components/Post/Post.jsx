import React, { useEffect, useState } from 'react';
import Showpost from './Showpost/Showpost';
import Testomonial from './Testomonial/Testomonial';

const Post = () => {
  const [post, setPost] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState('New Arrival');
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch('/All post data/post.json')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setPost(data);
        } else {
          console.error('Fetched data is not an array!');
          setPost([]);
        }
      })
      .catch(err => console.error('Fetch error:', err));
  }, []);

  const filteredPosts = post.filter(
    item => item.productCategory === filteredCategory
  );

  const visiblePosts = showAll ? filteredPosts : filteredPosts.slice(0, 8);

  return (
    <div className="mt-20 flex flex-col md:flex-row gap-6 max-w-7xl mx-auto px-4 md:pr-6 lg:px-4\">
      {/* Left Side: Products */}
      <div className="w-full md:w-3/4">
        {/* Header with Category Tabs */}
        <div className="grid md:grid-cols-2 items-center  bg-gray-100 rounded-xl px-6 py-4 gap-4">
          <h1 className="uppercase text-xl font-sans font-bold leading-tight text-center md:text-left md:mb-1 mb-6">
            Trending Products
          </h1>
          <div className="flex flex-wrap gap-4 md:justify-end justify-center md:mr-10">
            {['New Arrival', 'Featured', 'Top Sell'].map(category => (
              <button
                key={category}
                onClick={() => {
                  setFilteredCategory(category);
                  setShowAll(false);
                }}
                className={`px-4 py-2 rounded-md transition-colors duration-300 font-semibold
          ${filteredCategory === category
                    ? 'bg-yellow-500 text-white shadow-md hover:bg-yellow-600'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-yellow-100 hover:text-yellow-600'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>


        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          {visiblePosts.length > 0 ? (
            visiblePosts.map(data => <Showpost key={data.id} data={data} />)
          ) : (
            <p className="text-center text-gray-500">No products found.</p>
          )}
        </div>

        {/* View All Button */}
        {!showAll && filteredPosts.length > 8 && (
          <div className="text-center mt-6">
            <button
              onClick={() => setShowAll(true)}
              className="bg-[#DE2A8A] text-white px-6 py-2 rounded hover:bg-gray-800 transition text-sm"
            >
              View All
            </button>
          </div>
        )}
      </div>

      {/* Right Side: Testimonial */}
      <div className="w-full md:w-1/4 mt-8 md:mt-0">
        <Testomonial />
      </div>
    </div>
  );
};

export default Post;
