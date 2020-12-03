const jwt = require('jsonwebtoken');
const config = require('config');
const jwtSecret = config.get('jwtSecret');
const { AuthenticationError } = require('apollo-server');

const auth = (context) => {
  const token = context.req.headers.authorization;

  if (token) {
    try {
      const user = jwt.verify(token, jwtSecret);
      return user;
    } catch (error) {
      throw new AuthenticationError('Invalid Token');
    }
  }
  throw new Error('authentication header must be provided');
};

module.exports = auth;
