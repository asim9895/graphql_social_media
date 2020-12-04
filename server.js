const { ApolloServer, PubSub } = require('apollo-server');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const connectdb = require('./database/mongoose');

connectdb();

const port = process.env.PORT || 4500;
const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

server.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
