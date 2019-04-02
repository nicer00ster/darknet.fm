import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';

import { endpoint, prodEndpoint } from '../config';

function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      });
    },
    onError: (({ graphQLErrors, networkError }) => {
      if(graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Derp: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    clientState: {
      resolvers: {},
      defaults: {
        error: '',
      },
    },
  });
}

export default withApollo(createClient);
