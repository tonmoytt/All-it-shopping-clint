import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import img1 from '../../../../assets/Images/1st.avif'
import img2 from '../../../../assets/Images/2nd img.avif'
import img3 from '../../../../assets/Images/3rd.avif'
// import './Slider.css';

const products = [
    {
        id: 1,
        name: "Wireless Headphone",
        quality: "Silvar aluminium",
        price: "$120",
        image: "https://i.ibb.co/mCyCkkWN/hedphone-removebg-preview.png",
        // 
    },
    {
        id: 2,
        name: "Smart Watch",
        quality: "Silvar aluminium",
        price: "$180",
        image: "https://i.ibb.co/NnZhTkzT/watch.webp",
    },
    {
        id: 3,
        name: "Bluetooth Speaker",
        quality: "Silvar aluminium",
        price: "$90",
        image: "https://i.ibb.co/srP0MtP/hbl-pro-removebg-preview.png",
    },
];

const Slider = () => {
    return (

        <div>
            <div className=" relative max-w-8xl h-[460px] mx-auto p-4  "
                style={{
                    backgroundImage: "url(https://i.ibb.co/TM9y6ZRB/37633-download-66-white-wallpaper-for-desktop-and-mobile.jpg)",

                }}

            >
                {/* Custom Swiper Arrows */}
                <div className="swiper-button-prev w-2 h-2 bg-yellow-400 text-black rounded-full text-sm flex items-center justify-center absolute left-4 top-1/2 -translate-y-1/2 z-10"></div>
                <div className="swiper-button-next w-9 h-9 bg-yellow-400 text-black rounded-full text-sm flex items-center justify-center absolute right-4 top-1/2 -translate-y-1/2 z-10"></div> 
                {/* Swiper Slider */}
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
                    className="rounded-lg overflow-hidden "
                >
                    {products.map(product => (
                        <SwiperSlide key={product.id}>
                            <div className="w-full h-80 md:h-96  flex gap-20 items-center justify-center md:ml-40  ">
                                <div>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="object-contain h-60 "
                                    />
                                </div>
                                <div>
                                    <div className="mt-8p-6 rounded-lg flex flex-col md:flex-row items-center gap-6 shadow-lg px-6 py-4">

                                        <div className="flex-1">
                                            <h2 className="text-2xl text-orange-300  mb-2">{product.quality}</h2>
                                            <p className="text-4xl font-bold text-gray-700 mb-4">{product.name}</p>
                                            <input
                                                type=""
                                                placeholder="White sprot brand 30% off for the first order"
                                                className="w-full border mt-4 border-gray-500 rounded-md pl-5 pr-12 py-2 text-sm "
                                            />
                                            <button className="bg-yellow-500 mt-8 text-white px-5 py-2 rounded hover:bg-yellow-700 transition">
                                                Shop Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Below slider - product info with background */}

            </div>

            <div className=' absolute md:-mt-18 md:ml-40  max-w-7xl grid grid-cols-3 mx-auto rounded-lg  bg-white shadow-2xl'>
                <div className='mx-4 my-4  '>
                    <img className='rounded-md h-48' src={img1} alt="" />
                </div>
                <div className='mx-4 my-4 '>
                    <img className='rounded-md h-48' src={img2} alt="" />
                </div>
                <div className='mx-4 my-4  '>
                    <img className='rounded-md h-48' src={img3} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Slider;
