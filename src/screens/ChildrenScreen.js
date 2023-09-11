import React, { useState, useEffect } from 'react';
import { listChildren, listSponsors, listRBLS } from '../graphql/queries';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Paper, Button, Box } from '@mui/material';
import { darken, lighten, styled } from '@mui/material/styles';
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import CreateChildForm from '../components/Child/CreateChildForm';
import ChildSideDrawer from '../components/Child/ChildSideDrawer';
import ChildImport from '../components/Child/ChildImport';
import { createChild, updateChild } from '../graphql/mutations';


//---------------------------------------------------- 
//  Child Side Drawer Styling
//----------------------------------------------------
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
// const DrawerHeader = styled('div')(({ theme }) => ({
//     display: 'flex',
//     alignItems: 'center',
//     padding: theme.spacing(0, 1),
//     // necessary for content to be below app bar
//     ...theme.mixins.toolbar,
//     justifyContent: 'flex-start',
//   }));


//---------------------------------------------------- 
//  Utility Code
//----------------------------------------------------
function QuickSearchToolbar() {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
      }}
    >
      <GridToolbarQuickFilter
      sx={{
          p:1,
          m: 1
      }}
        quickFilterParser={(searchInput) =>
          searchInput
            .split(',')
            .map((value) => value.trim())
            .filter((value) => value !== '')
        }
      />
    
      
    </Box>
  );
}

