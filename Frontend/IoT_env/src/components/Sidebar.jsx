import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SensorsIcon from '@mui/icons-material/Sensors';
import HistoryIcon from '@mui/icons-material/History';

export default function Sidebar() {
    return (
      <Drawer
        variant="permanent"
        sx={{
          '& .MuiDrawer-paper': {
            backgroundColor: '#37474f  ', // Thay đổi màu nền của Sidebar
            color: '#e1f5fe', // Thay đổi màu chữ
          },
        }}
      >
        <List>
          <ListItem button component={Link} to="/">
            <ListItemIcon>
              <SpaceDashboardIcon style={{ color: '#e1f5fe' }} /> {/* Màu biểu tượng */}
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="/data-sensor">
            <ListItemIcon>
              <SensorsIcon style={{ color: '#e1f5fe' }} />
            </ListItemIcon>
            <ListItemText primary="Data Sensor" />
          </ListItem>
          <ListItem button component={Link} to="/action-history">
            <ListItemIcon>
              <HistoryIcon style={{ color: '#e1f5fe' }} />
            </ListItemIcon>
            <ListItemText primary="Action History" />
          </ListItem>
          <ListItem button component={Link} to="/profile">
            <ListItemIcon>
              <AccountCircleIcon style={{ color: '#e1f5fe' }} />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
        </List>
      </Drawer>
    );
}
