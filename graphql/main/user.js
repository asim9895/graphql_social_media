const User = require('../../models/User');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const jwtSecret = config.get('jwtSecret');
const { UserInputError } = require('apollo-server');
const validateRegisterUser = require('../../utils/validation');

module.exports = {
  Mutation: {
    async registerUser(
      _,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {
      const { valid, errors } = validateRegisterUser(
        username,
        email,
        password,
        confirmPassword
      );

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }
      const emailExists = await User.findOne({ email: email.toLowerCase() });

      if (emailExists) {
        throw new UserInputError('email is taken', {
          errors: {
            email: 'Email Already Exists',
          },
        });
      }

      const usernameExists = await User.findOne({
        username: username.toLowerCase(),
      });

      if (usernameExists) {
        throw new UserInputError('username is taken', {
          errors: {
            email: 'Username Taken',
          },
        });
      }

      const user = new User({
        username,
        email,
        password,
        created: new Date().toISOString(),
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      const res = await user.save();

      const token = jwt.sign(
        {
          id: res.id,
          email: res.email,
          username: res.username,
        },
        jwtSecret
      );

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
