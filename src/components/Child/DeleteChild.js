import * as React from 'react';
import { gql, useMutation } from '@apollo/client';
import { deleteChild } from '../../graphql/mutations';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Box, 
    Typography,
    Button,
    Divider
} from '@mui/material';

export default function DeleteChild({ open, handleClose, child, deleteChild }) {
   /*const [deleteChildMutation] = useMutation(deleteChild);

    const handleDelete = async () => {
        try {
          const response = await deleteChildMutation({
            variables: { input: {Firstname: child.passedName, ChildID: child.passedChildID} },
          });
    
          console.log('Mutation response:', response);
          // Handle success or navigate to a different page
        } catch (error) {
          console.error('Mutation error:', error);
          // Handle error
        }
      };*/
    function handleDelete() { }
    

    return(
        <React.Fragment>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Are you sure you want to Delete this Child?</DialogTitle>
                <Divider />
                <DialogContent>
                    <Box
                        sx={{
                            textAlign: 'center'
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 'bold',
                                fontSize: 'h6.fontSize'
                            }}
                        >
                            {child.Firstname} {child.ChildID}</Typography>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Box
                        sx={{
                            display: 'flex',
                        }}    
                    >  
                        <Button 
                            sx={{
                                ":hover": {
                                    color: 'black',
                                    bgcolor: 'red'
                                },
                                backgroundColor: 'red',
                                color: 'white',
                                m: 1
                            }}
                            onClick={handleClose}
                        >No, don't Delete!</Button>
                        <Button 
                            sx={{
                                m: 1
                            }}
                            onClick={deleteChild}
                        >Yes I am sure</Button>
                    </Box>
                    
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}