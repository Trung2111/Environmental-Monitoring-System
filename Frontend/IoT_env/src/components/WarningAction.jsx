import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import WbIncandescentOutlinedIcon from '@mui/icons-material/WbIncandescentOutlined';
import axios from 'axios';

export default function WarningAction() {
  const [warningState, setWarningState] = useState(false); // Trạng thái đèn cảnh báo
  const [blinkCount, setBlinkCount] = useState(0); // Đếm số lần nhấp nháy
  const [isBlinking, setIsBlinking] = useState(false); // Kiểm soát quá trình nhấp nháy

  // Hàm để kiểm tra cảnh báo từ API
  const fetchLatestWarning = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/actions/latest');
      const latestAction = response.data;

      // Kiểm tra điều kiện để nhấp nháy đèn warning
      if (latestAction.device === 'warning led' && latestAction.action === 'high') {
        const actionTime = new Date(latestAction.time);
        const currentTime = new Date();
        const timeDifference = (currentTime - actionTime) / 1000; // Tính thời gian chênh lệch tính bằng giây

        // Nếu thời gian chênh lệch không quá 10 giây và đèn chưa nhấp nháy
        if (timeDifference <= 10 && !isBlinking) {
          setBlinkCount(3); // Thiết lập nhấp nháy 3 lần
          setIsBlinking(true); // Đặt trạng thái nhấp nháy
        }
      }
    } catch (error) {
      console.error('Error fetching latest warning:', error);
    }
  };

  useEffect(() => {
    // Gọi hàm fetchLatestWarning liên tục mỗi 1 giây
    const intervalId = setInterval(fetchLatestWarning, 1000);
    return () => clearInterval(intervalId); // Dọn dẹp interval khi component unmount
  }, []);

  useEffect(() => {
    let blinkInterval;
    if (blinkCount > 0) {
      setWarningState((prev) => !prev); // Chuyển đổi trạng thái đèn để nhấp nháy
      blinkInterval = setInterval(() => {
        setWarningState((prev) => !prev); // Chuyển đổi trạng thái đèn
        setBlinkCount((prev) => prev - 1); // Giảm số lần nhấp nháy
      }, 1000); // Nhấp nháy mỗi 1 giây
    } else if (blinkCount === 0 && isBlinking) {
      setWarningState(false); // Tắt đèn sau khi nhấp nháy xong
      setIsBlinking(false); // Kết thúc quá trình nhấp nháy
    }

    return () => clearInterval(blinkInterval); // Dọn dẹp interval sau khi nhấp nháy xong
  }, [blinkCount, isBlinking]);

  return (
    <Card style={{ margin: '10px', textAlign: 'center', height: '90%' }}>
      <CardContent>
        {/* Đèn cảnh báo */}
        <Typography variant="h6" gutterBottom>
          Cảnh báo
        </Typography>
        <Box display="flex" flexDirection="column" alignItems="center">
          <WarningAmberIcon
            style={{ fontSize: 90, color: warningState ? '#ff0000' : '#9e9e9e' }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
