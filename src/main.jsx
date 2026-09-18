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
import Contact from './features/Contact.jsx';
import NotFound from './features/NotFound.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      // Keep old /home links working.
      { path: 'home', element: <Navigate to="/" replace /> },
      { path: 'services', element: <Services /> },
      { path: 'contact', element: <Contact /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
