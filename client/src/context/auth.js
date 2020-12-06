import React, { createContext, useReducer } from 'react';
import jwtdecode from 'jwt-decode';

const initialState = {
  user: null,
};

if (localStorage.getItem('token')) {
  const decodedToken = jwtdecode(localStorage.getItem('token'));

  initialState.user = decodedToken;
}

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(userData) {
    localStorage.setItem('token', userData.token);
    dispatch({
      type: 'LOGIN_USER',
      payload: userData,
    });
  }

  function logout() {
    localStorage.removeItem('token');
    dispatch({
      type: 'LOGOUT',
    });
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
