import React from 'react';
import cx from 'classnames';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { changeCurrentLogger } from 'actions/globalActions';

import './styles.scss';

const LoggerBtn = ({ loggerId, loggerName, loggerNotifications, selected }) => {
  const dispatch = useDispatch();

  const setLogger = () => {
    dispatch(changeCurrentLogger(loggerId));
  };

  const firstLetter = loggerName[0];

  const getNotificationBadge = () => {
    if (loggerNotifications > 0) {
      return (
        <div className="notification-badge">
          <div className={cx('badge', { selected })}>
            {loggerNotifications}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="logger-btn">
      {getNotificationBadge()}
      <div className={cx('wrap', { selected })} onClick={setLogger}>
        <div className="btn">
          {firstLetter}
        </div>
      </div>
    </div>
  );
};

LoggerBtn.propTypes = {
  loggerId: PropTypes.string,
  loggerName: PropTypes.string,
  loggerNotifications: PropTypes.number,
  selected: PropTypes.bool,
};

export default LoggerBtn;
