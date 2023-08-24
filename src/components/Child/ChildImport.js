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
    List,
    ListItem,
    Paper,
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
        return PropertyObject.hasOwnProperty(PropertyName)
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
    let sponsorFound = currentSponsors.map((sponsor) => {
        if (sponsor.Phone===searchPhone) {
            found = sponsor.id;
        };
    });
    
    return found;    
};

const findChild_ByChildID = (searchChildID) => {
    let found = '';
    let childFound = currentChildren.map((child) => {
        if (child.ChildID===searchChildID) {
            found = child.id;
        };
    });
    
    return found;    
};

export default function ChildImport({ open, handleClose }){
    console.log("ChildImport");
    let processMsgs = [];
    let processFails = [];
    //Use State
    const [messages, setMessages] = useState([]);
    const [failures, setFailures] = useState([]);
    const [excelFile, setExcelFile] = useState(null);
    const [typeError, setTypeError] = useState(null);
    const [excelData, setExcelData] = useState(null);
    
    //Apollo    
    const { data: sponsor_data, loading: sponsor_loading, error: sponsor_error } = useQuery(gql(listSponsors)); 
    const { data: child_data, loading: child_loading, error: child_error } = useQuery(gql(listChildren)); 
    const [addChildMutation, { loading: loadingAdd, error: errorAdd, data: newChild }] = useMutation(gql(createChild));
    const [updateChildMutation, { loading: loadingUpdate, error: errorUpdate, data: updatedChild }] = useMutation(gql(updateChild));

    if(sponsor_data || !sponsor_loading ) {
        const SponsorList = sponsor_data.listSponsors.items.map((sponsor) => { 
            return currentSponsors.push(sponsor)
        });
    };
    
    if(child_data || !child_loading ) {
        const ChildList = child_data.listChildren.items.map((child) => {
            return currentChildren.push(child)
        });        
    };
    if(loadingAdd) {
        return <div>Creating Sponsor...</div>
    };    
    if(loadingUpdate) {
       return <div>Updating Sponsor...</div>
    };
    
    const AddNewChild = (childData) => {        
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

    const handleFileSubmit=(e)=>{
        e.preventDefault();
        if(excelFile!==null){
            const workbook = XLSX.read(excelFile,{type: 'buffer'});
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);
            console.log("data read from Excel", data);
            setExcelData(data);
        }
    };

    const handleDialogClose=() => {
        setExcelFile(null);
        setExcelData(null);
        setTypeError(null);
        handleClose();
    }

    const handleImport=() => {
        processMsgs = [];
        processFails = [];
        var sponsorID = '';
        var childID = '';
        var numAdd = 0;
        var numAddFail = 0;
        var numUpdate = 0;
        var numUpdateFail = 0;
        //Our source data is in the variable: excelData
        
        //Map through all rows
        excelData.map((row, index) => {
            
            const child = ConvertDataRow(row);
            
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
                    processMsgs.push(
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
                    processMsgs.push(
                        child.ChildID + " at row " + index + " with name: " + child.Name + " was updated"
                    );
                };
            };
            
        });
        processMsgs.push((numAdd+numAddFail+numUpdate+numUpdateFail) + " Records processed");
        
        processMsgs.push(numAdd + " Children Added");
        processMsgs.push(numAddFail + " Children Adds Failed");
        
        processMsgs.push(numUpdate + " Children Updated");
        processMsgs.push(numUpdateFail + " Children Updates Failed");
        
        setMessages(processMsgs);
        setFailures(processFails);
    };

    // onchange event
    const handleFile=(e)=>{
        setTypeError(null);
        let fileTypes = ['application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','text/csv'];
        let selectedFile = e.target.files[0];
        if(selectedFile){
            if(fileTypes.includes(selectedFile.type)){
                setTypeError(null);
                setExcelFile(null);
                setExcelData(null);
                let reader = new FileReader();
                reader.readAsArrayBuffer(selectedFile);
                reader.onload=(e)=>{                    
                    setExcelFile(e.target.result);
                };
            }else{
                setTypeError('File must be an Excel file type (*.xlsx)');
                setExcelFile(null);
                setExcelData(null);
            }
        }
    };

    const showMessages = () => {
        var showMsgs = messages.map((item) => {<ListItem>{item}</ListItem>});
        if (showMsgs.length===0) {showMsgs = ' There are no Messages'};
        return (
            <List>
                {showMsgs}
            </List>
        );
    };
    const showFailures = () => {
        var showMsgs = failures.map((item) => {<ListItem>{item}</ListItem>});
        if (showMsgs.length===0) {showMsgs = ' There are no Failures'};
        return (
            <List>
                {showMsgs}
            </List>
        );
    };

    return(
        
        <React.Fragment>
            <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="xl">
            <DialogTitle>Please Select an Excel File of Child Information</DialogTitle>
            <DialogContent>
                <div>
                    <form onSubmit={handleFileSubmit}>
                        <input type="file" required onChange={handleFile}/>
                        <Button type="submit" variant="text">Preview File</Button>                        
                        {typeError&&(
                            <Alert severity="error">{typeError}</Alert>
                        )}
                    </form>
                </div>

                <div>
                    <Paper elevation={6}>
                        {showMessages()}
                    </Paper>
                </div>

                <div>
                    <Paper elevation={6}>
                        {showFailures()}
                    </Paper>
                </div>

            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={handleDialogClose}>Cancel</Button>
                <Button variant="contained" onClick={handleImport}>Import</Button>
            </DialogActions>
            </Dialog>
        </React.Fragment>
    )
};