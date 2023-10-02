import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

function BikeInput(props) {
    return (
        <TextField
            value={props.value}
            onChange={props.handleOnChange}
            select // tell TextField to render select
            label="Are they receiving a bike?"
            fullWidth
        >
            <MenuItem value={'Yes'}>Yes</MenuItem>
            <MenuItem value={'No'}>No</MenuItem>
        </TextField>
    );
}

export default BikeInput;