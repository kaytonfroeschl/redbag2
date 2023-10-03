import * as React from 'react';
import Box from '@mui/material/Box';
import { List, ListItem, ListItemText } from '@mui/material';


export default function SponsorChildList(props) {
    
    if (!props.children) {
        return <>No Children</>;
    };

    const listChildren = () => {
        
        const allSponsorChildren = () => {
            return(
                props.children.map((child) => {
                    <>
                    <ListItem disablePadding>                    
                        <ListItemText primary={child.ChildID + " " + child.Firstname} />                    
                    </ListItem>
                    </>
                })
            );
        };

        return (
            <List>
                {allSponsorChildren()}
            </List>
        );
    };

    return (
        <Box sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}>            
            {listChildren()}
        </Box>
    );
}