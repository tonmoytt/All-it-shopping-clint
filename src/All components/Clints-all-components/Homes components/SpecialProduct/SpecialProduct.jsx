import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, EffectFade, Autoplay } from "swiper/modules";
import 'swiper/css/navigation';
import './special.css'
import BlogImg from "../../../../assets/Images/18.webp"

import { Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

const SpecialProduct = () => {
    const [Specialdata, setSpecialdata] = useState([])
    const [Dealdata, setDealdata] = useState([])
    useEffect(() => {
        fetch('/All post data/post.json')
            .then(res => res.json())
            .then(data => {
                // console.log(data);

                setSpecialdata(data.filter(item => item.specialCategory === 'special'))
                setDealdata(data.filter(item => item.dealCategory === 'DEAL'))
                // console.log("Special Products:", data.filter(item => item.specialCategory === 'special'))
                // console.log("Deal Products:", data.filter(item => item.dealCategory === 'DEAL'))

            })
    }, [])


    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    // Countdown Logic
    useEffect(() => {
        // Deal End Time - set it to 24 hours from now or any static deadline
        const endTime = new Date();
        endTime.setHours(endTime.getHours() + 24); // 24 hours from now

        const timer = setInterval(() => {
            const now = new Date();
            const diff = endTime - now;

            if (diff <= 0) {
                clearInterval(timer);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            } else {
                const days = Math.floor(diff / (10000 * 60 * 60 * 24));
                const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((diff / 1000 / 60) % 60);
                const seconds = Math.floor((diff / 1000) % 60);

                setTimeLeft({ days, hours, minutes, seconds });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);


    const categoryData = [
        {
            mainCategory: 'Electronics',
            subCategories: [
                { name: 'Rice-Cooker', icon: 'https://i.ibb.co.com/8wJ6FdZ/rice-cooker.png' },
                { name: 'Blander', icon: 'https://i.ibb.co.com/Fvmy764/blander.jpg' },
                { name: 'Iron', icon: 'https://i.ibb.co.com/5hbFBcjz/iron.jpg' },
            ],
        },
        {
            mainCategory: 'Gadgets',
            subCategories: [
                { name: 'Smart Watch', icon: 'https://i.ibb.co.com/QFbZTpvt/smartwatch.jpg' },
                { name: 'Speaker', icon: 'https://i.ibb.co.com/C5X2K6Qb/specker.jpg' },
                { name: 'Tablet', icon: 'https://i.ibb.co.com/35FCNZK9/tablet.webp' },
            ],
        },
    ];
    return (

        <div className="max-w-7xl mx-auto px-4 py-10">
            <div className='flex flex-col md:flex-row gap-6'>
                {/* Section 1 - Blog + Category */}
                <div className='md:w-1/4 space-y-6'>
                    {/* LATEST BLOG section */}
                    <div className='bg-white  rounded shadow'>
                        <h2 className='text-center font-semibold mb-4 border-b pb-2 bg-gray-300'>LATEST BLOG</h2>

                        <Swiper
                            slidesPerView={1}
                            spaceBetween={20}
                            pagination={{ clickable: true }}
                            modules={[Pagination]}
                            className='w-full'
                        >
                            {[1, 2].map((_, index) => (
                                <SwiperSlide key={index}>
                                    <div className='text-center relative'>
                                        <img
                                            src={BlogImg}
                                            alt='blog'
                                            className='rounded mb-2 mx-auto w-60'
                                        />
                                        <div className='absolute -mt-7 left-1/2 transform -translate-x-1/2 md:left-auto md:ml-60 rounded-full w-10 h-10 bg-fuchsia-400 flex items-center justify-center'>
                                            <p className='text-[13px] text-white font-semibold'>18 May</p>
                                        </div>
                                        <h3 className='font-semibold text-sm mt-8'>VIDEER VOLUPTATUM TE EUM</h3>
                                        <p className='text-xs text-gray-500 mt-4 px-4 pb-2'>
                                            Faded short sleeves t-shirt with high neckline. Faded short sleeves t-shirt with
                                        </p>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>


                    {/* SHOP BY CATEGORIES */}
                    <div className='bg-white p-4 rounded shadow w-full'>
                        <h2 className='text-lg bg-gray-300 font-bold mb-4 border-b p-2'>SHOP BY CATEGORIES</h2>

                        <Swiper
                            slidesPerView={1}
                            Pagination={true}
                            modules={[Pagination]}
                            className='w-full category-swiper'
                        >
                            {categoryData.map((category, index) => (
                                <SwiperSlide key={index}>
                                    <div className='space-y-4'>
                                        <h3 className='text-base font-bold flex items-center justify-between'>
                                            {category.mainCategory}
                                            <FaPlus className='text-xs text-gray-500' />
                                        </h3>
                                        {category.subCategories.map((sub, i) => (
                                            <div className='flex items-center gap-3 text-center' key={i}>
                                                <div>
                                                    <img src={sub.icon} alt={sub.name} className='w-6 h-6 object-contain' />
                                                </div>
                                                <div className='flex justify-between w-full'>
                                                    <p className='text-start w-full font-semibold mt-2'>{sub.name} ------> </p>
                                                    <button className='btn hover:btn-secondary'>Search it</button>
                                                </div>

                                            </div>
                                        ))}
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                </div>


                {/* Section 2 - Deal of the Day */}

                <div className='md:w-2/4 bg-white pt-4 px-4  rounded shadow'>
                    <h2 className='text-xl font-bold mb-4 text-center py-1 bg-gray-300'>DEAL OF THE DAY</h2>

                    <Swiper navigation={true} modules={[Navigation]} className='w-full mt-20'>
                        {Dealdata?.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className='flex flex-col md:flex-row gap-4 items-center'>
                                    {/* Product Image */}
                                    <div className='w-full md:w-1/2'>
                                        <img src={item.image} alt="deal" className='w-full h-auto rounded' />
                                    </div>

                                    {/* Details */}
                                    <div className='w-full md:w-1/2 space-y-2'>
                                        <h1 className='font-semibold'>{item.name}</h1>
                                        <p className='text-sm bg-green-500 text-white w-fit px-2 py-1 rounded'>Sale</p>
                                        <h3 className='text-lg font-bold'>{item.title}</h3>
                                        <p className='line-through text-gray-400'>${item.oldPrice}</p>
                                        <p className='text-red-500 font-bold text-xl'>${item.price}</p>

                                        {/* Countdown Timer */}
                                        <div className='flex gap-2 text-center mt-12'>
                                            <div>
                                                <div className='border-1 border-gray-400  px-2 py-1 rounded font-semibold '>
                                                    {String(timeLeft.days).padStart(2, '10')}d
                                                </div>
                                                <p className='text-xs text-gray-600 mt-1'>Day</p>
                                            </div>
                                            <div>
                                                <div className='border-1 border-gray-400  px-2 py-1 rounded font-semibold'>
                                                    {String(timeLeft.hours).padStart(2, '0')}h
                                                </div>
                                                <p className='text-xs text-gray-600 mt-1'>Hour</p>
                                            </div>
                                            <div>
                                                <div className='border-1 border-gray-400  px-2 py-1 rounded font-semibold'>
                                                    {String(timeLeft.minutes).padStart(2, '0')}m
                                                </div>
                                                <p className='text-xs text-gray-600 mt-1'>Mins</p>
                                            </div>
                                            <div>
                                                <div className='border-1 border-gray-400  px-2 py-1 rounded font-semibold'>
                                                    {String(timeLeft.seconds).padStart(2, '0')}s
                                                </div>
                                                <p className='text-xs text-gray-600 mt-1'>Sec</p>
                                            </div>

                                        </div>
                                    </div>



                                </div>

                                <p className='mt-6 text-center font-semibold text-gray-600'>{item.description}</p>
                                <div className='flex  justify-between mt-8'>
                                    <Link to={`/details/${item.id}`}> <button className='btn btn-secondary'>Details</button></Link>
                                    <button className='btn btn-active'>Wishlist</button>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Section 3 - Special Product */}

                <div className='md:w-1/4 bg-white p-4 rounded shadow'>
                    <h2 className='text-center font-semibold mb-4 border-b pb-2 bg-gray-300'>LATEST BLOG</h2>
 
                   <Swiper
  slidesPerView={1}
  pagination={{ clickable: true }}
  modules={[Pagination]}
  className='w-full'
>
  {
    // Chunking Specialdata into arrays of 7 items
    [...Array(Math.ceil(Specialdata.length / 7))].map((_, i) => (
      <SwiperSlide key={i}>
        {
          Specialdata.slice(i * 7, i * 7 + 7).map(item => (
            <div key={item.id} className='flex gap-3 mb-4'>
              <img src={item.image} alt={item.title} className='w-16 shadow h-16 rounded object-cover' />
              <div>
                <h4 className='text-xs mb-1 '>{item.name}</h4>
                <div className='flex items-center gap-1 mb-1'>
                  <p className='text-xs text-gray-500 line-through'>${item.oldPrice}</p>
                  <p className='text-xs font-bold text-red-600'>${item.price}</p>
                </div>
                <div className='flex gap-1 mt-1'>
                  {item.colors?.map((color, index) => (
                    <span
                      key={index}
                      className='w-2 h-2 rounded-full inline-block'
                      style={{ backgroundColor: color }}
                    ></span>
                  ))}
                </div>
              </div>
            </div>
          ))
        }
      </SwiperSlide>
    ))
  }
</Swiper>

 
 
                </div>

            </div>
        </div>
    );
};

export default SpecialProduct;