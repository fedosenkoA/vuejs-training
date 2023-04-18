import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import createUploadLink from 'apollo-upload-client/public/createUploadLink.js';
import { ref } from 'vue';
import { getCookie } from '../helpers/cookie';

const httpEndpoint =
  process.env.VUE_APP_GRAPHQL_HTTP ||
  'https://devapi.barcelonalocalexperiences.com/graphql';
const token = ref('Bearer ' + getCookie('token'));

const apolloUploadClient = new ApolloClient({
  cache: new InMemoryCache(),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  link: createUploadLink({
    uri: httpEndpoint,
    headers: {
      Authorization: token.value,
    },
  }),
});
export default apolloUploadClient;
