import React, { useState} from 'react';
import { listChildren, listSponsors, listRBLS } from '../graphql/queries';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Paper, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import CreateChildForm from '../components/Child/CreateChildForm';
import ChildSideDrawer from '../components/Child/ChildSideDrawer';
import ChildImport from '../components/Child/ChildImport';
import ChildExport from '../components/Child/ChildExport';
import { createChild } from '../graphql/mutations';


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
================================================================================================
                Component Starts Here
================================================================================================*/
export default function ChildrenScreen () {
  const [customWidth, setCustomWidth] = React.useState('100%');
  const [currentKid, setCurrentKid] = useState({});
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [NCOpen, setNCOpen] = React.useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);

  //---------------------------------------------------- 
  //      RBL Stuff
  //----------------------------------------------------
  const { data: rbl_data, loading: rbl_loading, error: rbl_error } = useQuery(gql(listRBLS));
  if(rbl_loading) {console.log("RBL List is loading")};  
  if(rbl_error) {console.log("RBL List Load error: " + rbl_error)};

  //---------------------------------------------------- 
  //      Sponsor Stuff
  //----------------------------------------------------
  const { 
    data: sponsor_data, 
    loading: sponsor_loading, 
    error: sponsor_error 
  } = useQuery(gql(listSponsors), {variables: {limit: 2000 }});

  if(sponsor_loading) {console.log("Sponsor List is loading")};  
  if(sponsor_error) {console.log("Sponsor List Load error: " + sponsor_error)};

  //---------------------------------------------------- 
  //      Child Stuff
  //----------------------------------------------------

  //---------------- List Children ----------------
  const { 
    data: child_data, 
    loading: child_loading, 
    error: child_error, 
    refetch: child_Refetch 
  } = useQuery(gql(listChildren), {variables: {limit: 3000 }}); 
  
  const showChildList = () => {
    if(child_loading) {return <div>Child List is loading</div>};  
    if(child_error) {return <div>Child List Load error: " + {rbl_error}</div>};    
    if(child_data.listChildren.items.length===0) {return <div>There are no children to list</div>};
    //console.log("Children ", child_data.listChildren.items);
    return (
      <DataGrid
        initialState={{pagination: {paginationModel: {page:0, pageSize:10}}}}
      
        pageSizeOptions={[10, 20, 30]}

        slots={{ toolbar: QuickSearchToolbar }}

        rows= {child_data.listChildren.items}

        columns={[
          { field: 'RBL',         headerName: 'RBL', flex: .8,
            valueGetter: (params) => {
              if(params.row.RBL) {return(params.row.RBL.LastName);}
              return "";           
            }
          },
          { field: 'ChildID',     headerName: 'ID', flex: .4 },
          { field: 'Firstname',   headerName: 'First Name', flex: .5 },
          { field: 'Gender',      headerName: 'Gender', flex: .2 },
          { field: 'Age',         headerName: 'Age', type: 'number', flex: .2},
          { field: 'ShirtSize',   headerName: 'Shirt Size', flex: .5 },
          { field: 'PantSize',    headerName: 'Pant Size', flex: .5 },
          { field: 'ShoeSize',    headerName: 'Shoe Size', flex: .5 },
          { field: 'Siblings',    headerName: 'Siblings', flex: .5 },
          { field: 'Sponsor', headerName: 'Sponsor', flex: 1.3,
            valueGetter: (params) => {
              if(params.row.Sponsor) {
                return(
                  params.row.Sponsor.FirstName + " " + params.row.Sponsor.LastName + " " + params.row.Sponsor.Institution
                );
              }
              return "";
            }
          },
          { field: 'actions',     headerName: "More Actions", flex: .7,
              renderCell: (params) => {
                return (
                  <Button onClick={(e) => handleDrawerOpen(params.row)} variant="text">
                    <EditIcon />
                  </Button>)}
          }
        ]}
      />
    )
  }
  
  //---------------- Create New Child ----------------
  //<CreateChildForm open={NCOpen} handleClose={handleNCClose} />
  const handleNewChildOpen = () => {
    setNCOpen(true);
  }
  const handleNewChildClose = (event, reason) => {
    if (reason && reason === "backdropClick"){
        return;
    }
    setNCOpen(false);
    child_Refetch();
  };
  
  const openCreateChild = () => {
    if (NCOpen) {
      if (sponsor_loading || child_loading) {
        return(<div>Sorry, Sponsors or Children are still loading</div>);
      }else{        
        return (
          <CreateChildForm 
            open={NCOpen} 
            handleClose={handleNewChildClose}
            childList={child_data.listChildren.items}
            sponsorList={sponsor_data.listSponsors.items}
            rblList={rbl_data.listRBLS.items}
          />
        );
      }
    }else{
      return (<></>);
    }
  }

  //---------------- Edit Child (aka SideDrawer) ----------------

  const openSideDrawer = () => {
    if (drawerOpen) {
      return (
        <ChildSideDrawer 
          child={currentKid} 
          open={drawerOpen} 
          handleClose={handleDrawerClose}
          sponsorList={sponsor_data.listSponsors.items}
          rblList={rbl_data.listRBLS.items}
        />
      )
    }else{
      return (<></>);
    }
  }

  const handleDrawerOpen = (data) => {
    setCurrentKid(data);
    setDrawerOpen(true);
    setCustomWidth('70%');
  }

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    drawerCallback();
    child_Refetch();
  };

  const drawerCallback = () => {
    if(customWidth === '100%'){
        return setCustomWidth('70%')
    } else {
        return setCustomWidth('100%')
    }
  }
  
  /*useEffect(() => {
      if(drawerOpen){
          drawerCallback()
      }
    }, [drawerOpen])*/

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
        />
      )
    }else{
      return (<></>);
    }
  }

  //---------------- Add Imported Child ----------------

  const [addChildMutation, {loading: loadingAdd, error: errorAdd }] = useMutation(gql(createChild));
  if(loadingAdd) {console.log("Loading Add Child Mutation")};
  if(errorAdd) {console.log( "Create Child Mutation error: " + errorAdd)};

  //const handleAddChild = async (childData) => { 
  const handleAddChild = async (childImportData) => {
    console.log("handleAddChild, about to call addChildMutation. ChildID: " + childImportData.ChildID);
    try{
        await addChildMutation({
        variables: { 
          input: { 
            Firstname: childImportData.Firstname, 
            ChildID: childImportData.ChildID, 
            Gender: childImportData.Gender, 
            Race: childImportData.Race, 
            Age: childImportData.Age, 
            Siblings: childImportData.Siblings, 
            ShirtSize: childImportData.ShirtSize, 
            PantSize: childImportData.PantSize, 
            ShoeSize: childImportData.ShoeSize, 
            Wishlist: childImportData.Wishlist, 
            Info: childImportData.Info,
            rblID: childImportData.rblID,
            sponsorID: childImportData.sponsorID,
          } 
        },
      });
      console.log("End of Add Child Mutation (after childList.refetch): child_data.listChildren.items has " + child_data.listChildren.items.length + " entries");
    }catch(error) {
      console.log("Add Child Mutation error ", error);
      return "Create New Child failed with error: " + error;
    };        
    return "";
  };

  //---------------------------------------------------- 
  //       Export Child Spreadsheet
  //----------------------------------------------------
  const handleExportOpen = () => {
    setExportOpen(true);
  }

  const handleExportClose = () => {
    setExportOpen(false);
  }

  const FormatChildrenListForExport = () => {
    return (
      child_data.listChildren.items.map((child) => {
        return (
          {
            "Child ID": child.ChildID,
            "First Name": child.Firstname,
            Gender: child.Gender,
            Race: child.Race,
            Age: child.Age,
            Siblings: child.Siblings,
            Bike: child.Bike,
            "Pant Size": child.PantSize,
            "Shirt Size": child.ShirtSize,
            "Shoe Size": child.ShoeSize,
            "Wish List": child.Wishlist,
            Information: child.Info,
            RBL: getRBLInfo(child.RBL),
            Sponsor: getSponsorInfo(child.Sponsor),
            "DB Identifier": child.id
          }
        )
      })
    )
  }

  const getRBLInfo = (rbl) => {
    if(rbl) {
      return (
        rbl.FirstName + " " +
        rbl.LastName
      );
    }
    return '';
  }

  const getSponsorInfo = (sponsor) => {
    let Name = "";

    if ( ! sponsor) { return ""};

    console.log(sponsor);
    
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
  
  const openExport = () => {
    if (exportOpen) {
      return (
        <ChildExport 
          open={exportOpen} 
          handleClose={handleExportClose}
          childList={FormatChildrenListForExport()}
        />
      )
    }else{
      return (<></>);
    }
  }
/* 
================================================================================================
                User Interface starts here
================================================================================================*/
  return (
    <React.Fragment>
      <Box sx={{display: 'flex',width: customWidth}}/>
      
      <Main sx={{width: customWidth }} open={drawerOpen}>
        <Paper elevation={1}>
        <Button sx={{m:1,ml:3}} onClick={handleNewChildOpen} variant="contained">New Child</Button>
        <Button sx={{m:1,mr:3}} onClick={handleImportOpen}   variant="text">Import</Button>
        <Button sx={{m:1,mr:3}} onClick={handleExportOpen}   variant="text">Export</Button>
          {showChildList()}
        </Paper>
      </Main>
        
      {openSideDrawer()}
      {openImport()}
      {openExport()}
      {openCreateChild()}
  </React.Fragment>
  )
}