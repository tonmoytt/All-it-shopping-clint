import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';

const Details = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch('/public/All post data/post.json')
      .then(res => res.json())
      .then(data => {
        const found = data.find(item => item.id.toString() === id);
        setProduct(found);
      });
  }, [id]);

  if (!product) {
    return <p className="text-center mt-10 text-gray-500">Loading product details...</p>;
  }

  // Destructure product
  const { productCategory,description,image, name, price, about, model, ram, rom, brand, rating } = product;

  // Dummy handlers (replace with your real ones)
  const handleAddToCart = (item) => {
    console.log('Added to cart:', item);
  };

  const Handlewishcount = (item) => {
    console.log('Added to wishlist:', item);
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-11/12 md:w-9/12 mx-auto py-10 bg-white rounded-xl shadow-lg px-6 mt-10'>
      <div className='flex justify-center items-center'>
        <img src={image} alt={name} className='w-full max-w-sm object-cover rounded-lg' />
      </div>

      <div className='text-start'>
        <h1 className='text-3xl font-bold'>{name}</h1>
        <p className="text-lg mt-3 text-indigo-600 font-semibold">Price: ${price}</p>
        <button className='bg-green-100 text-green-700 px-3 py-1 rounded-2xl font-medium text-sm mt-2'>
         {description}
        </button>
        <p className='mt-4 text-gray-700'>{about}</p>

        <div className='mt-6'>
          <h2 className='text-xl font-bold mb-2'>Specifications:</h2>
          <ul className='list-disc list-inside text-gray-800 font-medium space-y-1'>
            <li>Model: <span className='text-gray-600 text-sm'>{model}</span> </li>

            <li>Brand: <span className='text-gray-600 text-sm'>{brand}</span> </li>
          </ul>
        </div>

        <p className='text-lg mt-4 font-bold text-gray-800'>
          Rating: <span className='font-normal'>{rating}</span>
        </p>

        <div className='space-x-4 mt-6 flex'>
          <button onClick={() => handleAddToCart(product)}>
            <Link className='bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-3xl flex items-center space-x-2 shadow-md transition'>
              <span>Add to Cart</span>
              <FaShoppingCart />
            </Link>
          </button>

          <button onClick={() => Handlewishcount(product)} className='bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-3xl flex items-center shadow'>
            <Link>
              <FaHeart className='text-red-500' />
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;
