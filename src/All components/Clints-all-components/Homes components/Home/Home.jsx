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

const Home = () => {
    return (
        <div>
           <Slider></Slider>
           <Post></Post>
           <Banner></Banner>
           <SpecialProduct></SpecialProduct>
           <UPcomeing></UPcomeing>
           <NewProduct></NewProduct>
           <Footer></Footer>
           {/* <OptionalFooter></OptionalFooter> */}
           
        </div>
    );
};

export default Home;