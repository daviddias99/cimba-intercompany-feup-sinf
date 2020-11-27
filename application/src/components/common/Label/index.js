import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const Label = ({ color, textColor, removable, children }) => {
  const getDelete = () => {
    if (removable) {
      return <button className="delete" />;
    }
  };


  const getCustomColorLabel = () => {
    return (
      <span
        className="tag is-rounded is-uppercase"
        style={{ backgroundColor: color, color: textColor }}
      >
        { children}
        { getDelete()}
      </span>
    );
  };

  const getSpecificColorLabel = () => {
    return (
      <span className={cx('tag', 'is-rounded', 'is-uppercase', `is-${color}`)}>
        { children}
        { getDelete()}
      </span>

    );
  };

  return (
    <>
      { color.charAt(0) === '#'
        ? getCustomColorLabel()
        : getSpecificColorLabel()}
    </>
  );
};

Label.propTypes = {
  color: PropTypes.string,
  textColor: PropTypes.string,
  removable: PropTypes.bool,
  children: PropTypes.any,
};

export default Label;
