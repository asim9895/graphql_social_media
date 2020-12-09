import React, { useEffect, useState } from 'react';
import { Button, Icon, Label } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import { LIKE_POST } from '../graphql/Mutations';
import { Link } from 'react-router-dom';

const LikeButton = ({ user, post: { id, likeCount, likes } }) => {
  const [like, setlike] = useState(false);
  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setlike(true);
    } else setlike(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST, {
    variables: {
      postId: id,
    },
  });

  const likeButton = user ? (
    like ? (
      <Button color='red'>
        <Icon name='heart' />
      </Button>
    ) : (
      <Button color='red' basic>
        <Icon name='heart' />
      </Button>
    )
  ) : (
    <Button color='red' basic as={Link} to='/login'>
      <Icon name='heart' />
    </Button>
  );

  return (
    <Button as='div' labelPosition='right' onClick={likePost}>
      {likeButton}
      <Label basic color='red' pointing='left'>
        {likeCount}
      </Label>
    </Button>
  );
};

export default LikeButton;
