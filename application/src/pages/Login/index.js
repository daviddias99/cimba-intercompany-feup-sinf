import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import api from 'services/api';
import usePage from 'hooks/usePage';

import { loadUser } from 'actions/userActions';

import { Button } from 'components/common/Button';
import Toast from 'components/common/Toast';
import Logo from 'components/common/Logo';

import './styles.scss';


// theres probably a better way to do this
let numErrors = 0;

const Login = () => {
  usePage('Login');

  const dispatch = useDispatch();


  const [username, serUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [toastList, setToastList] = useState([]);

  const validateUsername = (username) => {
    // TODO: there is probably a better way to do this
    if (!username) {
      return {
        id: numErrors++,
        title: 'Username required',
        description: 'Please input an username.',
        color: 'info',
      };
    } else if (username.length < 3 || username.length > 10) {
      return {
        id: numErrors++,
        title: 'Invalid Username',
        description: 'Must be between 3 and 10 characters',
        color: 'info',
      };
    }

    return null;
  };

  const validatePassword = (password) => {
    // TODO: there is probably a better way to do this
    if (!password) {
      return {
        id: numErrors++,
        title: 'Password required',
        description: 'Please input a password address.',
        color: 'info',
      };
    }

    return null;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // TODO: there is probably a better way to do this
    const toastErrors = [validateUsername(username), validatePassword(password)].filter(obj => obj !== null);
    if (toastErrors.length !== 0) {
      setLoading(false);
      setError(true);
      setToastList([
        ...toastList,
        ...toastErrors,
      ]);
      return;
    }

    api.login({ username, password },
      (res) => {
        setLoading(false);
        if (res.data.status === 200) {
          dispatch(loadUser({token: res.data.token, username: username}));
        } else {
          setError(true);
          setToastList([
            ...toastList, {
              id: numErrors++,
              title: 'Wrong Credentials',
              description: 'Form data does not match our records.',
              color: 'danger',
            }
          ]);
        }
      },
      (error) => {
        console.log(`login error: ${error}`);
      }
    );
  };

  const handleUserNameChange = (e) => {
    const { value } = e.target;
    serUsername(value);
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
  };

  const getErrorToast = () => {
    if (error) {
      return (
        <Toast
          toastList={toastList}
        />
      );
    }
  };

  return (
    <>
      <div className="hero is-fullheight" >
        <div className="hero-body container columns is-centered has-text-centered my-0">
          <div className="login-card card py-5">
            <Logo large alt />
              <div className="card-content">
                <form onSubmit={onSubmit}>
                  <div className="field">
                    <div className="control">
                      <input className="input" name="username" placeholder="Username" onChange={handleUserNameChange} />
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <input className="input" name="password" type="password" placeholder="Password" onChange={handlePasswordChange} />
                    </div>
                  </div>
                  <Button fullwidth loading={loading}>login</Button>
                </form>
              </div>
            </div>
        </div>
      </div >
      {getErrorToast()}
    </>
  );
};

export default Login;
