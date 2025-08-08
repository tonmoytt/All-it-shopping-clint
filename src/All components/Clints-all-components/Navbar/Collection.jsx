import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaTshirt,
  FaLaptop,
  FaShoePrints,
  FaRegClock,
  FaGem,
  FaHeart,
  FaBaby,
  FaFootballBall,
  FaHome,
  FaQuoteLeft,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import hot from '../../../assets/Images/blandercollection.avif';
import benner from '../../../assets/Images/wallpaperflare.com_wallpaper.jpg';

// Dummy brands logos - replace with your actual logos
const brandLogos = [
  "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
  "https://upload.wikimedia.org/wikipedia/commons/0/09/Adidas_Logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/2/29/Under_armour_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/1/12/Puma_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/7/7a/Levis_logo.svg",
];

// Dummy blog posts (replace with your data fetching if available)
const dummyBlogs = [
  {
    id: 1,
    title: "Top 10 Spring Fashion Trends 2025",
    excerpt: "Discover what’s hot this spring in the world of fashion...",
    image: "https://source.unsplash.com/400x300/?fashion,style",
  },
  {
    id: 2,
    title: "How to Accessorize Like a Pro",
    excerpt: "Master the art of accessorizing with these easy tips...",
    image: "https://source.unsplash.com/401x300/?accessories",
  },
  {
    id: 3,
    title: "Sustainable Clothing: Why It Matters",
    excerpt: "Learn about the importance of eco-friendly fashion choices...",
    image: "https://source.unsplash.com/402x300/?sustainable,fashion",
  },
];

const faqData = [
  {
    question: "What is your return policy?",
    answer:
      "You can return most items within 30 days of purchase for a full refund or exchange.",
  },
  {
    question: "Do you offer free shipping?",
    answer:
      "Yes! Free shipping is available for orders over $99.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order ships, you’ll receive a tracking number via email.",
  },
  {
    question: "Can I change or cancel my order?",
    answer:
      "Orders can be modified or cancelled within 2 hours of placement by contacting support.",
  },
];

const categoryIcons = {
  Clothing: <FaTshirt />,
  Electronics: <FaLaptop />,
  Shoes: <FaShoePrints />,
  Watches: <FaRegClock />,
  Jewelry: <FaGem />,
  "Health and Beauty": <FaHeart />,
  "Kids and Babies": <FaBaby />,
  Sports: <FaFootballBall />,
  "Home and Garden": <FaHome />,
};

