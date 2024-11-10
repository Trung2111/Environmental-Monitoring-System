import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import WbIncandescentOutlinedIcon from '@mui/icons-material/WbIncandescentOutlined';
import axios from 'axios';

export default function WarningAction() {
  const [warningState, setWarningState] = useState(false); // State cho cảnh báo

  // Hàm để kiểm tra cảnh báo từ API
  const fetchLatestWarning = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/actions/latest');
      const latestAction = response.data;
      // Kiểm tra điều kiện để bật đèn warning
      if (latestAction.device === 'warning led' && latestAction.action === 'high') {
        setWarningState(true);
      } else {
        setWarningState(false);
      }
    } catch (error) {
      console.error('Error fetching latest warning:', error);
    }
  };

  useEffect(() => {
    // Gọi hàm fetchLatestWarning định kỳ
    const intervalId = setInterval(fetchLatestWarning, 5000); // Gọi mỗi 5 giây
    return () => clearInterval(intervalId); // Dọn dẹp interval khi component unmount
  }, []);

  return (
    <Card style={{ margin: '10px', textAlign: 'center', height: '90%' }}>
      <CardContent>
        {/* Đèn cảnh báo */}
        <Typography variant="h6" gutterBottom>
          Cảnh báo
        </Typography>
        <Box display="flex" flexDirection="column" alignItems="center">
          <WbIncandescentOutlinedIcon style={{ fontSize: 90, color: warningState ? '#ff0000' : '#9e9e9e' }} />
        </Box>
      </CardContent>
    </Card>
  );
}
