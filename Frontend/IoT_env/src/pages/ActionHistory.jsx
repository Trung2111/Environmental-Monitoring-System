import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, TextField, Button } from '@mui/material';
import axios from 'axios';

export default function ActionHistory() {
  const [history, setHistory] = useState([]);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const [totalElements, setTotalElements] = useState(0);

  const [searchTerm, setSearchTerm] = useState(''); // Từ khóa tìm kiếm
  const [startDate, setStartDate] = useState(''); // Ngày bắt đầu
  const [endDate, setEndDate] = useState(''); // Ngày kết thúc

  const fetchHistory = async (pageNo = 0) => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/actions', {
        params: {
          pageNo,
          pageSize: rowsPerPage,
          search: searchTerm, // Gửi từ khóa tìm kiếm
          startDate: startDate || null, // Gửi ngày bắt đầu nếu có
          endDate: endDate || null // Gửi ngày kết thúc nếu có
        },
      });
      setHistory(response.data.content);
      setTotalElements(response.data.totalElement);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  useEffect(() => {
    fetchHistory(page);
  }, [page]);

  const handleSearch = () => {
    setPage(0); // Reset về trang đầu tiên khi tìm kiếm
    fetchHistory(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Box padding="20px" marginLeft="250px">
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Action History
        </Typography>

        {/* Tìm kiếm */}
        <Box display="flex" alignItems="center" gap="10px" marginTop="20px">
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
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <TextField
            label="End Date"
            type="datetime-local"
            size="small"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <Button variant="contained" onClick={handleSearch}>
            Search
          </Button>
        </Box>

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
          rowsPerPageOptions={[]}
          component="div"
          count={totalElements}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      </Paper>
    </Box>
  );
}
