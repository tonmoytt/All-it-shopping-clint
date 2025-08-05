import React from 'react';
import Header from '../Header/Header';
import Slider from '../Slider/Slider';
import Post from '../Post/Post';
import Banner from '../Banner/Banner';
import SpecialProduct from '../SpecialProduct/SpecialProduct';
import UPcomeing from '../UPcomeing/UPcomeing';

const Home = () => {
    return (
        <div>
           <Slider></Slider>
           <Post></Post>
           <Banner></Banner>
           <SpecialProduct></SpecialProduct>
           <UPcomeing></UPcomeing>
           
        </div>
    );
};

export default Home;