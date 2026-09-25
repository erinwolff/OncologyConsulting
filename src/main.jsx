import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Navigate } from 'react-router';
import { RouterProvider } from 'react-router/dom';

import '@fontsource-variable/source-serif-4';
import '@fontsource-variable/source-sans-3';
import './index.css';

import Root from './layout/Root.jsx';
import Home from './features/Home.jsx';
import Services from './features/Services.jsx';
import NotFound from './features/NotFound.jsx';
import Pharmacologist from './features/pharmacologist/Pharmacologist.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      // Keep old /home links working.
      { path: 'home', element: <Navigate to="/" replace /> },
      { path: 'services', element: <Services /> },
      { path: 'pharmacologist', element: <Pharmacologist /> },
      // The contact page was retired; send old links home.
      { path: 'contact', element: <Navigate to="/" replace /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
