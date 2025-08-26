import React from 'react';
import { FaFacebookF, FaTwitter, FaGooglePlusG, FaPinterestP, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';
import laptopImg from '../../../../assets/Images/about-2nd.webp';
import Footer from '../../Homes components/Footer/Footer';

const Contact = () => {
    return (
        <div className="bg-white  ">
            {/* Contact Header */}
            <h2 className="text-3xl sm:text-4xl font-bold text-center mt-12 mb-12 text-green-700 px-4 sm:px-0">
                Contact Us
            </h2>

            {/* Main content: image + info */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 px-6 lg:px-0 items-center">
                {/* Image on left */}
                <div className="col-span-1 flex justify-center">
                    <img 
                        src={laptopImg} 
                        alt="Laptop" 
                        className="rounded-lg shadow-xl w-full max-w-md object-cover"
                    />
                </div>

                {/* Contact Info on right (two columns) */}
                <div className="col-span-1 md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-10 text-gray-700">
                    {/* Left info column */}
                    <div className="space-y-6">
                        <h3 className="text-xl sm:text-2xl font-semibold text-green-700 mb-4">Get In Touch</h3>
                        <p className="text-gray-600">We’d love to hear from you! Reach out to us anytime, and we’ll respond as soon as we can.</p>

                        <div className="flex items-start gap-3">
                            <FaMapMarkerAlt className="text-green-600 mt-1 flex-shrink-0" />
                            <div>
                                <strong>Address</strong>
                                <p>4005, Seyujgar,<br />Bogura bangladesh</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <FaPhoneAlt className="text-green-600 mt-1 flex-shrink-0" />
                            <div>
                                <strong>Phone</strong>
                                <p>+0121 9999 9999</p>
                                <p>+0987 6543 210</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <FaEnvelope className="text-green-600 mt-1 flex-shrink-0" />
                            <div>
                                <strong>Email</strong>
                                <p>info@gmail.com</p>
                                <p>support@gmail.com</p>
                            </div>
                        </div>
                    </div>

                    {/* Right info column */}
                    <div className="space-y-6">
                        <h3 className="text-xl sm:text-2xl font-semibold text-green-700 mb-4">Additional Info</h3>
                        <div className="flex items-start gap-3">
                            <FaClock className="text-green-600 mt-1 flex-shrink-0" />
                            <div>
                                <strong>Office Hours</strong>
                                <p>Monday - Saturday: 10AM - 5PM</p>
                                <p>Sunday: Closed</p>
                            </div>
                        </div>

                        <div>
                            <strong>Follow Us</strong>
                            <div className="flex gap-5 mt-3 text-white text-lg">
                                <a href="#" className="bg-blue-600 p-3 rounded-full hover:bg-blue-700" aria-label="Facebook"><FaFacebookF /></a>
                                <a href="#" className="bg-sky-500 p-3 rounded-full hover:bg-sky-600" aria-label="Twitter"><FaTwitter /></a>
                                <a href="#" className="bg-red-500 p-3 rounded-full hover:bg-red-600" aria-label="Google Plus"><FaGooglePlusG /></a>
                                <a href="#" className="bg-red-700 p-3 rounded-full hover:bg-red-800" aria-label="Pinterest"><FaPinterestP /></a>
                                <a href="#" className="bg-pink-500 p-3 rounded-full hover:bg-pink-600" aria-label="Instagram"><FaInstagram /></a>
                            </div>
                        </div>

                        <div>
                            <strong>Tagline</strong>
                            <p className="italic text-gray-500 mt-2">"Good For Nature, Good For You"</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Google Map */}
            <div className="mt-16 max-w-7xl mx-auto px-6 lg:px-0">
                <iframe
                    title="Google Map"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3649.2779199481665!2d89.35253021450707!3d24.8483577840492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fda1408e91d9bf%3A0xd5f9938a3e72ee72!2sBogra%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1687636104326!5m2!1sen!2sus"
                    width="100%"
                    height="400"
                    style={{ border: 0, borderRadius: '12px' }}
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
            </div>

            {/* Contact Form */}
            <div className="max-w-7xl mx-auto mt-20 px-6 lg:px-0 mb-16">
                <h3 className="text-2xl sm:text-3xl font-semibold mb-4 text-center text-green-700">Leave Us a Message</h3>
                <p className="text-gray-600 text-center mb-10 italic">We welcome your questions and feedback.</p>

                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <input
                            type="text"
                            placeholder="Name *"
                            required
                            className="border p-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <input
                            type="email"
                            placeholder="Email *"
                            required
                            className="border p-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <input
                            type="tel"
                            placeholder="Phone number"
                            className="border p-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <textarea
                        placeholder="Your Message *"
                        rows="6"
                        required
                        className="border p-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                    ></textarea>

                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
                        >
                            Send Message
                        </button>
                    </div>
                </form>
            </div>

      
        </div>
    );
};

export default Contact;
