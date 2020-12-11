import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import routes from 'routes';

import RouteHandler from 'handlers/RouteHandler';
import Overview from 'pages/Overview';
import Settings from 'pages/Settings';
import Mapping from 'pages/Mapping';
import Logs from 'pages/Logs';
import NotFound from 'pages/NotFound';
import Login from 'pages/Login';
import Process from 'pages/Process';

const PrivateRoute = ({ children, ...rest }) => {

  const loggedIn = useSelector(state => state.user.loggedIn);
  const companyInfo = window.localStorage.getItem('CIMBA_COMPANY');

  return (
    <Route {...rest} render={(props) => {
      const childrenWithProps = React.Children.map(children, child => {
        // checking isValidElement is the safe way and avoids a typescript error too
        if (React.isValidElement(child)) {
          return React.cloneElement(child, props);
        }
        return child;
      });
      return loggedIn
        ? (companyInfo === "\"\"" && rest.path!=='/settings'? <Redirect to="/settings" /> : childrenWithProps)
        : <Redirect to="/login" />;
    }}
    />
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.any,
};


const Router = () => {

  const loggedIn = useSelector(state => state.user.loggedIn);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={routes.login.def}>
          {loggedIn ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route exact path='/'>
          <Redirect to="/overview" />
        </Route>
        <PrivateRoute exact path={routes.overview.def}>
          <Overview />
        </PrivateRoute>
        <PrivateRoute exact path={routes.mapping.def}>
          <Mapping />
        </PrivateRoute>
        <PrivateRoute exact path={routes.settings.def}>
          <Settings />
        </PrivateRoute>
        <PrivateRoute exact path={routes.logs.def}>
          <Logs />
        </PrivateRoute>
        <PrivateRoute exact path={routes.support.def}>
          <Overview />
        </PrivateRoute>
        <PrivateRoute exact path={routes.process.def}>
          <Process />
        </PrivateRoute>
        <Route>
          <NotFound />
        </Route>
      </Switch>

      {/* Handlers */}
      <RouteHandler />
    </BrowserRouter>
  );
};

export default Router;
