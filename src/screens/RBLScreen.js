import React, { useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { createSponsor, updateSponsor } from '../graphql/mutations';
import { listSponsors, listRBLS } from '../graphql/queries';
import {
  TextField,
  Button
} from '@mui/material';

export default function DenseTable() {
/*============================================= Variables =================================================*/
  const [form_phone, setFormPhone] = useState('');
  let sponsorArray = [];
  let renderedSponsorArray = [];
  let RBLArray = [];

/*============================================= Handle Functions =================================================*/
  function handleFormPhone(event) {
    setFormPhone(event.target.value);
  }

  function handleButtonClick() {
    let key = false;
    let newInput = extract(form_phone);
    let list = renderedSponsorArray.map((sponsor) => {
      if (sponsor.Phone === newInput) {
        key = true;
      }
    })
    if(key){
      console.log('there is a match in the system')
    } else {
      console.log("there is no match in the system")
    }
  }

  function extract(phoneNumber) {
    const digits = phoneNumber.replace(/\D/g, ''); // Replace all non-digit characters with an empty string
    return digits;
  }

  function renderSponsors(sponArr){
    let arr = [];
    const list = sponArr.map((sponsor) => {
      arr.push({ "Phone": extract(sponsor.Phone), "id": sponsor.id });
    })
    return arr;
  }

/*============================================= Apollo Call =================================================
                                              Listing Sponsors
===========================================================================================================*/
  const { data: sponsor_data, loading: sponsor_loading, error: sponsor_error } = useQuery(gql(listSponsors)); 
  if(sponsor_data || !sponsor_loading ) {
    const sponsorList = sponsor_data.listSponsors.items.map((sponsor) => {
        return sponsorArray.push(sponsor)
    })
  }

  console.log("List of Sponsors: ", sponsorArray)
  renderedSponsorArray = renderSponsors(sponsorArray);
  console.log("rendered Sponsor Arry: ", renderedSponsorArray)

/*============================================= Apollo Call =================================================
                                              Listing RBLS
===========================================================================================================*/
  const { data: RBL_data, loading: RBL_loading, error: RBL_error } = useQuery(gql(listRBLS)); 
    if(RBL_data || !RBL_loading ) {
      const RBLList = RBL_data.listRBLS.items.map((RBL) => {
          return RBLArray.push(RBL)
      })
    }

    console.log("List of RBLS: ", RBLArray)
  

  return (
    <React.Fragment>
      <TextField
        id="outlined-basic"
        label="Phone Number"
        variant="outlined"
        value={form_phone}
        onChange={handleFormPhone}
        style = {{width: 150}}
    />
    <Button variant='contained' onClick={handleButtonClick}>Submit</Button>

    </React.Fragment>
  );
}