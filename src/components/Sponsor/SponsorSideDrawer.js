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
import EditSponsorForm from './EditSponsorForm';
import DeleteSponsor from './DeleteSponsor';

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

  export default function SponsorSideDrawer({ open, handleClose, sponsor_id }){
   /* ==============================================================================================
                                        Variables
   ==============================================================================================*/
   const [editOpen, setEditOpen] = useState(false);
   const [deleteOpen, setDeleteOpen] = useState(false);
   let passedSponsor = {}

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

    function handleSponsorData(data) {
        if (data) {
            return {
              passedAddress: data.Address,
              passedEmail: data.Email,
              passedName: data.FirstName + " " + data.LastName,
              passedInst: data.Institution,
              passedPhone: data.Phone,
              passedYA: data.YearsActive,
              id: data.id  
            }
        } else {
            return {
                passedAddress: null,
                passedEmail: null,
                passedName: null,
                passedInst: null,
                passedPhone: null,
                passedYA: null,
                id: null,
            }
        }
    }

    /* ==============================================================================================
                                Apollo Call to Query Current Child
                                And setting Child data for Edit Child COmponent
================================================================================================*/  
    const { loading, error, data } = useQuery(gql(getSponsor), {
        variables : { id: sponsor_id },
    }); 

    if(loading){
        return <div>Loading...</div>
    }
    if(error) {
        console.error(error.message)
    }
    console.log(data)
    passedSponsor = handleSponsorData(data ? data.getSponsor : null);
    console.log("passed Sponsor: ", passedSponsor)

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
                }}>{data ? passedSponsor.passedName : "N/A"}</Typography>
                <Typography 
                sx={{
                    mt:1,
                    ml: 1,
                    fontSize: 20,
                    fontStyle:'oblique'
                }}>{data ? passedSponsor.passedInst : " "}</Typography>
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
                    mt: 1,
                    display: 'flex',
                    flexDirection: 'row',
                }}>
                <Box
                    sx={{
                        mt: 1,
                        ml: 1,
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
                    <Typography sx={{fontWeight: 'bold', pb: 1}}>{data ? passedSponsor.passedEmail : "N/A"}</Typography>
                    <Typography sx={{fontWeight: 'bold',pb: 1}}>{data ? passedSponsor.passedPhone : "N/A"}</Typography>
                    <Typography sx={{fontWeight: 'bold',pb: 5}}>{data ? passedSponsor.passedAddress : "N/A"}</Typography>
                    <Typography sx={{fontWeight: 'bold',pb: 4}}>{data ? passedSponsor.passedYA : "N/A"}</Typography>
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
            <Typography
                sx={{
                    mt: 1,
                    ml: 1,
                }}>TODO</Typography>
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
        </React.Fragment>
    )
 
}