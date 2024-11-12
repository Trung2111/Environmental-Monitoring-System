import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, TextField, Button } from '@mui/material';
import axios from 'axios';
import Sidebar from '../components/Sidebar'; // Import Sidebar nếu chưa có

export default function DataSensor() {
  const [sensorData, setSensorData] = useState([]);
  const [page, setPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const rowsPerPage = 10;

  // Search-related states
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to fetch data from the API
  const fetchSensorData = async (pageNo = 0) => {
    try {
      const response = await axios.get(`http://localhost:8080/sensor/data`, {
        params: {
          pageNo: pageNo,
          pageSize: rowsPerPage,
          search: search || undefined,
          startDate: startDate || undefined,
          endDate: endDate || undefined
        }
      });

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

  // Handle search button click
  const handleSearch = () => {
    setPage(0); // Reset page to 0
    fetchSensorData(0); // Fetch data with search parameters
  };

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
        style={{ width: isSidebarOpen ? '20px' : '0px' }}
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
            Data Sensor
          </Typography>

          {/* Search Fields */}
          <Box display="flex" gap="10px" marginBottom="20px">
            <TextField
              label="Search"
              variant="outlined"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <TextField
              label="Start Date"
              type="datetime-local"
              InputLabelProps={{ shrink: true }}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <TextField
              label="End Date"
              type="datetime-local"
              InputLabelProps={{ shrink: true }}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <Button variant="contained" onClick={handleSearch}>
              Search
            </Button>
          </Box>

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
                    <TableCell>{new Date(row.time).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={totalElements}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[]} // Disable rows per page options
          />
        </Paper>
      </Box>
    </Box>
  );
}
