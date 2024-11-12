import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import SensorData from '../components/DataSensorCard';
import Chart from '../components/chart';
import CtrLed from '../components/ActionControl';
import Box from '@mui/material/Box';
import backgroundImage from '../assets/image/cloud.png';

function DashboardPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleSidebarToggle = (isOpen) => {
        setIsSidebarOpen(isOpen);
    };

    return (
        <Box
            display="flex"
            flexDirection="row"
            height="100vh"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            {/* Sidebar */}
            <Box>
                <Sidebar onToggle={handleSidebarToggle} />
            </Box>

            {/* Main content area */}
            <Box
                flex={1}
                padding="20px"
                sx={{
                    marginLeft: isSidebarOpen ? '240px' : '0px', // Điều chỉnh vị trí khi mở/đóng Sidebar
                    transition: 'margin-left 0.3s ease', // Thêm hiệu ứng chuyển động
                }}
            >
                {/* DataSensorCard */}
                <Box marginBottom="20px">
                    <SensorData />
                </Box>

                {/* Chart and Control LED */}
                <Box display="flex" flexDirection="row" justifyContent="space-between">
                    <Box flex="2" marginRight="20px">
                        <Chart />
                    </Box>
                    <Box flex="1">
                        <CtrLed />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default DashboardPage;
