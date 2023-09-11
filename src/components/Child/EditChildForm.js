import React, { useState, useEffect } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { updateChild } from '../../graphql/mutations';
import { listChildren, listSponsors, listRBLS, getChild } from '../../graphql/queries';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Box,
    FormControl,
    Typography,
    Divider,
    TextField,
    MenuItem,
    Autocomplete
} from '@mui/material';



export function EditChildForm ({ open, handleClose, child }){
    console.log("EDIT Child: ", child)
/* ==============================================================================================
                                        Set Variables
================================================================================================*/
    const [form_id, setFormID] = useState('');
    const [form_name, setFormName] = useState('');
    const [form_childid, setFormChildID] = useState('');
    const [form_gender, setFormGender] = useState('');
    const [form_race, setFormRace] = useState('');
    const [form_age, setFormAge] = useState('');
    const [form_siblings, setFormSiblings] = useState('');
    const [form_shirt, setFormShirt] = useState('');
    const [form_pant, setFormPant] = useState('');
    const [form_shoe, setFormShoe] = useState('');
    const [form_wishlist, setFormWishlist] = useState('');
    const [form_info, setFormInfo] = useState('');
    const [form_bike, setFormBike] = useState('');
    
    const [incomingSponsorID, setIncomingSponsorID] = useState("");
    const [incomingSponsorLabel, setIncomingSponsorLabel] = useState("");
    const [sponsorDatabaseID, setSponsorDatabaseID] = useState("");

    const [incomingRBLID, setIncomingRBLID] = useState("");
    const [incomingRBLLabel, setIncomingRBLLabel] = useState("");
    const [RBLDatabaseID, setRBLDatabaseID] = useState("");



    let sponsorAutoArray = [];
    const sponsorArray = [];
    let RBLArray = [];
    let RBLAutoArray = [];
    

    useEffect(() => {
        setFormID(child.passedid)
        setFormName(child.passedName)
        setFormChildID(child.passedChildID)
        setFormAge(child.passedAge)
        setFormGender(child.passedGender)
        setFormRace(child.passedRace)
        setFormSiblings(child.passedSiblings)
        setFormShirt(child.passedShirt)
        setFormPant(child.passedPant)
        setFormShoe(child.passedShoe)
        setFormWishlist(child.passedWishlist)
        setFormInfo(child.passedInfo)
        setFormBike(child.passedBike)
        if(child.passedSponsor !== null){
            console.log("not null", child.passedSponsor.id, " ", child.passedSponsor.FirstName)
            setIncomingSponsorID(child.passedSponsor.id)
            setIncomingSponsorLabel(child.passedSponsor.FirstName)
            setSponsorDatabaseID(child.passedSponsor.id)
        }
        if(child.passedRBL !== null){
            setIncomingRBLID(child.passedRBL.id);
            setIncomingRBLLabel(child.passedRBL.FirstName + " " + child.passedRBL.LastName)
            setRBLDatabaseID(child.passedRBL.id);
            console.log("not null", child.passedRBL.FirstName + " " + child.passedRBL.LastName)
        }
        
    }, [child])

    console.log("incomingSponsor id: ", incomingSponsorID)
    console.log("Sponsor database ID: ", sponsorDatabaseID)

    console.log("incoming id: ", incomingRBLID);
    console.log("RBL Database ID: ", RBLDatabaseID);

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
    }

    function handleSpecialClose() {
        resetValues();
        handleClose();
    }

    function createNameArray(array) {
        let tempArr = [];
        let list = array.map((sponsor) => {
            tempArr.push({ 'id': sponsor.id, 'label': sponsor.FirstName })
        })
        //console.log("New Array: ", tempArr)
        return tempArr
    }

    function createAutoRBL(array) {
        let tempArr = [];
        let list = array.map((RBL) => {
            tempArr.push({ 'id': RBL.id, 'label': RBL.FirstName + " " + RBL.LastName })
        })
        return tempArr;
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
        return sponsorArray.push(sponsor)
        //console.log(sponsor.FirstName)
    })
    }
    sponsorAutoArray = createNameArray(sponsorArray);
    console.log("Sponsor Array: ", sponsorArray);
    //console.log("Sponsor AutoComplete Array: ", sponsorAutoArray);

/*============================================= Apollo Call =================================================
                                              Listing RBLS
===========================================================================================================*/
    const { data: RBL_data, loading: RBL_loading, error: RBL_error } = useQuery(gql(listRBLS)); 
    if(RBL_data || !RBL_loading ) {
    const RBLList = RBL_data.listRBLS.items.map((RBL) => {
        return RBLArray.push(RBL)
    })
    }
    RBLAutoArray = createAutoRBL(RBLArray);
    console.log("List of RBLS: ", RBLArray)
    //console.log("RBL Auto Array: ", RBLAutoArray)

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
        try {
            const response = await editChildMutation({
                variables: { input: { id: form_id, Firstname: form_name, ChildID: form_childid, Gender: form_gender, Race: form_race, Age: form_age, Siblings: form_siblings, ShirtSize: form_shirt, PantSize: form_pant, ShoeSize: form_shoe, Wishlist: form_wishlist, Info: form_info, Bike: form_bike, rblID: RBLDatabaseID, sponsorID: sponsorDatabaseID} },
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
                    <Autocomplete
                        options = {RBLAutoArray}
                        defaultValue={{ label: incomingRBLLabel, id: incomingRBLID }}
                        getOptionLabel={option => option.label}
                        renderInput={(params) => (
                        <TextField {...params} label="" variant="standard" />
                        )}
                        onChange={(e, value) => {
                            if (value != null){
                                setRBLDatabaseID(value.id)
                            } else {
                                setRBLDatabaseID(null);
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
                    <Autocomplete
                        options = {sponsorAutoArray}
                        defaultValue={{ id: incomingSponsorID, label: incomingSponsorLabel }}
                        getOptionLabel={option => option.label}
                        renderInput={(params) => (
                        <TextField {...params} label="Sponsor" variant="standard" />
                        )}
                        onChange={(e, value) => {
                            if(value !== null){
                                setSponsorDatabaseID(value.id)
                            } else {
                                setSponsorDatabaseID(null)
                            }
                        }}
                    />
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