import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Homes components/Header/Header';

const Root = () => {
    // const location = useLocation();

    // Check if current route is /signup or /login
    // const isAuthPage = location.pathname === '/signup' || location.pathname === '/login' || location.pathname === '/collection';

    return (
        <div >
            {/* {!isAuthPage && } */}
            <Header />
            <Navbar />
            <Outlet />
        </div>
    );
};

export default Root;
