import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaHeart, FaShoppingCart,FaClipboardList } from 'react-icons/fa';
import { FaYoutube, FaFacebook } from "react-icons/fa";
import axios from 'axios';
import Swal from 'sweetalert2';
import { Authconnect } from '../../../AuthincationPages/Authincation/Authincation';

const Details = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [data, setData] = useState([]);
  const [activeImage, setActiveImage] = useState('');
  const [loading, setLoading] = useState(true); // spinner state




  // price section

// price section
const [qty, setQty] = useState(1);
const [isInCart, setIsInCart] = useState(false);
const [discountAmount, setDiscountAmount] = useState(580);
const [basePrice, setBasePrice] = useState(0); // initialize as 0
const [discountPrice, setDiscountPrice] = useState(0);
const [animatedDiscount, setAnimatedDiscount] = useState(0);
const [animatedTotal, setAnimatedTotal] = useState(0);

// Update prices whenever product or qty changes
useEffect(() => {
  if (product) {
    setBasePrice(product.price);
    const newDiscountPrice = product.price - discountAmount;
    setDiscountPrice(newDiscountPrice);
    setAnimatedDiscount(discountAmount);
    setAnimatedTotal(newDiscountPrice * qty);
  }
}, [product, qty, discountAmount]);




  // pricetion ses

