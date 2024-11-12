import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import WbIncandescentOutlinedIcon from '@mui/icons-material/WbIncandescentOutlined';
import AcUnitIcon from '@mui/icons-material/AcUnit'; // Icon cho quạt
import Switch from '@mui/material/Switch';
import axios from 'axios';

import LightOnImage from '../assets/image/light on.png';
import LightOffImage from '../assets/image/light off.png';
import FanOnImage from '../assets/image/fan on.png';
import FanOffImage from '../assets/image/fan off.png';

export default function LEDControl() {
  const [ledState, setLedState] = useState(false);
  const [fanState, setFanState] = useState(false); // State cho quạt

  const updateHistory = async (action, device) => {
    try {
      await axios.post('http://localhost:8080/history', { action, device, timestamp: new Date().toLocaleString() });
    } catch (error) {
      console.error('Error updating history:', error);
    }
  };

  const handleLedToggle = async () => {
    const newLedState = !ledState;
    setLedState(newLedState);
    await axios.post('http://localhost:8080/api/v1/led', { led: newLedState ? '1' : '0' });
    await updateHistory(`LED turned ${newLedState ? 'ON' : 'OFF'}`, 'LED');
  };

  const handleFanToggle = async () => {
    const newFanState = !fanState;
    setFanState(newFanState);
    await axios.post('http://localhost:8080/api/v1/fan', { fan: newFanState ? '1' : '0' });
    await updateHistory(`Fan turned ${newFanState ? 'ON' : 'OFF'}`, 'Fan');
  };

  return (
    <Card style={{ margin: '10px', textAlign: 'center', height: '90%' }}>
      <CardContent>
        {/* Điều khiển đèn LED */}
        <Typography variant="h6" gutterBottom>
          Điều khiển đèn LED
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="space-between" padding="0 20px" marginBottom="40px" marginTop ="40px">
          <Switch
            checked={ledState}
            onChange={handleLedToggle}
            color="primary"
            inputProps={{ 'aria-label': 'controlled' }}
            sx={{
              '& .MuiSwitch-thumb': {
                width: 30,
                height: 30,
              },
              '& .MuiSwitch-track': {
                height: 18,
              },
              '& .Mui-checked': {
                color: '#1976d2',
              },
              '&.Mui-checked + .MuiSwitch-track': {
                backgroundColor: '#1976d2',
              },
            }}
          />
          <img 
            src={ledState ? LightOnImage : LightOffImage} 
            alt="LED" 
            style={{ width: 90, height: 90 }} 
          />
        </Box>

        {/* Điều khiển quạt */}
        <Typography variant="h6" gutterBottom>
          Điều khiển quạt
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="space-between" padding="0 20px" marginTop="40px">
          <Switch
            checked={fanState}
            onChange={handleFanToggle}
            color="primary"
            inputProps={{ 'aria-label': 'controlled' }}
            sx={{
              '& .MuiSwitch-thumb': {
                width: 30,
                height: 30,
              },
              '& .MuiSwitch-track': {
                height: 18,
              },
              '& .Mui-checked': {
                color: '#1976d2',
              },
              '&.Mui-checked + .MuiSwitch-track': {
                backgroundColor: '#1976d2',
              },
            }}
          />
          <img 
            src={fanState ? FanOnImage : FanOffImage} 
            alt="LED" 
            style={{ width: 90, height: 90 }} 
          />
        </Box>
      </CardContent>
    </Card>
  );
}
