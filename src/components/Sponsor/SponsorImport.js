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
    Typography,
    Box,
    Stack,
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

	if (!headers.includes("first name")) {errors.push("Missing 'first name'")};
    if (!headers.includes("last name")) {errors.push("Missing 'last name'")};
    if (!headers.includes("company name")) {errors.push("Missing 'company name'")};
    if (!headers.includes("street")) {errors.push("Missing 'street'")};
    if (!headers.includes("city")) {errors.push("Missing 'city'")};
    if (!headers.includes("state")) {errors.push("Missing 'state'")};
    if (!headers.includes("zip")) {errors.push("Missing 'zip'")};
    if (!headers.includes("years")) {errors.push("Missing 'years'")};
    return errors;
};

const ConvertDataRow = (row) => {
    var sponsor = {};
    var value = '';
    
    value = hasProperty(row, "first name");     sponsor = {...sponsor, FirstName: value};
    value = hasProperty(row, "last name");      sponsor = {...sponsor, LastName: value};
    value = hasProperty(row, "company name");   sponsor = {...sponsor, Institution: value};
    value = hasProperty(row, "street");         sponsor = {...sponsor, AddressStreet: value};
    value = hasProperty(row, "city");           sponsor = {...sponsor, AddressCity: value};
    value = hasProperty(row, "state");          sponsor = {...sponsor, AddressState: value};
    value = hasProperty(row, "zip");            sponsor = {...sponsor, AddressZip: value};
    value = hasProperty(row, "years");          sponsor = {...sponsor, YearsActive: value}; 
    
    sponsor = {...sponsor, Address: ""};

    let Name = "";
    if(sponsor.FirstName.length > 0) {
        Name = sponsor.FirstName
    };

    if(sponsor.LastName.length > 0) { 
        if(Name.length > 0 ) { Name += " "}
        Name += sponsor.LastName
    };

    if(sponsor.Institution) {
        if(Name.length > 0) {
            Name = Name + " (" + sponsor.Institution + ")"
        }else{
            Name = sponsor.Institution
        }
    }
    sponsor = {...sponsor, Name};

    return sponsor;
};

const hasProperty = (PropertyObject, PropertyName) => {
    if (PropertyObject.hasOwnProperty(PropertyName)) {
        return PropertyObject[PropertyName];
    }else{
        return '';
    };
}
/* 
==============================================================================================
                Component Starts Here
================================================================================================*/
export default function ImportSponsors({ open, handleClose, AddSponsor }){
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
        //console.log("handleFile, BEGIN");
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
            setTypeError(isValidFile);
        }else{
            loadSpreadsheetFile(fileToProcess);
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

            let excelData = XLSX.utils.sheet_to_json(worksheet);
            console.log("validateFileContents, excelData is", excelData);
    
            if(excelData.length===0){ 
                console.log("validateFileContents No Excel Data");
                return "There is no Excel Data in file";
            };

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

            let sponsor = ConvertDataRow(row);
            
            numProcessed += 1;
            let rowNum = index +2;
            
            console.log("Processing Sponsor: at row #" + rowNum, sponsor);

            let addResult = AddSponsor(sponsor);
            if (addResult.length > 0 ) {
                console.log("Add Failed");
                numFail += 1;
                processFails.push(
                    "Sponsor at row " + rowNum + 
                    " with name: " + sponsor.Name + 
                    " failed to load: " + addResult
                );
            }else{                    
                console.log("Sponsor Added");
                numAdd += 1;
                processDetailMsgs.push(
                    "Sponsor at row " + rowNum + 
                    " with name: " + sponsor.Name + 
                    " was ADDED"
                );
            };
        }); //end if data processing loop

        processSummaryMsgs.push("The File: " + fileName + " was processed.");
        processSummaryMsgs.push("   " + (numProcessed) + " Records processed");
        
        processSummaryMsgs.push("   " + numAdd + " Sponsors were Added");
        processSummaryMsgs.push("   " + numFail + " Sponsors were not added");

        setSummaryMsgs(processSummaryMsgs);

        setMessages(processDetailMsgs);
        setFailures(processFails);
        setFileInfo(fileName + " was imported");
        setPrintButton("contained");
        setImportButton("outlined");
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
            <DialogTitle>Import SPONSOR Informaton</DialogTitle>
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