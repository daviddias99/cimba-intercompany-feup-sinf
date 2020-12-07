import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import './styles.scss';

const BtnType = {
  filled: 'filled',
  outlined: 'outlined',
  text: 'text'
};

const Button = ({ color = 'primary', btnType, type = BtnType.filled, disabled = false, loading = false, fullwidth = false, onClick, children }) => {
  return (
    <button
      type={btnType}
      onClick={onClick}
      className={cx('button', 'is-uppercase',
        type !== BtnType.text ? `is-${color}` : '',
        type === BtnType.text ? `has-text-${color}` : '', {
          'is-outlined': type === BtnType.outlined,
          'is-text': type === BtnType.text,
          'is-disabled': disabled,
          'is-loading': loading,
          'is-fullwidth': fullwidth,
        })}
    >
      { children}
    </button>
  );
};

Button.propTypes = {
  color: PropTypes.string,
  btnType: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  fullwidth: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.any,
};

export { Button, BtnType };
