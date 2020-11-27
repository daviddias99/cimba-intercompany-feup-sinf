import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import routes from 'routes';

import RouteHandler from 'handlers/RouteHandler';

import LoggerLanding from 'pages/LoggerLanding';
import Activity from 'pages/Activity';
import Bots from 'pages/Bots';
import Logs from 'pages/Logs';
import NotFound from 'pages/NotFound';
import Login from 'pages/Login';

const PrivateRoute = ({ children, ...rest }) => {

  // const loggedIn = useSelector(state => state.user.loggedIn);

  return (
    // <Route {...rest} render={() => {
    //   return loggedIn
    //     ? children
    //     : <Redirect to="/login" />;
    <Route {...rest} render={() => {
      return children;
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
        <PrivateRoute exact path={routes.dashboard.def}>
          <Activity />
        </PrivateRoute>
        <PrivateRoute exact path={routes.loggerLanding.def}>
          <LoggerLanding />
        </PrivateRoute>
        <PrivateRoute exact path={routes.activity.def}>
          <Activity />
        </PrivateRoute>
        <PrivateRoute exact path={routes.performance.def}>
          <Activity />
        </PrivateRoute>
        <PrivateRoute exact path={routes.bots.def}>
          <Bots />
        </PrivateRoute>
        <PrivateRoute exact path={routes.blacklist.def}>
          <Activity />
        </PrivateRoute>
        <PrivateRoute exact path={routes.whitelist.def}>
          <Activity />
        </PrivateRoute>
        <PrivateRoute exact path={routes.notifications.def}>
          <Activity />
        </PrivateRoute>
        <PrivateRoute exact path={routes.logs.def}>
          <Logs />
        </PrivateRoute>
        <PrivateRoute exact path={routes.rules.def}>
          <Activity />
        </PrivateRoute>
        <PrivateRoute exact path={routes.keys.def}>
          <Activity />
        </PrivateRoute>
        <PrivateRoute exact path={routes.settings.def}>
          <Activity />
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
