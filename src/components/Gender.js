import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

function Gender(props) {
    return (
        <TextField            
            id="outlined-basic"
            label="Gender"
            variant="outlined"
            value={props.value}
            onChange={props.handleOnChange}
            style = {{width: 150}}
        />
    );
}

export default Gender;