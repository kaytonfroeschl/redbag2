import * as React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Paper,
    Stack,
} from '@mui/material';

export default function DeleteSponsor({open, sponsor, deleteSponsor, handleClose}){
    console.log("DeleteSponsor Componenet Begin")
    console.log("sponsor", sponsor);
    
    const sponsorInfo = () => {
        return (
            <div>
                <div>{sponsor.name}</div>
                <div>{sponsor.companyName}</div>
            </div>
        );
    }
    /* 
    ==============================================================================================
                    User Interface
    ================================================================================================*/
     
    return(
        <React.Fragment>
            <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="xl">
            <DialogTitle>Are you sure you wish to permanently remove this SPONSOR?</DialogTitle>
            <DialogContent>
                <Paper elevation={3}>
                    <Stack spacing={2}>
                        {sponsorInfo()}
                    </Stack>
                </Paper>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                <Button variant="contained" onClick={deleteSponsor}>DELETE!</Button>
            </DialogActions>
            </Dialog>
        </React.Fragment>
    )
};
