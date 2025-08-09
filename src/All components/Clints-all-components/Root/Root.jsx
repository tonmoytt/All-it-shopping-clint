import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Homes components/Header/Header';
import Footer from '../Homes components/Footer/Footer'
import ScrollToTop from '../ScrollToTop/ScrollToTop.';

const Root = () => {
    const location = useLocation();

    // Check if current route is /signup or /login
    const isAuthPage = location.pathname === '/signup' || location.pathname === '/login' 

    return (
        <div >
             <ScrollToTop />
            
            <Header />
            <Navbar />
            <Outlet />
            {!isAuthPage && <Footer/> }
        </div>
    );
};

export default Root;
