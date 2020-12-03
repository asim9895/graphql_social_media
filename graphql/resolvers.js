const postResolvers = require('../graphql/main/post');
const userResolvers = require('../graphql/main/user');

const resolvers = {
  Query: {
    ...postResolvers.Query,
    ...userResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
  },
};

module.exports = resolvers;
