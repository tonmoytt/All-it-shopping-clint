import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import img1 from '../../../../assets/Images/1st.avif';
import img2 from '../../../../assets/Images/2nd img.avif';
import img3 from '../../../../assets/Images/3rd.avif';
import { Link } from 'react-router-dom';

const products = [
  {
    id: 1,
    name: 'Mini Hidden Camera',
    quality: 'Plastic Body',
    price: '950 Tk',
    image: 'https://i.ibb.co.com/SXRTgFS5/photo-6336855574305246900-x.png',
  },
  {
    id: 2,
    name: 'GPS location tracker',
    quality: 'Super quality',
    price: '1080 Tk',
    image: 'https://i.ibb.co.com/zT6BvTj7/giant-358906-Photoroom.png',
  },
  {
    id: 3,
    name: 'Zoom Light',
    quality: 'Silver aluminium',
    price: '1550 Tk',
    image: 'https://i.ibb.co.com/3YRCKLSh/giant-26479-Photoroom.png',
  },
];

const Slider = () => {
  return (
    <div className="pt-24 md:pt-32 relative">
      {/* Main slider container */}
      <div
        className="relative max-w-[1680px] h-[200px] md:h-[400px] mx-auto p-4 rounded-lg overflow-hidden"
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
  modules={[Pagination, Navigation, Autoplay]}
  spaceBetween={30}
  slidesPerView={1}
  loop={true}
  autoplay={{
    delay: 2500,          // 2.5 sec পর পর slide
    disableOnInteraction: false, // arrow বা swipe করলেও auto চলবে
  }}
  pagination={{ clickable: true }}
  navigation={{
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }}
  className="rounded-lg overflow-hidden"
>
          

         
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="w-full h-[500px] md:h-96  flex flex-col md:flex-row gap-1 md:gap-20 items-center justify-center md:justify-start md:ml-40 px-4 md:px-0">
                <div className="flex-shrink-0 md:ml-96  ">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-contain h-24 md:h-48 "
                  />
                </div>
                <div className="flex-1  bg-opacity-70 rounded-lg p-4 shadow-lg w-full max-w-md">
                  <h2 className="text-orange-400 text-xl mb-2">{product.quality}</h2>
                  <p className="text-3xl font-bold text-gray-800 mb-4">{product.name}</p>
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
      <div className="max-w-7xl   mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:rounded-lg bg-white shadow-2xl px-4 py-2 md:py-6 mt-[-72px] relative z-10">

        <div className='hidden md:flex'>
        <Link to='/shop'>  <img className="rounded-md h-40 md:h-60 w-40 md:w-full object-cover" src={img1} alt="Produt 1" /></Link> 
        </div>
        <div>
         <Link to='/shop'>   <img className="rounded-md h-24 md:h-60 w-[270px] md:w-full mx-auto object-cover" src={img2} alt="Product 2" /></Link> 
        </div>
        <div>
         <Link to='/shop'>  <img className="rounded-md -mt-20 md:mt-0 h-24 md:h-60 w-full object-cover" src={img3} alt="Product 3" /></Link> 
        </div>
      </div>
    </div>
  );
};

export default Slider;
