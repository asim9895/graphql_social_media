import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_POST } from '../graphql/Mutations';
import { FETCH_POSTS_QUERY } from '../graphql/Queries';

const CreatePost = ({ history }) => {
  const [errors, seterrors] = useState({});
  const [post, setpost] = useState({
    body: '',
  });

  const [createPost, { loading }] = useMutation(CREATE_POST, {
    variables: post,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      data.getPosts = [result.data.createPost, ...data.getPosts];
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data,
      });

      history.push('/');
    },
    onError(err) {
      seterrors(err.graphQLErrors[0].extensions.exception.errors);
    },
  });

  const onChange = (e) => {
    setpost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();

    createPost();
  };
  return (
    <div>
      <Form onSubmit={onSubmit}>
        <Form.Input
          name='body'
          onChange={onChange}
          type='text'
          placeholder='Enter Body'
          label='Body'
          error={Object.values(errors).length > 0 && true}
        />
        <Button
          type='submit'
          color='teal'
          disabled={loading}
          className={loading ? 'loading' : ''}>
          Create Post
        </Button>
      </Form>
      {Object.values(errors).length > 0 && (
        <div className='ui error message'>
          <ul className='list'>{errors}</ul>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
