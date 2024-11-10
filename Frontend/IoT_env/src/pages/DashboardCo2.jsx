import React from 'react';
import Sidebar from '../components/Sidebar';
import Co2Card from '../components/Co2Card';
import WarningAction from '../components/WarningAction';
import ChartCo2 from '../components/ChartCo2';
import Grid from '@mui/material/Grid';

function DashboardCo2() {
  return (
    <Grid container style={{ height: '100vh' }}>
      {/* Sidebar */}
      <Grid item xs={2} style={{ width: '150px' }}>
        <Sidebar />
      </Grid>

      {/* Main content area */}
      <Grid item xs={10} padding={2}>
        <Grid container spacing={2}>
          {/* Hàng 1: Co2Card, WarningAction, và ChartCo2 */}
          <Grid item xs={12} sm={4}>
            <Co2Card />
          </Grid>
          <Grid item xs={12} sm={4}>
            <ChartCo2 />
          </Grid>
          <Grid item xs={12} sm={4}>
            <WarningAction />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default DashboardCo2;
