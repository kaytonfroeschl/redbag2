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
    //console.log("EDIT Sponsor: ", sponsor)
/* ==============================================================================================
                                        Set Variables
================================================================================================*/
    const [form_id, setFormID] = useState(sponsor.id);
    const [form_name, setFormName] = useState(sponsor.FirstName);
    const [form_firstname, setFormFirstName] = useState(sponsor.FirstName);
    const [form_lastname, setFormLastName] = useState(sponsor.LastName);
    const [form_address, setFormAddress] = useState(sponsor.Address);
    const [form_street, setFormStreet] = useState(sponsor.AddressStreet);
    const [form_city, setFormCity] = useState(sponsor.AddressCity);
    const [form_state, setFormState] = useState(sponsor.AddressState);
    const [form_zip, setFormZip] = useState(sponsor.Zip);
    const [form_email, setFormEmail] = useState(sponsor.Email);
    const [form_inst, setFormInst] = useState(sponsor.Institution);
    const [form_phone, setFormPhone] = useState(sponsor.Phone);
    const [form_ya, setFormYA] = useState(sponsor.YearsActive);

    useEffect(() => {
        setFormID(sponsor.id);
        setFormName(sponsor.FirstName);
        setFormFirstName(sponsor.FirstName);
        setFormLastName(sponsor.LastName);
        setFormAddress(sponsor.Address);
        setFormStreet(sponsor.AddressStreet);
        setFormCity(sponsor.AddressCity);
        setFormState(sponsor.AddressState);
        setFormZip(sponsor.AddressZip);
        setFormEmail(sponsor.Email);
        setFormInst(sponsor.Institution);
        setFormPhone(sponsor.Phone);
        setFormYA(sponsor.YearsActive);
    }, [sponsor])

/* ==============================================================================================
                                        OnChange Handle Functions 
================================================================================================*/
    function handleFormName(event){
        setFormName(event.target.value);
    }

    function handleFormFirstName(event){
        setFormFirstName(event.target.value);
    }

    function handleFormLastName(event){
        setFormLastName(event.target.value);
    }

    function handleFormAddress(event){
        setFormAddress(event.target.value);
    }

    function handleFormStreet(event){
        setFormStreet(event.target.value);
    }

    function handleFormCity(event){
        setFormCity(event.target.value);
    }

    function handleFormState(event){
        setFormState(event.target.value);
    }

    function handleFormZip(event){
        setFormZip(event.target.value);
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
                                        Apollo Call 
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
                variables: { input: { id: form_id, FirstName: form_firstname, LastName: form_lastname, Phone: form_phone, Email: form_email, Address: '', AddressStreet: form_street, AddressCity: form_city, AddressState: form_state, AddressZip: form_zip, Institution: form_inst, YearsActive: form_ya} },
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
        <DialogTitle style={{fontWeight:'bold'}}>Edit</DialogTitle>
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
                        label="Zipcode"
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
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleUpdate}>Update</Button>
            </DialogActions>
    </Dialog>
    </React.Fragment>
    )
        
};
