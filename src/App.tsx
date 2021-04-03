import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import RouteSwitcher from './router';
import { globalStyles } from './App.style';
import { SkeletonTheme } from 'react-loading-skeleton';

const App = () => {
  const client = new ApolloClient({
    uri: 'https://graphql-pokeapi.vercel.app/api/graphql',
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      { globalStyles }
      <SkeletonTheme color="#efefef" highlightColor="#ddd">
        <RouteSwitcher></RouteSwitcher>
      </SkeletonTheme>
    </ApolloProvider>
  )
}

export default App;
