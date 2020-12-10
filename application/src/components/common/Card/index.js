import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const Card = ({ title, children, footer }) => {
  const header = title ? 
    <header className="card-header">
      <p className="card-header-title">
        {title}
      </p>
    </header>
    :
    null

  return (
    <div className="card">
      {header}
      <div className="card-content">
        <div className="content">
          {children}
        </div>
      </div>

      {footer ? 
      <div className="card-footer">
        <div className="content">
          {footer}
        </div>
      </div>
      : ""
    }

    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any
};

export default Card;
