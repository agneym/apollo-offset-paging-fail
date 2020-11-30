import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          people: {
            read: (existing, {args}) => {
              console.log({ args });
              return existing;
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
              console.log('Length of merged nodes', mergedNodes.length);
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