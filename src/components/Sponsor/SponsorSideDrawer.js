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
import EditSponsorForm from './EditSponsorForm';

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
                                    Apollo call to get backend sponsor
   ==============================================================================================*/
   const { loading, error, data } = useQuery(gql(getSponsor), {
        variables : { id: sponsor.id },
    });

    if (loading) {
        return <div>Loading...</div>
    }

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
        if(sponsor && sponsor.Children && sponsor.Children.items) {
            return (
                <DataGrid
                    rows = {sponsor.Children.items}
                    columns={ [
                        { field: 'ChildID',   headerName: 'Child ID', flex: 1},
                        { field: 'Firstname',    headerName: 'Name', flex: 1},
                        { field: 'RBL', headerName: 'RBL', flex: 1.3,
                            valueGetter: (params) => {
                            if(params.row.RBL) {
                                return(params.row.RBL.FirstName + " " + params.row.RBL.LastName);
                            }
                            return "";
                            }
                        },
                    ]}
                />
            )
        }else{
            return (<div>No Children</div>)
        };
    };

    const printAddress = () => {
        let returnAddy = "";
        if(data){
            if(data.getSponsor.AddressStreet !== null){
                returnAddy = data.getSponsor.AddressStreet;
            }
            if(data.getSponsor.AddressCity !== null){
                returnAddy = returnAddy + " " + data.getSponsor.AddressCity;
            }
            if (data.getSponsor.AddressState !== null){
                returnAddy = returnAddy + " " + data.getSponsor.AddressState;
            }
            if (data.getSponsor.AddressZip !== null){
                returnAddy = returnAddy + " " + data.getSponsor.AddressZip;
            }
            return returnAddy;
        } else {
            return null;
        }
    }

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
                }}>{data ? data.getSponsor.FirstName + " " + data.getSponsor.LastName : "N/A"}</Typography>
                <Typography 
                sx={{
                    mt:1,
                    ml: 1,
                    fontSize: 20,
                    fontStyle:'oblique'
                }}>{data ? data.getSponsor.Institution : " "}</Typography>
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
                        display:'flex',
                        flexDirection: 'column'
                    }}>
                    <Box
                        sx={{
                            mt: 1,
                            ml: 1,
                            display: 'flex',
                            flexDirection: 'row',

                        }}>
                        <Typography sx={{pb: 1}}>Email&nbsp;&nbsp;</Typography>
                        <Typography sx={{fontWeight: 'bold', pb: 1}}>{data ? data.getSponsor.Email : "N/A"}</Typography>
                    </Box>
                    <Box
                        sx={{
                            mt: 1,
                            ml: 1,
                            display: 'flex',
                            flexDirection: 'row',

                        }}>
                        <Typography sx={{pb: 1}}>Phone&nbsp;&nbsp;</Typography>
                        <Typography sx={{fontWeight: 'bold', pb: 1}}>{data ? data.getSponsor.Phone : "N/A"}</Typography>
                    </Box>
                    <Box
                        sx={{
                            mt: 1,
                            ml: 1,
                            display: 'flex',
                            flexDirection: 'row',

                        }}>
                        <Typography sx={{pb: 1}}>Address&nbsp;&nbsp;</Typography>
                        <Typography sx={{fontWeight: 'bold', pb: 1}}>
                            {data 
                                ? printAddress()
                            : "N/A"}
                        
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            mt: 1,
                            ml: 1,
                            display: 'flex',
                            flexDirection: 'row',

                        }}>
                        <Typography sx={{pb: 1}}>Years Active&nbsp;&nbsp;</Typography>
                        <Typography sx={{fontWeight: 'bold', pb: 1}}>{data ? data.getSponsor.YearsActive : "N/A"}</Typography>
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
        <EditSponsorForm open={editOpen} handleClose={handleEditClose} sponsor={sponsor} /> 
        </React.Fragment>
    )
 
}