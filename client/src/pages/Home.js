import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { FETCH_POSTS_QUERY } from '../graphql/Queries';
import { Grid } from 'semantic-ui-react';
import PostCard from '../components/PostCard';

const Home = () => {
  const { data, loading } = useQuery(FETCH_POSTS_QUERY);

  return (
    <Grid columns={3} divided>
      <Grid.Row className='page-title'>
        <h1>Latest Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>Loading Posts ....</h1>
        ) : (
          data.getPosts &&
          data.getPosts.map((post, index) => {
            return (
              <Grid.Column style={{ marginBottom: 20 }} key={index}>
                <PostCard post={post} />
              </Grid.Column>
            );
          })
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;
