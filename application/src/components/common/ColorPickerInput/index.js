import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const ColorPickerInput = ({ color, name, action }) => {
  return (
    <div className="is-flex flex-direction-row is-align-items-center">
      {action !== 'default' && (
        <div className="color-picker-text is-flex is-justify-content-flex-end is-align-items-center">
          <p>
            {name}
          </p>
        </div>
      )}
      <div className="color-picker is-flex is-justify-content-center is-align-items-center">
        {action !== 'add' && (
          <p>
            {color}
          </p>
        )}
      </div>
      <div
        className="color-picker-preview"
        style={{ backgroundColor: color }}
      />
      {action !== 'default' && <a href="/" className="delete"></a>}
    </div>
  );
};

ColorPickerInput.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string,
  action: PropTypes.string
};

export default ColorPickerInput;
