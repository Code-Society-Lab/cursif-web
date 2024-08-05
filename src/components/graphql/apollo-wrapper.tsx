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
import { RetryLink } from "@apollo/client/link/retry";

import Config from '@/config';
import Cookies from 'js-cookie';

if (Config.development()) {
  loadDevMessages();
  loadErrorMessages();
}

function makeClient() {
  const authLink = new ApolloLink((operation, forward) => {
    const token = Cookies.get('token');

    operation.setContext(({ headers }: { headers: Record<string, string> }) => ({ headers: {
      authorization: token ? `Bearer ${token}` : "",
      ...headers 
    }}));

    return forward(operation);
  });

  const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach((error) => {
        if (Config.development())
          console.log(`[GraphQL error]: ${error.message}`);
        return forward(operation);
      });
    }

    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  });

  const httpLink = new HttpLink({ 
    uri: Config.graphql.endpoint
  });

  const retryLink = new RetryLink();

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    credentials: "includes",
    link: from([retryLink, authLink, errorLink, httpLink])
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}