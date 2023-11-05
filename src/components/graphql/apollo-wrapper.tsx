"use client";

import { from, HttpLink, ApolloLink } from "@apollo/client";
import {
  NextSSRApolloClient,
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { setContext } from '@apollo/client/link/context';
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { onError } from "@apollo/client/link/error";
import Config from '@/config';

if (Config.development()) {
  loadDevMessages();
  loadErrorMessages();
}

function makeClient() {
  const authLink = setContext((_, { headers }) => {
    const token = window.localStorage.token;

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach((error) => {
        if (Config.development())
          console.log(`[GraphQL error]: ${error.message}`);
        localStorage.removeItem("token")
      });
    }

    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  });

  const httpLink = new HttpLink({ 
    uri: Config.graphql.endpoint 
  });

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    credentials: "includes",
    link: from([authLink, errorLink, httpLink])
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}