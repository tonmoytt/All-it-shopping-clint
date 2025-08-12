import React from 'react';
import Header from '../Header/Header';
import Slider from '../Slider/Slider';
import Post from '../Post/Post';
import Banner from '../Banner/Banner';
import SpecialProduct from '../SpecialProduct/SpecialProduct';
import UPcomeing from '../UPcomeing/UPcomeing';
import NewProduct from '../NewProduct/NewProduct';
import Footer from '../Footer/Footer';
import OptionalFooter from '../Footer/OptionalFooter/OptionalFooter';
// react-helmet এর পরিবর্তে react-helmet-async থেকে import করো
import { Helmet } from 'react-helmet-async'; 
import Marquee from '../Marquee/Marquee';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title> AL-IT-Services | Home</title>
            </Helmet>
           <Slider></Slider>
           <Marquee></Marquee>
           <Post></Post>
           <Banner></Banner>
           <SpecialProduct></SpecialProduct>
           <UPcomeing></UPcomeing>
           <NewProduct></NewProduct>
           {/* <Footer></Footer> */}
           {/* <OptionalFooter></OptionalFooter> */}
        </div>
    );
};

export default Home;
