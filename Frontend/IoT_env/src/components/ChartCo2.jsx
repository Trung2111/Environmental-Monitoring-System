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
        const response = await axios.get('http://localhost:8080/sensor/data', {
          params: {
            pageSize: 5, // Giới hạn số lượng bản ghi trả về là 5
            sort: 'time,desc' // Sắp xếp theo thời gian giảm dần
          }
        });
        
        const { content } = response.data;
  
        if (content && content.length > 0) {
          // Lấy dữ liệu co2 và thời gian
          const co2 = content.map(data => parseFloat(data.co2) || 0);
          const times = content.map(data => {
            const date = new Date(data.time);
            return date.toLocaleTimeString();
          });
  
          // Cập nhật dữ liệu biểu đồ
          setChartData({
            co2: co2.reverse(), // Đảo ngược để hiển thị theo thứ tự thời gian tăng dần
            times: times.reverse()
          });
        } else {
          console.warn('No data received or content is empty');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    // Gọi fetchData lần đầu tiên và sau đó lặp lại mỗi 5 giây
    fetchData(); // Lần gọi đầu tiên
    const interval = setInterval(fetchData, 5000); // Cập nhật mỗi 5 giây
  
    return () => clearInterval(interval); // Xóa interval khi component unmount
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
                  color: '#7CFC00'
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
