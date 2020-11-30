const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type People {
    id: ID!
    name: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;