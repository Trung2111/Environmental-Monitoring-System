import React from 'react';
import Sidebar from '../components/Sidebar';
import SensorData from '../components/DataSensorCard';
import Chart from '../components/chart';
import CtrLed from '../components/ActionControl';
import Box from '@mui/material/Box';

function DashboardPage() {
  return (
    <Box display="flex" flexDirection="row" height="100vh">
      {/* Sidebar */}
      <Box flex={1} style={{ width: '150' }}> {/* Đặt lại kích thước cho Sidebar */}
        <Sidebar />
      </Box>

      {/* Main content area */}
      <Box flex={4} padding="20px">
        {/* DataSensorCard */}
        <Box marginBottom="20px">
          <SensorData />
        </Box>

        {/* Chart and CtrLed */}
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Box flex={2} marginRight="20px" style={{ width: '60%' }}>
            <Chart />
          </Box>
          <Box flex={1}>
            <CtrLed />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default DashboardPage;
