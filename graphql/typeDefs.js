const gql = require('graphql-tag');

const typeDefs = gql`
  type Query {
    sayHi: String!
    getPosts: [Post]!
    getPost(postId: ID!): Post!
  }

  type Post {
    id: ID!
    body: String!
    username: String!
    created: String!
  }

  type User {
    id: ID!
    email: String!
    username: String!
    token: String!
    created: String!
  }

  input RegisterInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  type Mutation {
    registerUser(registerInput: RegisterInput!): User!
    loginUser(username: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: String!): String!
  }
`;

module.exports = typeDefs;
