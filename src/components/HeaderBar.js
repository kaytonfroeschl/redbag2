import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    ...(open && {
      //marginLeft: drawerWidth,
      width: `calc(100% px)`, // take out - ${drawerWidth} to expand header
    }),
  }));

  const defaultTheme = createTheme();

export default function HeaderBar() {

    return (
        <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: 'flex' }}>
        <CssBaseline />
          <AppBar position="absolute">
            <Toolbar
              sx={{
                pr: '24px', // keep right padding when drawer closed
              }}
            >
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                align="left"
                sx={{ flexGrow: 1 }}
              >
                Red Bag KC 
              </Typography>
              <Button variant="outlined" color="inherit">Sign Out</Button>
            </Toolbar>
          </AppBar>
        </Box>

    </ThemeProvider>
    )
};

