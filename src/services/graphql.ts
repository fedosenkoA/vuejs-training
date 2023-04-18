import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from '@apollo/client/core';
import { ref } from 'vue';
import possibleTypes from '../possibleTypes.json';
import { getCookie } from '../helpers/cookie';

const httpEndpoint =
  process.env.VUE_APP_GRAPHQL_HTTP ||
  'https://devapi.barcelonalocalexperiences.com/graphql';
const token = ref('Bearer ' + getCookie('token'));

const httpLink = createHttpLink({
  uri: httpEndpoint,
  headers: {
    Authorization: token.value,
  },
});

const cache = new InMemoryCache({
  possibleTypes,
});

const apolloClient = new ApolloClient({
  link: httpLink,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  cache,
});

export default apolloClient;
