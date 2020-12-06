import gql from 'graphql-tag';

export const REGISTER_USER = gql`
  mutation registerUser(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    registerUser(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      created
      token
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      id
      email
      username
      created
      token
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      username
      created
      likeCount
      commentCount
      comments {
        id
        body
        created
      }
      likes {
        id
        username
      }
    }
  }
`;
