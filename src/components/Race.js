import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

function Race(props) {
    return (
        <TextField
            id="outlined-basic"
            label="Race"
            variant="outlined"
            value={props.value}
            onChange={props.handleOnChange}
            style = {{width: 150}}
        />
    );
}

export default Race;