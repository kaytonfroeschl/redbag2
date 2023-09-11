import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { getChild } from '../../graphql/queries';
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import EditChildForm from './EditChildForm';
import DeleteChild from './DeleteChild';

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


export default function ChildSideDrawer({ child_id, open, handleClose }) {

/* ==============================================================================================
                                        Variables
   ==============================================================================================*/
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    let passedChild = {}

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

      function handleChildData(data){
        if (data){
            return {
                passedName: data.Firstname,
                passedChildID: data.ChildID,
                passedid: data.id,
                passedAge: data.Age,
                passedGender: data.Gender,
                passedRace: data.Race,
                passedShirt: data.ShirtSize,
                passedPant: data.PantSize,
                passedShoe: data.ShoeSize,
                passedWishlist: data.Wishlist,
                passedInfo: data.Info,
                passedBike: data.Bike,
                passedSiblings: data.Siblings,
                passedSponsor: data.Sponsor,
                passedRBL: data.RBL
            }
        }
        else {
            return {
                passedName: null,
                passedChildID: null,
                passedid: null,
                passedAge: null,
                passedGender: null,
                passedRace: null,
                passedShirt: null,
                passedPant: null,
                passedShoe: null,
                passedWishlist: null,
                passedInfo: null,
                passedBike: null,
                passedSiblings: null,
                passedSponsor: null,
                passedRBL: null
            }
        }
      }

/* ==============================================================================================
                                Apollo Call to Query Current Child
                                And setting Child data for Edit Child COmponent
================================================================================================*/  
    const { loading, error, data } = useQuery(gql(getChild), {
        variables : { id: child_id },
    }); 

    if(loading){
        return <div>Loading...</div>
    }
    if(error) {
        console.error(error.message)
    }
    passedChild = handleChildData(data ? data.getChild : null);
    console.log("data!!: ", data ? data.getChild : null)
    

    return (
        <React.Fragment>
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
    {/* ==============================================================================================
                                        Drawer Header
        ==============================================================================================*/}
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
                    }}>{data ? data.getChild.Firstname : "N/A"}</Typography>
                    {data
                        ? data.getChild.RBL !== null 
                            ? <Typography style={{ color: `${data.getChild.RBL.Color}` }} sx={{ ml: 1, fontSize: 16}}>{data.getChild.RBL.FirstName + " " + data.getChild.RBL.LastName}</Typography>
                            : <Typography sx={{ ml: 1, fontSize: 16}}>{" "}</Typography>
                        : <Typography sx={{ ml: 1, fontSize: 16}}>{""}</Typography>
                    }
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
                        }}>{data ? data.getChild.ChildID : "N/A"}</Typography>
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
                    display: 'flex',
                    flexDirection: 'row',
                }}>
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
                        <Typography sx={{pb: 1}}>Age&nbsp;&nbsp;</Typography>
                        <Typography style={{fontWeight: 'bold'}} sx={{pb: 1}}>{data ? data.getChild.Age : "N/A"}</Typography>
                    </Box>
                    <Box
                        sx={{
                            mt: 1,
                            ml: 1,
                            display: 'flex',
                            flexDirection: 'row',

                        }}>
                        <Typography sx={{pb: 1}}>Gender&nbsp;&nbsp;</Typography>
                        <Typography style={{fontWeight: 'bold'}} sx={{pb: 1}}>{data ? data.getChild.Gender : "N/A"}</Typography>
                    </Box>
                    <Box
                        sx={{
                            mt: 1,
                            ml: 1,
                            display: 'flex',
                            flexDirection: 'row',

                        }}>
                        <Typography sx={{pb: 1}}>Race&nbsp;&nbsp;</Typography>
                        <Typography style={{fontWeight: 'bold'}} sx={{pb: 1}}>{data ? data.getChild.Race : "N/A"}</Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display:'flex',
                        flexDirection: 'column',
                        pl: 10
                    }}>
                    <Box
                        sx={{
                            mt: 1,
                            ml: 1,
                            display: 'flex',
                            flexDirection: 'row',

                        }}>
                        <Typography sx={{pb: 1}}>Shirt Size&nbsp;&nbsp;</Typography>
                        <Typography style={{fontWeight: 'bold'}} sx={{pb: 1}}>{data ? data.getChild.ShirtSize : "N/A"}</Typography>
                    </Box>
                    <Box
                        sx={{
                            mt: 1,
                            ml: 1,
                            display: 'flex',
                            flexDirection: 'row',

                        }}>
                        <Typography sx={{pb: 1}}>Pant Size&nbsp;&nbsp;</Typography>
                        <Typography style={{fontWeight: 'bold'}} sx={{pb: 1}}>{data ? data.getChild.PantSize : "N/A"}</Typography>
                    </Box>
                    <Box
                        sx={{
                            mt: 1,
                            ml: 1,
                            display: 'flex',
                            flexDirection: 'row',

                        }}>
                        <Typography sx={{pb: 1}}>Shoe Size&nbsp;&nbsp;</Typography>
                        <Typography style={{fontWeight: 'bold'}} sx={{pb: 1}}>{data ? data.getChild.ShoeSize : "N/A"}</Typography>
                    </Box>
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
                {/* =============================== WishList ====================================== */}
                <Typography
                    sx={{
                        pb: 1,
                        mt:1,
                        ml: 1,
                    }}
                    style={{ wordWrap: "break-word" }}
                >{data ? data.getChild.Wishlist : "N/A"}</Typography>
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
                {/* =============================== Additional Information ====================================== */}
                <Typography
                    sx={{
                        pb: 1,
                        mt:1,
                        ml: 1
                    }}
                    style={{ wordWrap: "break-word" }}
                    >{data ? data.getChild.Info : "N/A"}</Typography>
                    <Typography
                    style={{
                        color:'#01579b'
                    }}
                    sx={{
                        ml: 1,
                        fontWeight: 500
                    }}>Siblings</Typography>
                <Divider
                    sx={{
                        borderBottomWidth: 1.5
                    }}
                    style={{
                        background:'#01579b'
                }}/>
                {/* =============================== Siblings Information ====================================== */}
                <Typography
                    sx={{
                        pb: 1,
                        mt:1,
                        ml: 1
                    }}
                    style={{ wordWrap: "break-word" }}
                    >{data ? data.getChild.Siblings : "N/A"}</Typography>
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
                            {/* =============================== Sponosor Information ====================================== */}
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
                        { data 
                            ? data.getChild.Sponsor !== null 
                                ?  <Typography style={{fontWeight: 'bold'}} sx={{pb: 1}}>{data.getChild.Sponsor.FirstName + " " +  data.getChild.Sponsor.LastName}</Typography>
                                : <Typography style={{fontWeight: 'bold'}} sx={{pb: 1}}>{" "}</Typography>
                            : <Typography style={{fontWeight: 'bold'}} sx={{pb: 1}}>{" "}</Typography>
                            }
                        { data 
                            ? data.getChild.Sponsor !== null 
                                ?  <Typography style={{fontWeight: 'bold'}} sx={{pb: 1}}>{data.getChild.Sponsor.Phone}</Typography>
                                : <Typography style={{fontWeight: 'bold'}} sx={{pb: 1}}>{" "}</Typography>
                            : <Typography style={{fontWeight: 'bold'}} sx={{pb: 1}}>{" "}</Typography>
                            }
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
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                >
                    <Button 
                        sx={{
                            m:1,    
                        }}
                        variant="contained"
                        onClick={handleEditOpen}
                        >
                        Edit Child
                    </Button>
                    <Button 
                        sx={{
                            m:1, 
                            backgroundColor: 'red',
                            ":hover": {
                                color: 'black',
                                bgcolor: 'red',
                            }
                        }}
                        variant="contained"
                        onClick={handleDeleteOpen}
                        >
                        Delete
                    </Button>
                </Box>
                </Box> 
                </Drawer>
                <EditChildForm open={editOpen} handleClose={handleEditClose}  child={passedChild} />
                <DeleteChild open={deleteOpen} handleClose={handleDeleteClose} child={passedChild} />
        </React.Fragment>
    )
}

