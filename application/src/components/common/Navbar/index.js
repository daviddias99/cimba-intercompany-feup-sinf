import React from 'react';
import Logo from 'components/common/Logo';
import { Link } from 'react-router-dom';

import './styles.scss';
import api from 'services/api';
import { useDispatch } from 'react-redux';
import { logoutUser } from 'actions/userActions';
import icons from '../../../assets/icons';

const Navbar = () => {
  const dispatch = useDispatch();
  const username = (JSON.parse(window.localStorage.getItem('CIMBA_USER')) ? JSON.parse(window.localStorage.getItem('CIMBA_USER')).username : "");
  const logout = () => {
    api.logout((res) => {
      if (res.status === 200) {
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
        <Link to='/overview'>
          <Logo dark />
        </Link>
      </div>
      {username ? <div className="is-flex">

        <div className="navbar-username-wrapper">
          <p>You're logged in as {username}</p>
        </div>

        <div className="navbar-button-wrapper" onClick={logout}>
          <div className="logout-icon">
            <img src={icons.exitIcon} alt="Logout icon" />
          </div>
        </div>
      </div> : ""}

    </nav>
  );
};


export default Navbar;
