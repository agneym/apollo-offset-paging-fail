import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          people: {
            merge(existing, incoming, { args }) {
              console.log({ args, existing, incoming })
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
          }
        }
      }
    }
  })
});

export default client;