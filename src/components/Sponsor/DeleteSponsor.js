import * as React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Paper,
    Stack,
    Box,
    Typography
} from '@mui/material';

export default function DeleteSponsor({open, sponsor, deleteSponsor, handleClose}){
    console.log("DeleteSponsor Componenet Begin")
    console.log("sponsor", sponsor);
    
    const sponsorInfo = () => {
        return (
            <div>
                <div>{sponsor.FirstName} {sponsor.LastName}</div>
                <div>{sponsor.Institution}</div>
            </div>
        );
    }
    /* 
    ==============================================================================================
                    User Interface
    ================================================================================================*/
     
    return(
        <React.Fragment>
            <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Are you sure you want to delete this Sponsor?</DialogTitle>
            <DialogContent>
                    <Box
                        sx={{
                            textAlign: 'center'
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 'bold',
                                fontSize: 'h6.fontSize'
                            }}
                        >
                            {sponsorInfo()}</Typography>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Box
                        sx={{
                            display: 'flex',
                        }}    
                    >  
                        <Button 
                            sx={{
                                ":hover": {
                                    color: 'black',
                                    bgcolor: 'red'
                                },
                                backgroundColor: 'red',
                                color: 'white',
                                m: 1
                            }}
                            onClick={handleClose}
                        >No, don't Delete!</Button>
                        <Button 
                            sx={{
                                m: 1
                            }}
                            onClick={deleteSponsor}
                        >Yes I am sure</Button>
                    </Box>
                    
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
};
