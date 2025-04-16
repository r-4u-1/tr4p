// Import necessary modules
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App'; // Use named import for App
import './index.css';

/**
 * Entry point of the React application.
 * Renders the main App component into the root DOM element.
 */
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
