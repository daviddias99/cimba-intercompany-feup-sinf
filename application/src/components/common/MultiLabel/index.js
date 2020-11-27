import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import Label from 'components/common/Label';
import ColorPickerInput from 'components/common/ColorPickerInput';

import './styles.scss';

const MultiLabel = ({ color, name, action }) => {
  return (
    <div
      className={cx(
        'multi-label is-flex is-justify-content-space-between',
        action
      )}
    >
      <Label color={color}>
        {name}
      </Label>
      <ColorPickerInput color={color} name={name} action={action} />
    </div>
  );
};

MultiLabel.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string,
  action: PropTypes.string
};

export default MultiLabel;
