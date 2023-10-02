import React, { useState, useEffect, Fragment } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { createChild } from '../../graphql/mutations';
import { listChildren, listSponsors, listRBLS } from '../../graphql/queries';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Box, 
    FormControl,
    TextField,
    Typography,
    Button,
    Divider, 
    MenuItem,
    Autocomplete,
    Alert,
    Paper
} from '@mui/material';
import Gender from '../Gender';
import Race from '../Race';

export function CreateChildForm ({ open, handleClose, childList, sponsorList, rblList }){
    
/* ==============================================================================================
                                        Set Variables
================================================================================================*/
    const [id, setID] = useState('');
    const [form_name, setFormName] = useState('');
    const [form_id, setFormID] = useState('');
    const [form_gender, setFormGender] = useState('');
    const [form_race, setFormRace] = useState('');
    const [form_age, setFormAge] = useState(0);
    const [form_siblings, setFormSiblings] = useState('');
    const [form_shirt, setFormShirt] = useState('');
    const [form_pant, setFormPant] = useState('');
    const [form_shoe, setFormShoe] = useState('');
    const [form_wishlist, setFormWishlist] = useState('');
    const [form_info, setFormInfo] = useState('');
    const [form_bike, setFormBike] = useState('N');
    const [rblID, setRBL_ID] = useState(null);
    const [sponsorID, setSponsor_ID] = useState(null);


    const [errorMessage, setErrorMessage] = useState('');

    const [nameError, setNameError] = useState('');
    const [childIDError, setChildIDError] = useState('');

    const [RBLOptions, setRBLOptions] = useState([]);
    const [RBLSelected, setRBLSelected] = useState('');

    const [sponsorOptions, setSponsorOptions] = useState([]);
    const [sponsorSelected, setSponsorSelected] = useState('');

    const [generalError, setGeneralError] = useState('');

    const sponsorArray = [];
    let RBLArray = [];
    let fieldError = false;
    const listItemNotSpecified = {id: "", label: "Not Specified"};

/* ==============================================================================================
                                        Handle Functions 
================================================================================================*/
    function handleFormName(event)      {setFormName(event.target.value)};
    function handleFormID(event)        {setFormID(event.target.value)};
    function handleFormGender(event)    {setFormGender(event.target.value)};
    function handleFormRace(event)      {setFormRace(event.target.value)};
    function handleFormAge(event)       {setFormAge(event.target.value)};
    function handleFormSiblings(event)  {setFormSiblings(event.target.value)};
    function handleFormShirt(event)     {setFormShirt(event.target.value)};
    function handleFormPant(event)      {setFormPant(event.target.value)};
    function handleFormShoe(event)      {setFormShoe(event.target.value)};
    function handleFormWishlist(event)  {setFormWishlist(event.target.value)};
    function handleFormInfo(event)      {setFormInfo(event.target.value)};
    function handleFormBike(event)      {setFormBike(event.target.value)};

    function resetValues() {
        setID('');
        setFormName('');
        setFormID('');
        setFormGender('');
        setFormRace('');
        setFormAge(0);
        setFormSiblings('');
        setFormShirt('');
        setFormPant('');
        setFormShoe('');
        setFormWishlist('');
        setFormInfo('');
        setFormBike('');
        setRBL_ID(null);
        setSponsor_ID(null);
        setRBLSelected(listItemNotSpecified);
        setSponsorSelected(listItemNotSpecified);
    }

    function handleSpecialClose() {
        resetValues();
        handleClose();
    }

    const childIDIsUnique = (childID) => {
        const searchID = childID.toUpperCase();
        console.log("child id unique " + searchID);
        const found = childList.filter(child => child.ChildID.toUpperCase() === searchID);
        return (found.length===0);
    };

    //-------------------------------- Sponsor Stuff --------------------------------
    useEffect(() => {
        let options = sponsorList.map((sponsor) => {
            let sponsorOption = 
                {
                id: sponsor.id,
                label: getSponsorInfo(sponsor)
                };
            
            return sponsorOption;
        });
        options.push(listItemNotSpecified);
        setSponsorOptions(options);
        setSponsorSelected(listItemNotSpecified);
    },
    []);
  
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

      //-------------------------------- RBL Stuff --------------------------------
      useEffect(() => {
          let options = rblList.map((rbl) => {
              let rblOption = 
                  {
                  id: rbl.id,
                  label: rbl.FirstName + " " + rbl.LastName
                  };
              
              return rblOption;
          });
          options.push(listItemNotSpecified);
          setRBLOptions(options);
          setRBLSelected(listItemNotSpecified);
      },
      []);

/* ==============================================================================================
                                        Apollo Call to Add New Child
================================================================================================*/
    const [addChildMutation, { data, loading, error }] = useMutation(gql(createChild));
    if(loading) {
        return <div>Loading...</div>
    }
    
    async function handleCreate(e) {
        e.preventDefault();

        fieldError = false;

        //validation: must have a Firstname and ChildID
        if (form_name.length > 0) {
            setNameError("");
        }else{
            setNameError("You must specify a child's first name");
            fieldError = true;
            setGeneralError("Please correct field errors");
        };
        if (form_id.length > 0) {
            setChildIDError("");
            if (childIDIsUnique(form_id)===false) {
                setChildIDError("A Child with that ChildID already exists");
                fieldError = true;
                setGeneralError("Please correct field errors");
            }
        }else{
            setChildIDError("A ChildID may not be empty");
            fieldError = true;
            setGeneralError("Please correct field errors");
        };

        if (fieldError) return;

        try {
            const response = await addChildMutation({
                variables: {
                    input: {
                        Firstname: form_name,
                        ChildID: form_id.toUpperCase(),
                        Gender: form_gender,
                        Race: form_race,
                        Age: form_age,
                        Siblings: form_siblings,
                        ShirtSize: form_shirt,
                        PantSize: form_pant,
                        ShoeSize: form_shoe,
                        Wishlist: form_wishlist,
                        Info: form_info,
                        Bike: form_bike,
                        rblID: rblID,
                        sponsorID: sponsorID
                    }},
                refetchQueries: [{ query: gql(listChildren) }], // Refetch the query to update the list
            });
            console.log("Mutation response: ", response);
            handleSpecialClose();
        } catch (error) {
            console.error("Mutation error: ", error);
        }
    }

    const showErrorNotification = () => {
        let result = <></>;
        if (generalError) {
            result = <Alert severity="error">{generalError}</Alert>
        };
        return result;
    }

    return(
        <React.Fragment>
            <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create New Child</DialogTitle>
            {errorMessage && (
                <Paper elevation='1'><Alert severity='error'> {errorMessage} </Alert></Paper>
            )}
                <DialogContent>
                    {showErrorNotification()}
                    <Box
                        width={500}
                    >
                    <FormControl
                        required={true}
                        variant="outlined"
                        fullWidth
                    > 
                    {/*===================== RBL Assigned  =========================================*/}
                    <Typography
                        style={{
                            fontWeight: 500
                        }}
                        sx={{
                            mt: 2
                        }}>Red Bag Lady</Typography>
                    <Divider
                        sx={{borderBottomWidth: 1.5}}
                        style={{background: 'black'}}
                    />

                    <Autocomplete
                        options={RBLOptions}
                        value={RBLSelected}
                        onChange={(e, newValue) => { 
                            if (newValue === null){
                                setRBLSelected(listItemNotSpecified);
                            } else {
                                setRBLSelected(newValue);
                                setRBL_ID(newValue.id);
                            };
                        }}
                        renderInput={(params) => (<TextField {...params} label="" variant="standard" />)}
                        sx={{ mb: 2, mt: 2}}
                    />
                    
                    <Typography
                        style={{
                            fontWeight: 500
                        }}
                        sx={{
                            mt: 2
                        }}>Basic Information</Typography>
                    <Divider
                        sx={{borderBottomWidth: 1.5}}
                        style={{background: 'black'}}
                    />
                    {/*================== First, ID =========================================*/}
                    <Box
                    sx={{
                        display:'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}> 
                    <TextField
                        margin="normal"
                        id="outlined-basic"
                        label="First Name"
                        style = {{width: 235}}
                        value={form_name}
                        onChange={handleFormName}
                        error={nameError > ''}
                        helperText={nameError}
                    />
                    <TextField
                        margin="normal"
                        id="outlined-basic"
                        label="Child ID"
                        style = {{width: 235}}
                        value={form_id}
                        onChange={handleFormID}
                        error={childIDError > ''}
                        helperText={childIDError}
                    />
                    </Box>
                    {/*================== Age, Gender & Race =========================================*/}
                    <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        mt: 2
                    }}>
                        <TextField
                            id="outlined-basic"
                            label="Age"
                            variant="outlined"
                            type="number"
                            value={form_age}
                            onChange={handleFormAge}
                            style = {{width: 150}}
                        />

                        <Gender value={form_gender} handleOnChange={handleFormGender} />
                        <Race value={form_race} handleOnChange={handleFormRace} />
                    </Box>
                   
                    {/*================== Shirt, Pant & Shoe Size =========================================*/}
                    <Typography
                        style={{
                            fontWeight: 500
                        }}
                        sx={{
                            mt: 2
                        }}>Sizing Information</Typography>
                    <Divider
                        sx={{borderBottomWidth: 1.5}}
                        style={{background: 'black'}}
                    />
                    <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <TextField
                            margin="normal"
                            id="outlined-basic"
                            label="Shirt Size"
                            style = {{width: 150}}
                            value={form_shirt}
                            onChange={handleFormShirt}
                        />
                        <TextField
                            margin="normal"
                            id="outlined-basic"
                            label="Pant Size"
                            style = {{width: 150}}
                            value={form_pant}
                            onChange={handleFormPant}
                        />
                        <TextField
                                margin="normal"
                                id="outlined-basic"
                                label="Shoe Size"
                                style = {{width: 150}}
                                value={form_shoe}
                                onChange={handleFormShoe}
                         />
                        
                    </Box>

                    {/*===================== WishList =========================================*/}
                    <Typography
                        style={{
                            fontWeight: 500
                        }}
                        sx={{
                            mt: 2
                        }}>Wish List</Typography>
                    <Divider
                        sx={{mb: 2, borderBottomWidth: 1.5}}
                        style={{background: 'black'}}
                    />
                    <Box>
                    <TextField
                        id="outlined-multiline-static"
                        label="Wish List"
                        multiline
                        fullWidth
                        rows={4}
                        value={form_wishlist}
                        onChange={handleFormWishlist}
                        />
                    </Box>

                    {/*===================== Other Information  =========================================*/}
                    <Typography
                        style={{
                            fontWeight: 500
                        }}
                        sx={{
                            mt: 2
                        }}>Other Information</Typography>
                    <Divider
                        sx={{mb:2, borderBottomWidth: 1.5}}
                        style={{background: 'black'}}
                    />
                    <Box
                        sx={{
                            mb: 2
                        }}>
                        <TextField
                            id="outlined-multiline-static"
                            label="Additional Information"
                            multiline
                            fullWidth
                            rows={4}
                            value={form_info}
                            onChange={handleFormInfo}
                            />
                    </Box>
                    <Box>
                        <TextField
                            value={form_bike}
                            onChange={handleFormBike}
                            select // tell TextField to render select
                            label="Are they receiving a bike?"
                            fullWidth
                        >
                            <MenuItem value={'Y'}>Yes</MenuItem>
                            <MenuItem value={'N'}>No</MenuItem>
                         </TextField>
                    </Box>
                    <Box
                        sx={{
                            mt: 2
                        }}>
                        <TextField
                            id="outlined-multiline-static"
                            label="Siblings ID"
                            multiline
                            fullWidth
                            rows={2}
                            value={form_siblings}
                            onChange={handleFormSiblings}
                            />
                    </Box>
                    {/*===================== Sponsor Assigned  =========================================*/}
                    <Typography
                        style={{
                            fontWeight: 500
                        }}
                        sx={{
                            mt: 2
                        }}>Assign a Sponsor</Typography>
                    <Divider
                        sx={{mb:2, borderBottomWidth: 1.5}}
                        style={{background: 'black'}}
                    />

                    <Autocomplete
                        options={sponsorOptions}
                        value={sponsorSelected}
                        onChange={(e, newValue) => {
                            console.log("Sponsor selected value ", newValue); 
                            if (newValue === null){
                                console.log("newValue is null ", listItemNotSpecified);
                                setSponsorSelected(listItemNotSpecified);
                            } else {
                                setSponsorSelected(newValue);
                                setSponsor_ID(newValue.id);
                            };
                        }}
                        renderInput={(params) => (<TextField {...params} label="" variant="standard" />)}
                        sx={{ mb: 2, mt: 2}}
                    />
                    </FormControl>
                    </Box>
                    {showErrorNotification()}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSpecialClose}>Cancel</Button>
                    <Button onClick={handleCreate}>Create</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
};

export default CreateChildForm;