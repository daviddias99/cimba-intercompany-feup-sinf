import React from 'react';
import PropTypes from 'prop-types';

import CardAsideInfo from 'components/common/CardAsideInfo';

const CardAside = ({ title, children }) => {

  return (
    <div>
      <div className="top-info">
        Top
        {' '}
        <b>
          {title}
        </b>
      </div>

      {children !== undefined && children.map((key, i) => (
        <CardAsideInfo
          key={i}
          info={key.info}
          requests={key.requests}
        />
      ))}
    </div>
  );
};

CardAside.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
};

export default CardAside;
