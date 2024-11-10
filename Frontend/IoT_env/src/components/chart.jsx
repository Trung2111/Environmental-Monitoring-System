import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import axios from 'axios';

export default function BasicCharts() {
  const [chartData, setChartData] = useState({
    temperatures: [],
    humidities: [],
    lights: [],
    times: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/sensor/data');
        const { content } = response.data;

        if (content && content.length > 0) {
          const temperatures = content.map(data => {
            const temp = parseFloat(data.temperature);
            return isNaN(temp) ? 0 : temp;
          });

          const humidities = content.map(data => {
            const humidity = parseFloat(data.humidity);
            return isNaN(humidity) ? 0 : humidity;
          });

          const lights = content.map(data => {
            const light = parseFloat(data.light);
            return isNaN(light) ? 0 : light;
          });

          const times = content.map(data => {
            const date = new Date(data.time);
            return !isNaN(date.getTime()) ? date.toLocaleTimeString() : 'Invalid time';
          });
          
          // Giới hạn số lượng điểm xuống 5
          setChartData({
            temperatures: temperatures.slice(0, 5),
            humidities: humidities.slice(0, 5),
            lights: lights.slice(0, 5),
            times: times.slice(0, 5)
          });
        } else {
          console.warn('No data received or content is empty');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const hasValidData = chartData.temperatures.length > 0 &&
    chartData.humidities.length > 0 &&
    chartData.lights.length > 0 &&
    chartData.times.length > 0 &&
    chartData.temperatures.length === chartData.humidities.length &&
    chartData.humidities.length === chartData.lights.length &&
    chartData.lights.length === chartData.times.length;

  return (
    <Card style={{ width: '100%', height: '90%', margin: '10px' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Biểu đồ dữ liệu cảm biến
        </Typography>
        <div style={{ height: '400px' }}>
          {hasValidData ? (
            <BarChart
              series={[
                {
                  label: 'Temperature (°C)',
                  data: chartData.temperatures,
                  color: '#ff5722'
                },
                {
                  label: 'Humidity (%)',
                  data: chartData.humidities,
                  color: '#2196f3'
                },
                {
                  label: 'Light (Lux)',
                  data: chartData.lights,
                  color: '#ffeb3b'
                }
              ]}
              height={400}
              xAxis={[{ data: chartData.times, scaleType: 'band' }]}
              margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
            />
          ) : (
            <Typography variant="body1" color="textSecondary">
              No valid data available to display the chart.
            </Typography>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
