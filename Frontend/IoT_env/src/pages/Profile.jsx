import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

export default function Profile() {
  // Thay đổi tên và email nếu cần
  const name = 'Nguyen Minh Trung';
  const email = 'nguyenminhtrung2111@gmail.com';

  return (
    <Box padding="20px" marginLeft="250px">
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        <Box marginBottom="20px">
          <Typography variant="h6">Name: {name}</Typography>
        </Box>
        <Box marginBottom="20px">
          <Typography variant="h6">Email: {email}</Typography>
        </Box>
      </Paper>
    </Box>
  );
}
