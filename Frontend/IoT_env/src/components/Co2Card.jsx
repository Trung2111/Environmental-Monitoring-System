import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AirIcon from '@mui/icons-material/Air'; // Icon cho CO2

export default function Co2Card() {
  const [co2Data, setCo2Data] = useState('Loading...');

  useEffect(() => {
    // Fetch the latest CO2 data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/sensor/latest');
        const data = response.data;
        setCo2Data(data.co2);
      } catch (error) {
        console.error('Error fetching CO2 data:', error);
      }
    };

    fetchData();

    // Cập nhật dữ liệu định kỳ mỗi 10 giây
    const interval = setInterval(fetchData, 10000);

    return () => clearInterval(interval); // Xóa interval khi component unmount
  }, []);

  return (
    <Card style={{ margin: '10px', textAlign: 'center', height: '90%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <CardContent style={{ flexGrow: 1 }}>
        {/* Tiêu đề và giá trị CO2 */}
        <Typography variant="h6" gutterBottom>
          CO2
        </Typography>
        <Typography variant="h4">{co2Data} ppm</Typography>
      </CardContent>
      <AirIcon style={{ fontSize: 60, color: '#9e9e9e', marginRight: '10px' }} />
    </Card>
  );
}
