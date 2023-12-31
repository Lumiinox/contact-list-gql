/* eslint-disable */
import React from 'react';
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from, } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { ContactListPage } from './Page/ContactList/ContactListIndex';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({message, locations, path}) => {
      alert(`Graphql error ${message}`);
    });
  }
})

const link = from ([
  errorLink,
  new HttpLink({uri: "https://wpe-hiring.tokopedia.net/graphql"})
])

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
})


function App() {
  return (
  <ApolloProvider client={client}>
    <ContactListPage></ContactListPage>
  </ApolloProvider>);
}

export default App;
