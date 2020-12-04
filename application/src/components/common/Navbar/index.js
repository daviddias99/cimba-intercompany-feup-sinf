import React, {useState} from 'react';
import Logo from 'components/common/Logo';

import './styles.scss';
import api from 'services/api';
import { useDispatch } from 'react-redux';
import { logoutUser } from 'actions/userActions';
import icons from '../../../assets/icons';

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

        <div className="navbar-button-wrapper">
          <div className="notif-icon">
            <img src={icons.notificationIcon} alt="Notification icon" />
          </div>
        </div>
        <div className="navbar-button-wrapper">
          <div className="logout-icon">
            <img src={icons.exitIcon} alt="Logout icon" />
          </div>
        </div>
      </div>
    </nav>
  );
};


export default Navbar;
