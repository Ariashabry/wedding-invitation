import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { GuestsProvider } from './context/GuestsContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GuestsProvider>
      <RouterProvider router={router} />
    </GuestsProvider>
  </React.StrictMode>
);