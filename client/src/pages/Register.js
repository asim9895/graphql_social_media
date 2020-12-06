import React, { useState, useContext } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import { REGISTER_USER } from '../graphql/Mutations';
import { AuthContext } from '../context/auth';

const Register = ({ history }) => {
  const context = useContext(AuthContext);
  const [errors, seterrors] = useState({});
  const [registerForm, setregisterForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const onChangeForm = (e) => {
    setregisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    variables: registerForm,
    update(proxy, result) {
      context.login(result.data.registerUser);
      history.push('/');
    },
    onError(err) {
      seterrors(err.graphQLErrors[0].extensions.exception.errors);
    },
  });
  const onFormSubmit = (e) => {
    e.preventDefault();
    addUser();
  };

  const { username, email, password, confirmPassword } = registerForm;

  return (
    <>
      <h1 className='page-title'>Register For Meetup</h1>
      <div className='form-container'>
        <Form onSubmit={onFormSubmit}>
          <Form.Input
            name='username'
            label='Username'
            placeholder='Enter Unique Username'
            value={username}
            onChange={onChangeForm}
            type='text'
            error={errors.username ? true : false}
          />
          <Form.Input
            name='email'
            label='Email'
            placeholder='Enter Working Email Address'
            value={email}
            onChange={onChangeForm}
            type='email'
            error={errors.email ? true : false}
          />
          <Form.Input
            name='password'
            label='Password'
            placeholder='Enter Password'
            value={password}
            onChange={onChangeForm}
            type='password'
            error={errors.password ? true : false}
          />
          <Form.Input
            name='confirmPassword'
            label='Confirm Password'
            placeholder='Confirm Your Password'
            value={confirmPassword}
            onChange={onChangeForm}
            type='password'
            error={errors.password ? true : false}
          />
          <Button
            color='teal'
            type='submit'
            disabled={loading}
            className={loading ? 'loading' : ''}>
            Submit
          </Button>
        </Form>
        {Object.values(errors).length > 0 && (
          <div className='ui error message'>
            <ul className='list'>
              {Object.values(errors).map((error) => {
                return <li key={error}>{error}</li>;
              })}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Register;
