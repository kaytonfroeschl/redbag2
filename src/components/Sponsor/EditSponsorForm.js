import React, { useState, useEffect } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { updateSponsor } from '../../graphql/mutations';
import { listSponsors, getSponsor } from '../../graphql/queries';
import Dialog from '@mui/material/Dialog';
import { DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';


export default function EditSponsorForm({ open, handleClose, sponsor }){
    console.log("EDIT Sponsor: ", sponsor)
/* ==============================================================================================
                                        Set Variables
================================================================================================*/
    const [form_id, setFormID] = useState('');
    const [form_name, setFormName] = useState('');
    const [form_street, setStreet] = useState('');
    const [form_city, setCity] = useState('');
    const [form_zip, setZip] = useState('');
    const [form_state, setState] = useState('');
    const [form_address, setFormAddress] = useState('');
    const [form_email, setFormEmail] = useState('');
    const [form_inst, setFormInst] = useState('');
    const [form_phone, setFormPhone] = useState('');
    const [form_ya, setFormYA] = useState('');

    useEffect(() => {
        setFormID(sponsor.id)
        setFormName(sponsor.passedName)
        setFormAddress(sponsor.passedAddress)
        setFormEmail(sponsor.passedEmail)
        setFormInst(sponsor.passedInst)
        setFormPhone(sponsor.passedPhone)
        setFormYA(sponsor.passedYA)
    }, [sponsor])
/* ==============================================================================================
                                        OnChange Handle Functions 
================================================================================================*/
    function handleFormName(event){
        setFormName(event.target.value);
    }

    function handleFormAddress(event){
        setFormAddress(event.target.value);
    }

    function handleFormEmail(event){
        setFormEmail(event.target.value);
    }

    function handleFormInst(event){
        setFormInst(event.target.value);
    }

    function handleFormPhone(event){
        setFormPhone(event.target.value);
    }

    function handleFormYA(event){
        setFormYA(event.target.value);
    }

/* ==============================================================================================
                                        Apollo Call to Add New Child
================================================================================================*/
    let input;
    const [updateSponsorMutation] = useMutation(gql(updateSponsor));
    const { loading, error, data } = useQuery(gql(listSponsors));
    if(loading) {
        return <div>Loading...</div>
    }

    async function handleUpdate(e) {
        e.preventDefault();
        try {
            const response = await updateSponsorMutation({
                variables: { input: { id: form_id, FirstName: form_name, LastName: '', Phone: form_phone, Email: form_email, Address: form_address, Institution: form_inst, YearsActive: form_ya} },
                refetchQueries: [{ query: gql(listSponsors) }], // Refetch the query to update the list
            });
            console.log("Mutation response: ", response);
            handleClose();
        } catch (error) {
            console.error("Mutation error: ", error);
        }
    }

    return(
        <React.Fragment>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit {sponsor.passedName}</DialogTitle>
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
                    defaultValue={sponsor.FirstName}
                    />
                    <TextField
                    margin="normal"
                    id="outlined-basic"
                    label="Optional: Company Name"
                    value={form_inst}
                    onChange={handleFormInst}
                    defaultValue={sponsor.Institution}
                    />
                    <TextField
                    margin="normal"
                    id="outlined-basic"
                    label="Email"
                    type={"email"}
                    value={form_email}
                    onChange={handleFormEmail}
                    defaultValue={sponsor.Email}
                    />
                    <TextField
                    margin="normal"
                    id="outlined-basic"
                    label="Phone"
                    value={form_phone}
                    onChange={handleFormPhone}
                    defaultValue={sponsor.Phone}
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
                    defaultValue={sponsor.Address}
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
                    defaultValue={sponsor.YearsActive}
                />
                </Box>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleUpdate}>Update</Button>
            </DialogActions>
    </Dialog>
    </React.Fragment>
    )
        
};
