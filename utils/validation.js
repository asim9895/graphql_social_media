const user = require('../graphql/main/user');

const validateRegisterUser = (username, email, password, confirmPassword) => {
  const errors = {};

  if (username.trim() === '') {
    errors.username = 'Username is Empty';
  }

  if (email.trim() === '') {
    errors.email = 'Email is Empty';
  } else {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.match(regex)) {
      errors.email = 'Enter valid email Address';
    }
  }

  if (password === '') {
    errors.password = 'Password Must Not Be Empty';
  } else if (password !== confirmPassword) {
    errors.password = 'Password Does Not Match';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

const validateLoginUser = (username, password) => {
  const errors = {};

  if (username.trim() === '') {
    errors.username = 'Username is Empty';
  }

  if (password.trim() === '') {
    errors.password = 'Password is Empty';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports = { validateRegisterUser, validateLoginUser };
