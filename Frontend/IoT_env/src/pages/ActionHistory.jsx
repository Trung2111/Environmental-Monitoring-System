import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, TextField, Button } from '@mui/material';
import axios from 'axios';
import Sidebar from '../components/Sidebar'; // Import Sidebar nếu chưa có

export default function ActionHistory() {
  const [history, setHistory] = useState([]);
  const [page, setPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const rowsPerPage = 10;

  // Trạng thái tìm kiếm
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Trạng thái Sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Giả sử Sidebar mặc định mở

  // Hàm lấy dữ liệu từ API
  const fetchHistory = async (pageNo = 0) => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/actions', {
        params: {
          pageNo: pageNo,
          pageSize: rowsPerPage,
          search: searchTerm || undefined,
          startDate: startDate || undefined,
          endDate: endDate || undefined
        },
      });
      const { content, totalElement } = response.data;
      setHistory(content);
      setTotalElements(totalElement);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  useEffect(() => {
    fetchHistory(page); // Gọi hàm fetchHistory khi trang thay đổi
  }, [page]);

  const handleSearch = () => {
    setPage(0); // Đặt trang về 0 khi tìm kiếm
    fetchHistory(0); // Gọi hàm fetchHistory với trang 0
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    fetchHistory(newPage); // Lấy dữ liệu mới khi thay đổi trang
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen((prevState) => !prevState); // Đổi trạng thái Sidebar khi nhấn vào nút
  };

  return (
    <Box display="flex" style={{ height: '100vh' }}>
      {/* Sidebar */}
      <Box
        item
        xs={2}
        style={{ width: isSidebarOpen ? '20px' : '0px', transition: 'width 0.3s ease' }}
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
            Action History
          </Typography>

          {/* Trường tìm kiếm */}
          <Box display="flex" gap="10px" marginBottom="20px">
            <TextField
              label="Search"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <TextField
              label="Start Date"
              type="datetime-local"
              size="small"
              InputLabelProps={{ shrink: true }}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <TextField
              label="End Date"
              type="datetime-local"
              size="small"
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
                  <TableCell>Action</TableCell>
                  <TableCell>Device</TableCell>
                  <TableCell>Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {history.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>{entry.id}</TableCell>
                    <TableCell>{entry.action}</TableCell>
                    <TableCell>{entry.device}</TableCell>
                    <TableCell>{new Date(entry.time).toLocaleString()}</TableCell>
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
            rowsPerPageOptions={[]} // Tắt các tùy chọn hàng trên mỗi trang
          />
        </Paper>
      </Box>
    </Box>
  );
}
