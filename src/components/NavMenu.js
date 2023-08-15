import React, { useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import MuiDrawer from '@mui/material/Drawer';
import MainView from './MainView';
import Link from './Link';
import List from '@mui/material/List';
import { ListItemButton } from '@mui/material';
import { ListItemText } from '@mui/material';



const drawerWidth = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        }),
      },
    }),
  );

  const defaultTheme = createTheme();

export default function NavMenu () {
    const [open, setOpen] = React.useState(true);

    const [childSelect, setChildSelect] = useState(false);
    const [sponsorSelect, setSponsorSelect] = useState(false);
    const [rblSelect, setRBLSelect] = useState(false);
    
    function handleChildSelect() {
        setSponsorSelect(false);
        setRBLSelect(false);
        setChildSelect(true);
    }
    

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ height: '100vh', display: 'flex' }}>
                <CssBaseline/>
                <Drawer variant="permanent" open={open}>
                    {/* Tool bar makes menu items (1) below header*/}
                    <Toolbar
                        sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                        }}
                    />
        {/* ========================================================================== 
                                Nav Menu Navigation
        ==============================================================================*/}
                    <Box sx={{display: 'block'}}>
                        <List component="nav">
                            <Link to="/">
                                <ListItemButton>
                                    <ListItemText primary="Children" />
                                </ListItemButton>
                            </Link>
                            <Link to="/sponsor-table">
                                <ListItemButton>
                                    <ListItemText primary="Sponsor" />
                                </ListItemButton>
                            </Link>
                            <Link to="/RBL-table">
                                <ListItemButton>
                                    <ListItemText primary="RBL" />
                                </ListItemButton>
                            </Link>
                        </List>
                    </Box>

                    {/*<List component="nav">
                        {mainListItems}
                        {/*<Divider sx={{ my: 1 }} />
                        {secondaryListItems} {/* This is a second half of the sidebar if we want it*/}
                    {/*</List>*/}
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                <Toolbar />
                    <MainView />
                </Box>
            <Box/>
        </Box>     
        </ThemeProvider>
    )
};