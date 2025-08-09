import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const TrandingPost = () => {
  const [post, setPost] = useState([]);

  useEffect(() => {
    fetch("/All post data/post.json")
      .then((res) => res.json())
      .then((data) => setPost(data))
      .catch((err) => console.error("Error loading posts:", err));
  }, []);

  // Filtering products
  const trendingProducts = post.filter(
    (p) => p.productTag?.toLowerCase() === "top sell"
  );

  const specialOffers = post.filter(
    (p) => p.specialCategory?.toLowerCase() === "special"
  );

  const newArrivals = post.filter(
    (p) => p.productTag?.toLowerCase() === "new arrival"
  );

  // Reusable Product Card with stylish Details button
  const ProductCard = ({ item, colorful = false }) => (
    <div
      className={`relative overflow-hidden rounded-xl border-2 shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
        colorful
          ? "bg-gradient-to-tr from-pink-400 via-purple-400 to-indigo-400 text-white"
          : "bg-white"
      }`}
    >
      {/* Image */}
      <div className="h-40 bg-gray-200 overflow-hidden rounded-t-xl">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>

      {/* Info */}
      <div className={`p-4 ${colorful ? "bg-opacity-70" : ""}`}>
        <p
          className={`font-semibold text-base ${
            colorful ? "text-white" : "text-gray-800"
          }`}
        >
          {item.name}
        </p>
        <p
          className={`font-bold mt-1 ${
            colorful ? "text-yellow-200" : "text-blue-600"
          }`}
        >
          SAR {item.price}
        </p>

        {/* Details Button */}
        <button
          className="mt-4 relative inline-block px-2 py-1 rounded-lg font-semibold
            text-white
            bg-gradient-to-r from-purple-500 via-pink-500 to-red-500
            shadow-lg
            overflow-hidden
            border-2 border-transparent
            cursor-pointer
            transition-all duration-300
            group
            hover:text-yellow-400
            focus:outline-none"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-red-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg blur-lg"></span>
          <span className="relative z-10 text-sm">Details</span>
          <span
            className="absolute inset-0 rounded-lg border-2 border-transparent
              group-hover:border-yellow-400
              transition-all duration-300"
          ></span>
        </button>
      </div>

      {/* Border Animation Effect */}
      <span className="absolute inset-0 rounded-xl border-2 border-transparent hover:border-yellow-400 transition-all duration-300 pointer-events-none"></span>
    </div>
  );

  return (
    <div>
      <div className="mt-8 md:mt-16 space-y-12">
        {/* Trending Products */}
        <section>
          <h2 className="text-2xl font-extrabold mb-6 text-gray-800">
            🚀 Trending Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* Special Offers with Slider */}
        <section>
          <h2 className="text-2xl font-extrabold mb-6 text-pink-600">
            🎯 Special Offers
          </h2>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={2}
            spaceBetween={20}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            loop={true}
          >
            {specialOffers.map((item) => (
              <SwiperSlide key={item.id}>
                <ProductCard item={item} colorful />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* New Arrivals */}
        <section>
          <h2 className="text-2xl font-extrabold mb-6 text-indigo-600">
            ✨ New Arrivals
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default TrandingPost;
