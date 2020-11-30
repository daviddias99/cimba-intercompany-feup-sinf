import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const CardSideTop = ({ info, requests }) => {
  return (
    <div className="is-flex is-flex-direction-column mt-2">
      <p className="info">
        {info}
      </p>
      <p className="requests">
        <b>
          {requests}
        </b>
        {' '}
        requests
      </p>
    </div>
  );
};

CardSideTop.propTypes = {
  info: PropTypes.string,
  requests: PropTypes.string,
};

export default CardSideTop;
