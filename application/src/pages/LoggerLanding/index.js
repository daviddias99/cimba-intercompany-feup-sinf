import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import routes from 'routes';

const LoggerLanding = () => {
  const currentLogger = useSelector(state => state.global.currentLogger);

  const lastPage = localStorage.getItem(`last-${currentLogger}`);
  if (lastPage) {
    return (
      <Redirect to={lastPage} />
    );
  } else {
    return (
      <Redirect to={routes.activity.ref(currentLogger)} />
    );
  }
};

export default LoggerLanding;
