import React, { useState } from 'react';
import { Button, Confirm, Icon } from 'semantic-ui-react';
import { DELETE_POST, DELETE_COMMENT } from '../graphql/Mutations';
import { useMutation } from '@apollo/react-hooks';
import { FETCH_POSTS_QUERY } from '../graphql/Queries';

const DeleteButton = ({ postId, callback, commentId }) => {
  const mutation = commentId ? DELETE_COMMENT : DELETE_POST;
  const [confirmDelete, setconfirmDelete] = useState(false);
  const [deletePost] = useMutation(mutation, {
    variables: {
      postId,
      commentId,
    },
    update(proxy) {
      setconfirmDelete(false);
      if (!commentId) {
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY,
        });
        data.getPosts = data.getPosts.filter((p) => p.id !== postId);
        proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
      }
      if (callback) callback();
    },
  });

  return (
    <div>
      <Button
        color='red'
        floated='right'
        onClick={() => setconfirmDelete(true)}>
        <Icon name='trash' style={{ margin: 0 }} />
      </Button>
      <Confirm
        open={confirmDelete}
        onCancel={() => setconfirmDelete(false)}
        onConfirm={deletePost}
      />
    </div>
  );
};

export default DeleteButton;
