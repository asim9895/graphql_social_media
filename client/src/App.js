import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MenuBar from './components/MenuBar';
import { Container } from 'semantic-ui-react';
import AuthRoute from './AuthRoute';
import { AuthProvider } from './context/auth';
import CreatePost from './pages/CreatePost';
import SinglePost from './pages/SinglePost';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/createPost' component={CreatePost} />
            <Route exact path='/posts/:postId' component={SinglePost} />
            <AuthRoute exact path='/login' component={Login} />
            <AuthRoute exact path='/register' component={Register} />
          </Switch>
        </Container>
      </Router>
    </AuthProvider>
  );
};

export default App;
