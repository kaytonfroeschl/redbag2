import React, { useState, useEffect } from 'react';
import { listChildren, listSponsors, listRBLS } from '../graphql/queries';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Paper, Button, Box } from '@mui/material';
import { darken, lighten, styled } from '@mui/material/styles';
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import CreateChildForm from '../components/Child/CreateChildForm';
import ChildSideDrawer from '../components/Child/ChildSideDrawer';


/* ==============================================================================================
                                        Drawer Styling 
================================================================================================*/
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

/* ==============================================================================================
                                        Search Bar 
================================================================================================*/
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

/* ==============================================================================================
                                        Putting Data in Readable format
================================================================================================*/

function createRows(array) {
  console.log("ARRAY: ", array)
  const kidArr = array.map((kid) => {
    if(kid.Sponsor !== null && kid.RBL !== null){
      //both filled
      return {
        id: kid.id,
        rbl: kid.RBL.FirstName + " " + kid.RBL.LastName,
        childid: kid.ChildID,
        age: kid.Age,
        name: kid.Firstname,
        gender: kid.Gender,
        race: kid.Race,
        shirtsize: kid.ShirtSize,
        pantsize: kid.PantSize,
        shoesize: kid.ShoeSize,
        siblings: kid.Siblings,
        wishlist: kid.Wishlist,
        addInfo: kid.Info,
        sponsorName: kid.Sponsor.FirstName + " " + kid.Sponsor.LastName,
        sponsorPhone: kid.Sponsor.Phone
      }
    } else if(kid.Sponsor !== null && kid.RBL === null){
      //sponsor not null rbl is null
      return {
        id: kid.id,
        rbl: '',
        childid: kid.ChildID,
        age: kid.Age,
        name: kid.Firstname,
        gender: kid.Gender,
        race: kid.Race,
        shirtsize: kid.ShirtSize,
        pantsize: kid.PantSize,
        shoesize: kid.ShoeSize,
        siblings: kid.Siblings,
        wishlist: kid.Wishlist,
        addInfo: kid.Info,
        sponsorName: kid.Sponsor.FirstName + " " + kid.Sponsor.LastName,
        sponsorPhone: kid.Sponsor.Phone
      }
    } else if(kid.Sponsor === null && kid.RBL !== null){
      //fill in RBL not sponsor
      return {
        id: kid.id,
        rbl: kid.RBL.FirstName + " " + kid.RBL.LastName,
        childid: kid.ChildID,
        age: kid.Age,
        name: kid.Firstname,
        gender: kid.Gender,
        race: kid.Race,
        shirtsize: kid.ShirtSize,
        pantsize: kid.PantSize,
        shoesize: kid.ShoeSize,
        siblings: kid.Siblings,
        wishlist: kid.Wishlist,
        addInfo: kid.Info,
        sponsorName: " ",
        sponsorPhone: " "
      }
    } else {
      return {
        id: kid.id,
        rbl: "",
        childid: kid.ChildID,
        age: kid.Age,
        name: kid.Firstname,
        gender: kid.Gender,
        race: kid.Race,
        shirtSize: kid.ShirtSize,
        pantSize: kid.PantSize,
        shoeSize: kid.ShoeSize,
        siblings: kid.Siblings,
        wishlist: kid.Wishlist,
        addInfo: kid.Info,
        sponsorName: '',
        sponsorPhone: ''
      }
    }
  })
  return kidArr;
}


export default function ChildrenScreen () {
  const [customWidth, setCustomWidth] = React.useState('100%');
  const rowArray = [];
  const [currentKid, setCurrentKid] = useState({});

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [NCOpen, setNCOpen] = React.useState(false);



/* ==============================================================================================
                                      Populating Grid Rows
================================================================================================*/
  //data.listChildren.items ==> an array of children 
  const { loading, error, data } = useQuery(gql(listChildren)); 
  if(data || !loading ) {
    const childList = data.listChildren.items.map((kid) => {
        return rowArray.push(kid)
    })
  }
  const renderedChildren = createRows(rowArray);

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
    if(customWidth == '100%'){
        return setCustomWidth('70%')
    } else {
        return setCustomWidth('100%')
    }
  }

  useEffect(() => {
      if(drawerOpen){
          drawerCallback()
      }
    }, [drawerOpen]);

/* ==============================================================================================
                                      Handle Functions
================================================================================================*/
  const handleDrawerOpen = (data) => {
    setCurrentKid(data);
    setDrawerOpen(true);
  }

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleSpecialDrawerClose = () => {
    setDrawerOpen(false);
    drawerCallback();
  }

  const handleNCOpen = () => {
    setNCOpen(true);
  }

  const handleNCClose = (event, reason) => {
    if (reason && reason == "backdropClick"){
        return;
    }
    setNCOpen(false);
  }




  return (
    <React.Fragment>
     <Button 
            sx={{
                m:1,
                ml: 3
            }}
            onClick={handleNCOpen}
            variant="contained">
            New Child
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
                sx={{
                  
                }}
                rows= {renderedChildren}
                columns={[
                    { field: 'rbl', headerName: 'RBL Lady', flex: .9},
                    { field: 'childid', headerName: 'ID', flex: .6 },
                    { field: 'name', headerName: 'Name', flex: .7 },
                    { field: 'gender', headerName: 'Gender', flex: .4 },
                    { field: 'age', headerName: 'Age', type: 'number', flex: .3},
                    { field: 'shirtSize', headerName: 'Shirt Size', flex: .5 },
                    { field: 'pantSize', headerName: 'Pant Size', flex: .5 },
                    { field: 'shoeSize', headerName: 'Shoe Size', flex: .5 },
                    { field: 'siblings', headerName: 'Siblings', flex: .5 },
                    { field: 'sponsorName', headerName: 'Sponsor', flex: .9},
                    { field: 'sponsorPhone', headerName: 'Sponsor Phone', flex: .9},
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
                initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                },
                }}
                pageSizeOptions={[12]}
                slots={{ toolbar: QuickSearchToolbar }}
            />
        </Paper>
      </Main>
      <CreateChildForm open={NCOpen} handleClose={handleNCClose} />
      <ChildSideDrawer child_id={currentKid.id} open={drawerOpen} handleClose={handleSpecialDrawerClose}  />

    </React.Fragment>
  )
}