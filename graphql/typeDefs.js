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
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
  }

  type Comment {
    id: ID!
    username: String!
    created: String!
    body: String!
  }

  type Like {
    id: ID!
    created: String!
    username: String!
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
    deletePost(postId: ID!): String!
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
  }

  type Subscription {
    newPost: Post!
  }
`;

module.exports = typeDefs;