const [showVideoLinks, setShowVideoLinks] = useState(false);  //product video facebbook youtube btn

  // Get user from context
  const { currentUser } = useContext(Authconnect);
  const loggedInUserId = currentUser?.uid;

  // Fetch all products
  useEffect(() => {
    fetch('/All post data/post.json')
      .then(res => res.json())
      .then(res => {
        setData(res);
        setLoading(false); // data আসলে loading false
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // active inmage change 
  useEffect(() => {
  if (data.length > 0) {
    const found = data.find(item => item.id.toString() === id);
    setProduct(found);
    setActiveImage(found?.image); // 👈 main image set
  }
}, [id, data]);

  // Find current product by id
  useEffect(() => {
    if (data.length > 0) {
      const found = data.find(item => item.id.toString() === id);
      setProduct(found);
    }
  }, [id, data]);

  // যদি লোড হচ্ছে তখন spinner দেখাও
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-indigo-600 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Product not found.
      </p>
    );
  }

  const { productCategory, description, image, name, price, model, ram, rom, brand, rating } = product;

  const relatedProducts = data
    .filter(p => p.productCategory === productCategory && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = (item) => {
    if (!loggedInUserId) {
      Swal.fire({
        icon: 'error',
        title: 'Not Logged In',
        text: 'Please log in to add items to your cart.'
      });
      return;
    }

    const postData = { ...item, userId: loggedInUserId };

    axios.post(`https://al-it-server.vercel.app/posts/${loggedInUserId}`, postData)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Added to Cart!',
          text: 'Your product has been added successfully.',
          timer: 2000,
          showConfirmButton: false
        });
      })
      .catch(error => {
        if (error.response?.status === 409) {
          Swal.fire({
            icon: 'info',
            title: 'Already Added!',
            text: 'This product is already in your cart.',
            timer: 2000,
            showConfirmButton: false
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed to add product!',
          });
        }
      });
  };

  const handleWish = (item) => {
    Swal.fire({
      icon: 'success',
      title: 'Added to Wishlist!',
      text: `${item.name} has been added to your wishlist.`,
      timer: 2000,
      showConfirmButton: false
    });
  };

  return (
    <>
      {/* Product Detail Section */}
      <div className="grid grid-cols-1 mt-10 md:mt-16 md:grid-cols-2 pt-4 md:pt-16 gap-6 md:gap-8 w-11/12 md:w-8/12 mx-auto py-8 md:py-12 bg-white md:rounded-3xl shadow-2xl hover:shadow-[0_20px_50px_rgba(99,102,241,0.3)] transition-shadow duration-700 px-4 sm:px-8 ">

      {/* Image */}
<div className="flex flex-col items-center bg-gradient-to-tr from-indigo-50 to-indigo-100 p-4 sm:p-6 rounded-2xl shadow-inner">

  {/* Main Image */}
  <img
    src={activeImage}
    alt={name}
    className="w-full max-w-xs sm:max-w-md object-cover rounded-xl shadow-lg border border-indigo-200 transition-all duration-300"
  />

  {/* Thumbnails */}
  <div className="flex gap-3 mt-4">
    {[image, image, image].map((img, index) => (
      <img
        key={index}
        src={img}
        onClick={() => setActiveImage(img)}
        className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 transition
          ${activeImage === img ? 'border-indigo-600 scale-105' : 'border-gray-300'}
        `}
        alt="thumb"
      />
    ))}
  </div>

</div>

        {/* Details */}
        <div className="text-start flex flex-col justify-center">
          <h1 className="text-xl sm:text-5xl font-extrabold mb-2 sm:mb-3 text-indigo-700 drop-shadow-md">{name}</h1>
        <p className="text-lg  sm:text-3xl font-semibold mt-2 sm:mt-3 text-gray-800 flex items-baseline gap-2 shadow-sm">
  <span className="text-gray-900 font-bold text-base sm:text-lg">Price:</span>
  <span className="text-green-700 font-extrabold text-lg sm:text-3xl">{price.toFixed(2)}</span>
  <span className="text-red-500 font-semibold text-base sm:text-lg">Tk</span>
</p>
          <p className='text-gray-500 mt-2 text-xs font-sans'>*Discount 580 Tk* </p>
          <p className="mt-6 sm:mt-8 text-gray-700 leading-relaxed text-sm sm:text-lg tracking-wide">{description}</p>

      {/* Buttons Section */}
<div className="flex sm:flex-row items-center sm:items-start gap-4 mt-6 ">
  {/* Product Video Button */}
  <button
  onClick={() => setShowVideoLinks(!showVideoLinks)}
  className="w-full bg-indigo-50 text-indigo-800 font-semibold px-3 py-2 rounded-xl text-xs shadow-lg hover:scale-105 transition-transform duration-300 text-center"
>
  Product Video
</button>

<button
  onClick={() => {
    const relatedSection = document.getElementById('related-products');
    relatedSection?.scrollIntoView({ behavior: 'smooth' });
  }}
  className="w-full bg-pink-50 text-pink-800 font-semibold px-3 py-2 rounded-xl shadow-lg hover:bg-indigo-700 text-xs transition-colors duration-300 text-center "
>
  More Products
</button>
</div>

{/* Video Links */}
{showVideoLinks && (
  <div className="flex sm:flex-row gap-4 mb-8 mt-4 animate-fadeIn">
    <a
      href={product.youtubeLink || "https://youtube.com"}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl shadow-md text-center font-medium transition-colors duration-300"
    >
      Video 1
    </a>
    <a
      href={product.facebookLink || "https://facebook.com"}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow-md text-center font-medium transition-colors duration-300"
    >
      Video 2
    </a>
  </div>
)}



          {/* Specifications */}
          <div className="mt-8 sm:mt-10">
           
              <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-5 border-b-4 border-indigo-400 pb-2 text-indigo-700">Specifications</h2>
              {/* <button className='btn btn-accent'>Product video</button> */}
          
            
            <ul className="list-disc list-inside text-gray-800 font-medium space-y-2 sm:space-y-3 text-sm sm:text-lg">
              <li>Model: <span className="text-gray-600 font-normal">{model}</span></li>
              <li>Brand: <span className="text-gray-600 font-normal">{brand}</span></li>
              {ram && <li>RAM: <span className="text-gray-600 font-normal">{ram}</span></li>}
              {rom && <li>Storage: <span className="text-gray-600 font-normal">{rom}</span></li>}
              {productCategory && <li>Category: <span className="text-gray-600 font-normal">{productCategory}</span></li>}
            </ul>
          </div>

         <div className='flex items-center mt-6 gap-2'>
  <p className="text-lg sm:text-2xl font-bold text-gray-900">
    Rating:
  </p>
  <div className="flex">
    {[1, 2, 3, 4, 5].map((star) => (
      <svg
        key={star}
        xmlns="http://www.w3.org/2000/svg"
        className={`h-6 w-6 ${
          star <= rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
        fill={star <= rating ? 'currentColor' : 'none'}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={star <= rating ? 0 : 2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        />
      </svg>
    ))}
  </div>
</div>

        

        

{/* price section  */}
<div className='text-black mt-4'>
  {!isInCart && (
  <>
  {/* Quantity Selector */}
<div className="flex  sm:flex-row items-center justify-between mb-4 gap-4">
  <span className="font-extrabold text-indigo-700 text-base sm:text-lg tracking-wide drop-shadow-sm">
  অর্ডারের পরিমাণ :
</span>
  <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
    <button
      onClick={() => setQty(Math.max(1, qty - 1))}
      className="w-10 h-10 sm:w-12 sm:h-12 font-bold text-lg sm:text-xl bg-gray-100 hover:bg-gray-200 transition"
    >
      -
    </button>
    <span className="w-10 sm:w-12 text-center font-bold text-gray-800">{qty}</span>
    <button
      onClick={() => setQty(qty + 1)}
      className="w-10 h-10 sm:w-12 sm:h-12 font-bold text-lg sm:text-xl bg-gray-100 hover:bg-gray-200 transition"
    >
      +
    </button>
  </div>
</div>

{/* GREEN DISCOUNT BOX */}
<div className="p-5 sm:p-6 rounded-2xl bg-green-50 border border-green-200 shadow-md space-y-3 mb-8">
  {/* মূল প্রাইস */}
  <div className="flex justify-between text-sm sm:text-base font-medium text-gray-700">
    <span>প্রোডাক্টের মূল্য :</span>
    <span className="line-through text-gray-400">৳{basePrice}</span>
  </div>

  {/* ডিসকাউন্ট */}
  {discountAmount > 0 && (
    <div className="flex justify-between text-sm sm:text-base font-semibold text-green-700">
      <span>ছাড় :</span>
      <span>- ৳{animatedDiscount} Tk</span>
    </div>
  )}

  {/* ডিসকাউন্টের পরে মূল্য */}
  <div className="flex justify-between text-sm sm:text-base font-semibold text-gray-800">
    <span>ছাড়ের পরে মূল্য :</span>
    <span>৳{discountPrice} Tk</span>
  </div>

  {/* অর্ডারের পরিমাণ */}
  <div className="flex justify-between text-sm sm:text-base font-medium text-gray-700">
    <span>পরিমাণ :</span>
    <span>{qty} টি</span>
  </div>

  {/* মোট দাম */}
  <div className="border-t pt-3 flex justify-between text-lg sm:text-xl font-extrabold text-indigo-700">
    <span>মোট দাম :</span>
    <span className="text-green-600">৳{animatedTotal} Tk</span>
  </div>
</div>
  </>
)}
</div>

  {/* Actions */}
         <div className="space-x-2 sm:space-x-18 mt-4 sm:mt-10 flex gap-3">
  <button
    onClick={() => handleAddToCart(product)}
    className="transform hover:scale-90 transition-transform duration-300 shadow-xl"
  >
    <Link className="bg-indigo-500 hover:bg-indigo-800 text-white px-4 sm:px-5 py-2 sm:py-3 rounded-3xl flex items-center space-x-3 shadow-lg font-semibold text-base sm:text-">
      <span>Add to Cart</span>
      <FaShoppingCart className="hidden md:flex" size={20} />
    </Link>
  </button>

  <button
    onClick={() => handleWish(product)}
    className="bg-red-500 hover:bg-indigo-800 text-white px-4 md:px-6 py-2 sm:py-3 rounded-3xl flex items-center space-x-3 shadow-lg font-semibold text-base sm:text-lg transform hover:scale-110 transition-transform duration-300"
  >
    <FaClipboardList className='hidden md:block' size={18} /> {/* Order icon */}
    <span>অর্ডার করতে চাই</span>
  </button>
</div>

 {/* Related Products */}
     
          
        </div>
      </div>
 <section
  id="related-products"
  className="w-11/12 md:w-9/12 mx-auto  bg-white  shadow-xl hover:shadow-2xl transition-shadow duration-500 p-6 sm:p-8 border border-indigo-100"
>
  <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-indigo-700 tracking-wide text-center sm:text-left">
    Related Products
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {relatedProducts.length > 0 ? (
      relatedProducts.map(item => (
        <div
          key={item.id}
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col"
        >
          <img
            src={item.image}
            alt={item.name}
            className="rounded-t-lg object-cover w-full h-48 sm:h-52 md:h-56 lg:h-60"
          />
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-lg font-semibold text-indigo-700 mb-2 line-clamp-2">
              {item.name}
            </h3>
            <p className="text-gray-600 flex-grow text-sm line-clamp-3">
              {item.description}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-green-600 font-bold text-lg">
                ${item.price.toFixed(2)}
              </span>
              <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors duration-300 text-sm">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))
    ) : (
      <p className="text-gray-500 col-span-full text-center">No related products found.</p>
    )}
  </div>
</section>
     
    </>
  );
};

export default Details;



