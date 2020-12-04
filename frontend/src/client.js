import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          allPeople: {
            read: (existing, { args }) => {
              const { first, offset = 0 } = args;
              if(!existing) {
                return existing;
              }
              return {
                ...existing,
                nodes: existing.nodes.slice(offset, first + offset)
              }
            },
            keyArgs: false,
            merge(existing, incoming, { args }) {
              const existingNodes = existing?.nodes ?? [];
              const incomingNodes = incoming?.nodes ?? [];
              const mergedNodes = existingNodes.slice(0);
              const start = args?.offset ?? mergedNodes.length;
              const end = start + incomingNodes.length;
              for (let i = start; i < end; i += 1) {
                mergedNodes[i] = incomingNodes[i - start];
              }
              return {
                ...incoming,
                nodes: mergedNodes,
              };
            },
          },
        }
      }
    }
  })
});

export default client;