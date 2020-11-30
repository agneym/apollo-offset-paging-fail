import { ApolloServer, gql } from 'apollo-server';

import generatePeople from './generatePeople';

const typeDefs = gql`
  type Person {
    id: ID!
    firstName: String
    lastName: String
    jobTitle: String
  }

  type Query {
    people: [Person]
  }
`;

const people = generatePeople();

const resolvers = {
  Query: {
    books: () => people,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});