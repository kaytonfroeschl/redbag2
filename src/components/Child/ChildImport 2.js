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
    //if (!headers.includes("Sponsor")) {errors.push("Missing 'Sponsor'")};
    //if (!headers.includes("Sponsor's Mobile #")) {errors.push("Missing 'Sponsor's Mobile #'")};
    //if (!headers.includes("RBL Comments")) {errors.push("Missing 'RBL Comments'")};

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

const validateRequiredProperties = (child, rowNum) => {
    if (child.ChildID.length===0) {return "Row " + rowNum + " Does NOT have a 'Red Bag Child ID#' value."};
    if (child.Firstname.length===0) {return "Row " + rowNum + " Does NOT have a 'First Name' value."};
    return '';
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
    
//---------------------------------------------------- 
//      Find Functions 
//----------------------------------------------------
const findSponsorID_ByPhone = (searchPhone, sponsorList) => {
    let found = '';
    sponsorList.map((sponsor) => {
        if (extractDigits(sponsor.Phone)===searchPhone) {
            found = sponsor.id;
        };
    });    
    return found;    
};

const findRBL_ByName = (searchName, rblList) => {
    let found = '';
    let name = '';
    rblList.map((rbl) => {
        name = (rbl.FirstName.replace(/\s/g,'') + rbl.LastName.replace(/\s/g,'')).toLowerCase();
        if (name===searchName) {
            found = rbl.id;
        };
    });    
    return found;    
};

const findChild_ByChildID = (searchChildID, childList) => {
    let found = '';        
    childList.map((child) => {
        if (child.ChildID===searchChildID) {
            found = child.id;
        };
    });
    return found;        
};
/* 
==============================================================================================
                Component Starts Here
================================================================================================*/
export default function ChildImport({ open, handleClose, childList, sponsorList, rblList, AddChild }){
    //console.log("ChildImport Begin");
    let processSummaryMsgs = [];
    let processDetailMsgs = [];
    let processFails = [];
    let ExcelFileName = '';
    //Use State
    const [summaryMsgs, setSummaryMsgs] = useState([]);
    const [messages, setMessages] = useState([]);
    const [failures, setFailures] = useState([]);
    const [dataToProcess, setDataToProcess] = useState(null);
    const [typeError, setTypeError] = useState(null);
    const [fileName, setFileName] = useState('');
    const [fileInfo, setFileInfo] = useState('');
    const [printButton, setPrintButton] = useState('outlined');
    const [fileButton, setFileButton] = useState('contained');
    const [importButton, setImportButton] = useState('outlined');

    //-----------------------------------------------------------------
    //      User Selectes a file from the file picker
    //-----------------------------------------------------------------
    const handleFile=(e)=>{
        console.log("handleFile, BEGIN");
        setTypeError("");
        setDataToProcess(null);
        setFailures([]);
        setMessages([]);
        setSummaryMsgs([]);
        setFileName("");

        ExcelFileName = '';
        setPrintButton("outlined");
        setImportButton("outlined");
        
        const fileToProcess = e.target.files[0]        
        const isValidFile = validateFileType(fileToProcess);        
        if(isValidFile.length > 0) {
            console.log("handleFile, not a valid file: " + isValidFile);
            setTypeError(isValidFile);
        }else{
            console.log("handleFile, before loadSpreadsheetFile ");
            loadSpreadsheetFile(fileToProcess);
            console.log("handleFile, after loadSpreadsheetFile");
        };
        console.log("handleFile, END");
    };

    const validateFileType = (selectedFile) => {        
        let fileTypes = ['application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','text/csv'];
        
        if(selectedFile){
            if(fileTypes.includes(selectedFile.type)){
                ExcelFileName = selectedFile.name
                setFileInfo("Selected File is '" + ExcelFileName + "'");
                setFileName(ExcelFileName);                
                return '';    
            }else{
                return "File must be an Excel file type (*.xlsx)";
            }
        };
        
        return '';
    };

    const loadSpreadsheetFile = (fileToProcess) => {
        console.log("1. loadSpreadsheetFile, begin.  Input parm is: ", fileToProcess);
        let reader = new FileReader();
        reader.readAsArrayBuffer(fileToProcess);
        reader.onload=(e)=>{ 
            console.log("2. loadSpreadsheetFile, reader.onload, about to call validateFileContents");
            stupidCallBackToContinueLoadingFile(e.target.result);
        };
        console.log("3. loadSpreadsheetFile, done.");
    };

    const stupidCallBackToContinueLoadingFile = (arrayBuffer) => {
        let result = validateFileContents(arrayBuffer);
        setTypeError(result);
    };

    const validateFileContents = (arrayBuffer) => {
        console.log("validateFileContents BEGIN");
        if(arrayBuffer){
            const workbook = XLSX.read(arrayBuffer,{type: 'buffer'});
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
    
            const headers = getHeaders(worksheet);
            //console.log("validateFileContents, Headers", headers);
    
            const headerErrors = ValidateHeaders(headers);
            if (headerErrors.length!==0) {
                let errorMsg = "Missing columns in the file... ";
                headerErrors.map((errMsg) => {
                    errorMsg += "\n   " + errMsg;
                });
                return errorMsg;
            };
            
            console.log("validateFileContents Loading Excel Data");
            let excelData = XLSX.utils.sheet_to_json(worksheet);
            console.log("validateFileContents, excelData is", excelData);
    
            if(excelData.length===0){ 
                console.log("validateFileContents No Excel Data");
                return "No Excel Data in file";
            };
    
            let preProcessErrors = CheckDataForErrors(excelData);
            if(preProcessErrors.length > 0) {
                console.log("validateFileContents preProcessErrors (dup ChildIDs in SS)");
                return "Errors in file: " + preProcessErrors;
            };

            console.log("validateFileContents No errors");

            setFileButton("outlined");
            setImportButton("contained");
            setFileInfo("Ready to import spreadsheet: '" + ExcelFileName + "' with " + excelData.length + " data rows");
            setDataToProcess(excelData);

            return '';

        }else{
            return "Problem loading the Spreadsheet File";
        };
    };

    //-----------------------------------------------------------------
    //      User clicks "Import" button
    //-----------------------------------------------------------------
    const handleImport=() => {
        //console.log("Handle Import Event");
        processDetailMsgs = [];
        processSummaryMsgs = [];
        processFails = [];
        var numProcessed = 0;
        var numAdd = 0;
        var numFail = 0;

        dataToProcess.map((row, index) => {
            //console.log("row", row);

            let child = ConvertDataRow(row);
            //console.log("child (from row)", child);

            let childID = '';
            let sponsorID = '';
            let rblID = '';
            let searchName = '';
            let fatalError = false;
            let result = '';
            
            numProcessed += 1;
            let rowNum = index +2;
            console.log("Processing ChildID: " + child.ChildID + ", row #" + rowNum);

            result = validateRequiredProperties(child);
            if(result.length > 0) {
                processFails.push(result);
                fatalError = true;
            }else{
                childID = findChild_ByChildID(child.ChildID, childList);
                if (childID.length > 0 ) {
                    fatalError = true;
                    processFails.push(
                        "ChildID: " + child.ChildID + 
                        " at row " + rowNum + 
                        " Already exists in the database! Updates are NOT ALLOWED."
                    );
                };
            };

            if (child.SponsorPhone.length===0) {
                sponsorID = '';
            }else{
                sponsorID = findSponsorID_ByPhone(child.SponsorPhone, sponsorList);
                if (sponsorID.length===0) {
                    console.log("No sponsor with that phone number");
                    fatalError = true;
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
                rblID = findRBL_ByName(searchName, rblList);                
                if (rblID.length===0) {
                    fatalError = true;
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

            console.log("Final Child Data looks like this", child);

            if (fatalError ) {
                //if we already have identified a bad row, do not try to insert it.
                numFail += 1;
            }else{
                if (childID==='') {
                    let addResult = AddChild(child);
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
            };
        }); //end if data processing loop

        processSummaryMsgs.push("The File: " + fileName + " was processed.");
        processSummaryMsgs.push("   " + (numProcessed) + " Records processed");
        
        processSummaryMsgs.push("   " + numAdd + " Children were Added");
        processSummaryMsgs.push("   " + numFail + " Children were not added");
        // processSummaryMsgs.push("   " + numUpdate + " Children Updated");
        // processSummaryMsgs.push("   " + numUpdateFail + " Children Updates Failed");

        setSummaryMsgs(processSummaryMsgs);

        setMessages(processDetailMsgs);
        setFailures(processFails);
        setFileInfo(fileName + " was imported");
        setPrintButton("contained");
        setImportButton("outlined");
        //console.log("End of Handle Import Event");
    };

    //-----------------------------------------------------------------
    //      Render support stuff
    //-----------------------------------------------------------------
    const showSummaryMessages = () => {
        //console.log("showSummaryMessages begin");
        if (summaryMsgs.length===0) {
            return <Alert severity="success">No Import Summary Messages</Alert>
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
            return <Alert severity="success">No Import Detail Messages</Alert>
        }else{
            var showMsgs = messages.map((msg, index) => {
                return(<Typography key={index}>{msg}</Typography>);
            });
            return (<>{showMsgs}</>);
        };
    };
    const showFailures = () => {
        if (failures.length===0){
            return <Alert severity="success">No Import Failures</Alert>
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

    //-----------------------------------------------------------------
    //      User closes import dialog
    //-----------------------------------------------------------------
    const handleDialogClose=() => {
        setDataToProcess(null);
        setFileName('');
        setTypeError(null);
        handleClose();
    }

    /* 
    ==============================================================================================
                    User Interface
    ================================================================================================*/
    return(
        
        <React.Fragment>
            <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="xl">
            <DialogTitle>Import Child Informaton</DialogTitle>
            <DialogContent>

            <Stack spacing={2}>
                {fileInfo&&(
                    <div>
                        <h3>{fileInfo}</h3>
                    </div>
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
                    <Button variant={fileButton} component="label">
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
                <Button variant={importButton} onClick={handleImport}>Import</Button>
            </DialogActions>
            </Dialog>
        </React.Fragment>
    )
};