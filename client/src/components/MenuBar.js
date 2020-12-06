import React, { useState, useContext } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';

const MenuBar = () => {
  const { user, logout } = useContext(AuthContext);
  const pathname = window.location.pathname;
  const path = pathname === '/' ? 'home' : pathname.substr(1);
  const [state, setstate] = useState(path);

  const handleItemClick = (e, { name }) => setstate(name);

  return (
    <div>
      {user ? (
        <Menu pointing secondary size='massive' color='teal'>
          <Menu.Item
            name={user.username}
            active={state === `${user.username}`}
            as={Link}
            to='/'
          />
          <Menu.Item
            name='createPost'
            active={state === 'createPost'}
            as={Link}
            to='/createPost'
          />

          <Menu.Menu position='right'>
            <Menu.Item
              name='logout'
              active={state === 'logout'}
              onClick={logout}
            />
          </Menu.Menu>
        </Menu>
      ) : (
        <Menu pointing secondary size='massive' color='teal'>
          <Menu.Item
            name='home'
            active={state === 'home'}
            onClick={handleItemClick}
            as={Link}
            to='/'
          />

          <Menu.Menu position='right'>
            <Menu.Item
              name='login'
              active={state === 'login'}
              onClick={handleItemClick}
              as={Link}
              to='/login'
            />
            <Menu.Item
              name='register'
              active={state === 'register'}
              onClick={handleItemClick}
              as={Link}
              to='/register'
            />
          </Menu.Menu>
        </Menu>
      )}
    </div>
  );
};

export default MenuBar;
