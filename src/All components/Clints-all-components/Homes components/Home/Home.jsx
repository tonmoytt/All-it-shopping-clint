import React from 'react';
import Header from '../Header/Header';
import Slider from '../Slider/Slider';
import Post from '../Post/Post';
import Banner from '../Banner/Banner';

const Home = () => {
    return (
        <div>
           <Slider></Slider>
           <Post></Post>
           <Banner></Banner>
           
        </div>
    );
};

export default Home;