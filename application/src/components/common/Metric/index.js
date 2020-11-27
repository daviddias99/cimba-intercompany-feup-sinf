import React from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';

import './styles.scss';

const Metric = ({ name, value, variation }) => {
  const truncateValue = (value) => {
    return Math.abs(Number(value)) >= 1.0e9
      ? Math.abs(Number(value)) / 1.0e9 + 'B'
      : Math.abs(Number(value)) >= 1.0e6
        ? Math.abs(Number(value)) / 1.0e6 + 'M'
        : Math.abs(Number(value)) >= 1.0e3
          ? Math.abs(Number(value)) / 1.0e3 + 'K'
          : Math.abs(Number(value));
  };

  const truncateTime = (value) => {
    return Math.abs(Number(value)) >= 6.0e4
      ? (Math.abs(Number(value)) / 6.0e4).toFixed(2) + 'min'
      : Math.abs(Number(value)) >= 1.0e3
        ? (Math.abs(Number(value)) / 1.0e3) + 's'
        : Math.abs(Number(value)).toFixed(1) + 'ms';
  };

  const sign = (variation) => {
    return parseFloat(variation) > 0 ? 'has-text-success' : 'has-text-danger';
  };
  return (
    <div className="metric rows is-flex is-flex-direction-column">
      <div className="is-flex is-justify-content-space-between">
        <p className="metric-name">
          {name}
        </p>
        <p className={cx('metric-variation', sign(variation))}>
          {(variation[0] !== '-' ? '+' : '') + variation + '%'}
        </p>
      </div>
      <div>
        {name === 'Avg Time/Request' ? (
          <div className="metric-value">
            {truncateTime(value)}
          </div>
        ) : (
          <p className="metric-value">
            {truncateValue(value)}
          </p>
        )}
      </div>
    </div>
  );
};

Metric.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  variation: PropTypes.string,
};

export default Metric;
