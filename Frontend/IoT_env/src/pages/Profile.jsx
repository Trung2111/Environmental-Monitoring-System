import React from 'react';
import { Box, Typography, Paper, Link } from '@mui/material';

export default function Profile() {
  // Thay đổi tên và email nếu cần
  const name = 'Nguyen Minh Trung - B21DCDT226';
  const email = 'nguyenminhtrung2111@gmail.com';
  
  // Đường dẫn GitHub và Google Doc
  const githubLink = 'https://github.com/Trung2111/Environmental-Monitoring-System';
  const googleDocLink = 'https://docs.google.com/document/d/1w3ZYoiTTo8AA-GXRGsvkH23hrJ9Yyu1BJ1op-brtwG0/edit?hl=vi&tab=t.0';

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
        <Box marginBottom="20px">
          <Typography variant="h6">Links:</Typography>
          <Typography>
            <Link href={githubLink} target="_blank" rel="noopener">
              Environmental Monitoring System (GitHub)
            </Link>
          </Typography>
          <Typography>
            <Link href={googleDocLink} target="_blank" rel="noopener">
              File Doc (Google Document)
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
