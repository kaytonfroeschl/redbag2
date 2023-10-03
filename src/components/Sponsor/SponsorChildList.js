import * as React from 'react';
import Box from '@mui/material/Box';
import { List, ListItem, ListItemText } from '@mui/material';

export default function SponsorChildList(props) {
    if (!props || !props.children) {
        return <>No Children</>;
    };
    if (props.children.length === 0) return (<>No children</>);

    const allSponsorChildren = () => {
        const uiList = props.children.map((child) => {
            return (
                <ListItem disablePadding={true}>                    
                    <ListItemText primary={child.ChildID + " " + child.Firstname} />                    
                </ListItem>
            );
        });
        return(uiList);
    };

    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>            
            <List sx={{ml:2}}>
                {allSponsorChildren()}
            </List>
        </Box>
    );
}