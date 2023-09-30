import React, { useState, useEffect } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { updateChild } from '../../graphql/mutations';
import { listChildren, listRBLS } from '../../graphql/queries';
import Dialog from '@mui/material/Dialog';
import { DialogActions, DialogContent, DialogTitle, Alert } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';
import Gender from '../Gender';
import Race from '../Race';


/* 
================================================================================================
                                        Component Starts Here
================================================================================================*/
export function EditChildForm ({ open, handleClose, child, sponsorList, rblList }){
    console.log("EditChildForm. Begin.");

    const [form_id, setFormID] = useState(child.id);
    const [form_name, setFormName] = useState(child.Firstname);
    const [form_childid, setFormChildID] = useState(child.ChildID);
    const [form_gender, setFormGender] = useState(child.Gender);
    const [form_race, setFormRace] = useState(child.Race);
    const [form_age, setFormAge] = useState(child.Age);
    const [form_siblings, setFormSiblings] = useState(child.Siblings);
    const [form_shirt, setFormShirt] = useState(child.ShirtSize);
    const [form_pant, setFormPant] = useState(child.PantSize);
    const [form_shoe, setFormShoe] = useState(child.ShoeSize);
    const [form_wishlist, setFormWishlist] = useState(child.Wishlist);
    const [form_info, setFormInfo] = useState(child.Info);
    const [form_bike, setFormBike] = useState(child.Bike);
    const [rblID, setRBL_ID] = useState(null);
    const [sponsorID, setSponsor_ID] = useState(null);

    const [nameError, setNameError] = useState('');

    const [RBLOptions, setRBLOptions] = useState([]);
    const [RBLSelected, setRBLSelected] = useState('');

    const [sponsorOptions, setSponsorOptions] = useState([]);
    const [sponsorSelected, setSponsorSelected] = useState('');

    const [generalError, setGeneralError] = useState('');
    
    // let sponsorArray = [];
    let RBLArray = [];
    const listItemNotSpecified = {id: "", label: "Not Specified"};

    //OnChange Handle Functions
    function handleFormName(event)      {setFormName(whatIfNull(event.target.value,""))};
    function handleFormChildID(event)   {setFormChildID(whatIfNull(event.target.value,""))};
    function handleFormGender(event)    {setFormGender(whatIfNull(event.target.value,""))};
    function handleFormRace(event)      {setFormRace(whatIfNull(event.target.value,"Other"))};
    function handleFormAge(event)       {setFormAge(whatIfNull(event.target.value, 0))};
    function handleFormSiblings(event)  {setFormSiblings(whatIfNull(event.target.value, ""))};
    function handleFormShirt(event)     {setFormShirt(whatIfNull(event.target.value, ""))};
    function handleFormPant(event)      {setFormPant(whatIfNull(event.target.value,""))};
    function handleFormShoe(event)      {setFormShoe(whatIfNull(event.target.value,""))};
    function handleFormWishlist(event)  {setFormWishlist(whatIfNull(event.target.value, ""))};
    function handleFormInfo(event)      {setFormInfo(whatIfNull(event.target.value,""))};
    function handleFormBike(event)      {setFormBike(whatIfNull(event.target.value, false))};

    function handleSpecialEdit(e) {handleEdit(e)};

    const whatIfNull = (text, value) => {
        return (text === null ? value : text);
    }

    //-------------------------------- Sponsor Stuff --------------------------------
    useEffect(() => {        
        setSponsorSelected(listItemNotSpecified);
        let options = sponsorList.map((sponsor) => {
            let sponsorOption = 
                {
                id: sponsor.id,
                label: getSponsorInfo(sponsor)
                };
            
            if (child.Sponsor) {
                if (sponsor.id === child.Sponsor.id) {
                    setSponsorSelected(sponsorOption);
                    setSponsor_ID(sponsor.id);
                };
            };
            
            return sponsorOption;
        });
        
        options.push(listItemNotSpecified);
        setSponsorOptions(options);
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
        setRBLSelected(listItemNotSpecified);
        let options = rblList.map((rbl) => {
            let rblOption = 
                {
                id: rbl.id,
                label: rbl.FirstName + " " + rbl.LastName
                };
            
            if (child.RBL) {
                if (rbl.id === child.RBL.id) {
                    console.log("EditChildForm.  RBL Assigned. RBL Option Selected is: " + rblOption.id + " " + rblOption.label);
                    setRBLSelected(rblOption);
                    setRBL_ID(rbl.id);
                };
            };
            
            return rblOption;
        });

        options.push(listItemNotSpecified);
        setRBLOptions(options);
      },
      []);

      console.log("EditChildForm.  RBL Selected: " + RBLSelected.id + " " + RBLSelected.label);
/* 
================================================================================================
                                        Apollo Call to Update a Child
================================================================================================*/
    let input;
    const [editChildMutation] = useMutation(gql(updateChild));
    // const { loading, error, data } = useQuery((gql(listChildren)));
    // if(loading) {
    //     return <div>Loading...</div>
    // }

    async function handleEdit(e) {
        e.preventDefault();

        let error = false;

        //validation: must have a Firstname and ChildID
        if (form_name.length > 0) {
            setNameError("");
        }else{
            setNameError("You must specify a child's first name");
            error = true;
            setGeneralError("Please correct field errors");
        };
        

        if (error) {return};

        let childUpdates = {            
            id: form_id,
            Firstname: form_name,
            ChildID: form_childid,
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
            sponsorID: sponsorID,
        };

        try {
            const response = await editChildMutation({variables: {input: childUpdates}});
            handleClose();
        } catch (error) {
            setGeneralError("Failed to update child: " + error);
            console.error("Mutation error.  Child update object: ", childUpdates);
        }
    };

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
                <DialogTitle>Edit Child</DialogTitle>
                <DialogContent>
                    {showErrorNotification()}
                    <Box width={500}>
                        <FormControl
                            required={true}
                            variant="outlined"
                            fullWidth
                        >

                            <h2>Red Bag Lady</h2>

                            <Autocomplete
                                options={RBLOptions}
                                value={RBLSelected}
                                onChange={(e, newValue) => { 
                                    if (newValue === null){
                                        setRBLSelected(listItemNotSpecified);
                                        setRBL_ID(null);
                                    } else {
                                        setRBLSelected(newValue);
                                        setRBL_ID(newValue.id);
                                    };
                                }}
                                renderInput={(params) => (<TextField {...params} label="" variant="standard" />)}
                                sx={{ mb: 2, mt: 2}}
                            />

                            <h2>Required Information</h2>
                    
                            <Box sx={{display:'flex', flexDirection: 'row', justifyContent: 'space-between'}}> 
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
                                    disabled
                                    margin="normal"
                                    id="outlined-basic"
                                    label="Child ID"
                                    style = {{width: 235}}
                                    value={form_childid}
                                    onChange={handleFormChildID}
                                />
                            </Box>
                    
                            <Box 
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    mt: 2
                                }}
                            >
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
                    
                            <h2>Sizing Information</h2>
                            
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between'
                                }}
                            >
                            
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

                            <h2>Wish List</h2>
                    
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

                            <h2>Other Information</h2>
                            <Box sx={{mb: 2}}>
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
                    
                            <Box sx={{mt: 2}}>
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

                            <h2>Sponsor</h2>

                            <Autocomplete
                                options={sponsorOptions}
                                value={sponsorSelected}
                                onChange={(e, newValue) => {
                                    console.log("Sponsor selected value ", newValue); 
                                    if (newValue === null){
                                        console.log("newValue is null ", listItemNotSpecified);
                                        setSponsorSelected(listItemNotSpecified);
                                        setSponsor_ID(null);
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
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSpecialEdit}>Update</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
};

export default EditChildForm;
