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
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
} from '@mui/material';

import { gql, useMutation, useQuery } from '@apollo/client';
import { createSponsor, updateSponsor } from '../../graphql/mutations';
import { listSponsors } from '../../graphql/queries';


var SponsorsList = [];

const ConvertDataRow = (row) => {
    var sponsor = {};
    var addr = '';

    if (row.hasOwnProperty("Sponsor Name")) {
        sponsor = {...sponsor, Name: row["Sponsor Name"]};
    }else{
        sponsor = {...sponsor, Name: ''};
    };
    
    if (row.hasOwnProperty("Company Name")) {
        sponsor = {...sponsor, Company: row["Company Name"]};
    }else{
        sponsor = {...sponsor, Company: ''};
    };
    
    if (row.hasOwnProperty("Email")) {
        sponsor = {...sponsor, Email: row["Email"]};
    }else{
        sponsor = {...sponsor, Email: ''};
    };
    
    if (row.hasOwnProperty("Phone")) {
        sponsor = {...sponsor, Phone: extractDigits(''+row["Phone"])};
    }else{
        sponsor = {...sponsor, Phone: 0};
    };
    
    if (row.hasOwnProperty("Street Address")) {
        addr = row["Street Address"];
    };
    if (row.hasOwnProperty("City")) {
        addr = addr + " " + row["City"];
    };    
    if (row.hasOwnProperty("State")) {
        addr = addr + " " + row["State"];
    };    
    if (row.hasOwnProperty("Zip Code")) {
        addr = addr + " " + row["Zip Code"];
    };
    if (addr.length > 0 ) {
        sponsor = {...sponsor, Address: addr};
    }else{
        sponsor = {...sponsor, Address: ''};
    }
    
    if (row.hasOwnProperty("Years Active")) {
        sponsor = {...sponsor, YearsActive: row["Years Active"]};
    }else{
        sponsor = {...sponsor, YearsActive: ''};
    };
    
    return sponsor;
};

const extractDigits = (textValue) => {
    // Replace all non-digit characters with an empty string
    const digits = textValue.replace(/\D/g, ''); 
    return digits;
};

const findSponsorID_ByPhone = (searchPhone) => {
    let found = '';
    let sponsorFound = SponsorsList.map((sponsor) => {
        if (sponsor.Phone===searchPhone) {
            found = sponsor.id;
        };
    });
    
    return found;    
};

