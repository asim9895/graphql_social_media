import gql from 'graphql-tag';

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      username
      body
      likes {
        id
        username
      }
      likeCount
      commentCount
      created
      comments {
        id
        username
        body
        created
      }
    }
  }
`;

export const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      username
      body
      likes {
        id
        username
      }
      likeCount
      commentCount
      created
      comments {
        id
        username
        body
        created
      }
    }
  }
`;
