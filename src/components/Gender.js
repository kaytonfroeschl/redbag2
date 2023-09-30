import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

function Gender(props) {
    return (
        <TextField
            value={props.value}
            onChange={props.handleOnChange}
            select // tell TextField to render select
            label="Gender"
            style = {{width: 150}}
        >
            <MenuItem value={'F'}>Female</MenuItem>
            <MenuItem value={'M'}>Male</MenuItem>
            <MenuItem value={'O'}>Other</MenuItem>
            <MenuItem value={''}>Not Specified</MenuItem>
        </TextField>
    );
}

export default Gender;