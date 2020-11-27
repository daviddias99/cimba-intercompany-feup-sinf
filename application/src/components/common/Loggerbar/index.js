import React from 'react';
import { useSelector } from 'react-redux';

import LoggerBtn from 'components/common/LoggerBtn';

import './styles.scss';

const Loggerbar = () => {
  const currentLogger = useSelector(state => state.global.currentLogger);

  const loggers = useSelector(state => state.global.loggers);

  const allLoggers = loggers.map(l => {
    return (
      <LoggerBtn
        key={l.id}
        loggerId={l.id}
        loggerName={l.name}
        loggerNotifications={l.notifications}
        selected={currentLogger === l.id}
      />
    );
  });

  return (
    <div className="loggerbar">
      <div className="logger-container">
        {allLoggers}
      </div>
    </div>
  );
};

export default Loggerbar;
