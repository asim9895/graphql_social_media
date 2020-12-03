const Post = require('../../models/Post');
const auth = require('../../utils/middleware');
const { UserInputError } = require('apollo-server');

module.exports = {
  Mutation: {
    async createComment(_, { postId, body }, context, info) {
      const user = auth(context);

      if (body.trim() === '') {
        throw new UserInputError('Empty Comment', {
          errors: 'Comment Must Not Be Empty',
        });
      }

      let post = await Post.findById(postId);

      if (post) {
        post.comments.unshift({
          body,
          username: user.username,
          created: new Date().toISOString(),
        });
        await post.save();
        return post;
      } else {
        throw new UserInputError('Post Not Found');
      }
    },
  },
};
