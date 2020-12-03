const { ApolloServer } = require('apollo-server');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const connectdb = require('./database/mongoose');

connectdb();

const port = process.env.PORT || 4500;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

server.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
