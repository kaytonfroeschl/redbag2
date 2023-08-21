import React, { useState, useEffect } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { updateSponsor } from '../../graphql/mutations';
import { listSponsors, getSponsor } from '../../graphql/queries';
import Dialog from '@mui/material/Dialog';
import { DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';


export default function EditSponsorForm(){

/* ==============================================================================================
                                        Set Variables
================================================================================================*/
    const [form_id, setFormID] = useState('');
    const [form_name, setFormName] = useState('');
    const [form_address, setFormAddress] = useState('');
    const [form_email, setFormEmail] = useState('');
    const [form_inst, setFormInst] = useState('');
    const [form_phone, setFormPhone] = useState('');
    
        
};
