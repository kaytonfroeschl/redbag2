import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Route from './Route';
import ChildrenScreen from '../screens/ChildrenScreen';
import SponsorScreen from '../screens/SponsorScreen';
import RBLScreen from '../screens/RBLScreen';

export default function MainView() {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}> {/* specifying size when resizing screen*/}
              <div>
                <Route path="/">
                    <ChildrenScreen />
                </Route>
                <Route path="/sponsor-table">
                    <SponsorScreen />
                </Route>
                <Route path="/RBL-table">
                    <RBLScreen />
                </Route>
            </div>
          </Grid>
        </Grid>
      </Container>
    )
};