import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN_USER } from '../graphql/Mutations';

const Login = ({ history }) => {
  const [errors, seterrors] = useState({});
  const [loginForm, setloginForm] = useState({
    username: '',
    password: '',
  });

  const onChangeForm = (e) => {
    setloginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const [AuthUser, { loading }] = useMutation(LOGIN_USER, {
    variables: loginForm,
    update(proxy, result) {
      history.push('/');
    },
    onError(err) {
      seterrors(err.graphQLErrors[0].extensions.exception.errors);
    },
  });
  const onFormSubmit = (e) => {
    e.preventDefault();
    AuthUser();
  };

  const { username, password } = loginForm;

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
            name='password'
            label='Password'
            placeholder='Enter Password'
            value={password}
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

export default Login;
