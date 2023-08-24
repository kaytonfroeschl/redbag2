import React, { useState, useEffect } from 'react';
import { listChildren } from '../graphql/queries';
import { gql, useQuery } from '@apollo/client';
import { styled } from '@mui/material/styles';
import { Paper, Button, Box } from '@mui/material';
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import CreateChildForm from '../components/Child/CreateChildForm';
import ChildSideDrawer from '../components/Child/ChildSideDrawer';
import ChildImport from '../components/Child/ChildImport';

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
  const kidArr = array.map((kid) => {
    if(kid.Sponsor !== null){
      return {
        id: kid.id,
        rbl: "",
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
  console.log("ChildrenScreen")
  const [customWidth, setCustomWidth] = React.useState('100%');
  const rowArray = [];
  const [currentKid, setCurrentKid] = useState({});

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [NCOpen, setNCOpen] = React.useState(false);
  const [importOpen, setImportOpen] = useState(false);



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
  console.log("Row Array: ", rowArray)
  const renderedChildren = createRows(rowArray);
  console.log("Rendered Rows Array: ", renderedChildren);

/* ==============================================================================================
                                      Resize Drawer Callback
================================================================================================*/
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
    }, [drawerOpen])

/* ==============================================================================================
                                      Handle Functions
================================================================================================*/
  const handleDrawerOpen = (data) => {
    setCurrentKid(data);
    console.log("current kid: ", data)
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

  const handleImportOpen = () => {
    console.log("Child Import Button Clicked")
    setImportOpen(true);
  }

  const handleImportClose = () => {
    setImportOpen(false);
  }




  return (
    <React.Fragment>
     <Button 
        sx={{m:1, ml: 3}}
        onClick={handleNCOpen}
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
                rows= {renderedChildren}
                columns={[
                    { field: 'rbl', headerName: 'RBL Lady', flex: .8},
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
      <ChildImport open={importOpen} handleClose={handleImportClose} />
    </React.Fragment>
  )
}