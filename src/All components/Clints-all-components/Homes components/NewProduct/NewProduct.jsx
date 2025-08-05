// NewProduct.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Product.css';


// Single Product Card
const ProductCard = ({ product }) => {
  return (
    <div className="flex gap-3 mb-4 items-start bg-white p-2 rounded shadow">
      <img src={product.image} alt={product.name} className="w-16 h-16 rounded object-cover shadow" />
      <div>
        <h4 className="text-xs mb-1 font-semibold">{product.name}</h4>
        <div className="flex items-center gap-1 mb-1">
          <p className="text-xs text-gray-500 line-through">${product.oldPrice}</p>
          <p className="text-xs font-bold text-red-600">${product.price}</p>
        </div>
        <div className="flex gap-1 mt-1">
          {product.colors?.map((color, index) => (
            <span key={index} className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: color }}></span>
          ))}
        </div>
      </div>
    </div>
  );
};

// Section with Swiper
const ProductSection = ({ title, products }) => {
  const slides = [];
  for (let i = 0; i < products.length; i += 3) {
    slides.push(products.slice(i, i + 3));
  }

  return (
    <div className="w-full md:w-1/3 px-2">
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-center font-semibold mb-4 border-b pb-2 bg-gray-300">{title}</h2>
        <Swiper
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Navigation, Pagination]}
        >
          {slides.map((group, idx) => (
            <SwiperSlide key={idx}>
              {group.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

const NewProduct = () => {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    axios.get('/All post data/post.json')
      .then(res => {
        setAllProducts(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const newProducts = allProducts.filter(p => p.productCategory === 'New Arrival');
  const specialProducts = allProducts.filter(p => p.productCategory === 'Featured');
  const bestSellers = allProducts.filter(p => p.productCategory === 'Top Sell');

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-4">
      <ProductSection title="NEW PRODUCT" products={newProducts} />
      <ProductSection title="SPECIAL PRODUCT" products={specialProducts} />
      <ProductSection title="BEST SELLERS" products={bestSellers} />
    </div>
  );
};

export default NewProduct;
