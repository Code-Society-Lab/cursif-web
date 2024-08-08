"use client";

import {
  NextSSRApolloClient,
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";

import { onError } from "@apollo/client/link/error";
import { RetryLink } from "@apollo/client/link/retry";
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';
import { from, split, HttpLink, ApolloLink } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

import { createClient } from "graphql-ws";

import Config from '@/config';
import Cookies from 'js-cookie';

if (Config.development()) {
  loadDevMessages();
  loadErrorMessages();
}

function makeClient() {
  const retryLink = new RetryLink();

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
          console.log("[GraphQL error]: ", error);
        return forward(operation);
      });
    }

    if (networkError) {
      console.log("[Network error]: ", networkError);
    }
  });

  const httpLink = new HttpLink({ 
    uri: Config.homeserver.http_endpoint
  });

  // Not currently used buy can be later
  const wsLink = new GraphQLWsLink(
    createClient({
      url: Config.homeserver.subscription_endpoint,
      connectionParams: {
        authToken: Cookies.get('token')
      }
    }),
  );

  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink
  );

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    credentials: "includes",
    link: from([retryLink, authLink, errorLink, link])
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}