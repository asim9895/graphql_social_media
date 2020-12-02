const postResolvers = require('../graphql/main/post');
const userResolvers = require('../graphql/main/user');

const resolvers = {
  Query: {
    ...postResolvers.Query,
    ...userResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
  },
};

module.exports = resolvers;
