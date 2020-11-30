import { ApolloServer, gql } from 'apollo-server';

import generatePeople from './generatePeople';

const typeDefs = gql`
  type Person {
    id: ID!
    email: String
    firstName: String
    lastName: String
    jobTitle: String
  }

  type People {
    totalCount: Int
    nodes: [Person]
  }

  type Query {
    people(first: Int, offset: Int): People
  }
`;

const people = generatePeople(40);

const resolvers = {
  Query: {
    people: (parent, args, context, info) => {
      const { first = 10, offset = 0 } = args;
      return {
        totalCount: people.length,
        nodes: people.slice(offset, offset + first),
      };
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});