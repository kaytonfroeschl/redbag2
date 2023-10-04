import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { createSponsor } from '../../graphql/mutations';
import { listSponsors } from '../../graphql/queries';
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
    Alert,
} from '@mui/material';


export default function CreateSponsorForm({ open, handleClose }) {

/* ==============================================================================================
                                        Set Variables
================================================================================================*/
    const [form_firstname, setFormFirstName] = useState('');
    const [form_lastname, setFormLastName] = useState('');
    const [form_inst, setFormInst] = useState('');
    const [form_email, setFormEmail] = useState('');
    const [form_phone, setFormPhone] = useState('');
    const [form_street, setFormStreet] = useState('');
    const [form_city, setFormCity] = useState('');
    const [form_state, setFormState] = useState('');
    const [form_zip, setFormZip] = useState('');
    const [form_ya, setFormYA] = useState('');

    const [generalError, setGeneralError] = useState('');

/* ==============================================================================================
                                        Handle Functions 
================================================================================================*/

    function handleFormFirstName(event) {setFormFirstName(event.target.value)}
    function handleFormLastName(event)  {setFormLastName(event.target.value)}
    function handleFormInst(event)      {setFormInst(event.target.value)}
    function handleFormEmail(event)     {setFormEmail(event.target.value)}
    function handleFormPhone(event)     {setFormPhone(event.target.value)}
    function handleFormStreet(event)    {setFormStreet(event.target.value)}
    function handleFormCity(event)      {setFormCity(event.target.value)}
    function handleFormState(event)     {setFormState(event.target.value)}
    function handleFormZip(event)       {setFormZip(event.target.value)}
    function handleFormYA(event)        {setFormYA(event.target.value)}

    function resetValues() {
        setFormFirstName('');
        setFormLastName('');
        setFormInst('');
        setFormEmail('');
        setFormPhone('');
        setFormStreet('');
        setFormCity('');
        setFormState('');
        setFormZip('');
        setFormYA('');
    }

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

    function handleFormCancel() {
        setGeneralError("");
        resetValues();
        handleClose();
    }

    function handleFormCreate(e) {
        handleCreate(e);
    }

/* ==============================================================================================
                                        Apollo Call to Add New Sponsor
   ==============================================================================================*/
    const [addSponsorMutation, {loading, error }] = useMutation(gql(createSponsor));
    if(loading) {return <div>Loading...</div>}
    if(error) {return <div>Error: {error}</div>}

    async function handleCreate(e){
        e.preventDefault();
        setGeneralError("");

        let sponsorChanges = {
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

        try{
            await addSponsorMutation({
                variables: { input: { 
                    FirstName: form_firstname, 
                    LastName: form_lastname, 
                    Email: form_email, 
                    Phone: form_phone, 
                    Institution: form_inst, 
                    Address: '', 
                    AddressStreet: form_street, 
                    AddressCity: form_city, 
                    AddressState: form_state, 
                    AddressZip: form_zip, 
                    YearsActive: form_ya } },
                refetchQueries: [{ query: gql(listSponsors) }], // dont need to change
            })
            handleFormCancel();
        } catch(error) {
            setGeneralError("Unexpected error creating sponsor: " + error);
        }
    }

    const showErrorNotification = () => {
        let result = <></>;
        if (generalError) {
            result = <Alert severity="error">{generalError}</Alert>
        };
        return result;
    };


    return (
        <React.Fragment>
            <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create New Sponsor</DialogTitle>
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
                <Typography
                    style={{
                        fontWeight: 500
                    }}
                    sx={{
                        ml: 2
                }}>Basic Information</Typography>
                <Divider
                    sx={{ ml: 2, mr: 2, borderBottomWidth: 1.5}}
                    style={{background: 'black'}}
                />
                <Box> 
                    <TextField
                        margin="normal"
                        id="outlined-basic"
                        label="First Name"
                        value={form_firstname}
                        onChange={handleFormFirstName}
                    />
                    <TextField
                        margin="normal"
                        id="outlined-basic"
                        label="Last Name"
                        value={form_lastname}
                        onChange={handleFormLastName}
                    />
                    <TextField
                        margin="normal"
                        label="Optional: Company Name"
                        value={form_inst}
                        onChange={handleFormInst}
                    />
                    <TextField
                        margin="normal"
                        label="Email"
                        type={"email"}
                        value={form_email}
                        onChange={handleFormEmail}
                    />
                    <TextField
                        margin="normal"
                        label="Phone"
                        value={form_phone}
                        onChange={handleFormPhone}
                    />    
                </Box>
                </Box>
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
                    fullWidth
                    value={form_street}
                    onChange={handleFormStreet}
                />
                <TextField
                    label="City"
                    value={form_city}
                    onChange={handleFormCity}
                />
                <TextField
                    label="State"
                    value={form_state}
                    onChange={handleFormState}
                />
                <TextField
                    label="Zipcode"
                    value={form_zip}
                    onChange={handleFormZip}
                />
                </Box>
                <Typography
                        style={{
                            fontWeight: 500
                        }}
                        sx={{
                            mt: 2,
                            ml: 2
                        }}>Other Information</Typography>
                <Divider
                    sx={{ ml: 2, mr: 2, borderBottomWidth: 1.5}}
                    style={{background: 'black'}}
                />
               <Typography>&nbsp;</Typography>
               <Box
                sx={{
                    ml: 2,
                    mr: 2
                }}
                >
                <TextField
                    id="outlined-multiline-static"
                    label="Years Active"
                    multiline
                    fullWidth
                    rows={4}
                    value={form_ya}
                    onChange={handleFormYA}
                />
               </Box>
               
                </FormControl>
                {showErrorNotification()}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleFormCancel}>Cancel</Button>
                    <Button onClick={handleFormCreate}>Create</Button>
                </DialogActions>
        </Dialog>
        </React.Fragment>
    )
};
