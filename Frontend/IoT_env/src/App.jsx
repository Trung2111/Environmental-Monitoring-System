// src/App.jsx
import React from 'react';
import DashboardPage from './pages/Dashboard'; // Đảm bảo đường dẫn chính xác
import Profile from './pages/Profile'; // Đảm bảo đường dẫn chính xác
import DataSensor from './pages/DataSensor'; // Đảm bảo đường dẫn chính xác
import ActionHistory from './pages/ActionHistory'; // Đảm bảo đường dẫn chính xác
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '20px' }}>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/data-sensor" element={<DataSensor />} />
          <Route path="/action-history" element={<ActionHistory />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
