import React, { useState, useEffect } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { updateChild } from '../../graphql/mutations';
import { listChildren, getChild, listSponsors, listRBLS } from '../../graphql/queries';
import Dialog from '@mui/material/Dialog';
import { DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';


export function EditChildForm ({ open, handleClose, child }){
console.log("EDIT child: ", child)
/* ==============================================================================================
                                        Set Variables
================================================================================================*/
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
    const [rblID, setRBLID] = useState(null);
    const [sponsorID, setSponsorID] = useState(null);

    /*const [RBLValue, setRBLValue] = useState('')
    const [RBLInputValue, setRBLInputValue] = useState('');

    const [sponsorValue, setSponsorValue] = useState('');
    const [sponsorInputValue, setSponsorInputValue] = useState('');

    useEffect(() => {
        if(child.RBL !== null){
            setRBLValue(child.RBL.FirstName)
        }
    
        if(child.Sponsor !== null){
            setSponsorValue(child.Sponsor.FirstName);
        }
    }, [child])*/

    
    
    let sponsorArray = [];
    let RBLArray = [];

/* ==============================================================================================
                                        OnChange Handle Functions 
================================================================================================*/
    function handleFormName(event) {
        setFormName(event.target.value);
    }

    function handleFormChildID(event) {
        setFormChildID(event.target.value);
    }

    function handleFormGender(event) {
        setFormGender(event.target.value);
    }

    function handleFormRace(event){
        setFormRace(event.target.value);
    }

    function handleFormAge(event){
        setFormAge(event.target.value);
    }

    function handleFormSiblings(event){
        setFormSiblings(event.target.value);
    }

    function handleFormShirt(event){
        setFormShirt(event.target.value);
    }

    function handleFormPant(event){
        setFormPant(event.target.value);
    }

    function handleFormShoe(event){
        setFormShoe(event.target.value);
    }

    function handleFormWishlist(event){
        setFormWishlist(event.target.value);
    }

    function handleFormInfo(event){
        setFormInfo(event.target.value);
    }

    function handleFormBike(event){
        setFormBike(event.target.value);
    }

    function resetValues() {
        setFormName('');
        setFormChildID('');
        setFormGender('');
        setFormRace('');
        setFormAge('');
        setFormSiblings('');
        setFormShirt('');
        setFormPant('');
        setFormShoe('');
        setFormWishlist('');
        setFormInfo('');
        setFormBike('');
        setRBLID('');
        setSponsorID('');
    }

    function handleSpecialClose() {
        resetValues();
        handleClose();
    }

    function handleSpecialEdit(e) {
        handleEdit(e);
    }
/*===============================================================================================
                                     Grabbing a list of Sponsors
                                     From Backend
================================================================================================*/
    const { data: sData, loading: sLoading, error: sError } = useQuery(gql(listSponsors)); 
    if(sData || !sLoading ) {
    const sponsorList = sData.listSponsors.items.map((sponsor) => {
        return sponsorArray.push({ 'id': sponsor.id, 'label': sponsor.FirstName });
    })
    }

/*============================================= Apollo Call =================================================
                                              Listing RBLS
===========================================================================================================*/
    const { data: RBL_data, loading: RBL_loading, error: RBL_error } = useQuery(gql(listRBLS)); 
    if(RBL_data || !RBL_loading ) {
    const RBLList = RBL_data.listRBLS.items.map((RBL) => {
        return RBLArray.push({ 'id': RBL.id, 'label': RBL.FirstName + " " + RBL.LastName })
    })
    }

/* ==============================================================================================
                                        Apollo Call to Add New Child
================================================================================================*/
    let input;
    const [editChildMutation] = useMutation(gql(updateChild));
    const { loading, error, data } = useQuery((gql(listChildren)));
    if(loading) {
        return <div>Loading...</div>
    }

    async function handleEdit(e) {
        e.preventDefault();
        console.log("RBLID: ", rblID);
        console.log("SponsorID: ", sponsorID)
        try {
            const response = await editChildMutation({
                variables: {
                    input: {
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
                        sponsorID: sponsorID 
                    }},
                refetchQueries: [{ query: gql(listChildren) }], // Refetch the query to update the list
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
            <DialogTitle>Edit Child</DialogTitle>
                <DialogContent>
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
                    {/*<Autocomplete
                        onChange={(_, newValue) => {
                            setRBLValue(newValue)
                        }}
                        inputValue = {RBLInputValue}
                        onInputChange={(_, newInputValue) => {
                            setRBLInputValue(newInputValue)
                        }}
                        defaultValue={{ RBLValue }}
                        options = {RBLArray}
                        getOptionLabel={option => option.label}
                        renderInput={(params) => (
                            <TextField {...params} label="" variant="standard" />
                        )}
                        sx={{ mb: 2, mt: 2}}
                        />*/}
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
                    />
                    <TextField
                        margin="normal"
                        id="outlined-basic"
                        label="Child ID"
                        style = {{width: 235}}
                        value={form_childid}
                        onChange={handleFormChildID}
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
                        <TextField
                            value={form_gender}
                            onChange={handleFormGender}
                            select // tell TextField to render select
                            label="Gender"
                            style = {{width: 150}}
                        >
                            <MenuItem value={'F'}>Female</MenuItem>
                            <MenuItem value={'M'}>Male</MenuItem>
                            <MenuItem value={'Other'}>Other</MenuItem>
                        </TextField>
                        <TextField
                            value={form_race}
                            onChange={handleFormRace}
                            select // tell TextField to render select
                            label="Race"
                            style = {{width: 150}}
                        >
                            <MenuItem value={'White'}>White</MenuItem>
                            <MenuItem value={'Black'}>Black</MenuItem>
                            <MenuItem value={'Hispanic'}>Hispanic</MenuItem>
                            <MenuItem value={'Other'}>Other</MenuItem>
                        </TextField>
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
                    {/*<Autocomplete
                        options = {sponsorArray}
                        defaultValue={{ sponsorValue }}
                        getOptionLabel={option => option.label}
                        renderInput={(params) => (
                        <TextField {...params} label="Sponsor" variant="standard" />
                        )}
                        onChange={(e, value) => {
                            if(value !== null){
                                console.log("Sponsorr Value = ", value)
                                setSponsorID(value.id)
                            } else {
                                setSponsorID(null)
                            }
                        }}
                    />*/}
                    </FormControl>
                    </Box>
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
