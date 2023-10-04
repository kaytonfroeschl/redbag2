import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import { NavigationProvider } from './context/navigation';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
//import { ApolloProvider } from 'react-apollo';

Amplify.configure(awsExports);

const client = new ApolloClient({
  uri: "https://ijan5shjbzc5zl3r46nhs3sblq.appsync-api.us-east-1.amazonaws.com/graphql",
  cache: new InMemoryCache(),
  headers: {
    'X-Api-Key': "da2-yrhoxlqawreshe4txw3hzjhjle"
  },
  connectToDevTools: true
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <NavigationProvider>
      <App />
    </NavigationProvider>
  </ApolloProvider>
    
);