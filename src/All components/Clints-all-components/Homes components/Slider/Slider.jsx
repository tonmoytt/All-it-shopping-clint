import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import img1 from '../../../../assets/Images/1st.avif';
import img2 from '../../../../assets/Images/2nd img.avif';
import img3 from '../../../../assets/Images/3rd.avif';

const products = [
  {
    id: 1,
    name: 'Wireless Headphone',
    quality: 'Silver aluminium',
    price: '$120',
    image: 'https://i.ibb.co/mCyCkkWN/hedphone-removebg-preview.png',
  },
  {
    id: 2,
    name: 'Smart Watch',
    quality: 'Silver aluminium',
    price: '$180',
    image: 'https://i.ibb.co/NnZhTkzT/watch.webp',
  },
  {
    id: 3,
    name: 'Bluetooth Speaker',
    quality: 'Silver aluminium',
    price: '$90',
    image: 'https://i.ibb.co/srP0MtP/hbl-pro-removebg-preview.png',
  },
];

const Slider = () => {
  return (
    <div className="pt-32 relative">
      {/* Main slider container */}
      <div
        className="relative max-w-[1680px] h-[600px] mx-auto p-4 rounded-lg overflow-hidden"
        style={{
          backgroundImage:
            'url(https://i.ibb.co/TM9y6ZRB/37633-download-66-white-wallpaper-for-desktop-and-mobile.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Custom Swiper arrows */}
        <div className="swiper-button-prev w-9 h-9 bg-yellow-400 text-black rounded-full text-sm flex items-center justify-center absolute left-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer" />
        <div className="swiper-button-next w-9 h-9 bg-yellow-400 text-black rounded-full text-sm flex items-center justify-center absolute right-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer" />

        <Swiper
          modules={[Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          pagination={{ clickable: true }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          className="rounded-lg overflow-hidden"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="w-full h-80 md:h-96  flex flex-col md:flex-row gap-10 md:gap-20 items-center justify-center md:justify-start md:ml-40 px-4 md:px-0">
                <div className="flex-shrink-0 md:ml-96">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-contain h-48 md:h-60"
                  />
                </div>
                <div className="flex-1  bg-opacity-70 rounded-lg p-6 shadow-lg w-full max-w-md">
                  <h2 className="text-orange-400 text-2xl mb-2">{product.quality}</h2>
                  <p className="text-4xl font-bold text-gray-800 mb-4">{product.name}</p>
                  <input
                    type="text"
                    placeholder="White sport brand 30% off for the first order"
                    className="w-full border border-gray-400 rounded-md pl-4 pr-12 py-2 text-sm focus:outline-yellow-400"
                  />
                  <button className="bg-yellow-500 mt-6 w-full py-2 rounded hover:bg-yellow-700 transition text-white font-semibold">
                    Shop Now
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Below slider - product info with background */}
      <div className="max-w-7xl   mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 rounded-lg bg-white shadow-2xl px-4 py-6 mt-[-72px] relative z-10">
        <div>
          <img className="rounded-md h-48 md:h-60 w-full object-cover" src={img1} alt="Product 1" />
        </div>
        <div>
          <img className="rounded-md h-48 md:h-60 w-full object-cover" src={img2} alt="Product 2" />
        </div>
        <div>
          <img className="rounded-md h-48 md:h-60 w-full object-cover" src={img3} alt="Product 3" />
        </div>
      </div>
    </div>
  );
};

export default Slider;
