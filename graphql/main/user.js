const User = require('../../models/User');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const jwtSecret = config.get('jwtSecret');
const { UserInputError } = require('apollo-server');
const {
  validateRegisterUser,
  validateLoginUser,
} = require('../../utils/validation');

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
            username: 'Username Taken',
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
    async loginUser(_, { username, password }, context, info) {
      const { valid, errors } = validateLoginUser(username, password);

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      const user = await User.findOne({ username });

      if (!user) {
        errors.general = 'User Does Not Exists';
        throw new UserInputError('no user exists', {
          errors,
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        errors.general = 'Incorrect Password';
        throw new UserInputError('password not correct', {
          errors,
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          username: user.username,
        },
        jwtSecret
      );

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
  },
};