const Collection = () => {
  const [allCollection, setAllCollection] = useState([]);
  const [filteredCollection, setFilteredCollection] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [activeFilter, setActiveFilter] = useState("all");
  const [expandedFaq, setExpandedFaq] = useState(null);

  const filterOptions = ["all", "New Arrival", "Top Sell", "Featured"];

  useEffect(() => {
    fetch("/All post data/post.json")
      .then((res) => res.json())
      .then((data) => {
        const blog = data.filter((item) => item.collection === "collection");
        const first35 = blog.slice(0, 35);
        setAllCollection(first35);
        setFilteredCollection(first35);
      });
  }, []);

  const handleFilter = (category) => {
    setActiveFilter(category);
    if (category === "all") {
      setFilteredCollection(allCollection);
    } else {
      const filtered = allCollection.filter(
        (item) => item.productCategory === category
      );
      setFilteredCollection(filtered);
    }
    setVisibleCount(8);
  };

  const handleViewAll = () => {
    setVisibleCount(filteredCollection.length);
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="pt-20 bg-gray-50 min-h-screen py-10 px-4 md:px-0">
      <div className="container mx-auto flex gap-10">
        {/* Sidebar */}
        <aside className="w-1/4 hidden lg:block sticky top-24 self-start space-y-10">
          {/* Categories */}
          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <h2 className="bg-yellow-400 text-gray-900 px-6 py-3 rounded font-extrabold text-lg tracking-wide">
              CATEGORIES
            </h2>
            <ul className="mt-5 space-y-4 text-gray-700">
              {Object.entries(categoryIcons).map(([cat, icon]) => (
                <li
                  key={cat}
                  className="flex items-center gap-3 cursor-pointer border-b border-gray-100 pb-3 hover:text-yellow-500 transition duration-300 font-semibold text-md"
                >
                  <span className="text-yellow-400">{icon}</span>
                  {cat}
                </li>
              ))}
            </ul>
          </div>

          {/* Hot Deals */}
          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <h2 className="bg-yellow-400 text-gray-900 px-6 py-3 rounded font-extrabold text-lg tracking-wide">
              HOT DEALS
            </h2>
            <div className="mt-5">
              <img
                src={hot}
                alt="Hot Deal"
                className="rounded-md w-full object-cover shadow-sm"
              />
              <div className="flex justify-center gap-3 mt-4">
                {["10", "20", "30", "40"].map((num, i) => (
                  <div
                    key={i}
                    className="bg-gray-200 text-gray-800 px-4 py-1 text-sm font-semibold rounded"
                  >
                    {num}%
                  </div>
                ))}
              </div>
              <p className="mt-5 font-semibold text-gray-900 text-center">
                Floral Print Buttoned Shirt
              </p>
              <p className="text-yellow-500 font-extrabold text-center text-lg mt-1">$60.00</p>
              <button className="mt-6 w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 rounded shadow-md transition duration-300">
                ADD TO CART
              </button>
            </div>
          </div>

          {/* Promo Box */}
          <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-5 text-center shadow-sm mt-10">
            <h4 className="font-bold text-yellow-600 mb-3">Special Offer!</h4>
            <p className="text-sm text-yellow-700 mb-4">
              Sign up for our newsletter and get 15% off your first order.
            </p>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-6 rounded transition duration-300">
              Subscribe
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 space-y-12">
          {/* Banner */}
          <section className="relative rounded-lg overflow-hidden shadow-lg">
            <img
              src={benner}
              alt="Fashion Banner"
              className="w-full h-72 object-cover brightness-90"
            />
            <div className="absolute top-10 left-10 max-w-md text-white">
              <h3 className="uppercase tracking-widest font-semibold text-sm">
                Spring 2016
              </h3>
              <h1 className="text-4xl font-extrabold mt-1 leading-tight">
                Women{" "}
                <span className="text-yellow-400 drop-shadow-lg">Fashion</span>
              </h1>
              <p className="mt-3 text-gray-200 font-light max-w-xs">
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur.
              </p>
              <button className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold shadow-lg transition duration-300">
                SHOP NOW
              </button>
            </div>
          </section>

          {/* Feature bar */}
          <section className="grid grid-cols-3 bg-blue-700 text-white text-center py-5 font-semibold rounded-md shadow-inner">
            <div>
              MONEY BACK
              <br />
              <span className="text-sm font-normal">30 Day Money Back Guarantee</span>
            </div>
            <div>
              FREE SHIPPING
              <br />
              <span className="text-sm font-normal">On Orders Over $99</span>
            </div>
            <div>
              SPECIAL SALE
              <br />
              <span className="text-sm font-normal">Extra $5 Off All Items</span>
            </div>
          </section>

          {/* Products with filter */}
          <section>
            <div className="flex justify-between items-center border-b border-gray-300 pb-3">
              <h2 className="text-2xl font-bold tracking-wide">New Products</h2>
              <div className="space-x-6 text-base font-semibold">
                {filterOptions.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleFilter(cat)}
                    className={`${
                      activeFilter === cat
                        ? "text-yellow-500 border-b-4 border-yellow-500 font-extrabold"
                        : "text-gray-600 hover:text-yellow-500 transition"
                    } pb-1 uppercase`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
              {filteredCollection.slice(0, visibleCount).map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-lg border border-gray-200 p-5 flex flex-col justify-between hover:shadow-2xl hover:scale-105 transform transition duration-300 cursor-pointer min-h-[400px]"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-md mb-5"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <p className="text-gray-900 font-semibold text-lg">{item.name}</p>
                    <p className="text-yellow-500 font-extrabold text-xl mt-1">${item.price}</p>
                  </div>
                  <Link to={`/details/${item.id}`} className="mt-5 w-full">
                    <button className="bg-black hover:bg-gray-900 text-white font-semibold py-2 rounded-md w-full transition-colors duration-300">
                      Details
                    </button>
                  </Link>
                </div>
              ))}
            </div>

            {visibleCount < filteredCollection.length && (
              <div className="text-center mt-8">
                <button
                  onClick={handleViewAll}
                  className="inline-block bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-3 px-10 rounded shadow-lg transition duration-300"
                >
                  VIEW ALL
                </button>
              </div>
            )}
          </section>

          {/* Additional Info Section below products */}
          <section className="mt-16 bg-white rounded-lg shadow-md border border-gray-200 p-8 text-gray-700 max-w-full">
            <h3 className="text-2xl font-bold mb-4 text-center text-gray-900">
              Why Shop With Us?
            </h3>
            <ul className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
              <li className="p-4 border rounded-lg hover:shadow-lg transition">
                <h4 className="font-semibold mb-2 text-yellow-500">Fast Shipping</h4>
                <p>Get your orders delivered quickly and reliably.</p>
              </li>
              <li className="p-4 border rounded-lg hover:shadow-lg transition">
                <h4 className="font-semibold mb-2 text-yellow-500">24/7 Support</h4>
                <p>Our team is here to help anytime you need assistance.</p>
              </li>
              <li className="p-4 border rounded-lg hover:shadow-lg transition">
                <h4 className="font-semibold mb-2 text-yellow-500">Easy Returns</h4>
                <p>Hassle-free returns within 30 days of purchase.</p>
              </li>
              <li className="p-4 border rounded-lg hover:shadow-lg transition">
                <h4 className="font-semibold mb-2 text-yellow-500">Secure Payment</h4>
                <p>We use top-notch security to keep your data safe.</p>
              </li>
            </ul>
          </section>

          {/* Bottom Banner */}
          <section className="grid grid-cols-2 gap-8 mt-12">
            <div className="bg-gray-100 h-36 rounded-lg flex items-center justify-center font-bold text-2xl shadow-md hover:shadow-lg transition duration-300 cursor-pointer">
              2016 FASHION SALE - BUY NOW
            </div>
            <div className="bg-yellow-400 h-36 rounded-lg flex items-center justify-center font-bold text-2xl shadow-md hover:shadow-lg transition duration-300 cursor-pointer">
              DESIGN - SAVE UPTO 50%
            </div>
          </section>

          {/* --- NEW SECTIONS BELOW --- */}

          {/* 1. Customer Testimonials */}
          <section className="mt-20 bg-white rounded-lg shadow-lg border border-gray-200 p-10 max-w-6xl mx-auto">
            <h2 className="text-3xl font-extrabold text-center mb-10 text-gray-900 tracking-wide">
              What Our Customers Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-yellow-50 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 flex flex-col"
                  style={{ animation: `fadeInUp 0.5s ease forwards`, animationDelay: `${i * 0.2}s` }}
                >
                  <FaQuoteLeft className="text-yellow-400 text-4xl mb-4" />
                  <p className="text-gray-700 flex-1 mb-4 italic">
                    "Amazing products and fantastic customer service! I will definitely shop again."
                  </p>
                  <p className="font-semibold text-gray-900 text-right">— Jane Doe</p>
                </div>
              ))}
            </div>
          </section>

          {/* 2. Brands Carousel */}
          <section className="mt-20 max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-900 tracking-wide">
              Trusted Brands
            </h2>
            <div className="overflow-x-auto no-scrollbar flex gap-10 items-center py-6">
              {brandLogos.map((logo, idx) => (
                <img
                  key={idx}
                  src={logo}
                  alt="Brand Logo"
                  className="h-16 opacity-70 hover:opacity-100 transition duration-300 cursor-pointer"
                />
              ))}
            </div>
          </section>

          {/* 3. Newsletter Subscription */}
          <section className="mt-20 bg-yellow-400 rounded-lg max-w-3xl mx-auto p-12 text-center shadow-lg relative overflow-hidden">
            <h2 className="text-4xl font-extrabold mb-6 text-white tracking-wide drop-shadow-lg">
              Stay Updated!
            </h2>
            <p className="text-yellow-100 mb-8 text-lg">
              Subscribe to our newsletter and get the latest offers and news.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex justify-center max-w-md mx-auto gap-4"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow rounded-md px-4 py-3 text-black font-semibold focus:outline-none focus:ring-4 focus:ring-yellow-200"
                required
              />
              <button
                type="submit"
                className="bg-yellow-700 hover:bg-yellow-800 text-white font-bold px-6 py-3 rounded-md shadow-lg transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </section>

          {/* 4. Blog Highlights */}
          <section className="mt-20 max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-900 tracking-wide">
              From Our Blog
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {dummyBlogs.map(({ id, title, excerpt, image }) => (
                <Link
                  to={`/blog/${id}`}
                  key={id}
                  className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transform hover:-translate-y-1 transition duration-300 cursor-pointer"
                >
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-5">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-yellow-500 transition">
                      {title}
                    </h3>
                    <p className="text-gray-600">{excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* 5. FAQ Accordion */}
          <section className="mt-20 max-w-4xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200 p-8">
            <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-900 tracking-wide">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqData.map(({ question, answer }, idx) => (
                <div key={idx} className="border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex justify-between items-center p-4 bg-yellow-50 hover:bg-yellow-100 focus:outline-none transition"
                  >
                    <span className="font-semibold text-lg text-gray-800">{question}</span>
                    <span className="text-yellow-600 font-extrabold text-2xl select-none">
                      {expandedFaq === idx ? "−" : "+"}
                    </span>
                  </button>
                  <div
                    className={`px-6 pb-4 text-gray-700 transition-max-height duration-500 ease-in-out overflow-hidden ${
                      expandedFaq === idx ? "max-h-40" : "max-h-0"
                    }`}
                  >
                    <p>{answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* Extra styles for fadeInUp animation */}
      <style>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        /* Hide scrollbar for brand carousel */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Collection;
