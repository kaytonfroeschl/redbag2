import * as React from 'react';
import { Label } from '@mui/icons-material';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Paper,
    Stack,
} from '@mui/material';

//export default function DeleteSponsor(open, sponsor, deleteSponsor, handleClose){
export default function DeleteSponsor(sponsor, open){
    // console.log("DeleteSponsor Componenet Begin")
    // console.log("Open", open);
    // console.log("sponsor", sponsor);
    
    const sponsorInfo = () => {
        <>
            <Label>{sponsor.FirstName}</Label>
            <Label>{sponsor.LastName}</Label>
            <Label>{sponsor.Institution}</Label>
        </>
    }
    /* 
    ==============================================================================================
                    User Interface
    ================================================================================================*/
    
    return(
        <React.Fragment>
            {/* <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="xl"> */}
            <Dialog open={open} fullWidth={true} maxWidth="xl">
            <DialogTitle>Are you sure you wish to permanently remove this SPONSOR?</DialogTitle>
            <DialogContent>
                <Paper elevation={3}>
                    <Stack spacing={2}>
                        {sponsorInfo()}
                    </Stack>
                </Paper>
            </DialogContent>
            <DialogActions>
                {/* <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                <Button variant="contined" onClick={deleteSponsor}>DELETE!</Button> */}
            </DialogActions>
            </Dialog>
        </React.Fragment>
    )
};
