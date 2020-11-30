import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          allPeople: {
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