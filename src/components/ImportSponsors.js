import * as React from 'react';
import { useState } from 'react';
import * as XLSX from 'xlsx';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from '@mui/material';

import { gql, useMutation } from '@apollo/client';
import { createSponsor } from '../graphql/mutations';
import { listSponsors } from '../graphql/queries';

export default function ImportSponsors({ open, handleClose }){
    const [failures, setFailures] = useState([]);
    const [excelFile, setExcelFile] = useState(null);
    const [typeError, setTypeError] = useState(null);
    const [excelData, setExcelData] = useState(null);
    
    let input;
    const [addSponsorMutation, { data, loading, error }] = useMutation(gql(createSponsor));
    if(loading) {
        return <div>Loading...</div>
    }

    const CreateSponsorFromSpreadsheetRow = async (rowData) => {        
        var result = '';
        try{
            const response = await addSponsorMutation({
                variables: 
                    { input: { 
                        FirstName: rowData(0), 
                        LastName: '', 
                        Email: rowData(2), 
                        Phone: rowData(3), 
                        Institution: rowData(1), 
                        Address: (rowData(4) + " " + rowData(5) + ", " + rowData(6) + " " + rowData(7)), 
                        YearsActive: rowData(8), 
                        } 
                    }, 
                    refetchQueries: [{ query: gql(listSponsors) }]
            });
        } catch(error) {
            result = "addSponsor failed with error: " + error;
        }

        return result;
    };

    const handleImport=() => {
        console.log("Import Sponsor Logic");
        var result = '';
        var sponsorName = '';
        var numAdd = 0;
        var numAddFail = 0;
        var numUpdate = 0;
        var numUpdateFail = 0;
        //Our source data is in the variable: excelData
        
        //Map through all rows
        excelData.map((row, index) => {
            //row 0 contains headers, so ignor it
            if (index!==0) {
                result = '';
                sponsorName = row(0);

                //fetch Sponsor with that name.  Need to fetch a sponsor by Name
                //If Sponsor found
                //  update sponsor
                //Else
                    //Add Sponsor
                    result = CreateSponsorFromSpreadsheetRow(row);
                    if (result.length > 0 ) {
                        result = sponsorName + " at row " + index + " failed to load: " + result;
                        numAddFail += 1;
                        setFailures(...failures, result);
                    }else{
                        numAdd += 1;
                    };
                //  End if
            }
        });
        
        handleClose();
    };

    // onchange event
    const handleFile=(e)=>{
        let fileTypes = ['application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','text/csv'];
        let selectedFile = e.target.files[0];
        if(selectedFile){
            if(selectedFile&&fileTypes.includes(selectedFile.type)){
                setTypeError(null);
                let reader = new FileReader();
                reader.readAsArrayBuffer(selectedFile);
                reader.onload=(e)=>{
                    setExcelFile(e.target.result);
                }
            }else{
                setTypeError('Please select only excel file types');
                setExcelFile(null);
            }
        }
        else{
            console.log('Please select your file');
        }
    }

    // submit event
    const handleFileSubmit=(e)=>{
        e.preventDefault();
        if(excelFile!==null){
            const workbook = XLSX.read(excelFile,{type: 'buffer'});
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);
            setExcelData(data.slice(0,10));
        }
    }

    return(
        <React.Fragment>
            <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Import a File</DialogTitle>
            <DialogContent>
                <div className="wrapper">

                <h3>Upload & View Excel Sheets</h3>

                {/* form */}
                <form className="form-group custom-form" onSubmit={handleFileSubmit}>
                <input type="file" className="form-control" required onChange={handleFile} />
                <button type="submit" className="btn btn-success btn-md">UPLOAD</button>
                {typeError&&(
                    <div className="alert alert-danger" role="alert">{typeError}</div>
                )}
                </form>

                {/* view data */}
                <div className="viewer">
                {excelData?(
                    <div className="table-responsive">
                    <table className="table">

                        <thead>
                        <tr>
                            {Object.keys(excelData[0]).map((key)=>(
                            <th key={key}>{key}</th>
                            ))}
                        </tr>
                        </thead>

                        <tbody>
                        {excelData.map((individualExcelData, index)=>(
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
                    <div>No File is uploaded yet!</div>
                )}
                </div>

                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleImport}>Import</Button>
            </DialogActions>
            </Dialog>
        </React.Fragment>
    )
};