import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import SensorIcon from '@mui/icons-material/DeviceThermostat';
import HumidityIcon from '@mui/icons-material/WaterDrop';
import LightIcon from '@mui/icons-material/WbSunny';

export default function SensorData() {
  const [sensorData, setSensorData] = useState({
    temperature: 'Loading...',
    humidity: 'Loading...',
    light: 'Loading...',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/sensor/latest');
        const data = response.data;
        setSensorData({
          temperature: data.temperature,
          humidity: data.humidity,
          light: data.light,
        });
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 10000); // Refresh every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Box width="100%" padding={2}>
      <Grid container spacing={2}>
        {/* Card Nhiệt Độ */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            style={{
              height: 150,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#f5f5f5',
            }}
          >
            <CardContent style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <Typography variant="h6">Nhiệt Độ</Typography>
              <Typography variant="h4">{sensorData.temperature}°C</Typography>
            </CardContent>
            <SensorIcon style={{ fontSize: 60, color: '#ff5722', marginRight: '10px' }} />
          </Card>
        </Grid>

        {/* Card Độ Ẩm */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            style={{
              height: 150,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#f5f5f5',
            }}
          >
            <CardContent style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <Typography variant="h6">Độ Ẩm</Typography>
              <Typography variant="h4">{sensorData.humidity}%</Typography>
            </CardContent>
            <HumidityIcon style={{ fontSize: 60, color: '#2196f3', marginRight: '10px' }} />
          </Card>
        </Grid>

        {/* Card Ánh Sáng */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            style={{
              height: 150,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#f5f5f5',
            }}
          >
            <CardContent style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <Typography variant="h6">Ánh Sáng</Typography>
              <Typography variant="h4">{sensorData.light} Lux</Typography>
            </CardContent>
            <LightIcon style={{ fontSize: 60, color: '#ffeb3b', marginRight: '10px' }} />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
