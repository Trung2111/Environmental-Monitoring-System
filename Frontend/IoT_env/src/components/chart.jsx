import React, { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
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
          // Ensure that temperature, humidity, light are properly parsed as floats, or default to 0
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

          // Ensure time is valid and in the correct format
          const times = content.map(data => {
            const date = new Date(data.time);
            return !isNaN(date.getTime()) ? date.toLocaleTimeString() : 'Invalid time';
          });

          setChartData({ temperatures, humidities, lights, times });
        } else {
          console.warn('No data received or content is empty');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Validate if data arrays have the same length and are non-empty
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
            <LineChart
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
              width={800}
              height={400}
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
