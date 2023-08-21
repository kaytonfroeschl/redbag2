import * as React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from '@mui/material';

export default function ImportSponsors({ open, handleClose }){
    return(
        <React.Fragment>
            <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Import a File</DialogTitle>
            <DialogContent>
                Blah blah
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Import</Button>
            </DialogActions>
            </Dialog>
        </React.Fragment>
    )
};