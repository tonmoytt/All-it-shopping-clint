import { Children, StrictMode } from 'react'
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    // errorElement: <ErrorPages></ErrorPages>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/details/:id',
        element: <Details></Details>
      },

    ]
  },

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
