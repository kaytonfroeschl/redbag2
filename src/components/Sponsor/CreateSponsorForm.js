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

    function handleFormAddress(event){
        setFormAddress(event.target.value);
    }

    function handleFormYA(event){
        setFormYA(event.target.value);
    }

    function resetValues() {
        setFormName('');
        setFormInst('');
        setFormEmail('');
        setFormPhone('');
        setFormAddress('')
        setFormYA('');
    }

    function handleSpecialClose() {
        resetValues();
        handleClose();
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
                </Box>
                </Box>
                <Box
                    sx={{
                        m: 2
                    }}>
                <TextField
                    label="Address"
                    multiline
                    fullWidth
                    rows={2}
                    value={form_address}
                    onChange={handleFormAddress}
                />
               <Typography>&nbsp;</Typography>
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSpecialClose}>Cancel</Button>
                    <Button onClick={handleCreate}>Create</Button>
                </DialogActions>
        </Dialog>
        </React.Fragment>
    )
};
