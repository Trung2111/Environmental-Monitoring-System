import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import axios from 'axios'; // Import axios for making HTTP requests

export default function DataSensor() {
  const [sensorData, setSensorData] = useState([]);
  const [page, setPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const rowsPerPage = 10; // Fixed number of records per page

  // Function to fetch data from the API
  const fetchSensorData = async (pageNo = 0) => {
    try {
      const response = await axios.get(`http://localhost:8080/sensor/data?pageNo=${pageNo}&pageSize=${rowsPerPage}`); // Replace with your actual endpoint
      const { content, totalElement, totalPages } = response.data;

      setSensorData(content);
      setTotalElements(totalElement);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching sensor data:", error);
    }
  };

  useEffect(() => {
    fetchSensorData(page); // Fetch data on initial render
  }, [page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage); // Update page state
    fetchSensorData(newPage); // Fetch new data when page changes
  };

  return (
    <Box padding="20px" marginLeft="250px">
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Data Sensor
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Temperature</TableCell>
                <TableCell>Humidity</TableCell>
                <TableCell>Light</TableCell>
                <TableCell>Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sensorData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.temperature}°C</TableCell>
                  <TableCell>{row.humidity}%</TableCell>
                  <TableCell>{row.light} lx</TableCell>
                  <TableCell>{new Date(row.time).toLocaleString()}</TableCell> {/* Format the time */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={totalElements} // Total number of elements
          rowsPerPage={rowsPerPage} // Fixed number of records per page
          page={page} // Current page
          onPageChange={handleChangePage} // Function to call when page changes
          rowsPerPageOptions={[]} // Disable rows per page options
        />
      </Paper>
    </Box>
  );
}
