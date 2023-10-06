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
    //Because the child object passed in is not updated when the updateChild mutation is called.
    //Using this "getChild" query allows some kind of magic to happen and it is updated after updateChild is called
    // eslint-disable-next-line
    const { loading, error, data } = useQuery(gql(getChild), {
        variables : { id: child.id },
    });
    //if (loading) {console.log("Loading getChild")}


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
                    child={data.getChild}
                    sponsorList={sponsorList}
                    rblList={rblList}
                />
            )
        }
    }

    //---------------- Delete Child ----------------
    const [deleteChildMutation, {
        error: childDelError
    }] = useMutation(gql(deleteChild));
    //if(childDelLoading) {console.log("Loading Delete Child Mutation")};
    if(childDelError) {console.log( "Delete Child Mutation error: " + childDelError)};
    
    const childDelete = async () => {
        try{
            // eslint-disable-next-line
            const response = await deleteChildMutation({
            variables: {input: {id: child.id}},
            refetchQueries: [{ query: gql(listChildren) }],
            });
            setDeleteOpen(false);
            handleClose();
        }catch(error) {
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
  
    const getSponsorInfo = (sponsor) => {
        let Name = "";
    
        if ( ! sponsor) { return ""};
        
        if(sponsor.FirstName) {
            Name = sponsor.FirstName
        };
    
        if(sponsor.LastName) { 
            if(Name.length > 0 ) { Name += " "}
            Name += sponsor.LastName
        };
    
        if(sponsor.Institution) {
            if(Name.length > 0) {
                Name = Name + " (" + sponsor.Institution + ")"
            }else{
                Name = sponsor.Institution
            }
        };
    
        return Name;
      };

    const showRBL = () => {
        if (data && data.getChild && data.getChild.RBL) {
            const child = data.getChild;
            return (
                <Typography 
                    style={{color: `${child.RBL.Color}`}} 
                    sx={{ml:1, fontSize: 16}}>
                        {child.RBL.FirstName + " " + child.RBL.LastName}
                </Typography>
            )
        }else{
            return(<Typography sx={{ ml: 1, fontSize: 16}}>{"no RBL assigned"}</Typography>)
        }
    };

    const showSponsor = () => {
        if (data && data.getChild && data.getChild.Sponsor) {
            const child = data.getChild;
            return (
                <>
                <Box sx={{display:'flex', flexDirection: 'row'}}>
                    <Box sx={{mt:0, ml:1, display: 'flex', flexDirection: 'column', flexGrow: 1}}>
                        <Typography>Name</Typography>
                        <Typography>Phone</Typography>
                    </Box>

                    <Box sx={{mt:0, ml:1, display: 'flex', flexDirection: 'column', flexGrow: 1}}>
                        <Typography style={{fontWeight: 'bold'}}>
                            {getSponsorInfo(child.Sponsor)}
                        </Typography>
                        <Typography style={{fontWeight: 'bold'}}>
                            {child.Sponsor.Phone}
                        </Typography>
                    </Box>
                </Box>
                </>
            )
        }else{
            return(<Typography sx={{ ml: 1, fontSize: 16}}>{"no Sponosr assigned"}</Typography>)
        };
    };

    const showHeaderAndDivider = (headerText) => {
        return (
        <>
            <Typography style={{color:'#01579b'}} sx={{ml:1, pt:3, fontWeight:'bold', fontSize:18}}>
                {headerText}
            </Typography>
                    
            <Divider sx={{borderBottomWidth: 1.5}} style={{background:'#01579b'}}/>
        </>
        );
    };

    const showBigData = (childAttributeName) => {
        let value = "N/A";
        if (data && data.getChild) {
            value = data.getChild[childAttributeName];
        };

        return (
            <Box sx={{flexGrow:1}}>
                <Typography sx={{mt:1, ml:1, fontWeight:'bold', fontSize:24}}>
                    {value}
                </Typography>
            </Box> 
        );
    };

    const showData = (childAttributeName) => {
        let value = "N/A";
        if (data && data.getChild) {
            value = data.getChild[childAttributeName];
        };

        return (
            <Box sx={{flexGrow:1}}>
                <Typography sx={{mt:0, ml:1}}>
                    {value}
                </Typography>
            </Box> 
        );
    };

    const showBike = () => {
        let value = '';
        if (data && data.getChild) {
            value = data.getChild.Bike;
        }else{
            return null;
        };

        if (value === 'Yes') {
            return (
                <Typography sx={{mt:0, ml:1}} style={{wordWrap: "break-word" }}>
                    <Typography style={{fontWeight:'bold', color: 'blue'}}>
                        BIKE
                    </Typography>
                </Typography>
            );
        }else{
            return null;
        };
    };

    const showDataWithLabel = (childAttributeName, labelText) => {
        let value = "N/A";
        if (data && data.getChild) {
            value = data.getChild[childAttributeName];
        };

        return (
            <Box sx={{mt:0, ml:1, display: 'flex', flexDirection: 'row'}}>
                {/* sx={{pb: 1}} */}
                <Typography>
                    {labelText}&nbsp;&nbsp;
                </Typography>
                
                {/*  sx={{pb: 1}} */}
                <Typography style={{fontWeight: 'bold'}}>
                    {value}
                </Typography>
            </Box>
        )
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
                <DrawerHeader sx={{display:'flex'}}>
                    <IconButton sx={{flexGrow: .1}} onClick={handleClose}>
                        {<ClearIcon />}
                    </IconButton>

                    <Typography 
                        sx={{
                            textAlign: 'center',
                            flexGrow:.65,
                            fontSize: 'h6.fontSize'}}
                    >
                        Child Information
                    </Typography>
                </DrawerHeader>
            
                <Divider />
                
                <Box sx={{display:'flex', flexDirection:'row', alignContent:'flex-start' }}>
                    {showBigData("Firstname")}
                    {showBigData("ChildID", true)}                    
                </Box>

                {showHeaderAndDivider("Red Bag Lady")}
                {showRBL()}
                
                {showHeaderAndDivider("Information")}
         
                <Box sx={{display: 'flex', flexDirection: 'row'}}>                
                    <Box sx={{display:'flex', flexDirection: 'column'}}>
                        {showDataWithLabel("Age","Age")}
                        {showDataWithLabel("Gender","Gender")}
                        {showDataWithLabel("Race","Race")}
                    </Box>
                    
                    <Box sx={{display:'flex', flexDirection: 'column', pl:1}}>
                        {showDataWithLabel("ShirtSize","Shirt Size")}
                        {showDataWithLabel("PantSize","Pant Size")}
                        {showDataWithLabel("ShoeSize","Shoe Size")}
                        
                    </Box>
                </Box>
                
                {showHeaderAndDivider("Wish List", "break-word")}
                {showData("Wishlist")}
                
                {showHeaderAndDivider("Additional Information")}
                
                {showBike()}
                {showData("Info")}
                    
                {showHeaderAndDivider("Siblings")}
                {showData("Siblings")}
                    
                {showHeaderAndDivider("Sponsor Information")}
                
                <Box sx={{display:'flex', flexDirection: 'row'}}>
                    <Box sx={{mt:1, ml:1, display: 'flex', flexDirection: 'column', flexGrow: 1}}>
                        {showSponsor()}
                    </Box>
                </Box>

                {showHeaderAndDivider("")}

                <Box>
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Button sx={{m:1}} variant="contained" onClick={handleEditOpen}>
                            Edit Child
                        </Button>
                        <Button 
                            sx={{m:1, backgroundColor: 'red', ":hover":{color: 'black', bgcolor: 'red'}}}
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

