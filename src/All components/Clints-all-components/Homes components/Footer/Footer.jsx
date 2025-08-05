import React, { useEffect, useState } from 'react';
import {
  FaFacebookF, FaInstagram, FaTwitter,
  FaTumblr, FaYoutube, FaPinterestP
} from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa6";
import './footer.css';

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Show scroll-to-top button when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-wrapper text-white text-sm relative">

      <div className="max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-4 gap-10 border-b border-white/20">

        {/* Newsletter Signup */}
        <div className="fade-in-up">
          <h2 className="text-2xl font-bold mb-3 text-gradient">Don't Miss Out</h2>
          <p className="mb-4 opacity-80">Sign up for the latest beauty news, product samples and coupons</p>
          <form className="flex flex-col gap-3">
            <input type="email" placeholder="Enter Your Email Address"
              className="p-2 rounded-md bg-white text-black shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400" />
            <input type="text" placeholder="MM/DD/YYYY"
              className="p-2 rounded-md bg-white text-black shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400" />
            <button className="gradient-btn transition duration-300 ease-in-out hover:scale-105">
              SIGN UP
            </button>
          </form>
          <p className="text-[11px] text-gray-300 mt-3">
            This site is intended for US consumers. By signing up, you agree to our <span className="underline cursor-pointer">Privacy Policy</span> and <span className="underline cursor-pointer">Terms of Use</span>.
          </p>
          <div className="flex gap-4 mt-5 text-lg text-white/90 social-icons">
            <FaInstagram /><FaFacebookF /><FaTwitter /><FaTumblr /><FaYoutube /><FaPinterestP />
          </div>
        </div>

        {/* Company */}
        <div className="fade-in-up">
          <h3 className="section-heading">COMPANY</h3>
          <ul className="space-y-2 link-list">
            <li><a href="#">About</a></li>
            <li><a href="#">Experts and Spokesmodels</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div className="fade-in-up">
          <h3 className="section-heading">CUSTOMER SERVICE</h3>
          <ul className="space-y-2 link-list">
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">My Account</a></li>
            <li><a href="#">Store Locator</a></li>
            <li><a href="#">Redeem rewards</a></li>
          </ul>
        </div>

        {/* More to Explore + App Buttons */}
        <div className="fade-in-up">
          <h3 className="section-heading">MORE TO EXPLORE</h3>
          <ul className="space-y-2 link-list">
            <li><a href="#">Beauty Magazine</a></li>
            <li><a href="#">Tools and Consultations</a></li>
            <li><a href="#">Offers</a></li>
            <li><a href="#">#LorealParis</a></li>
          </ul>

          {/* App Store Buttons */}
          <div className="mt-6 space-y-3">
            <a
              href="#"
              className="store-btn play-store"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/512px-Google_Play_Store_badge_EN.svg.png"
                   alt="Get it on Google Play" className="w-36 h-auto" />
            </a>
            <a
              href="#"
              className="store-btn app-store"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                   alt="Download on the App Store" className="w-36 h-auto" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Links Bottom */}
      <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] text-gray-300 border-t border-white/10">
        <div className="flex flex-wrap gap-4 footer-links">
          <a href="#">SITE MAP</a>
          <a href="#">PRIVACY</a>
          <a href="#">TERMS</a>
          <a href="#">USER CONTENT PERMISSION TERMS</a>
          <a href="#">MAKEUP.COM</a>
          <a href="#">SKINCARE.COM</a>
        </div>
        <div className="text-right">
          © 2025 ALL-IT-CENTER 
          
        </div>
      </div>

      <div className="text-[11px] text-center text-gray-400 px-4 pb-4">
        This site is intended for US consumers. Cookies and related technology are used for advertising. To learn more, visit <span className="underline cursor-pointer">AdChoices</span> and our <span className="underline cursor-pointer">Privacy Policy</span>.
      </div>

      {/* Scroll To Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="scroll-to-top"
          aria-label="Scroll to top"
        >
          <FaArrowUp />
        </button>
      )}
    </footer>
  );
};

export default Footer;
