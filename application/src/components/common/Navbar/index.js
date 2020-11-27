import React, { useState } from 'react';

import { Button, BtnType } from 'components/common/Button';
import Logo from 'components/common/Logo';

import './styles.scss';
import api from 'services/api';
import { useDispatch } from 'react-redux';
import { logoutUser } from 'actions/userActions';

const Navbar = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const logout = () => {
    setLoading(true);
    api.logout((res) => {
      setLoading(false);
      if (res.data.status === 200) {
        dispatch(logoutUser());
      } else {
        console.log('oops');
      }
    },
    (error) => {
      console.log(`login error: ${error}`);
    });

  };

  return (
    <nav className="navbar is-flex is-align-items-center is-justify-content-space-between">
      <div>
        <Logo dark />
      </div>
      <div className="is-flex">
        <Button color={'text'} type={BtnType.text}>
          <span className="icon is-large">
            <i className="fas fa-lg fa-cog"></i>
          </span>
        </Button>

        <Button color={'text'} type={BtnType.text}>
          <span className="icon is-large">
            <i className="fas fa-lg fa-bell"></i>
          </span>
        </Button>

        <Button onClick={logout} color={'primary'} type={BtnType.text} loading={loading}>
          Logout
        </Button>
      </div>
    </nav>
  );
};


export default Navbar;
