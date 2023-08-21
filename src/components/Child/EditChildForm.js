import React, { useState, useEffect } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { updateChild } from '../../graphql/mutations';
import { listChildren, getChild } from '../../graphql/queries';
import Dialog from '@mui/material/Dialog';
import { DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';


export function EditChildForm ({ open, handleClose, child }){
    console.log("we are in editCHild form: ", child)
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
    

    useEffect(() => {
        console.log("in use effect")
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
    }, [child])



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

    function handleEditClose() {
        console.log("edit close")
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
        console.log("hello")
        try {
            const response = await editChildMutation({
                variables: { input: { id: form_id, Firstname: form_name, ChildID: form_childid, Gender: form_gender, Race: form_race, Age: form_age, Siblings: form_siblings, ShirtSize: form_shirt, PantSize: form_pant, ShoeSize: form_shoe, Wishlist: form_wishlist, Info: form_info, Bike: form_bike } },
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
                    </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleEdit}>Update</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
};

export default EditChildForm;