import React, { useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { getChild, listChildren } from '../../graphql/queries';
import { deleteChild } from '../../graphql/mutations';
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
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  }));

/* 
=================================================================================================
                                        Component Starts Here
=================================================================================================*/
export default function ChildSideDrawer({ child, open, handleClose, sponsorList, rblList }) {
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    // Why do we call a query to get a child's data when 
    //   child data is passed into this component with the "child" prop?
    //   We're using the id of the "child" passed in to get the child data again...
    //   This is not needed and any reference to "data" should be removed and replaced with "child".
    // eslint-disable-next-line
    const { loading, error, data } = useQuery(gql(getChild), {
        variables : { id: child.id },
    });
    if (loading) {console.log("Loading getChild")}

    //---------------- Delete Child ----------------
    const [deleteChildMutation, {
        loading: childDelLoading, 
        error: childDelError
    }] = useMutation(gql(deleteChild));
    if(childDelLoading) {console.log("Loading Delete Child Mutation")};
    if(childDelError) {console.log( "Delete Child Mutation error: " + childDelError)};


/* ==============================================================================================
                                    Handle Functions
==============================================================================================*/
    const handleEditOpen = () => {
        setEditOpen(true);
      }
    
    const handleEditClose = (event, reason) => {
        if (reason && reason === 'backdropClick'){
            return;
        }
        setEditOpen(false);
    }

    const handleDeleteOpen = () => {
        setDeleteOpen(true);
    }

    const handleDeleteClose = (event, reason) => {
        if (reason && reason === 'backdropClick'){
            return;
        }
        setDeleteOpen(false);
    }

    const onEditOpen = () => {
        if(editOpen) {
            return (
                
                <EditChildForm 
                    open={editOpen}
                    handleClose={handleEditClose}
                    child={child}
                    sponsorList={sponsorList}
                    rblList={rblList}
                />
            )
        }
    }
    
    const childDelete = () => {
        try{
            // eslint-disable-next-line
            const response = deleteChildMutation({
            variables: {input: {id: child.id}},
            refetchQueries: [{ query: gql(listChildren) }],
            });
            setDeleteOpen(false);
            handleClose();
            //console.log("Delete Sponsor Mutation response: ", response);
        }catch(error) {
            console.log("Delete Child Mutation error ", error);
            return "Delete Child failed with error: " + error;
        };
        return "";
    }

    const onDeleteOpen = () => {
        if(deleteOpen) {
            return (
                <DeleteChild 
                    open = {deleteOpen}
                    handleClose = {handleDeleteClose}
                    child = {child}
                    deleteChild = {childDelete}
                />
            )
        } else{
            return(<></>)
        }
    }


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
                >
                    {data ? data.getChild.Wishlist : "N/A"}
                </Typography>
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
                    >
                        {data ? data.getChild.Bike === 'Y' ? <Typography style={{fontWeight:'bold', color: 'blue'}}>BIKE</Typography> : "" : ""}
                        {data ? data.getChild.Info : "N/A"}</Typography>
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
                <Box>
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
                {onEditOpen()}
                {onDeleteOpen()}
        </React.Fragment>
    )
}

