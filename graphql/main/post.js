const Post = require('../../models/Post');
const auth = require('../../utils/middleware');
const { AuthenticationError } = require('apollo-server');

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ created: -1 });
        return posts;
      } catch (error) {
        console.log(error);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);

        if (!post) {
          throw new Error('Post Not Found');
        }

        return post;
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    async createPost(_, { body }, context, info) {
      const user = auth(context);
      console.log(user);

      const newPost = new Post({
        body,
        username: user.username,
        user: user.id,
        created: new Date().toISOString(),
      });

      const res = await newPost.save();

      return res;
    },
    async deletePost(_, { postId }, context, info) {
      const user = auth(context);

      try {
        const post = await Post.findById(postId);

        if (post.username === user.username) {
          await post.delete();
          return 'Post Deleted Successfully';
        } else {
          throw new AuthenticationError('Action Not Allowed');
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
