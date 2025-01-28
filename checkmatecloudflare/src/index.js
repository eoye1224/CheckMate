import React from 'react';
import ReactDOM from 'react-dom/client';  // Import from react-dom/client
import App from './App.js';
import 'bootstrap/dist/css/bootstrap.min.css';

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement); // Use createRoot for React 18

root.render(<App />);
