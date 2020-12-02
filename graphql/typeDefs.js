const gql = require('graphql-tag');

const typeDefs = gql`
  type Query {
    sayHi: String!
    getPosts: [Post]!
  }

  type Post {
    id: ID!
    body: String!
    username: String!
    created: String!
  }
`;

module.exports = typeDefs;
