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
