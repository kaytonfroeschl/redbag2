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
    Typography
} from '@mui/material';

import { gql, useMutation, useQuery } from '@apollo/client';
import { createChild, updateChild } from '../../graphql/mutations';
import { listChildren, listSponsors } from '../../graphql/queries';

var currentSponsors = [];
var currentChildren = [];

const ConvertDataRow = (row) => {
    var child = {};
    var value = '';
    
    value = hasProperty(row, "RBL Assigned");       child = {...child, RBL: value};
    value = hasProperty(row, "Red Bag Child ID#");  child = {...child, ChildID: value};
    value = hasProperty(row, "First Name");         child = {...child, Name: value};
    value = hasProperty(row, "Preferred Gender");   child = {...child, Gender: value};
    value = hasProperty(row, "Race");               child = {...child, Race: value};
    value = hasProperty(row, "Age");                child = {...child, Age: value};
    value = hasProperty(row, "Shirt Size");         child = {...child, Shirt: value};
    value = hasProperty(row, "Pant Size");          child = {...child, Pant: value};
    value = hasProperty(row, "Shoe Size");          child = {...child, Shoe: value};
    value = hasProperty(row, "Sibling IDs");        child = {...child, Siblings: value};
    value = hasProperty(row, "Wish List");          child = {...child, WishList:value};
    value = hasProperty(row, "Additional Info");    child = {...child, Info: value};
    value = hasProperty(row, "Sponsor");            child = {...child, SponsorName: value};    
    value = hasProperty(row, "Sponsor's Mobile #"); child = {...child, SponsorPhone: extractDigits(value)};
    value = hasProperty(row, "RBL Comments");       child = {...child, Comments: value};
    
    return child;
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
    const digits = textValue.replace(/\D/g, ''); 
    return digits;
};

const findSponsorID_ByPhone = (searchPhone) => {
    let found = '';
    currentSponsors.map((sponsor) => {
        if (sponsor.Phone===searchPhone) {
            found = sponsor.id;
        };
    });
    
    return found;    
};

