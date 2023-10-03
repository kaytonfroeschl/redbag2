import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

function Race(props) {
    return (
        <TextField
            value={props.value}
            onChange={props.handleOnChange}
            select // tell TextField to render select
            label="Race"
            style = {{width: 150}}
        >
            <MenuItem value={'White'}>White</MenuItem>
            <MenuItem value={'Black'}>Black</MenuItem>
            <MenuItem value={'Hispanic'}>Hispanic</MenuItem>
            <MenuItem value={'Other'}>Other</MenuItem>
            <MenuItem value={''}>Not Specified</MenuItem>
        </TextField>
    );
}

export default Race;