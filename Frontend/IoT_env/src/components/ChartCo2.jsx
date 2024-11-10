// src/components/ChartCo2.jsx
import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import axios from 'axios';

export default function ChartCo2() {
  const [chartData, setChartData] = useState({
    co2: [],
    times: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/sensor/data');
        const { content } = response.data;

        if (content && content.length > 0) {
          const co2 = content.map(data => {
            const co2Value = parseFloat(data.co2);
            return isNaN(co2Value) ? 0 : co2Value;
          });

          const times = content.map(data => {
            const date = new Date(data.time);
            return !isNaN(date.getTime()) ? date.toLocaleTimeString() : 'Invalid time';
          });

          // Giới hạn số lượng điểm xuống 5
          setChartData({
            co2: co2.slice(-5),
            times: times.slice(-5)
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

  const hasValidData = chartData.co2.length > 0 && chartData.times.length > 0 && chartData.co2.length === chartData.times.length;

  return (
    <Card style={{ width: '100%', height: '90%', margin: '10px' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Biểu đồ CO2 (ppm)
        </Typography>
        <div style={{ height: '400px' }}>
          {hasValidData ? (
            <BarChart
              series={[
                {
                  label: 'CO2 (ppm)',
                  data: chartData.co2,
                  color: '#9e9e9e'
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
