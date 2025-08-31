import React from 'react';
import { FaCloudDownloadAlt, FaCogs, FaMobileAlt } from "react-icons/fa";
import './about.css';
import watchImg from '../../../../assets/Images/About-watch.webp'; // replace with your watch image path
import laptopImg from '../../../../assets/Images/about-2nd.webp'; // replace with your laptop image path
import { Link } from 'react-router-dom';
import Footer from '../../Homes components/Footer/Footer';

const About = () => {
    return (
        <div className="about-section  ">

            {/* About Us - First Section */}
            <h2 className="section-title text-3xl mt-4">About us</h2>
            <div className="about-container">
                <div className="about-image">
                    <img src={watchImg} alt="Watch" />
                </div>
                <div className="about-content">
                    <h3>We Have Everything You Need ?</h3>
                    <p>
                        Faded short sleeves t-shirt with high neckline. Soft and stretchy material for a comfortable fit.
                        Accessorize with a straw hat and you're ready for summer!
                    </p>
                    <h5>Sample Unordered List</h5>
                    <ul>
                        <li>Lorem ipsum, ut lpsum as it is sometimes known</li>
                        <li>Dummy text used in laying out print, graphic or web designs</li>
                        <li>The passage is attributed to.</li>
                        <li>Proin molestie egestas orci ac suscipit risus posuere loremous.</li>
                        <li>Dummy text used in laying out print, graphic or web designs</li>
                    </ul>
                  <Link to='/contact'> <button className="contact-btn">CONTACT US ➜</button></Link> 
                </div>
            </div>

            {/* Our Services */}
            <div className="services-section border border-gray-200 py-2">
                <h3 className="services-title text-lg">Our Services</h3>
                <div className="services-list">
                    <div className="service-item">
                        <FaCloudDownloadAlt className="service-icon ml-32 md:ml-28" />
                        <h4>FREE RESOURCES</h4>
                        <p>Bring to the table win-win survival strategies to ensure proactive domination.</p>
                    </div>
                    <div className="service-item">
                        <FaCogs className="service-icon  ml-32 md:ml-28" />
                        <h4>MULTI PURPOSE</h4>
                        <p>Bring to the table win-win survival strategies to ensure proactive domination.</p>
                    </div>
                    <div className="service-item">
                        <FaMobileAlt className="service-icon  ml-32 md:ml-28" />
                        <h4>FULLY RESPONSIVE</h4>
                        <p>Bring to the table win-win survival strategies to ensure proactive domination.</p>
                    </div>
                </div>
            </div>

            {/* About Us - Second Section */}
            <div className="about-container ">
                <div className="about-content">
                    <h3>We Have Everything You Need ?</h3>
                    <p>
                        Faded short sleeves t-shirt with high neckline. Soft and stretchy material for a comfortable fit.
                        Accessorize with a straw hat and you're ready for summer!
                    </p>
                    <h5>Sample Ordered List</h5>
                 
                        <li>Comodous in tempor ullamcorper miaculis</li>
                        <li>Pellentesque vitae neque mollis urna mattis laoreet.</li>
                        <li>Divamus sit amet purus justo.</li>
                        <li>Comodous in tempor ullamcorper miaculis</li>
                        <li>Proin molestie egestas orci ac suscipit risus posuere loremous</li>
                     
                    <Link to='/contact'> <button className="contact-btn mt-10">CONTACT US ➜</button></Link> 
                </div>
                <div className="about-image">
                    <img src={laptopImg} alt="Laptop" />
                </div>
            </div>
          

        </div>
    );
};

export default About;
