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

// import { gql, useMutation, useQuery } from '@apollo/client';
// import { listChildren, listSponsors, listRBLS } from '../../graphql/queries';
//import { Padding } from '@mui/icons-material';

// var currentSponsors = [];
// var currentRBLs = [];
// var currentChildren = [];

const getHeaders = (sheet) => {
    var headers = [];
    var range = XLSX.utils.decode_range(sheet['!ref']); //get all data from the sheet
    //range.s is the upper-left corner of the range, range.e is the bottom right
    var C, R = range.s.r; /* start in the first row */
    /* walk every column in the range */
    for(C = range.s.c; C <= range.e.c; ++C) {
        var cell = sheet[XLSX.utils.encode_cell({c:C, r:R})] /* find the cell in the first row */

        var hdr = "UNKNOWN " + C; // <-- replace with your desired default 
        if(cell && cell.t) hdr = XLSX.utils.format_cell(cell);

        headers.push(hdr);
    }
    return headers;
};

const ValidateHeaders = (headers) => {
    let errors = [];

	if (!headers.includes("RBL Assigned")) {errors.push("Missing 'RBL Assigned'")};
    if (!headers.includes("Red Bag Child ID#")) {errors.push("Missing 'Red Bag Child ID#'")};
    if (!headers.includes("First Name")) {errors.push("Missing 'First Name'")};
    if (!headers.includes("Preferred Gender")) {errors.push("Missing 'Preferred Gender'")};
    if (!headers.includes("Race")) {errors.push("Missing 'Race'")};
    if (!headers.includes("Age")) {errors.push("Missing 'Age'")};
    if (!headers.includes("Shirt Size")) {errors.push("Missing 'Shirt Size'")};
    if (!headers.includes("Pant Size")) {errors.push("Missing 'Pant Size'")};
    if (!headers.includes("Shoe Size")) {errors.push("Missing 'Shoe Size'")};
    if (!headers.includes("Sibling IDs")) {errors.push("Missing 'Sibling IDs'")};
    if (!headers.includes("Wish List")) {errors.push("Missing 'Wish List'")};
    if (!headers.includes("Additional Info")) {errors.push("Missing 'Additional Info'")};
    if (!headers.includes("Sponsor")) {errors.push("Missing 'Sponsor'")};
    if (!headers.includes("Sponsor's Mobile #")) {errors.push("Missing 'Sponsor's Mobile #'")};
    if (!headers.includes("RBL Comments")) {errors.push("Missing 'RBL Comments'")};

    return errors;
};

const ConvertDataRow = (row) => {
    var child = {};
    var value = '';
    
    value = hasProperty(row, "RBL Assigned");       child = {...child, RBL: value};
    value = hasProperty(row, "Red Bag Child ID#");  child = {...child, ChildID: value};
    value = hasProperty(row, "First Name");         child = {...child, Firstname: value};
    value = hasProperty(row, "Preferred Gender");   child = {...child, Gender: value};
    value = hasProperty(row, "Race");               child = {...child, Race: value};
    value = hasProperty(row, "Age");                child = {...child, Age: value};
    value = hasProperty(row, "Shirt Size");         child = {...child, ShirtSize: value};
    value = hasProperty(row, "Pant Size");          child = {...child, PantSize: value};
    value = hasProperty(row, "Shoe Size");          child = {...child, ShoeSize: value};
    value = hasProperty(row, "Sibling IDs");        child = {...child, Siblings: value};
    value = hasProperty(row, "Wish List");          child = {...child, Wishlist:value};
    value = hasProperty(row, "Additional Info");    child = {...child, Info: value};
    value = hasProperty(row, "Sponsor");            child = {...child, SponsorName: value};    
    value = hasProperty(row, "Sponsor's Mobile #"); child = {...child, SponsorPhone: extractDigits(''+value)};
    value = hasProperty(row, "RBL Comments");       child = {...child, Comments: value};
    
    return child;
};

