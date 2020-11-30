import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import api from 'services/api';
import usePage from 'hooks/usePage';

import { loadUser } from 'actions/userActions';

import { Button } from 'components/common/Button';
import Toast from 'components/common/Toast';
import Logo from 'components/common/Logo';

// theres probably a better way to do this
let numErrors = 0;

const Login = () => {
  usePage('Login');

  const dispatch = useDispatch();


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [toastList, setToastList] = useState([]);

  const validateEmail = (email) => {
    // eslint-disable-next-line
    const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    // TODO: there is probably a better way to do this
    if (!email) {
      return {
        id: numErrors++,
        title: 'Email required',
        description: 'Please input an email address.',
        color: 'info',
      };
    } else if (!emailRegex.test(email.toLowerCase())) {
      return {
        id: numErrors++,
        title: 'Invalid Email',
        description: 'Please input an actual email address.',
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
    const toastErrors = [validateEmail(email), validatePassword(password)].filter(obj => obj !== null);
    if (toastErrors.length !== 0) {
      setLoading(false);
      setError(true);
      setToastList([
        ...toastList,
        ...toastErrors,
      ]);
      return;
    }

    api.login({ email, password },
      (res) => {
        setLoading(false);
        if (res.data.status === 200) {
          dispatch(loadUser(res.data.token));
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

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
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
      <div className="hero is-fullheight is-dark" >
        <div className="hero-body container columns is-centered has-text-centered my-0">
          <div>
            <Logo dark large />
            <hr />
            <p className="subtitle">Big Brother is watching for you!</p>
            <div className="card mb-3">
              <div className="card-content">
                <form onSubmit={onSubmit}>
                  <div className="field">
                    <div className="control">
                      <input className="input" name="email" placeholder="Email" onChange={handleEmailChange} />
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
            <a className="has-text-grey" href="/">Lost your Password?</a>
          </div>
        </div>
      </div >
      {getErrorToast()}
    </>
  );
};

export default Login;
