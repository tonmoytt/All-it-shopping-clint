import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';

const Details = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [data, setData] = useState([]);

  // Fetch all products
  useEffect(() => {
    fetch('/All post data/post.json')
      .then(res => res.json())
      .then(res => setData(res))
      .catch(err => console.error(err));
  }, []);

  // Find current product by id
  useEffect(() => {
    if (data.length > 0) {
      const found = data.find(item => item.id.toString() === id);
      setProduct(found);
    }
  }, [id, data]);

  if (!product) {
    return <p className="text-center mt-10 text-gray-500">Loading product details...</p>;
  }

  const { productCategory, description, image, name, price, about, model, ram, rom, brand, rating } = product;

  const relatedProducts = data
    .filter(p => p.productCategory === productCategory && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = (item) => {
    console.log('Added to cart:', item);
  };

  const handleWish = (item) => {
    console.log('Added to wishlist:', item);
  };

  return (
    <>
      {/* Product Detail Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 pt-28 md:pt-36 gap-6 md:gap-8 w-11/12 md:w-8/12 mx-auto py-8 md:py-12 bg-white rounded-3xl shadow-2xl hover:shadow-[0_20px_50px_rgba(99,102,241,0.3)] transition-shadow duration-700 px-4 sm:px-8 mt-10">
        {/* Image */}
        <div className="flex justify-center items-center bg-gradient-to-tr from-indigo-50 to-indigo-100 p-4 sm:p-6 rounded-2xl shadow-inner">
          <img src={image} alt={name} className="w-full max-w-xs sm:max-w-md object-cover rounded-xl shadow-lg border border-indigo-200" />
        </div>

        {/* Details */}
        <div className="text-start flex flex-col justify-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-2 sm:mb-3 text-indigo-700 drop-shadow-md">{name}</h1>
          <p className="text-xl sm:text-3xl mt-1 sm:mt-2 text-green-700 font-semibold tracking-wider shadow-sm">৳{price.toFixed(2)}</p>
          <p className="mt-6 sm:mt-8 text-gray-700 leading-relaxed text-base sm:text-lg tracking-wide">{about}</p>

          {/* Specifications */}
          <div className="mt-8 sm:mt-10">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-5 border-b-4 border-indigo-400 pb-2 text-indigo-700">Specifications</h2>
            <ul className="list-disc list-inside text-gray-800 font-medium space-y-2 sm:space-y-3 text-sm sm:text-lg">
              <li>Model: <span className="text-gray-600 font-normal">{model}</span></li>
              <li>Brand: <span className="text-gray-600 font-normal">{brand}</span></li>
              {ram && <li>RAM: <span className="text-gray-600 font-normal">{ram}</span></li>}
              {rom && <li>Storage: <span className="text-gray-600 font-normal">{rom}</span></li>}
              {productCategory && <li>Category: <span className="text-gray-600 font-normal">{productCategory}</span></li>}
            </ul>
          </div>

          <p className="text-lg sm:text-2xl mt-8 sm:mt-10 font-bold text-gray-900">
            Rating: <span className="font-normal">{rating}</span>
          </p>

          {/* Actions */}
          <div className="space-x-6 sm:space-x-8 mt-8 sm:mt-10 flex flex-wrap sm:flex-nowrap gap-4">
            <button onClick={() => handleAddToCart(product)} className="transform hover:scale-110 transition-transform duration-300 shadow-xl">
              <Link className="bg-indigo-700 hover:bg-indigo-800 text-white px-5 sm:px-8 py-2 sm:py-3 rounded-3xl flex items-center space-x-3 shadow-lg font-semibold text-base sm:text-lg">
                <span>Add to Cart</span>
                <FaShoppingCart size={20} />
              </Link>
            </button>
            <button onClick={() => handleWish(product)} className="bg-gray-100 hover:bg-gray-200 px-5 py-3 rounded-3xl flex items-center shadow-md transition-colors duration-300 cursor-pointer">
              <FaHeart className="text-red-600" size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="w-11/12 md:w-9/12 mx-auto mt-12 bg-white rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-500 p-8 border border-indigo-100">
        <h2 className="text-3xl font-bold mb-6 text-indigo-700 tracking-wide">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {relatedProducts.length > 0 ? (
            relatedProducts.map(item => (
              <div key={item.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col">
                <img src={item.image} alt={item.name} className="rounded-t-lg object-cover w-full h-48" />
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold text-indigo-700 mb-2">{item.name}</h3>
                  <p className="text-gray-600 flex-grow">{item.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-green-600 font-bold text-lg">${item.price.toFixed(2)}</span>
                    <button className="bg-indigo-600 text-white px-4 py-1 rounded-lg hover:bg-indigo-700 transition-colors duration-300 text-sm">
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No related products found.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Details;
