import React from 'react';
import { Card, Image, Button, Icon, Label } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';

const PostCard = ({
  post: {
    id,
    body,
    created,
    username,
    likes,
    comments,
    likeCount,
    commentCount,
  },
}) => {
  const likePost = () => {
    console.log('likes');
  };

  const commentPost = () => {
    console.log('comments');
  };
  return (
    <Card fluid>
      <Card.Content as={Link} to={`/posts/${id}`}>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/daniel.jpg'
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta>{moment(created).fromNow()}</Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button as='div' labelPosition='right' onClick={likePost}>
          <Button color='red' basic>
            <Icon name='heart' />
          </Button>
          <Label basic color='red' pointing='left'>
            {likeCount}
          </Label>
        </Button>

        <Button as='div' labelPosition='right' as={Link} to={`/posts/${id}`}>
          <Button basic color='blue'>
            <Icon name='comment outline' />
          </Button>
          <Label basic color='blue' pointing='left'>
            {commentCount}
          </Label>
        </Button>
      </Card.Content>
    </Card>
  );
};

export default PostCard;
