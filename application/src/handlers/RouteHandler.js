import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { changeCurrentLogger } from 'actions/globalActions';

const RouteHandler = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const currentLogger = useSelector(state => state.global.currentLogger);

  /**
   * Gets logger from path.
   */
  const getLoggerFromPath = (path) => {
    let logger = null;

    const indexSlash = path.substr(1).indexOf('/');
    if (indexSlash < 0) {
      logger = path.substr(1);
    } else {
      logger = path.substr(1, indexSlash);
    }

    return logger;
  };

  /**
   * Listens for currentLogger changes.
   */
  useEffect(() => {
    const uriLogger = getLoggerFromPath(history.location.pathname);

    // FIX THIS SHIT
    if (history.location.pathname === '/login') {
      return;
    }

    if (uriLogger !== currentLogger) {
      history.push(`/${currentLogger}`);
    }
  }, [currentLogger, history]);

  /**
   * Listens for location changes.
   */
  useEffect(() => {
    return history.listen((location) => {
      // FIX THIS SHIT
      if (location.pathname === '/login' || location.pathname === '/') {
        return;
      }
      const path = location.pathname;
      const newLogger = getLoggerFromPath(path);
      if (newLogger === '') {
        return;
      }

      // Save current location of current logger
      window.localStorage.setItem(`last-${newLogger}`, path);

      if (newLogger !== currentLogger) {
        dispatch(changeCurrentLogger(newLogger));
      }
    });
  }, [history, currentLogger, dispatch]);

  /**
   * Listens for location changes to private routes
   *
  useEffect(() => {
    if (history.location.pathname !== '/login' && !loggedIn) {
      console.log('go login');
    } else if (history.location.pathname === '/login' && loggedIn) {
      console.log('go home');
    }
  }, [history, loggedIn]);
  */

  return (
    <Fragment>
    </Fragment>
  );
};

export default RouteHandler;
