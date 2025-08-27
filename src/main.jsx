import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './All components/Clints-all-components/Root/Root';
import ErrorPages from './All components/Clints-all-components/ErrorPages/ErrorPages';
import Home from './All components/Clints-all-components/Homes components/Home/Home';
import Details from './All components/Clints-all-components/Homes components/Post/Details/Details';
import Signup from './All components/Clints-all-components/AuthincationPages/Signup/Signup';
import GradientLogin from './All components/Clints-all-components/AuthincationPages/Signup/GradientLogin/GradientLogin';
import Authincation from './All components/Clints-all-components/AuthincationPages/Authincation/Authincation';
import { HelmetProvider } from 'react-helmet-async';
import About from './All components/Clints-all-components/Navbar/About/About';
import Contact from './All components/Clints-all-components/Navbar/Contact/Contact';
import Blog from './All components/Clints-all-components/Navbar/Blog/Blog';
import Collection from './All components/Clints-all-components/Navbar/Collection';
import Shop from './All components/Clints-all-components/Navbar/Shop';
import ScrollToTop from './All components/Clints-all-components/ScrollToTop/ScrollToTop.';
import Dashboard from './All components/Clints-all-components/Dashboard/Dashboard';
import ProductPage from './All components/Clints-all-components/Navbar/ProductPage';
import CategoryPage from './All components/Clints-all-components/Navbar/CategoryPage';
import Collection2 from './All components/Clints-all-components/Navbar/Allcategorys/Collection2/Collection2';
import NewProduct from './All components/Clints-all-components/Homes components/NewProduct/NewProduct';
import NewArrival from './All components/Clints-all-components/Navbar/Allcategorys/NewArrival2/NewArrival2';
import PopularProducts2 from './All components/Clints-all-components/Navbar/Allcategorys/PopularProducts2/PopularProducts2';
import NewProducts2 from './All components/Clints-all-components/Navbar/Allcategorys/NewProduct2/NewProduct2';
import NewArrival2 from './All components/Clints-all-components/Navbar/Allcategorys/NewArrival2/NewArrival2';
import FeaturedProducts from './All components/Clints-all-components/Navbar/Allcategorys/FeaturedProducts/FeaturedProducts';
import Faq from './All components/Clints-all-components/Navbar/Allcategorys/Faq/Faq';
import Mycart from './All components/AdminDashboard/Mycart/Mycart';
import CheckoutPage from './All components/AdminDashboard/Mycart/CheckoutPage/CheckoutPage';
import PaymentPage from './All components/AdminDashboard/Mycart/PaymentPage/PaymentPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    // errorElement: <ErrorPages />, // You can uncomment this if needed
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/details/:id',
        element: <Details />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/login',
        element: <GradientLogin />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/contact',
        element: <Contact />
      },
      {
        path: '/blog',
        element: <Blog />
      },
      {
        path: '/collection',
        element: <Collection />
      },
      {
        path: '/shop',
        element: <Shop />
      },
      {
        path: '/mycart',
        element: <Mycart />
      },
      {
        path: '/product',
        element: <ProductPage />
      },
      {
        path: '/category',
        element: <CategoryPage />
      },
      {
        path: '/collection2',
        element: <Collection2 />
      },
      {
        path: '/newproducts2',
        element: <NewArrival2/>
      },
      {
        path: '/popular2',
        element: <PopularProducts2 />
      },
      {
        path: '/new2',
        element: <NewProducts2 />
      },
      {
        path: '/special',
        element: <FeaturedProducts />
      },
      {
        path: '/faq',
        element: <Faq />
      },
      {
        path: '/checkout',
        element: <CheckoutPage/>
      },
      {
        path: '/payment',
        element: <PaymentPage/>
      },
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <HelmetProvider>
    <Authincation>
      
      <RouterProvider router={router} />
    </Authincation>
  </HelmetProvider>
</StrictMode>
);
