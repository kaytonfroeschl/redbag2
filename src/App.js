import React, { useEffect } from 'react';
import { Alert, Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import ChildrenScreen from './screens/ChildrenScreen';
import HeaderBar from './components/HeaderBar';
import NavMenu from './components/NavMenu';
import { Auth } from 'aws-amplify';

function App({ user }) {
  
  return (
    <Authenticator hideSignUp={true}>
      {
        ({ signOut, user }) => (
          <main>
            <HeaderBar signOut={signOut} userInfo={user}/>
            <NavMenu />           
          </main>
        )
      }
    </Authenticator>

  );
}

export default App;
