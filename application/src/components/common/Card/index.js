import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const Card = ({ title, children }) => {
  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">
          {title}
        </p>
      </header>
      <div className="card-content">
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any
};

export default Card;
