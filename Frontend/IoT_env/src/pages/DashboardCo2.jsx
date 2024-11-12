import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Co2Card from '../components/Co2Card';
import WarningAction from '../components/WarningAction';
import ChartCo2 from '../components/ChartCo2';
import Grid from '@mui/material/Grid';

function DashboardCo2() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Hàm xử lý khi Sidebar thay đổi trạng thái mở/đóng
  const handleSidebarToggle = (isOpen) => {
    setIsSidebarOpen(isOpen);
  };

  return (
    <Grid container style={{ height: '100vh' }}>
      {/* Sidebar */}
      <Grid item xs={2} style={{ width: isSidebarOpen ? '240px' : '0px' }}>
        <Sidebar onToggle={handleSidebarToggle} />
      </Grid>

      {/* Main content area */}
      <Grid
        item
        xs={isSidebarOpen ? 10 : 12} // Nếu Sidebar mở thì dành 10 cột, nếu đóng thì dùng toàn bộ 12 cột
        padding={2}
        sx={{
          marginLeft: isSidebarOpen ? '240px' : '0px', // Thay đổi margin khi mở/đóng Sidebar
          transition: 'margin-left 0.3s ease', // Thêm hiệu ứng chuyển động
        }}
      >
        <Grid container spacing={2}>
          {/* Hàng 1: Co2Card, WarningAction, và ChartCo2 */}
          <Grid item xs={12} sm={4}>
            <Co2Card />
          </Grid>
          <Grid item xs={12} sm={4}>
            <ChartCo2 />
          </Grid>
          <Grid item xs={12} sm={4}>
            <WarningAction />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default DashboardCo2;
