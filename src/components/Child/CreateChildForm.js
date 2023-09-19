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
    Alert
} from '@mui/material';

export function CreateChildForm ({ open, handleClose }){
    
/* ==============================================================================================
                                        Set Variables
================================================================================================*/
    const [id, setID] = useState('');
    const [form_name, setFormName] = useState('');
    const [form_id, setFormID] = useState('');
    const [form_gender, setFormGender] = useState('');
    const [form_race, setFormRace] = useState('');
    const [form_age, setFormAge] = useState('');
    const [form_siblings, setFormSiblings] = useState('');
    const [form_shirt, setFormShirt] = useState('');
    const [form_pant, setFormPant] = useState('');
    const [form_shoe, setFormShoe] = useState('');
    const [form_wishlist, setFormWishlist] = useState('');
    const [form_info, setFormInfo] = useState('');
    const [form_bike, setFormBike] = useState('N');
    const [selectRBL, setSelectRBL] = useState();
    const [selectSponsor, setSelectSponsor] = useState();
    

    const sponsorArray = [];
    let childrenArray = [];
    let RBLArray = [];

/* ==============================================================================================
                                        Handle Functions 
================================================================================================*/
    function handleFormName(event) {
        setFormName(event.target.value);
    }

    function handleFormID(event) {
        setFormID(event.target.value);
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
        setID('');
        setFormName('');
        setFormID('');
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
        setSelectRBL('');
        setSelectSponsor('');
    }

    function handleSpecialClose() {
        resetValues();
        handleClose();
    }

    function childIDCheck(){
        let arr = childrenArray.map((child) => {
            if(form_id === child.id){
                return true
            }
        })
        return false
    }

    function handleSpecialCreate(){
        if(childIDCheck){
            //throw an error
        }
         else {
            handleCreate();
        }
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
    //RBLAutoArray = createAutoRBL(RBLArray);
    //console.log("List of RBLS: ", RBLArray)
    //console.log("RBL Auto Array: ", RBLAutoArray)

/* ==============================================================================================
                                     Grabbing a list of Sponsors
                                     From Backend
================================================================================================*/
  const { data: sData, loading: sLoading, error: sError } = useQuery(gql(listSponsors)); 
  if(sData || !sLoading ) {
    const sponsorList = sData.listSponsors.items.map((sponsor) => {
        return sponsorArray.push({ 'id': sponsor.id, 'label': sponsor.FirstName })
    })
  }

/* ==============================================================================================
                                     Grabbing a list of Sponsors
                                     From Backend
================================================================================================*/
    const { data: children_data, loading: children_loading, error: children_Error } = useQuery(gql(listChildren)); 
    if(children_data || !children_loading ) {
    const childrenList = children_data.listChildren.items.map((child) => {
        return childrenArray.push({ 'id': child.id, 'label': child.FirstName })
    })
    }

/* ==============================================================================================
                                        Apollo Call to Add New Child
================================================================================================*/
    let input;
    const [addChildMutation, { data, loading, error }] = useMutation(gql(createChild));
    if(loading) {
        return <div>Loading...</div>
    }
    
    async function handleCreate(e) {
        e.preventDefault();
        try {
            const response = await addChildMutation({
                variables: {
                    input: {
                        Firstname: form_name,
                        ChildID: form_id,
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
                        rblID: selectRBL,
                        sponsorID: selectSponsor
                    }},
                refetchQueries: [{ query: gql(listChildren) }], // Refetch the query to update the list
            });
            console.log("Mutation response: ", response);
            handleSpecialClose();
        } catch (error) {
            console.error("Mutation error: ", error);
        }
    }

    return(
        <React.Fragment>
            <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create New Child</DialogTitle>
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
                    <Autocomplete
                        options = {RBLArray}
                        getOptionLabel={option => option.label}
                        renderInput={(params) => (
                        <TextField {...params} label="" variant="standard" />
                        )}
                        onChange={(e, value) => {
                            if (value != null){
                                setSelectRBL(value.id)
                            } else {
                                setSelectRBL(null);
                            }
                        }}
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
                    />
                    <TextField
                        margin="normal"
                        id="outlined-basic"
                        label="Child ID"
                        style = {{width: 235}}
                        value={form_id}
                        onChange={handleFormID}
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
                    <Autocomplete
                        //value={selectSponsor}
                        options = {sponsorArray}
                        getOptionLabel={option => option.label}
                        renderInput={(params) => (
                        <TextField {...params} label="Sponsor" variant="standard" />
                        )}
                        onChange={(e, value) => {
                            if(value != null){
                                setSelectSponsor(value.id);
                            } else {
                                setSelectSponsor(null);
                            }
                            
                        }}
                    />
                    </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSpecialClose}>Cancel</Button>
                    <Button onClick={handleSpecialCreate}>Create</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
};

export default CreateChildForm;