const CheckDataForErrors = (dataFromSS) => {
    const sorted = dataFromSS.sort((a, b) => {
        const childA = hasProperty(a, "Red Bag Child ID#").toUpperCase();
        const childB = hasProperty(b, "Red Bag Child ID#").toUpperCase();
        if (childA < childB) {return -1};
        if (childA > childB) {return  1}
        return 0;
      });
    
    let lastChildID = '';
    let errors = [];
    sorted.map((childRow) => {
        const ssChildID = hasProperty(childRow, "Red Bag Child ID#");
        if(ssChildID === lastChildID) {
            errors.push("ChildID: '" + ssChildID + "' is associated with to two different rows.")
        };
        lastChildID = ssChildID;
    });
    return errors;
};

const hasProperty = (PropertyObject, PropertyName) => {
    if (PropertyObject.hasOwnProperty(PropertyName)) {
        return PropertyObject[PropertyName];
    }else{
        return '';
    };
}

const extractDigits = (textValue) => {
    // Replace all non-digit characters with an empty string
    if (textValue.length===0) {return ''}
    const digits = textValue.replace(/\D/g, ''); 
    return digits;
};
/* 
==============================================================================================
                Component Starts Here
================================================================================================*/
export default function ChildImport({ open, handleClose, GetChildList, sponsorList, rblList, AddChild }){
    //console.log("ChildImport Begin");
    let processSummaryMsgs = [];
    let processDetailMsgs = [];
    let processFails = [];
    let excelData = null;
    let childList = [];
    //Use State
    const [summaryMsgs, setSummaryMsgs] = useState([]);
    const [messages, setMessages] = useState([]);
    const [failures, setFailures] = useState([]);
    const [excelFile, setExcelFile] = useState(null);
    const [typeError, setTypeError] = useState(null);
    const [fileName, setFileName] = useState('');
    const [printButton, setPrintButton] = useState('outlined');
    //const [excelData, setExcelData] = useState(null);

    //console.log("Prop 'childList'", childList);
    
    //---------------------------------------------------- 
    //      Find Functions 
    //----------------------------------------------------
    const findSponsorID_ByPhone = (searchPhone) => {
        let found = '';
        sponsorList.map((sponsor) => {
            if (extractDigits(sponsor.Phone)===searchPhone) {
                found = sponsor.id;
            };
        });    
        return found;    
    };

    const findRBL_ByName = (searchName) => {
        let found = '';
        let name = '';
        rblList.map((rbl) => {
            name = (rbl.FirstName + rbl.LastName).toLowerCase();
            if (name===searchName) {
                found = rbl.id;
            };
        });    
        return found;    
    };

    const findChild_ByChildID = (searchChildID) => {
        let found = '';        
        childList.map((child) => {
            if (child.ChildID===searchChildID) {
                found = child.id;
            };
        });
        return found;        
    };

    const handleFile=(e)=>{
        //console.log("Handle File Event");
        setTypeError(null);
        setExcelFile(null);
        setFailures([]);
        setMessages([]);
        setSummaryMsgs([]);
        let fileTypes = ['application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','text/csv'];
        let selectedFile = e.target.files[0];
        if(selectedFile){
            if(fileTypes.includes(selectedFile.type)){
                setFileName(selectedFile.name);
                let reader = new FileReader();
                reader.readAsArrayBuffer(selectedFile);
                reader.onload=(e)=>{ 
                    setExcelFile(e.target.result);
                };
            }else{
                setTypeError('File must be an Excel file type (*.xlsx)');
            }
        }
    };

    const handleDialogClose=() => {
        setExcelFile(null);
        setFileName('');
        setTypeError(null);
        handleClose();
    }

    const handleImport=() => {
        //console.log("Handle Import Event");
        processDetailMsgs = [];
        processSummaryMsgs = [];
        processFails = [];
        var numProcessed = 0;
        var numAdd = 0;
        // var numAddFail = 0;
        // var numUpdate = 0;
        // var numUpdateFail = 0;
        var numFail = 0;

        if(excelFile===null){ 
            setFailures(processFails => [...processFails, "No Excel File"]);
            return
        };
        
        const workbook = XLSX.read(excelFile,{type: 'buffer'});
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];

        const headers = getHeaders(worksheet);
        //console.log("Headers", headers);

        const headerErrors = ValidateHeaders(headers);
        if (headerErrors.length!==0) {
            processFails.push("Missing columns in the file " + fileName);
            headerErrors.map((errMsg) => {
                return processFails.push("  " + errMsg);
            });
            setFailures(processFails);
            return;
        };

        excelData = XLSX.utils.sheet_to_json(worksheet);
        //console.log("excelData is", excelData);

        if(excelData===null){ 
            setFailures(processFails => [...processFails, "No Excel Data in file: " + fileName]);
            return;
        };

        let preProcessErrors = CheckDataForErrors(excelData);
        if(preProcessErrors.length > 0) {
            preProcessErrors.push("No Data Was Loaded from file: " + fileName);
            setFailures(preProcessErrors);
            return;
        };
        
        excelData.map((row, index) => {
            //console.log("row", row);

            let child = ConvertDataRow(row);
            //console.log("child (from row)", child);

            let childID = '';
            let sponsorID = '';
            let rblID = '';
            let searchName = '';
            let childError = false;
            
            numProcessed += 1;
            let rowNum = index +2;
            console.log("Processing ChildID: " + child.ChildID + ", row #" + rowNum);
            
            if (child.ChildID.length===0) {
                console.log("no ChildID");
                childError = true;
                processFails.push(
                    "Row " + rowNum + 
                    " Does NOT have a 'Red Bag Child ID#' value."
                );
            };

            if (child.Firstname.length===0) {
                console.log("no first name");
                childError = true;
                processFails.push(
                    "ChildID: " + child.ChildID + 
                    " at row " + rowNum + 
                    " Does NOT have a 'First Name' value."
                );
            };

            childID = findChild_ByChildID(child.ChildID);
            if (childID.length > 0 ) {
                console.log("ChildID already exists");
                childError = true;
                processFails.push(
                    "ChildID: " + child.ChildID + 
                    " at row " + rowNum + 
                    " Already exists in the database! Updates are NOT ALLOWED."
                );

            };

            if (child.SponsorPhone.length===0) {
                sponsorID = '';
            }else{
                sponsorID = findSponsorID_ByPhone(child.SponsorPhone);
                if (sponsorID.length===0) {
                    console.log("No sponsor with that phone number");
                    childError = true;
                    processFails.push(
                        "ChildID: " + child.ChildID + 
                        " at row " + rowNum + 
                        " Sponsor not found using sponsor's phone number: " + child.SponsorPhone
                    );
                }else{
                    console.log("Sponsor Found");
                    child = {...child, sponsorID};
                };                
            };

            if (child.RBL.length===0) {
                rblID = '';
            }else{
                searchName = child.RBL.replace(/\s/g, '').toLowerCase();
                rblID = findRBL_ByName(searchName);                
                if (rblID.length===0) {
                    console.log("No RBL");
                    childError = true;
                    processFails.push(
                        "ChildID: " + child.ChildID + 
                        " at row " + rowNum + 
                        " Red Bag Lady not found using : " + searchName
                    );
                }else{
                    console.log("RBL found");
                    child = {...child, rblID};
                };                
            };

            //console.log("Final Child Data looks like this", child);

            if (!childError) {          
                if (childID==='') {
                    console.log("ChildImport: about to call ChildScreen.handleAddChild");
                    let addResult = AddChild(child);
                    console.log("ChildImport: after call to ChildScreen.handleAddChild. Result: " + addResult);
                    if (addResult.length > 0 ) {
                        console.log("Add Failed");
                        numFail += 1;
                        processFails.push(
                            "ChildID: " + child.ChildID + 
                            " at row " + rowNum + 
                            " failed to load: " + addResult
                        );
                    }else{                    
                        console.log("Child Added");
                        numAdd += 1;
                        processDetailMsgs.push(
                            "ChildID: " + child.ChildID + 
                            " at row " + rowNum + 
                            " with name: " + child.Firstname + 
                            " was ADDED"
                        );
                    };
                //}else{                                     
                    // let updateResult = UpdateChild(childID, child);
                    // if (updateResult.length > 0 ) {
                    //     numUpdateFail += 1;
                    //     processFails.push(
                    //         "ChildID: " + child.ChildID + 
                    //         " at row " + index + 
                    //         " failed to load: " + updateResult
                    //     );
                    // }else{
                    //     numUpdate += 1;
                    //     processDetailMsgs.push(
                    //         "ChildID: " + child.ChildID + 
                    //         " at row " + index + 
                    //         " with name: " + child.Firstname + 
                    //         " was updated"
                    //     );
                    // };
                
                };
            }else{  
                //if we already have identified a bad row, do not try to insert it.
                numFail += 1;
            };            
        });
        processSummaryMsgs.push("The File: " + fileName + " was processed.");
        processSummaryMsgs.push("   " + (numProcessed) + " Records processed");
        
        processSummaryMsgs.push("   " + numAdd + " Children were Added");
        processSummaryMsgs.push("   " + numFail + " Children were not added");
        // processSummaryMsgs.push("   " + numUpdate + " Children Updated");
        // processSummaryMsgs.push("   " + numUpdateFail + " Children Updates Failed");

        setSummaryMsgs(processSummaryMsgs);

        setMessages(processDetailMsgs);
        setFailures(processFails);
        setPrintButton("contained");
        //console.log("End of Handle Import Event");
    };

    const showSummaryMessages = () => {
        //console.log("showSummaryMessages begin");
        if (summaryMsgs.length===0) {
            return <Alert severity="success">No Summary Yet</Alert>
        }else{
            var showMsgs = summaryMsgs.map((msg, index) => {
                return(<Typography key={index}>{msg}</Typography>);
            });
            return (<>{showMsgs}</>);
        };
    };
    const showDetailMessages = () => {
        //console.log("showDetailMessages begin");
        if (messages.length===0) {
            return <Alert severity="success">There Are No Messages</Alert>
        }else{
            var showMsgs = messages.map((msg, index) => {
                return(<Typography key={index}>{msg}</Typography>);
            });
            return (<>{showMsgs}</>);
        };
    };
    const showFailures = () => {
        if (failures.length===0){
            return <Alert severity="success">There Are No Failures</Alert>
        }else{            
            var showMsgs = failures.map((msg, index) => {
                return(<Typography key={index}>{msg}</Typography>);
            });
            
            return (
                <Alert severity='error'>
                    {showMsgs}
                </Alert>
            );
        };
    };

    const print = () => {window.print()};

    return(
        
        <React.Fragment>
            <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="xl">
            <DialogTitle>Please Select an Excel File of Child Information</DialogTitle>
            <DialogContent>

            <Stack spacing={2}>
                {fileName&&(
                    <h3>Ready to Import Child File: {fileName}</h3>
                )}

                <Box 
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        p: 1,
                        m: 1,
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                    }}
                >
                    <Button variant="contained" component="label">
                        Select File
                        <input type="file" onChange={handleFile} hidden/>
                    </Button>
                    <Button variant={printButton} onClick={print}>
                        Print
                    </Button>
                </Box>

                {typeError&&(
                    <Alert severity="error">{typeError}</Alert>
                )}

                <div>
                    <Paper elevation={6}>
                        {showSummaryMessages()}
                    </Paper>
                </div>

                <div>
                    <Paper elevation={3}>
                        {showDetailMessages()}
                    </Paper>
                </div>

                <div>
                    <Paper elevation={3}>
                        {showFailures()}
                    </Paper>
                </div>
            </Stack>

            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={handleDialogClose}>Cancel</Button>
                <Button variant="contained" onClick={handleImport}>Import</Button>
            </DialogActions>
            </Dialog>
        </React.Fragment>
    )
};