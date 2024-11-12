import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, IconButton, Toolbar } from '@mui/material';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SensorsIcon from '@mui/icons-material/Sensors';
import HistoryIcon from '@mui/icons-material/History';
import MenuIcon from '@mui/icons-material/Menu';

export default function Sidebar({ onToggle }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
        onToggle(!isOpen); // Cập nhật trạng thái cho DashboardPage
    };

    return (
        <>
            <Drawer
                variant="persistent"
                open={isOpen}
                sx={{
                    '& .MuiDrawer-paper': {
                        backgroundColor: '#37474f',
                        color: '#e1f5fe',
                        width: 240,
                    },
                }}
            >
                <Toolbar>
                    <IconButton onClick={toggleDrawer} sx={{ color: '#e1f5fe' }}>
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
                <List>
                    <ListItem button component={Link} to="/" onClick={toggleDrawer}>
                        <ListItemIcon>
                            <SpaceDashboardIcon style={{ color: '#e1f5fe' }} />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    <ListItem button component={Link} to="/dashboard-co2" onClick={toggleDrawer}>
                        <ListItemIcon>
                            <SpaceDashboardIcon style={{ color: '#e1f5fe' }} />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard CO2" />
                    </ListItem>
                    <ListItem button component={Link} to="/data-sensor" onClick={toggleDrawer}>
                        <ListItemIcon>
                            <SensorsIcon style={{ color: '#e1f5fe' }} />
                        </ListItemIcon>
                        <ListItemText primary="Data Sensor" />
                    </ListItem>
                    <ListItem button component={Link} to="/action-history" onClick={toggleDrawer}>
                        <ListItemIcon>
                            <HistoryIcon style={{ color: '#e1f5fe' }} />
                        </ListItemIcon>
                        <ListItemText primary="Action History" />
                    </ListItem>
                    <ListItem button component={Link} to="/profile" onClick={toggleDrawer}>
                        <ListItemIcon>
                            <AccountCircleIcon style={{ color: '#e1f5fe' }} />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                    </ListItem>
                </List>
            </Drawer>

            {!isOpen && (
                <IconButton
                    onClick={toggleDrawer}
                    sx={{
                        position: 'fixed',
                        top: 16,
                        left: 16,
                        color: '#37474f',
                    }}
                >
                    <MenuIcon />
                </IconButton>
            )}
        </>
    );
}
