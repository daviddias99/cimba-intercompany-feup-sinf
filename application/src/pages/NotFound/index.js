import React from 'react';
import { useSelector } from 'react-redux';

import usePage from 'hooks/usePage';

const NotFound = () => {
  usePage('Not found');
  const loggers = useSelector(state => state.global.loggers);

  // PATCH
  loggers.forEach(logger => {
    window.localStorage.removeItem(`last-${logger.id}`);
  });
  window.localStorage.removeItem('last-logger');

  return (
    <div>
      Not found
    </div>
  );
};

export default NotFound;
