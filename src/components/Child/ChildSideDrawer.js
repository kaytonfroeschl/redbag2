import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import EditChildForm from './EditChildForm';

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

export default function ChildSideDrawer({ child, open, handleClose }) {
    const [editOpen, setEditOpen] = useState(false);

    const handleEditOpen = () => {
        setEditOpen(true);
      }
    
      const handleEditClose = (event, reason) => {
        if (reason && reason == 'backdropClick'){
          return;
        }
        setEditOpen(false);
      }

    /*(useEffect(() => {
       resizeGrid();
    }, [handleClose])*/

    return (
        <React.Fragment>
            {console.log("inside Child Side Drawer: ", child)}
            <Drawer
            ModalProps={{ disableScrollLock: true }}
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
                Child Information
            </Typography>
        </DrawerHeader>
            <Divider />
            <Box
                sx={{
                    display:'flex',
                    flexDirection:'row',
                    alignContent:'flex-start'
                }}>
            {/* =============================== Child Name and ID ====================================== */}
                <Box
                    sx={{
                        flexGrow:1
                    }}>
                    <Typography 
                        sx={{
                            mt:1,
                            ml: 1,
                            fontWeight:'bold',
                            fontSize: 24,
                    }}>{child.name}</Typography>
                    <Typography 
                        style={{
                            color:'red'
                        }}
                        sx={{
                            ml: 1,
                            fontSize: 16,
                    }}>{child.rbl}</Typography>
                </Box>
                <Box
                    sx={{
                        flexGrow: 1,
                    }}>
                    <Typography
                        sx={{
                            mt: 1,
                            ml: 1,
                            fontWeight: 'bold',
                            fontSize: 25,
                        }}>{child.id}</Typography>
                </Box>
                    </Box>
                {/* =============================== Information ====================================== */}
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
                        flexDirection: 'row'
                    }}>
                    <Box
                        sx={{
                            mt: 1,
                            ml: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            flexGrow: 1,
                        }}>
                            <Typography sx={{pb: 1}}>Age</Typography>
                            <Typography sx={{pb: 1}}>Gender</Typography>
                            <Typography sx={{pb: 1}}>Race</Typography>
                    </Box>
                    <Box
                        sx={{
                            mt: 1,
                            ml: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            flexGrow: 1,
                        }}>
                            <Typography style={{fontWeight: 'bold'}} sx={{pb: 1}}>{(child.age) ? child.age : "N/A"}</Typography>
                            <Typography style={{fontWeight: 'bold'}} sx={{pb: 1}}>{(child.gender) ? child.gender : "N/A"}</Typography>
                            <Typography style={{fontWeight: 'bold'}} sx={{pb: 1}}>{(child.race) ? child.race : "N/A"}</Typography>
                    </Box>
                    <Box
                        sx={{
                            mt: 1,
                            ml: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            flexGrow: 1,
                        }}>
                        <Typography sx={{pb: 1}}>Shirt Size</Typography>
                        <Typography sx={{pb: 1}}>Pant Size</Typography>
                        <Typography sx={{pb: 1}}>Shoe Size</Typography>
                    </Box>
                    <Box
                        sx={{
                            mt: 1,
                            ml: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            flexGrow: 1,
                        }}>
                        <Typography style={{fontWeight: 'bold'}} sx={{pb: 1}}>{(child.shirtsize) ? child.shirtsize : "N/A"}</Typography>
                        <Typography style={{fontWeight: 'bold'}} sx={{pb: 1}}>{(child.pantsize) ? child.pantsize : "N/A"}</Typography>
                        <Typography style={{fontWeight: 'bold'}} sx={{pb: 1}}>{(child.shoesize) ? child.shoesize : "N/A"}</Typography>
                    </Box>
                </Box>
                <Typography
                    style={{
                        color:'#01579b'
                    }}
                    sx={{
                        ml: 1,
                        fontWeight: 500
                    }}>Wish List</Typography>
                <Divider
                    sx={{
                        borderBottomWidth: 1.5
                    }}
                    style={{
                        background:'#01579b'
                }}/>
                <Typography
                    sx={{
                        pb: 1,
                        mt:1,
                        ml: 1,
                    }}
                    style={{ wordWrap: "break-word" }}
                >{(child.wishlist) ? child.wishlist : "N/A"}</Typography>

                {/* TODO: you need to add checks for if additional field has info then display if not then dont display */}
                <Typography
                    style={{
                        color:'#01579b'
                    }}
                    sx={{
                        ml: 1,
                        fontWeight: 500
                    }}>Additional Information</Typography>
                <Divider
                    sx={{
                        borderBottomWidth: 1.5
                    }}
                    style={{
                        background:'#01579b'
                }}/>
                <Typography
                    sx={{
                        pb: 1,
                        mt:1,
                        ml: 1
                    }}
                    style={{ wordWrap: "break-word" }}
                    >{(child.addInfo) ? child.addInfo : "N/A"}</Typography>
                <Typography
                    style={{
                        color:'#01579b'
                    }}
                    sx={{
                        ml: 1,
                        fontWeight: 500
                    }}>Sponsor Information</Typography>
                <Divider
                    sx={{
                        borderBottomWidth: 1.5
                    }}
                    style={{
                        background:'#01579b'
                }}/>
                {/* check and make sure they have a sponsor attached */}
                <Box
                    sx={{
                        display:'flex',
                        flexDirection: 'row'
                    }}>
                    <Box
                        sx={{
                            mt: 1,
                            ml: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            flexGrow: 1,
                        }}>
                            <Typography sx={{pb: 1}}>Name</Typography>
                            <Typography sx={{pb: 1}}>Phone</Typography>
                    </Box>
                    <Box
                        sx={{
                            mt: 1,
                            ml: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            flexGrow: 1,
                        }}>
                            <Typography style={{fontWeight: 'bold'}} sx={{pb: 1}}>{(child.sponsorName) ? child.sponsorName : "N/A"}</Typography>
                            <Typography style={{fontWeight: 'bold'}} sx={{pb: 1}}>{(child.sponsorPhone) ? child.sponsorPhone : "N/A"}</Typography>
                    </Box>
                </Box>
                <Box
                sx={{
                    position: 'absolute',
                    bottom: "0",
                    display: 'flex',
                    flexDirection:'row',
                    justifyContent: 'flex-start'
                }}>
                <Button 
                    sx={{
                        m:1,    
                    }}
                    variant="contained"
                    onClick={handleEditOpen}
                    >
                    Edit Child
                </Button>
                </Box> 
                </Drawer>
            <EditChildForm open={editOpen} handleClose={handleEditClose} child={child} />
        </React.Fragment>
    )
}

