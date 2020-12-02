const mongoose = require('mongoose');
const schema = mongoose.Schema;

const postSchema = new schema({
  body: {
    type: String,
  },
  username: {
    type: String,
  },
  created: {
    type: String,
  },
  comments: [
    {
      body: {
        type: String,
      },
      username: {
        type: String,
      },
      created: {
        type: String,
      },
    },
  ],
  likes: [
    {
      body: {
        type: String,
      },
      username: {
        type: String,
      },
    },
  ],
  user: {
    type: schema.Types.ObjectId,
    ref: 'User',
  },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
