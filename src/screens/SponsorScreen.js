import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { listSponsors } from '../graphql/queries';
import { createSponsor, deleteSponsor } from '../graphql/mutations';
import { styled } from '@mui/material/styles';
import { Paper, Button, Box } from '@mui/material';
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateSponsorForm from '../components/Sponsor/CreateSponsorForm';
import SponsorSideDrawer from '../components/Sponsor/SponsorSideDrawer';
import SponsorImport from '../components/Sponsor/SponsorImport';
import DeleteSponsor from '../components/Sponsor/DeleteSponsor';

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

export default function SponsorScreen () {
  const [NSOpen, setNSOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [currSponsor, setCurrSponsor] = useState({});
  const [customWidth, setCustomWidth] = React.useState('100%');



/* 
================================================================================================
                                      Sponsor List
================================================================================================*/
    const { data: sponsor_data, loading: sponsor_loading, error: sponsor_error } = useQuery(gql(listSponsors));
    // if(sponsor_loading) {console.log("Sponsor List is loading")};  
    // if(sponsor_error) {console.log("Sponsor List Load error: " + sponsor_error)};
    if(sponsor_data) {console.log("Sponsor List has been loaded: ", sponsor_data.listSponsors.items)};

    const uiListSponsors = () => {
      if(sponsor_loading) {return <div>Loading sponsors</div>}
      if(sponsor_loading) {return <div>Error Loading sponsors: {sponsor_error}</div>}
      
      if(sponsor_data.listSponsors.items.length === 0) {
        return(<div>No Sponosors</div>);
      }else{
        return (
          <DataGrid
            rows = {sponsor_data.listSponsors.items}
            columns={ [
              { field: 'FirstName',   headerName: 'Name', flex: 1},
              { field: 'LastName',    headerName: 'Last Name', flex: 1},
              { field: 'Institution', headerName: 'Institution Name', flex: 1},
              { field: 'Email',       headerName: 'Email Address', flex: 1},
              { field: 'Phone',       headerName: 'Phone Number', flex: 1},
              { field: 'actions',      headerName: "More Actions", flex: .8,
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
            slots={{ toolbar: QuickSearchToolbar }}
          />
        )
      }
    }

/* 
==============================================================================================
                                      Side Drawer (Sponsor Edit)
================================================================================================*/
  const handleEditOpen = (row) => {
    if (row===null) {
      setCurrSponsor(0);
    }else{
      setCurrSponsor(row);
      console.log("ROW:", row)
      setEditOpen(true);
      setCustomWidth('70%')
    }
  }

  const openSideDrawer = () => {
    if (editOpen) {
      return (
          <SponsorSideDrawer 
            sponsor={currSponsor}
            open={editOpen} 
            handleClose={handleEditClose}
          />        
      )
    }else{
      return (<></>);
    }
  }

  const handleEditClose = () => {
    setEditOpen(false);
    
    if(customWidth === '100%'){
      return setCustomWidth('70%');
    } else {
        return setCustomWidth('100%');
    };
  }

/* 
================================================================================================
                                      Sponsor Create
================================================================================================*/
  const openCreateSponsor = () => {    
    if(NSOpen) {
      console.log("About to open CreateSponsorForm");
      return <CreateSponsorForm open={NSOpen} handleClose={handleNSClose} />
    }else{
      return <></>
    }
  }

  const handleNSOpen = () => {
    setNSOpen(true);
  }

  const handleNSClose = (event, reason) => {
    if (reason && reason === "backdropClick"){
        return;
    }
    setNSOpen(false);
  }
  /* 
  ================================================================================================
                                        Sponsor Delete
  ================================================================================================*/
    const openDeleteSponsor = () => {
    if (deleteOpen) {
      return (
        <DeleteSponsor 
          open={deleteOpen}
          sponsor={currSponsor}
          deleteSponsor={sponsorDelete}
          handleClose={handleDeleteClose}
        />
      )
    }else{
      return (<></>);
    }
  }

  const handleDeleteOpen = (row) => {
    //console.log("handleDeleteOpen ", row);
    setCurrSponsor(row);
    setDeleteOpen(true);
  }

  const handleDeleteClose = (event, reason) => {
    if(reason && reason === 'backdropClick'){
        return;
    }
    console.log("handleDeleteClose (user cancel delete)")
    setDeleteOpen(false);
  }

  //---------------- Delete Sponsor ----------------
  const [deleteSponsorMutation, {
    data: sponsorDelData, 
    loading: sponsorDelLoading, 
    error: sponsorDelError
  }] = useMutation(gql(deleteSponsor));
  
  if(sponsorDelLoading) {console.log("Loading Delete Sponsor Mutation")};
  if(sponsorDelError) {console.log( "Delete Sponsor Mutation error: " + sponsorDelError)};

  const sponsorDelete = () => {
    try{
      const response = deleteSponsorMutation({
        variables: {input: {id: currSponsor.id}},
        refetchQueries: [{ query: gql(listSponsors) }],
      });
      setCurrSponsor(null);
      setDeleteOpen(false);
      //console.log("Delete Sponsor Mutation response: ", response);
      console.log("Delete Sponsor Mutation complete, num sponsors in sponsor list is: " + sponsor_data.listSponsors.items.length);
    }catch(error) {
      console.log("Delete Sponsor Mutation error ", error);
      return "Delete Sponsor failed with error: " + error;
    };
    return "";
  }
/* 
================================================================================================
                                      Import Sponsor Spreadsheet
================================================================================================*/
  const handleImportOpen = () => {
    //console.log("handleImportOpen");
    setImportOpen(true);
  };

  const handleImportClose = () => {
    //console.log("handleImportClose");
    setImportOpen(false);
  };
  
  const openImportDialog = () => {
    if (importOpen) {
      return (
        <SponsorImport 
          open={importOpen}
          handleClose={handleImportClose}
          AddSponsor={handleSponsorAdd}
        />
      )
    }else{
      return (<></>);
    }
  }

  //---------------- Add Sponsor ----------------
  const [addSponsorMutation, {
    data: sponsorAddData, 
    loading: sponsorAddLoading, 
    error: sponsorAddError,
  }] = useMutation(gql(createSponsor));

  if(sponsorAddLoading) {console.log("Loading Sponsor Add Mutation")};
  if(sponsorAddError) {console.log( "Create Sponsor Mutation error: " + sponsorAddError)};

  const handleSponsorAdd = (sponsorData) => {
    console.log("handleSponosorAdd, about to call addSponsorMutation.", sponsorData);
    try{
        const response = addSponsorMutation({
        variables: { 
          input: { 
            FirstName: sponsorData.FirstName,
            LastName: sponsorData.LastName,
            Phone: "",
            Email: "",
            Address: sponsorData.Address,
            YearsActive: sponsorData.YearsActive,
            Institution: sponsorData.Institution,
          } 
        }, 
      });
    }catch(error) {
      console.log("Add Sponsor Mutation error ", error);
      return "Create New Sponsor failed with error: " + error;
    };        
    return "";
  };

/* 
================================================================================================
                                      User Interface
================================================================================================*/
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
          <Box sx={{display:'flex', justifyContent:'space-between'}}>
            <Button sx={{m:1, ml:3}} variant="contained" onClick={handleNSOpen} >New Sponsor</Button>
            <Button sx={{M:1, mr:3}} variant="text" onClick={handleImportOpen}>Import</Button>
          </Box>

          {uiListSponsors()}

        </Paper>
      </Main>

      {openCreateSponsor()}
      {openSideDrawer()}
      {openDeleteSponsor()}
      {openImportDialog()}

    </React.Fragment>
  )
}