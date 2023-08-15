import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { listSponsors } from '../graphql/queries';
import { styled } from '@mui/material/styles';
import { Paper, Button, Box } from '@mui/material';
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateSponsorForm from '../components/Sponsor/CreateSponsorForm';

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

function createRows(array) {
  console.log("in create rows: ", array)
  const sponArr = array.map((sponsor) => {
    return {
      id: sponsor.id,
      name: sponsor.FirstName + " " + sponsor.LastName,
      companyName: sponsor.Institution,
      email: sponsor.Email,
      phone: sponsor.Phone
    }
  })
  return sponArr;
}

export default function SponsorScreen () {
  const [NSOpen, setNSOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const sponsorArray = [];

  const [customWidth, setCustomWidth] = React.useState('100%');

/* ==============================================================================================
                                      Populating Grid Rows
================================================================================================*/
    
    const { loading, error, data } = useQuery(gql(listSponsors)); 
    if(data || !loading ) {
      const sponsorList = data.listSponsors.items.map((sponsor) => {
          return sponsorArray.push(sponsor)
      })
    }
    console.log("Sponsor Array: ", sponsorArray)
    const renderedSponsors = createRows(sponsorArray);
    console.log("Rendered Rows Array: ", renderedSponsors);

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
      if(editOpen){
          drawerCallback()
      }
    }, [editOpen])


/* ==============================================================================================
                                      Handle Functions
================================================================================================*/
  const handleNSOpen = () => {
    setNSOpen(true);
  }

  const handleNSClose = (event, reason) => {
    if (reason && reason == "backdropClick"){
        return;
    }
    setNSOpen(false);
  }

  const handleEditOpen = (row) => {
    setEditOpen(true);
    //setCurrentSponsor(row);
    //console.log("currentSponsor: ", currentSponsor)
  }

  const handleEditClose = () => {
    setEditOpen(false);
  } 

  const handleDeleteOpen = (row) => {
    //setCurrentSponsor(row);
    setDeleteOpen(true);
  }

  const handleDeleteClose = (event, reason) => {
    if(reason && reason == 'backdropClick'){
        return;
    }
    setDeleteOpen(false);
  }


  return (
    <React.Fragment>
      
     
    <Box 
        sx={{ 
            display: 'flex',
            width: customWidth
            }}
      />
      <Main sx={{width: customWidth }} open={editOpen}>
        <Paper elevation={1}>
          <Box
            sx={{
              display:'flex',
              justifyContent:'space-between'
            }}
            >
            <Button 
              sx={{
                  m:1,
                  ml: 3
              }}
              onClick={handleNSOpen}
              variant="contained">
              New Sponsor
            </Button>
            <Button
              sx={{
                m: 1,
                mr: 3
              }}
              variant="text"
              //onclick={}
            >
              Import
            </Button>
          </Box>
            <DataGrid
                rows = {renderedSponsors}
                columns={ [
                  { field: 'name', headerName: 'Name', flex: 1},
                  { field: 'companyName', headerName: 'Institution Name', flex: 1},
                  { field: 'email', headerName: 'Email', flex: 1},
                  { field: 'phone', headerName: 'Phone Number', flex: 1},
                  {field: 'actions',
                  headerName: "More Actions",
                  flex: .8,
                  renderCell: (params) => {
                      return (
                          <React.Fragment>
                              <Button
                              onClick={(e) => handleEditOpen(params.row)}
                              variant="text"
                              >
                                  <EditIcon />
                              </Button>
              
                              <Button
                              onClick={(e) => handleDeleteOpen(params.row)}
                              variant="text"
                              >
                                  <DeleteIcon />
                              </Button>
              
                          </React.Fragment>
              
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
      <CreateSponsorForm open={NSOpen} handleClose={handleNSClose} />

    </React.Fragment>
  )
}