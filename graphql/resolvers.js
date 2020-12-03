const postResolvers = require('../graphql/main/post');
const userResolvers = require('../graphql/main/user');
const commentResolvers = require('../graphql/main/comment');

const resolvers = {
  Query: {
    ...postResolvers.Query,
    ...userResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
    ...commentResolvers.Mutation,
  },
};

module.exports = resolvers;
