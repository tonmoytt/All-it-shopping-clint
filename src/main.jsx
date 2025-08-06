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
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Authincation>
      <RouterProvider router={router} />
    </Authincation>
  </StrictMode>
);
