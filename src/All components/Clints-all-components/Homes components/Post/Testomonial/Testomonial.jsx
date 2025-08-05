import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Ariana Gomez",
    image: "https://i.ibb.co/DYxG0R3/user1.jpg",
    description: "Bistro Boss is Great service and delicious food. Highly recommend to everyone!"
  },
  {
    id: 2,
    name: "John Doe",
    image: "https://i.ibb.co/YhFhnKh/user2.jpg",
    description: "This place exceeded my expectations. The ambiance and taste were top-notch!"
  },
  {
    id: 3,
    name: "Sara Lee",
    image: "https://i.ibb.co/s2w3xz4/user3.jpg",
    description: "We love coming here with our family. Always fresh, always tasty!"
  },
];

const Testomonial = () => {
  return (
    <div>

      <div className="w-full lg:w-[85%] h-[400px] p-4 bg-gradient-to-br from-[#fff9f0] to-[#f7f7f7] rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-center text-[#333] mb-6 underline decoration-yellow-400 decoration-4 underline-offset-4">
          What Our Clients Say
        </h2>

        <Swiper
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3500 }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <div className=" rounded-xl shadow-md px-3 pt-6 flex flex-col items-center gap-4 hover:shadow-xl transition-all duration-300 ease-in-out">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-yellow-300 shadow-md hover:scale-105 transition-transform duration-300"
                />
                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                <p className="text-sm pb-6 text-gray-600 italic text-center leading-relaxed">
                  “{item.description}”
                </p>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="bg-gray-200 text-center w-full lg:w-[85%] mt-6 h-[335px] rounded-md">
        <h1 className="text-2xl mb-2 pt-6 ">Newslitter</h1>
        <p className="my-4 ">Join Our Mailing List</p>
        <input className="w-56 input my-2 " type="email" placeholder="Your email" />
        <button className="btn btn-secondary my-2 ">Subscribe </button>
        <p className="mt-4 mb-2">Join our social media</p>
        <div className="flex mx-auto w-fit gap-2 mt-2">
          <a className="my-1"> <FaFacebook className="w-7 h-7"></FaFacebook> </a>
          <a className="my-1"> <FaYoutube className="w-7 h-7"></FaYoutube> </a>
          <a className="my-1"> <FaInstagram className="w-7 h-7"></FaInstagram> </a>
          <a className="my-1"> <FaTwitter className="w-7 h-7"></FaTwitter> </a>
          <a className="my-1"> <FaTiktok className="w-7 h-7"></FaTiktok> </a>
        </div>
      </div>
    </div>
  );
};

export default Testomonial;
