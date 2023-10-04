import React, { useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { updateSponsor } from '../../graphql/mutations';
import { listSponsors } from '../../graphql/queries';
import Dialog from '@mui/material/Dialog';
import { DialogActions, DialogContent, DialogTitle, Alert } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';

export default function EditSponsorForm({ open, handleClose, sponsor }){
    const [form_firstname, setFormFirstName] = useState(sponsor.FirstName);
    const [form_lastname, setFormLastName] = useState(sponsor.LastName);
    const [form_street, setFormStreet] = useState(sponsor.AddressStreet);
    const [form_city, setFormCity] = useState(sponsor.AddressCity);
    const [form_state, setFormState] = useState(sponsor.AddressState);
    const [form_zip, setFormZip] = useState(sponsor.AddressZip);
    const [form_email, setFormEmail] = useState(sponsor.Email);
    const [form_inst, setFormInst] = useState(sponsor.Institution);
    const [form_phone, setFormPhone] = useState(sponsor.Phone);
    const [form_ya, setFormYA] = useState(sponsor.YearsActive);
    const [generalError, setGeneralError] = useState('');

    const resetValues = (sponsor) => {
        setFormFirstName(sponsor.FirstName);
        setFormLastName(sponsor.LastName);
        setFormStreet(sponsor.AddressStreet);
        setFormCity(sponsor.AddressCity);
        setFormState(sponsor.AddressState);
        setFormZip(sponsor.AddressZip);
        setFormEmail(sponsor.Email);
        setFormInst(sponsor.Institution);
        setFormPhone(sponsor.Phone);
        setFormYA(sponsor.YearsActive);
    };

    const updateSponsorInMemory = (newSponsorValues) => {
        sponsor.FirstName = newSponsorValues.FirstName;
        sponsor.LastName = newSponsorValues.LastName;
        sponsor.AddressStreet = newSponsorValues.AddressStreet;
        sponsor.AddressCity = newSponsorValues.AddressCity;
        sponsor.AddressState = newSponsorValues.AddressState;
        sponsor.AddressZip = newSponsorValues.AddressZip;
        sponsor.Email = newSponsorValues.Email;
        sponsor.Institution = newSponsorValues.Institution;
        sponsor.Phone = newSponsorValues.Phone;
        sponsor.YearsActive = newSponsorValues.YearsActive;
    };

    function handleFormFirstName(event) {setFormFirstName(event.target.value)}
    function handleFormLastName(event)  {setFormLastName(event.target.value)}
    function handleFormStreet(event)    {setFormStreet(event.target.value)}
    function handleFormCity(event)      {setFormCity(event.target.value)}
    function handleFormState(event)     {setFormState(event.target.value)}
    function handleFormZip(event)       {setFormZip(event.target.value)}
    function handleFormEmail(event)     {setFormEmail(event.target.value)}
    function handleFormInst(event)      {setFormInst(event.target.value)}
    function handleFormPhone(event)     {setFormPhone(event.target.value)}
    function handleFormYA(event)        {setFormYA(event.target.value)}

    const sponsorIsValid = (sponsor) => {
        //Must have First AND Last or Institution
        if (! sponsor) return;
        if (sponsor.Institution.length < 1) {
            const firstAndLast = sponsor.FirstName + sponsor.LastName;
            
            if (firstAndLast.length < 1) {
                setGeneralError("You must specify a First AND Last Name OR an Institution Name");
                return false;
            };

            if (sponsor.FirstName.length < 1 || sponsor.LastName < 1) {
                setGeneralError("You must have a First AND Last Name");
                return false;
            };
        };
        return true;
    };

/* ==============================================================================================
                                        Apollo Call 
================================================================================================*/
    const [updateSponsorMutation] = useMutation(gql(updateSponsor));
    const {loading, error} = useQuery(gql(listSponsors));
    if(loading) {return <div>Loading...</div>}
    if(error) {return <div>Error updating Sponsor: {error}</div>}

    async function handleUpdate(e) {
        e.preventDefault();
        setGeneralError("");

        let sponsorChanges = {
            id: sponsor.id, 
            FirstName: form_firstname, 
            LastName: form_lastname, 
            Phone: form_phone, 
            Email: form_email, 
            Address: '', 
            AddressStreet: form_street, 
            AddressCity: form_city, 
            AddressState: form_state, 
            AddressZip: form_zip, 
            Institution: form_inst, 
            YearsActive: form_ya,
        };

        if ( ! sponsorIsValid(sponsorChanges)) return;

        //I tried to use "sponsorChanges" as the "input: " in the mutation below but it will not work
        //Even though they are IDENTICAL (or were before I added the "whatIfNull" trying to make it work)
        try {
            await updateSponsorMutation({
                variables: { input: { 
                    id: sponsor.id, 
                    FirstName: form_firstname, 
                    LastName: form_lastname, 
                    Phone: form_phone, 
                    Email: form_email, 
                    Address: '', 
                    AddressStreet: form_street, 
                    AddressCity: form_city, 
                    AddressState: form_state, 
                    AddressZip: form_zip, 
                    Institution: form_inst, 
                    YearsActive: form_ya}},
                refetchQueries: [{ query: gql(listSponsors) }], // Refetch the query to update the list
            });
            updateSponsorInMemory(sponsorChanges);
            handleClose();
        } catch (error) {
            setGeneralError("Update Sponsor threw an error: " + error)
        }
    };

    const handleCancel = () => {
        setGeneralError("");
        resetValues(sponsor);  //resets all values to the way they were on open
        handleClose();
    }

    const showErrorNotification = () => {
        let result = <></>;
        if (generalError) {
            result = <Alert severity="error">{generalError}</Alert>
        };
        return result;
    };

    return(
        <React.Fragment>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{fontWeight:'bold'}}>Edit</DialogTitle>
            <DialogContent>
                {showErrorNotification()}
                <FormControl
                    required={true}
                    variant="outlined"
                > 
                <Box
                    sx={{
                    '& .MuiTextField-root': { m: 2, width: '25ch' },
                    }}
                >
                <Box> 
                    <TextField
                        margin="normal"
                        id="outlined-basic"
                        label="First Name"
                        value={form_firstname !== null ? form_firstname : ""}
                        onChange={handleFormFirstName}
                    />
                    <TextField
                        margin="normal"
                        id="outlined-basic"
                        label="Last Name"
                        value={form_lastname !== null ? form_lastname : ""}
                        onChange={handleFormLastName}
                    />
                    <TextField
                        margin="normal"
                        id="outlined-basic"
                        label="Optional: Company Name"
                        value={form_inst !== null ? form_inst : ""}
                        onChange={handleFormInst}
                    />
                    <TextField
                        margin="normal"
                        id="outlined-basic"
                        label="Email"
                        value={form_email !== null ? form_email : ""}
                        onChange={handleFormEmail}
                    />
                    <TextField
                        margin="normal"
                        label="Phone"
                        value={form_phone !== null ? form_phone : ""}
                        onChange={handleFormPhone}
                    />    
                </Box>
                </Box>
                <Box>
                <Typography
                        style={{
                            fontWeight: 500
                        }}
                        sx={{
                            mt: 2,
                            ml: 2
                        }}>Address</Typography>
                <Divider
                    sx={{mb: 2, ml: 2, mr: 2, borderBottomWidth: 1.5}}
                    style={{background: 'black'}}
                />
                <Box
                    sx={{
                        '& .MuiTextField-root': { m: 2, width: '25ch' },
                    }}>
                    <TextField
                        label="Street Address"
                        value={form_street !== null ? form_street : ""}
                        onChange={handleFormStreet}
                    />
                    <TextField
                        label="City"
                        value={form_city !== null ? form_city : ""}
                        onChange={handleFormCity}
                    />
                    <TextField
                        label="State"
                        value={form_state !== null ? form_state : ""}
                        onChange={handleFormState}
                    />
                    <TextField
                        label="Zip Code"
                        value={form_zip !== null ? form_zip : ""}
                        onChange={handleFormZip}
                    />
                </Box>
                <Box
                    sx={{
                        m: 2
                    }}>
                    <TextField
                        label="Years Active"
                        multiline
                        fullWidth
                        rows={4}
                        value={form_ya !== null ? form_ya : ""}
                        onChange={handleFormYA}
                    />
                </Box>
                </Box>
                </FormControl>
                {showErrorNotification()}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleUpdate}>Update</Button>
            </DialogActions>
    </Dialog>
    </React.Fragment>
    )
        
};