export default function ImportSponsors({ open, handleClose }){
    let processMsgs = [];
    let processFails = [];
    //Use State
    const [messages, setMessages] = useState([]);
    const [failures, setFailures] = useState([]);
    const [excelFile, setExcelFile] = useState(null);
    const [typeError, setTypeError] = useState(null);
    const [excelData, setExcelData] = useState(null);
    const [previewData, setPreviewData] = useState(null);
    
    //Apollo    
    const { data: sponsor_data, loading: sponsor_loading, error: sponsor_error } = useQuery(gql(listSponsors)); 
    const [addSponsorMutation, { loading: loadingAdd, error: errorAdd, data: newSponsor }] = useMutation(gql(createSponsor));
    const [updateSponsorMutation, { loading: loadingUpdate, error: errorUpdate, data: updatedSponsor }] = useMutation(gql(updateSponsor));

    if(sponsor_data || !sponsor_loading ) {
        const sponsorList = sponsor_data.listSponsors.items.map((sponsor) => {
            return SponsorsList.push(sponsor)
        });        
    };    
    if(loadingAdd) {
        return <div>Creating Sponsor...</div>
    };    
    if(loadingUpdate) {
       return <div>Updating Sponsor...</div>
    };

    const testData = () => {
        previewData.map((individualExcelData, index)=>(
            console.log(index + " :" + individualExcelData)
        ))
    };
    
    const AddNewSponsor = (sponsorData) => {        
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
            console.log("AddNewSponsor error ", error);
            return "Create New Sponsor failed with error: " + error;
        };        
        return "";
    };
    
    const UpdateSponsor = (sponsorID, sponsorData) => {        
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
            console.log("UpdateSponsor error ", error);
            return "Update Sponsor failed with error: " + error;
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
            setPreviewData(data.slice(0,10));
            setExcelData(data);
        }
    };

    const handleDialogClose=() => {
        // setMessages(null);
        // setFailures(null);
        setExcelFile(null);
        setExcelData(null);
        setPreviewData(null);
        setTypeError(null);
        handleClose();
    }

    const handleImport=() => {
        processMsgs = [];
        processFails = [];
        var result = '';
        var sponsorID = '';
        var numAdd = 0;
        var numAddFail = 0;
        var numUpdate = 0;
        var numUpdateFail = 0;
        //Our source data is in the variable: excelData
        
        //Map through all rows
        excelData.map((row, index) => {
            
            const sponsor = ConvertDataRow(row);
            //console.log("Processing spreadsheet row=" + index + " Name: " + sponsor.Name + " Phone: " + sponsor.Phone);

            if (sponsor.Phone.length===0) {
                sponsorID = '';
            }else{
                sponsorID = findSponsorID_ByPhone(sponsor.Phone);
            };
            
            if (sponsorID==='') {
                result = sponsor.Name + " at row " + index + " with Phone: " + sponsor.Phone + " was ADDED"
                let addResult = AddNewSponsor(sponsor);
                if (addResult.length > 0 ) {
                    result = sponsor.Name + " at row " + index + " failed to load: " + addResult;
                    numAddFail += 1;
                    //setFailures(...failures, result);
                    failures.push(result);
                }else{
                    numAdd += 1;
                };
            }else{                                        
                result = sponsor.Name + " at row " + index + " with Phone: " + sponsor.Phone + " was updated"
                let updateResult = UpdateSponsor(sponsorID, sponsor);
                if (updateResult.length > 0 ) {
                    result = sponsor.Name + " at row " + index + " failed to load: " + updateResult;
                    numUpdateFail += 1;
                    //setFailures(...failures, result);
                    failures.push(result);
                }else{
                    numUpdate += 1;
                };
            };
            processMsgs.push(result);
            
        });
        processMsgs.push((numAdd+numAddFail+numUpdate+numUpdateFail) + " Records processed");
        processMsgs.push(numAdd + " Sponsors Added");
        processMsgs.push(numUpdate + " Sponsors Updated");
        console.log("processMsgs: " + processMsgs);
        console.log("processFails: " + processFails);
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
                setPreviewData(null);
                setExcelData(null);
                let reader = new FileReader();
                reader.readAsArrayBuffer(selectedFile);
                reader.onload=(e)=>{                    
                    setExcelFile(e.target.result);
                };
            }else{
                setTypeError('File must be an Excel file type (*.xlsx)');
                setExcelFile(null);
                setPreviewData(null);
                setExcelData(null);
            }
        }
    };

    return(
        
        <React.Fragment>
            <Dialog open={open} onClose={handleClose} fullWidth="true" maxWidth="xl">
            <DialogTitle>Please Select an Excel File of Sponsor Information</DialogTitle>
            <DialogContent>
                <div>
                    <form onSubmit={handleFileSubmit}>
                        <input type="file" required onChange={handleFile}/>
                        <Button type="submit" variant="text">Preview File</Button>                        
                        {typeError&&(
                            <Alert severity="error">{typeError}</Alert>
                        )}
                    </form>
                    
                    {/* view data */}                    
                    {/* <div>
                        {previewData?(
                            <div>
                                <h3>File Preview (first 10 rows)</h3>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            {Object.keys(previewData[0]).map((key)=>(
                                            <th key={key}>{key}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {previewData.map((individualExcelData, index)=>(
                                            <tr key={index}>
                                            {Object.keys(individualExcelData).map((key)=>(
                                                <td key={key}>{individualExcelData[key]}</td>
                                            ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ):(
                            <div></div>
                        )}
                    </div> */}
                </div>
                <div>
                    {messages?(
                        <Paper elevation={6}>
                        <List>
                            {messages.map((item) => {
                                <ListItem>{item}</ListItem>
                            })}
                        </List>
                        </Paper>
                    ):(
                        <div>No messages</div>
                    )}
                </div>
                {/* <div>
                    {failures?(
                        <Paper elevation={6}>
                        <List>
                            {failures.map((item) => {
                                <ListItem>{item}</ListItem>
                            })}
                        </List>
                        </Paper>
                    ):(
                        <div>No failures</div>
                    )}
                </div> */}
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={handleDialogClose}>Cancel</Button>
                <Button variant="contained" onClick={handleImport}>Import</Button>
            </DialogActions>
            </Dialog>
        </React.Fragment>
    )
};