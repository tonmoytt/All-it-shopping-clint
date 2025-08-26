import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaHeart } from "react-icons/fa";

const NewArrival2 = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/All post data/post.json")
      .then(res => res.json())
      .then(data => setProducts(data.filter(p => p.productCategory === "New Arrival")));
  }, []);

  return (
    <section className="mt-14 md:mt-20 w-11/12 md:w-10/12 mx-auto my-12">
      <h2 className="text-3xl font-bold text-indigo-700 mb-6">New Arrival</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(item => (
          <div key={item.id} className="relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-shadow duration-300 cursor-pointer flex flex-col overflow-hidden group">
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

              <div className="flex gap-1 mb-3">
                {item.colors?.map((color, idx) => (
                  <span
                    key={idx}
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: color }}
                  ></span>
                ))}
              </div>

              <div className="mt-2 flex items-center justify-between">
                <span className="text-red-600 font-bold text-lg">${item.price?.toFixed(2)}</span>

                <div className="flex gap-2">
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full transition-transform duration-300 hover:scale-110 shadow-lg">
                    <FaShoppingCart size={18} />
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-transform duration-300 hover:scale-110 shadow-md">
                    <FaHeart className="text-red-600" size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrival2;
