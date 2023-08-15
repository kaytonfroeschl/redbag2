import React, { useState, useEffect } from 'react';
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
    Divider
} from '@mui/material';


export default function CreateSponsorForm({ open, handleClose }) {

/* ==============================================================================================
                                        Set Variables
================================================================================================*/
    const [form_name, setFormName] = useState('');
    const [form_inst, setFormInst] = useState('');
    const [form_email, setFormEmail] = useState('');
    const [form_phone, setFormPhone] = useState('');
    const [form_street, setFormStreet] = useState('');
    const [form_city, setFormCity] = useState('');
    const [form_zip, setFormZip] = useState('');
    const [form_state, setFormState] = useState('');
    const [form_address, setFormAddress] = useState('');
    const [form_ya, setFormYA] = useState('');

/* ==============================================================================================
                                        Handle Functions 
================================================================================================*/
    function handleFormName(event){
        setFormName(event.target.value);
    }

    function handleFormInst(event){
        setFormInst(event.target.value);
    }

    function handleFormEmail(event){
        setFormEmail(event.target.value);
    }

    function handleFormPhone(event){
        setFormPhone(event.target.value);
    }

    function handleFormStreet(event){
        setFormStreet(event.target.value);
    }

    function handleFormCity(event){
        setFormCity(event.target.value);
    }

    function handleFormZip(event){
        setFormZip(event.target.value);
    }

    function handleFormState(event){
        setFormState(event.target.value);
    }

    function handleFormYA(event){
        setFormYA(event.target.value);
    }

    function resetValues() {
        setFormName('');
        setFormInst('');
        setFormEmail('');
        setFormPhone('');
        setFormStreet('');
        setFormCity('');
        setFormZip('');
        setFormState('');
        setFormYA('');
    }

    function handleSpecialClose() {
        resetValues();
        handleClose();
    }

    function renderAddress() {
        setFormAddress(form_street + " " + form_city + ", " + form_state + " " + form_zip)
    }

/* ==============================================================================================
                                        Apollo Call to Add New Sponsor
   ==============================================================================================*/
    let input;
    const [addSponsorMutation, { data, loading, error }] = useMutation(gql(createSponsor));
    if(loading) {
        return <div>Loading...</div>
    }

    async function handleCreate(e){
        e.preventDefault();
        renderAddress();
        try{
            const response = await addSponsorMutation({
                variables: { input: { FirstName: form_name, LastName: '', Email: form_email, Phone: form_phone, Institution: form_inst, Address: form_address, YearsActive: form_ya } },
                refetchQueries: [{ query: gql(listSponsors) }], // dont need to change
            })
            console.log("Mutation response: ", response);
            handleSpecialClose();
        } catch(error) {
            console.error("Mutation error: ", error);
        }
    }


    return (
        <React.Fragment>
            <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create New Sponsor</DialogTitle>
                <DialogContent>
                <Box
                    sx={{
                    '& .MuiTextField-root': { m: 2, width: '25ch' },
                    
                    }}
                >
                    <FormControl
                    required={true}
                    variant="outlined"
                    fullWidth
                    > 
                    <Box> 
                        <TextField
                        margin="normal"
                        id="outlined-basic"
                        label="Name"
                        value={form_name}
                        onChange={handleFormName}
                        />
                        <TextField
                        margin="normal"
                        id="outlined-basic"
                        label="Optional: Company Name"
                        value={form_inst}
                        onChange={handleFormInst}
                        />
                        <TextField
                        margin="normal"
                        id="outlined-basic"
                        label="Email"
                        type={"email"}
                        value={form_email}
                        onChange={handleFormEmail}
                        />
                        <TextField
                        margin="normal"
                        id="outlined-basic"
                        label="Phone"
                        value={form_phone}
                        onChange={handleFormPhone}
                        />
                        <Typography sx={{m:1}}>Address</Typography>
                        <Divider/>
                        <TextField
                        margin="normal"
                        id="outlined-basic"
                        label="Street Address"
                        value={form_street}
                        onChange={handleFormStreet}
                        />
                        <TextField
                        margin="normal"
                        id="outlined-basic"
                        label="City"
                        value={form_city}
                        onChange={handleFormCity}
                        />
                        <TextField
                        margin="normal"
                        id="outlined-basic"
                        label="Zip Code"
                        value={form_zip}
                        onChange={handleFormZip}
                        />
                        <TextField
                        margin="normal"
                        id="outlined-basic"
                        label="State"
                        value={form_state}
                        onChange={handleFormState}
                        />
                        <Typography sx={{m:1}}>Years Active</Typography>
                        <Divider/>
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
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSpecialClose}>Cancel</Button>
                    <Button onClick={handleCreate}>Create</Button>
                </DialogActions>
        </Dialog>
        </React.Fragment>
    )
};