/* 
==============================================================================================
                Component Starts Here
================================================================================================*/
export default function ChildrenScreen () {
  const [customWidth, setCustomWidth] = React.useState('100%');
  const childList = [];
  const [currentKid, setCurrentKid] = useState({});

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [NCOpen, setNCOpen] = React.useState(false);
  const [importOpen, setImportOpen] = useState(false);

  //---------------------------------------------------- 
  //      RBL Stuff
  //----------------------------------------------------
  const { data: rbl_data, loading: rbl_loading, error: rbl_error } = useQuery(gql(listRBLS));
  if(rbl_loading) {console.log("RBL List is loading")};  
  if(rbl_error) {console.log("RBL List Load error: " + rbl_error)};

  //---------------------------------------------------- 
  //      Sponsor Stuff
  //----------------------------------------------------
  const { data: sponsor_data, loading: sponsor_loading, error: sponsor_error } = useQuery(gql(listSponsors));
  if(sponsor_loading) {console.log("Sponsor List is loading")};  
  if(sponsor_error) {console.log("Sponsor List Load error: " + sponsor_error)};

  //---------------------------------------------------- 
  //      Child Stuff
  //----------------------------------------------------

  //---------------- List Children ----------------
  const { data: child_data, loading: child_loading, error: child_error, refetch: child_Refetch } = useQuery(gql(listChildren)); 
  if(child_loading) {console.log("Child List is loading")};  
  if(child_error) {console.log("Child List Load error: " + rbl_error)};
  if(child_data && !child_loading) {
    //console.log("We have child data, rebuilding childList", child_data.listChildren.items);
    child_data.listChildren.items.map((kid) => {
      
      let rblName = '';
      if(kid.RBL!==null) {
        rblName = kid.RBL.FirstName + " " + kid.RBL.LastName;
      };

      let sponsor = '';
      if(kid.Sponsor!==null) {
        sponsor = kid.Sponsor.FirstName + kid.Sponsor.LastName;
        if(kid.Sponsor.Phone.length > 0) {sponsor = sponsor + " " + kid.Sponsor.Phone};
      }
      
      kid.RBLName=rblName;
      kid.SponsorInfo=sponsor;

      childList.push(kid)
    });
  };
  
  const getChildLIst = () => {
    return child_data.listChildren.items;
  };

  //---------------- Add Child ----------------
  const [addChildMutation, {data: addData, loading: loadingAdd, error: errorAdd }] = useMutation(gql(createChild));
  if(loadingAdd) {console.log("Loading Add Child Mutation")};
  if(errorAdd) {console.log( "Create Child Mutation error: " + errorAdd)};

  //const handleAddChild = async (childData) => { 
  const handleAddChild = (childData) => {
    console.log("handleAddChild, about to call addChildMutation. ChildID: " + childData.ChildID);
    try{      
      //------> How to force a re-load of the childList?
      // refetchQueries: [{ query: gql(listChildren) }] does not work
      // refetchQueries: ["ListChildren"] does not work
      // awaitRefetchQueries does not work
      //const response = await addChildMutation({
        const response = addChildMutation({
        variables: { 
          input: { 
            Firstname: childData.Firstname, 
            ChildID: childData.ChildID, 
            Gender: childData.Gender, 
            Race: childData.Race, 
            Age: childData.Age, 
            Siblings: childData.Siblings, 
            ShirtSize: childData.ShirtSize, 
            PantSize: childData.PantSize, 
            ShoeSize: childData.ShoeSize, 
            Wishlist: childData.Wishlist, 
            Info: childData.Info,
            rblID: childData.rblID,
            sponsorID: childData.sponsorID,
          } 
        }, 
        //refetchQueries: [{ query: gql(listChildren) }],
        //awaitRefetchQueries: true,
      });
      //child_Refetch();      
      console.log("End of Add Child Mutation (after childList.refetch): child_data.listChildren.items has " + child_data.listChildren.items.length + " entries");
    }catch(error) {
      console.log("Add Child Mutation error ", error);
      return "Create New Child failed with error: " + error;
    };        
    return "";
  };

  //---------------- Update Child ----------------
  const [updateChildMutation, { loading: loadingUpdate, error: errorUpdate }] = useMutation(gql(updateChild));
  if(loadingUpdate) {
    console.log("Loading Update Child");
  };
  if(errorUpdate) {                
    console.log( "Update Child error: " + errorAdd);
  //   //How can I communicate this error to whatever component is using this?
  //   //"Update Child error: " + errorUpdate
  };
  const handleUpdateChild = async (childID, childData) => {
    try{
        const response = await updateChildMutation({
            variables:
                {  
                  input: { 
                    id: childID,
                    Firstname: childData.Firstname, 
                    ChildID: childData.ChildID, 
                    Gender: childData.Gender, 
                    Race: childData.Race, 
                    Age: childData.Age, 
                    Siblings: childData.Siblings, 
                    ShirtSize: childData.ShirtSize, 
                    PantSize: childData.PantSize, 
                    ShoeSize: childData.ShoeSize, 
                    Wishlist: childData.Wishlist, 
                    Info: childData.Info,
                  } 
                }, 
                refetchQueries: [{ query: gql(listChildren) }]
        });
    } catch(error) {
        console.log("Update Child error ", error);
        return "Update Child failed with error: " + error;
    };
    return "";
  };

  const handleNewChildOpen = () => {
    setNCOpen(true);
  }

  const handleNewChildClose = (event, reason) => {
    if (reason && reason === "backdropClick"){
        return;
    }
    setNCOpen(false);
  }
  
  const openCreateChild = () => {
    if (NCOpen) {
      return (
        <CreateChildForm 
          open={NCOpen} 
          handleClose={handleNewChildClose}
        />
      )
    }else{
      return (<></>);
    }
  }
  //---------------------------------------------------- 
  //      Child Side Drawer
  //----------------------------------------------------
  const drawerCallback = () => {
    if(customWidth === '100%'){
        return setCustomWidth('70%')
    } else {
        return setCustomWidth('100%')
    }
  }
  useEffect(() => {
      if(drawerOpen){
          drawerCallback()
      }
    }, [drawerOpen])
  
  const handleDrawerOpen = (data) => {
    setCurrentKid(data);
    setDrawerOpen(true);
  }
  // const handleDrawerClose = () => {
  //   setDrawerOpen(false);
  // };

  const handleSpecialDrawerClose = () => {
    setDrawerOpen(false);
    drawerCallback();
  }

  const openSideDrawer = () => {
    if (drawerOpen) {
      return (
        <ChildSideDrawer 
          child_id={currentKid.id} 
          open={drawerOpen} 
          handleClose={handleSpecialDrawerClose}
        />
      )
    }else{
      return (<></>);
    }
  }

  //---------------------------------------------------- 
  //       Import Child Spreadsheet
  //----------------------------------------------------
  const handleImportOpen = () => {
    //console.log("handleImportOpent");
    setImportOpen(true);
  }

  const handleImportClose = () => {
    //console.log("handleImportClose");
    setImportOpen(false);
    child_Refetch();
  }
  
  const openImport = () => {
    if (importOpen) {
      //console.log("openImport");
      return (
        <ChildImport 
          open={importOpen} 
          handleClose={handleImportClose}
          childList={child_data.listChildren.items}
          sponsorList={sponsor_data.listSponsors.items}
          rblList={rbl_data.listRBLS.items}
          AddChild={handleAddChild}
          UpdateChild={handleUpdateChild}
        />
      )
    }else{
      return (<></>);
    }
  }

  //---------------------------------------------------- 
  //       Component UI
  //----------------------------------------------------
  return (
    <React.Fragment>
     <Button 
        sx={{m:1, ml: 3}}
        onClick={handleNewChildOpen}
        variant="contained"
        >
        New Child
      </Button>
      <Button
        sx={{m: 1, mr: 3}}
        variant="text"
        onClick={handleImportOpen}
        >
        Import
      </Button>
    <Box 
        sx={{ 
            display: 'flex',
            width: customWidth
            }}
      />
      <Main sx={{width: customWidth }} open={drawerOpen}>
        <Paper elevation={1}>
            <DataGrid
                rows= {childList}
                columns={[
                    { field: 'RBLName', headerName: 'RBL', flex: .8},
                    { field: 'ChildID', headerName: 'ID', flex: .4 },
                    { field: 'Firstname', headerName: 'First Name', flex: .5 },
                    { field: 'Gender', headerName: 'Gender', flex: .2 },
                    { field: 'Age', headerName: 'Age', type: 'number', flex: .2},
                    { field: 'ShirtSize', headerName: 'Shirt Size', flex: .5 },
                    { field: 'PantSize', headerName: 'Pant Size', flex: .5 },
                    { field: 'ShoeSize', headerName: 'Shoe Size', flex: .5 },
                    { field: 'Siblings', headerName: 'Siblings', flex: .5 },
                    { field: 'SponsorInfo', headerName: 'Sponsor', flex: 1.3},
                    {field: 'actions',
                    headerName: "More Actions",
                    flex: .7,
                    renderCell: (params) => {
                        return (
                            <Button
                                onClick={(e) => handleDrawerOpen(params.row)}
                                variant="text"
                            >
                                <EditIcon />
                            </Button>
                            );
                            }
                    
                    }
                ]}
                // initialState={
                //   {pagination: 
                //     {paginationModel: { page: 0, pageSize: 10 },},
                //   }
                // }
                // pageSizeOptions={[12]}
                slots={{ toolbar: QuickSearchToolbar }}
            />
        </Paper>
      </Main>
      {openSideDrawer()}
      {openImport()}
      {openCreateChild()}
    </React.Fragment>
  )
}