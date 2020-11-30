import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          people: {
            keyArgs: false,
            merge(existing, incoming, { args }) {
              return incoming;
            },
          },
        }
      }
    }
  })
});

export default client;