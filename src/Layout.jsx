import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './component/header';
import Footer from './component/footer';
import AppRoutes from './Routes';

function Layout() {
    const location = useLocation();
    const excludedRoutes = ["/Play" , "/Summary"];

    return (
        <>
            {!excludedRoutes.includes(location.pathname) && <Header />}
            <AppRoutes />
            {!excludedRoutes.includes(location.pathname) && <Footer />}
        </>
    );
}

export default Layout;
