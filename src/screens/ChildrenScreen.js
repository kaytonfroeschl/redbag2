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

export default function ChildrenScreen () {
  const [customWidth, setCustomWidth] = React.useState('100%');
  const [currentKid, setCurrentKid] = useState({});

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [NCOpen, setNCOpen] = React.useState(false);

/* ==============================================================================================
                                      Children List
================================================================================================*/
  const { data: child_data, loading: child_loading, error: child_error } = useQuery(gql(listChildren));
  if(child_data) {console.log("Children List has been loaded: ", child_data.listChildren.items)};

  const uiListChildren = () => {
    if (child_loading) {return <div>Loading Children</div>}
    if (child_loading) {return <div>Error Loading Children: {child_error}</div>}

    if (child_data.listChildren.items.length === 0) {
      return(<div>No Children</div>);
    } else{
      return (
        <DataGrid
          sx={{
            
          }}
          rows= {child_data.listChildren.items}
          columns={[
              { field: 'RBL.FirstName', headerName: 'RBL Lady', flex: .9},
              { field: 'ChildID', headerName: 'ID', flex: .6 },
              { field: 'Firstname', headerName: 'Name', flex: .7 },
              { field: 'Gender', headerName: 'Gender', flex: .4 },
              { field: 'Age', headerName: 'Age', type: 'number', flex: .3},
              { field: 'ShirtSize', headerName: 'Shirt Size', flex: .5 },
              { field: 'PantSize', headerName: 'Pant Size', flex: .5 },
              { field: 'ShoeSize', headerName: 'Shoe Size', flex: .5 },
              { field: 'Siblings', headerName: 'Siblings', flex: .5 },
              { field: 'Sponsor.FirstName', headerName: 'Sponsor', flex: .9},
              { field: 'Sponsor.Phone', headerName: 'Sponsor Phone', flex: .9},
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
      )
    }
  }

/* ==============================================================================================
                                      New Child Dialog
================================================================================================*/

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
/* ==============================================================================================
                                      Child Side Drawer
================================================================================================*/

  const openSideDrawer = () => {
    if(drawerOpen) {
      return (
        <ChildSideDrawer
          child = {currentKid}
          open = {drawerOpen}
          handleClose = {handleSpecialDrawerClose}
        />
      )
    }
  }

  const drawerCallback = () => {
    if(customWidth == '100%'){
        return setCustomWidth('70%')
    } else {
        return setCustomWidth('100%')
    }
  }


/* ==============================================================================================
                                      Handle Functions
================================================================================================*/
  const handleDrawerOpen = (data) => {
    setCurrentKid(data);
    setDrawerOpen(true);
    setCustomWidth('70%');
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
            {uiListChildren()}
        </Paper>
      </Main>

      {openSideDrawer()}
      {openCreateChild()}

    </React.Fragment>
  )
}