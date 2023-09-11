import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { getSponsor } from '../../graphql/queries';
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';

/* =============================== Drawer Styling ================================================*/
const drawerWidth = 360;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  }));

  export default function SponsorSideDrawer({ open, handleClose, sponsor }){
   /* ==============================================================================================
                                        Variables
   ==============================================================================================*/
   const [editOpen, setEditOpen] = useState(false);
   const [deleteOpen, setDeleteOpen] = useState(false);

   /* ==============================================================================================
                                        Handle Functions
   ==============================================================================================*/
   const handleEditOpen = () => {
        setEditOpen(true);
    }

    const handleEditClose = (event, reason) => {
        if (reason && reason == 'backdropClick'){
        return;
        }
        setEditOpen(false);
    }

    const handleDeleteOpen = () => {
        setDeleteOpen(true);
    }

    const handleDeleteClose = (event, reason) => {
        if (reason && reason == 'backdropClick'){
            return;
        }
        setDeleteOpen(false);
    }

    const uiChildList = () => {
        if(sponsor.Children.items.length === 0 ) {
            return (<div>No Children</div>)
        }else{
            return (
                <DataGrid
                    rows = {sponsor.Children.items}
                    columns={ [
                        { field: 'ChildID',   headerName: 'First Name', flex: 1},
                        { field: 'Firstname',    headerName: 'Last Name', flex: 1},
                        { field: 'RBL.LastName', headerName: 'RBL', flex: 1},
                    ]}
                />
            )
        }
    };

/* 
===============================================================================================
                                User Interface
================================================================================================*/  
    return (
        <React.Fragment>
            <Drawer
            sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                height: 650,
                mt:10,
                mr: 2,
                p:1,
                borderTop: 1,
                borderRight: 1,
                borderBottom: 1,
                borderColor: 'divider',
                boxShadow: 1
            },
            }}
            PaperProps={{ square: false }}
            variant="persistent"
            anchor="right"
            open={open}
    >
            <DrawerHeader sx={{display:'flex'}}>
                <IconButton sx={{flexGrow: .1}} onClick={handleClose}>
                    {<ClearIcon />}
                </IconButton>
                <Typography 
                    sx={{
                        textAlign: 'center',
                        flexGrow:.65,
                        fontSize: 'h6.fontSize'}}>
                    Sponsor Information
                </Typography>
            </DrawerHeader>
            <Divider />

            <Typography 
                sx={{
                    mt:1,
                    ml: 1,
                    fontWeight:'bold',
                    fontSize: 24,
                }}>{sponsor ? sponsor.FirstName + " " + sponsor.LastName : "N/A"}</Typography>
                <Typography 
                sx={{
                    mt:1,
                    ml: 1,
                    fontSize: 20,
                    fontStyle:'oblique'
                }}>{sponsor ? sponsor.Institution : " "}</Typography>
                <Typography
                    style={{
                        color:'#01579b'
                    }}
                    sx={{
                        ml: 1,
                        mt: 1,
                        fontWeight: 500
                    }}>Information</Typography>
            <Divider
                sx={{
                    borderBottomWidth: 1.5
                }}
                style={{
                    background:'#01579b'
                }}/>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                    <Typography sx={{pb: 1}}>Email</Typography>
                    <Typography sx={{pb: 1}}>Phone</Typography>
                    <Typography sx={{pb: 8}}>Address</Typography>
                    <Typography sx={{pb: 4}}>Years Active</Typography>
                </Box>
                <Box
                sx={{
                    mt: 1,
                    ml: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <Typography sx={{fontWeight: 'bold', pb: 1}}>{sponsor ? sponsor.Email : "N/A"}</Typography>
                    <Typography sx={{fontWeight: 'bold',pb: 1}}>{sponsor ? sponsor.Phone : "N/A"}</Typography>
                    <Typography sx={{fontWeight: 'bold',pb: 5}}>{sponsor ? sponsor.Address : "N/A"}</Typography>
                    <Typography sx={{fontWeight: 'bold',pb: 4}}>{sponsor ? sponsor.YearsActive : "N/A"}</Typography>
                </Box>
            </Box>
            <Typography
                style={{
                    color:'#01579b'
                }}
                sx={{
                    ml: 1,
                    mt: 1,
                    fontWeight: 500
                }}>Children Sponsored</Typography>
            <Divider
                sx={{
                    borderBottomWidth: 1.5
                }}
                style={{
                    background:'#01579b'
                }}/>

            <Typography sx={{mt: 1, ml: 1, }}>{uiChildList()}</Typography>

            <Box sx={{textAlign:'center'}}>
                <Button 
                    variant="contained"
                    sx={{
                        ml:3,
                        mt:3,
                        width: 120,
                    }}
                    onClick={(e) => handleEditOpen()}
                >Edit</Button>
            </Box>
        </Drawer>
        <EditSponsorForm open={editOpen} handleClose={handleEditClose} sponsor={passedSponsor} />
        </React.Fragment>
    )
 
}