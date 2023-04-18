import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from '@apollo/client/core';

const httpEndpoint =
  process.env.VUE_APP_GRAPHQL_HTTP ||
  'https://devapi.barcelonalocalexperiences.com/graphql';
// const httpEndpoint =
//   process.env.VUE_APP_GRAPHQL_HTTP ||
//   'http://guidesportal-bcn-source.loc/graphql';

const httpLink = createHttpLink({
  uri: httpEndpoint,
});

const apolloAuthClient = new ApolloClient({
  link: httpLink,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  cache: new InMemoryCache(),
});

export default apolloAuthClient;
