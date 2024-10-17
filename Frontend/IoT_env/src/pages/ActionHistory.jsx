import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import axios from 'axios';

export default function ActionHistory() {
  const [history, setHistory] = useState([]); // Dữ liệu lịch sử
  const [page, setPage] = useState(0); // Trang hiện tại
  const rowsPerPage = 10; // Cố định số hàng trên mỗi trang là 10
  const [totalElements, setTotalElements] = useState(0); // Tổng số phần tử

  useEffect(() => {
    // Hàm để lấy lịch sử từ API dựa vào phân trang
    const fetchHistory = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/actions', {
          params: {
            pageNo: page,
            pageSize: rowsPerPage,
          },
        });
        setHistory(response.data.content); // Cập nhật lịch sử từ API
        setTotalElements(response.data.totalElement); // Cập nhật tổng số phần tử
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };
    fetchHistory();
  }, [page]); // Fetch lại dữ liệu khi trang thay đổi (không cần rowsPerPage vì đã cố định)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Box padding="20px" marginLeft="250px">
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Action History
        </Typography>

        <TableContainer style={{ marginTop: '20px' }}>
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
          rowsPerPageOptions={[]} // Xóa tùy chọn thay đổi số hàng
          component="div"
          count={totalElements}
          rowsPerPage={rowsPerPage} // Cố định số hàng trên mỗi trang là 10
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={null} // Bỏ xử lý sự kiện thay đổi số hàng
        />
      </Paper>
    </Box>
  );
}
