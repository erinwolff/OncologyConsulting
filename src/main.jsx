import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react'

import './index.css';

import Root from './layout/Root.jsx';
import Home from './features/Home.jsx';
import Services from './features/Services.jsx';
import Contact from './features/Contact.jsx';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { extendTheme } from '@chakra-ui/react';
import '@fontsource/pt-sans-caption';
import '@fontsource/noto-sans';

const theme = extendTheme({
  fonts: {
    heading: `'PT Sans Caption', sans-serif`,
    body: `'Noto Sans', sans-serif`,
  },
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { path: '/', element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/services", element: <Services /> },
      { path: "/contact", element: <Contact /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);

