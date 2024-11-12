import React, { useState } from 'react';
import { Box, Typography, Paper, Link } from '@mui/material';
import Sidebar from '../components/Sidebar'; // Import Sidebar nếu chưa có

export default function Profile() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Thay đổi tên và email nếu cần
  const name = 'Nguyen Minh Trung - B21DCDT226';
  const email = 'nguyenminhtrung2111@gmail.com';
  
  // Đường dẫn GitHub và Google Doc
  const githubLink = 'https://github.com/Trung2111/Environmental-Monitoring-System';
  const googleDocLink = 'https://docs.google.com/document/d/1w3ZYoiTTo8AA-GXRGsvkH23hrJ9Yyu1BJ1op-brtwG0/edit?hl=vi&tab=t.0';

  // Hàm xử lý khi Sidebar thay đổi trạng thái mở/đóng
  const handleSidebarToggle = (isOpen) => {
    setIsSidebarOpen(isOpen);
  };

  return (
    <Box display="flex" style={{ height: '100vh' }}>
      {/* Sidebar */}
      <Box
        item
        xs={2}
        style={{ width: isSidebarOpen ? '240px' : '0px' }}
      >
        <Sidebar onToggle={handleSidebarToggle} />
      </Box>

      {/* Main content area */}
      <Box
        item
        xs={10}
        padding={2}
        sx={{
          marginLeft: isSidebarOpen ? '240px' : '0px', // Thay đổi margin khi mở/đóng Sidebar
          flexGrow: 1, // Mở rộng để chiếm không gian còn lại
          transition: 'margin-left 0.3s ease', // Thêm hiệu ứng chuyển động
        }}
      >
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h4" gutterBottom>
            Profile
          </Typography>
          <Box marginBottom="20px">
            <Typography variant="h6">Name: {name}</Typography>
          </Box>
          <Box marginBottom="20px">
            <Typography variant="h6">Email: {email}</Typography>
          </Box>
          <Box marginBottom="20px">
            <Typography variant="h6">Links:</Typography>
            <Typography>
              <Link href={githubLink} target="_blank" rel="noopener">
                Environmental Monitoring System (GitHub)
              </Link>
            </Typography>
            <Typography>
              <Link href={googleDocLink} target="_blank" rel="noopener">
                File Doc (Google Document)
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