const findChild_ByChildID = (searchChildID) => {
    let found = '';
    currentChildren.map((child) => {
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
export default function ChildImport({ open, handleClose }){
    console.log("ChildImport Begin");
    let processSummaryMsgs = [];
    let processDetailMsgs = [];
    let processFails = [];
    let excelData = null;
    //Use State
    const [summaryMsgs, setSummaryMsgs] = useState([]);
    const [messages, setMessages] = useState([]);
    const [failures, setFailures] = useState([]);
    const [excelFile, setExcelFile] = useState(null);
    const [typeError, setTypeError] = useState(null);
    const [fileName, setFileName] = useState('');
    //const [excelData, setExcelData] = useState(null);
    
    //Apollo    
    const { data: sponsor_data, loading: sponsor_loading, error: sponsor_error } = useQuery(gql(listSponsors)); 
    const { data: child_data, loading: child_loading, error: child_error } = useQuery(gql(listChildren)); 
    const [addChildMutation, { loading: loadingAdd, error: errorAdd }] = useMutation(gql(createChild));
    const [updateChildMutation, { loading: loadingUpdate, error: errorUpdate }] = useMutation(gql(updateChild));

    if(sponsor_data || !sponsor_loading ) {
        console.log("Loading Current Sponsor List");
        sponsor_data.listSponsors.items.map((sponsor) => { 
            return currentSponsors.push(sponsor)
        });
    };
    if(sponsor_error) {                
        setFailures(processFails => [...processFails, "Current Sponsor List Load error: " + sponsor_error]);
    };
    
    if(child_data || !child_loading ) {
        console.log("Loading Current Child List");
        child_data.listChildren.items.map((child) => {
            return currentChildren.push(child)
        });        
    };
    if(child_error) {                
        setFailures(processFails => [...processFails, "Current Child List Load error: " + child_error]);
    };

    if(loadingAdd) {
        console.log("Loading Add Child");
    };
    if(errorAdd) {                
        setFailures(processFails => [...processFails, "Create Child error: " + errorAdd]);
    };

    if(loadingUpdate) {
        console.log("Loading Update Child");
    };
    if(errorUpdate) {                
        setFailures(processFails => [...processFails, "Update Child error: " + errorUpdate]);
    };
    
    const AddNewChild = (childData) => {        
        console.log("Add Child");
        try{
            // const response = addSponsorMutation({
            //     variables: 
            //     { input: { 
            //         FirstName: sponsorData.Name, 
            //         LastName: '',
            //         Email: sponsorData.Email, 
            //         Phone: sponsorData.Phone, 
            //         Institution: sponsorData.Company, 
            //         Address: sponsorData.Address, 
            //         YearsActive: sponsorData.YearsActive, 
            //         } 
            //     }, 
            //     refetchQueries: [{ query: gql(listSponsors) }]
            // });
        } catch(error) {
            console.log("Add New Child error ", error);
            return "Create New Child failed with error: " + error;
        };        
        return "";
    };
    
    const UpdateChild = (childID, childData) => {        
        console.log("Update Child");        
        try{
            // const response = updateSponsorMutation({
            //     variables: 
            //     { input: { 
            //         FirstName: sponsorData.Name,
            //         Email: sponsorData.Email, 
            //         Phone: sponsorData.Phone, 
            //         Institution: sponsorData.Company, 
            //         Address: sponsorData.Address, 
            //         YearsActive: sponsorData.YearsActive, 
            //         } 
            //     }, 
            //     refetchQueries: [{ query: gql(listSponsors) }]
            // });
        } catch(error) {
            console.log("Update Child error ", error);
            return "Update Child failed with error: " + error;
        };
        return "";
    };

    // onchange event
    const handleFile=(e)=>{
        console.log("Handle File Event");
        setTypeError(null);
        setExcelFile(null);
        let fileTypes = ['application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','text/csv'];
        let selectedFile = e.target.files[0];
        if(selectedFile){
            if(fileTypes.includes(selectedFile.type)){
                console.log("selectedFile is", selectedFile);
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
        console.log("Handle Import Event");
        processDetailMsgs = [];
        processSummaryMsgs = [];
        processFails = [];
        var sponsorID = '';
        var childID = '';
        var numAdd = 0;
        var numAddFail = 0;
        var numUpdate = 0;
        var numUpdateFail = 0;

        if(excelFile===null){ 
            setMessages(["No Excel File Selected"]);
            return
        };
        
        const workbook = XLSX.read(excelFile,{type: 'buffer'});
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        excelData = XLSX.utils.sheet_to_json(worksheet);

        if(excelData===null){ 
            setMessages(["Unable to read the Excel File"]);
            return
        };

        console.log("Aboot to process Data", excelData);
        
        //Map through all rows
        excelData.map((row, index) => {
            
            let child = ConvertDataRow(row);
            
            if (child.ChildID.length===0) {
                childID = '';
            }else{
                childID = findChild_ByChildID(child.ChildID);
            };

            if (child.SponsorPhone.length===0) {
                sponsorID = '';
            }else{
                sponsorID = findSponsorID_ByPhone(child.SponsorPhone);
                //add the sponsorID to the child object so GraphQL will associate them (I hope)
                child = {...child, sponsorID};
            };
            
            if (childID==='') {                
                let addResult = AddNewChild(child);
                if (addResult.length > 0 ) {
                    numAddFail += 1;
                    processFails.push(
                        child.ChildID + " at row " + index + " failed to load: " + addResult
                    );
                }else{
                    numAdd += 1;
                    processDetailMsgs.push(
                        child.ChildID + " at row " + index + " with name: " + child.Name + " was ADDED"
                    );
                };
            }else{                                        
                let updateResult = UpdateChild(childID, child);
                if (updateResult.length > 0 ) {
                    numUpdateFail += 1;
                    processFails.push(
                        child.ChildID + " at row " + index + " failed to load: " + updateResult
                    );
                }else{
                    numUpdate += 1;
                    processDetailMsgs.push(
                        child.ChildID + " at row " + index + " with name: " + child.Name + " was updated"
                    );
                };
            };
            
        });
        processSummaryMsgs.push((numAdd+numAddFail+numUpdate+numUpdateFail) + " Records processed");
        
        processSummaryMsgs.push(numAdd + " Children Added");
        processSummaryMsgs.push(numAddFail + " Children Adds Failed");
        
        processSummaryMsgs.push(numUpdate + " Children Updated");
        processSummaryMsgs.push(numUpdateFail + " Children Updates Failed");

        setSummaryMsgs(processSummaryMsgs);

        setMessages(processDetailMsgs);
        setFailures(processFails);
        console.log("End of Handle Import Event");
    };

    const showSummaryMessages = () => {
        console.log("showSummaryMessages begin");
        if (summaryMsgs.length===0) {
            return <Alert severity="success">No Summary Yet</Alert>
        }else{
            var showMsgs = summaryMsgs.map((msg) => {
                return(<Typography>{msg}</Typography>);
            });
            return (<>{showMsgs}</>);
        };
    };
    const showDetailMessages = () => {
        console.log("showDetailMessages begin");
        if (messages.length===0) {
            return <Alert severity="success">There Are No Messages</Alert>
        }else{
            var showMsgs = messages.map((msg) => {
                return(<Typography>{msg}</Typography>);
            });
            return (<>{showMsgs}</>);
        };
    };
    const showFailures = () => {
        if (failures.length===0){
            return <Alert severity="success">There Are No Failures</Alert>
        }else{            
            var showMsgs = failures.map((msg) => {
                return(<Typography>{msg}</Typography>);
            });
            
            return (
                <Alert severity='error'>
                    {showMsgs}
                </Alert>
            );
        };
    };

    return(
        
        <React.Fragment>
            <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="xl">
            <DialogTitle>Please Select an Excel File of Child Information</DialogTitle>
            <DialogContent>
            <Button variant="contained" component="label">
                Select File
                <input type="file" onChange={handleFile} hidden/>
            </Button>

            <Stack spacing={2}>
                <div>
                    {fileName&&(
                        <h3>Ready to Import Child File: {fileName}</h3>
                    )}
                    {typeError&&(
                        <Alert severity="error">{typeError}</Alert>
                    )}
                </div>

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