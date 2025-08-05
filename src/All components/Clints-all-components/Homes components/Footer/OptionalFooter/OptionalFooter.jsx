import React, { useState, useEffect } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcAmex,
  FaApple,
  FaGooglePlay,
  FaArrowUp,
} from "react-icons/fa";
import "./Optional.css";

const Footer = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) setShowTopBtn(true);
      else setShowTopBtn(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="footer-container">
      {/* Wave divider */}
      <div className="footer-wave">
        
      </div>

      <div className="footer-main grid">
        <div className="footer-about">
          <h2>About Us</h2>
          <p>
            We are passionate about delivering the best quality food and tech gadgets to our customers with fast delivery and excellent customer support. Our mission is to delight you every time you shop with us.
          </p>
          <div className="footer-contact-info">
            <p><strong>Address:</strong> 123 Shopping Street, Bogura, Bangladesh</p>
            <p><strong>Office Hours:</strong> Mon - Fri: 9am - 6pm</p>
            <p><strong>Phone:</strong> +880 123 456 789</p>
            <p><strong>Email:</strong> <a href="mailto:support@example.com">support@example.com</a></p>
          </div>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            {["Home", "About", "Services", "FAQ", "Contact"].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`}>{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-support">
          <h3>Support</h3>
          <ul>
            {["Privacy Policy", "Terms of Service", "Help Center"].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase().replace(/\s/g, "-")}`}>{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-newsletter-social">
          <h3>Newsletter</h3>
          <form
            className="newsletter-form"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thanks for subscribing!");
            }}
          >
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>

          <div className="social-icons">
            <a href="#" aria-label="Facebook"><FaFacebook /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
          </div>

          <div className="payment-icons">
            <FaCcVisa title="Visa" />
            <FaCcMastercard title="MasterCard" />
            <FaCcPaypal title="PayPal" />
            <FaCcAmex title="Amex" />
          </div>

          <div className="app-download">
            <a href="#" className="app-btn google-play">
              <FaGooglePlay /> Google Play
            </a>
            <a href="#" className="app-btn app-store">
              <FaApple /> App Store
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Shopping-site | All Rights Reserved | Designed with{" "}
          <span className="heart" role="img" aria-label="heart">❤️</span> in Bangladesh
        </p>
      </div>

      {showTopBtn && (
        <button
          aria-label="Scroll to top"
          className="scroll-top-btn"
          onClick={scrollToTop}
          title="Back to top"
        >
          <FaArrowUp />
        </button>
      )}
    </footer>
  );
};

export default Footer;
