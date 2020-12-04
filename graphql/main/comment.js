const Post = require('../../models/Post');
const auth = require('../../utils/middleware');
const { UserInputError, AuthenticationError } = require('apollo-server');

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

    async deleteComment(_, { postId, commentId }, context, info) {
      const user = auth(context);

      const post = await Post.findById(postId);

      if (post) {
        const commentIndex = post.comments.findIndex((c) => c.id === commentId);

        if (post.comments[commentIndex].username === user.username) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else {
          throw new AuthenticationError('Action Not Allowed');
        }
      } else {
        throw new UserInputError('Post Not Found');
      }
    },
  },
};
