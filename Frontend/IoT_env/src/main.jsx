import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Đảm bảo import App từ file App.jsx
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
