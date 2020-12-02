const Post = require('../models/Post');

const resolvers = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = resolvers;
