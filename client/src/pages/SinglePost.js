import React, { useContext, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { FETCH_POST_QUERY } from '../graphql/Queries';
import {
  Grid,
  Image,
  Card,
  Button,
  Label,
  Icon,
  Form,
} from 'semantic-ui-react';
import moment from 'moment';
import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';
import { CREATE_COMMENT } from '../graphql/Mutations';

const SinglePost = ({ match, history }) => {
  const postId = match.params.postId;
  const { user } = useContext(AuthContext);
  const { data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  const [comment, setcomment] = useState('');

  const [createComment] = useMutation(CREATE_COMMENT, {
    variables: {
      postId,
      body: comment,
    },
    update() {
      setcomment('');
    },
  });

  const deletePostCallback = () => {
    history.push('/');
  };

  return !data ? (
    <h1>loading post...</h1>
  ) : (
    <Grid style={{ marginTop: 20 }}>
      <Grid.Row>
        <Grid.Column width={2}>
          <Image
            floated='right'
            size='small'
            src='https://react.semantic-ui.com/images/avatar/large/daniel.jpg'
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Card fluid>
            <Card.Content>
              <Card.Header>{data.getPost.username}</Card.Header>
              <Card.Meta>{moment(data.getPost.created).fromNow()}</Card.Meta>
              <Card.Description>{data.getPost.body}</Card.Description>
            </Card.Content>
            <hr />
            <Card.Content extra>
              <LikeButton
                user={user}
                post={{
                  id: data.getPost.id,
                  likeCount: data.getPost.likeCount,
                  likes: data.getPost.likes,
                }}
              />
              <Button labelPosition='right' as='div'>
                <Button basic color='blue'>
                  <Icon name='comment outline' />
                </Button>
                <Label basic color='blue' pointing='left'>
                  {data.getPost.commentCount}
                </Label>
              </Button>
              {user && user.username === data.getPost.username && (
                <DeleteButton
                  postId={data.getPost.id}
                  callback={deletePostCallback}
                />
              )}
            </Card.Content>
          </Card>
          {user && (
            <Card fluid>
              <Card.Content>
                <p>Post a comment</p>
                <Form onSubmit={createComment}>
                  <div className='ui action input fluid'>
                    <Form.Input
                      type='text'
                      placeholder='Post a comment'
                      name='comment'
                      value={comment}
                      onChange={(e) => setcomment(e.target.value)}
                    />

                    <Button
                      type='submit'
                      color='teal'
                      size='small'
                      disabled={comment.trim() === ''}>
                      Create Comment
                    </Button>
                  </div>
                </Form>
              </Card.Content>
            </Card>
          )}
          <h3>Comments</h3>
          {data.getPost.comments &&
            data.getPost.comments.map((comment) => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  {user && user.username === comment.username && (
                    <DeleteButton
                      postId={data.getPost.id}
                      commentId={comment.id}
                    />
                  )}
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>{moment(comment.created).fromNow()}</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default SinglePost;
