import * as React from 'react';
import { useState } from 'react';
import * as XLSX from 'xlsx';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Alert,
    Paper,
    Stack,
    Typography,
    Box,
} from '@mui/material';
/* 
==============================================================================================
                Component Starts Here
================================================================================================*/
export default function SponsorExport({ open, handleClose, sponsorList }){
    
    const [exportInfo, setExportInfo] = useState("Ready to export " + sponsorList.length + " Sponsors");
    const [summaryMsgs, setSummaryMsgs] = useState([]);
    
    //-----------------------------------------------------------------
    //      User clicks "Export" button
    //-----------------------------------------------------------------
    const handleExport=() => {
        let processSummaryMsgs = [];

        const worksheet = XLSX.utils.json_to_sheet(sponsorList);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Red Bag Sponsors");
        XLSX.writeFile(workbook, "RedBagSponsorExport.xlsx", { compression: true });

        setExportInfo("Sponsor Data was Exported");
        processSummaryMsgs.push("Sponsors exported to: RedBagSponsorExport.xlsx");
        setSummaryMsgs(processSummaryMsgs);
    };

    //-----------------------------------------------------------------
    //      Render support stuff
    //-----------------------------------------------------------------
    const showSummaryMessages = () => {
        if (summaryMsgs.length===0) {
            return <Alert severity="success">No Export Summary Messages</Alert>
        }else{
            var showMsgs = summaryMsgs.map((msg, index) => {
                return(<Typography key={index}>{msg}</Typography>);
            });
            return (<>{showMsgs}</>);
        };
    };

    //-----------------------------------------------------------------
    //      User closes export dialog
    //-----------------------------------------------------------------
    const handleDialogClose=() => {
        handleClose();
    }

    /* 
    ==============================================================================================
                    User Interface
    ================================================================================================*/
    return(
        
        <React.Fragment>
            <Dialog open={open} onClose={handleClose} fullWidth={false} maxWidth="m">
                <DialogTitle>Export Sponsor Informaton</DialogTitle>
                <DialogContent>
                    <Stack spacing={2}>
                        {exportInfo&&(
                            <div>
                                <h3>{exportInfo}</h3>
                            </div>
                        )}

                        <div>
                            <Paper elevation={6}>
                                {showSummaryMessages()}
                            </Paper>
                        </div>
                    </Stack>
                </DialogContent>

                <DialogActions>
                    <Button variant="outlined" onClick={handleDialogClose}>Cancel</Button>
                    <Button variant="contained" onClick={handleExport}>Export</Button>
                </DialogActions>

            </Dialog>
        </React.Fragment>
    )
};