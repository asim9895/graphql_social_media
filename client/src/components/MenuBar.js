import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const MenuBar = () => {
  const pathname = window.location.pathname;
  const path = pathname === '/' ? 'home' : pathname.substr(1);
  const [state, setstate] = useState(path);

  const handleItemClick = (e, { name }) => setstate(name);

  return (
    <div>
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
    </div>
  );
};

export default MenuBar;
