import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import './styles.scss';
import logo from '../../../assets/images/cimba_logo_white.svg'

const Logo = ({ dark = false, large = false }) => {
  return (
    <div className={cx('is-flex is-align-items-center is-justify-content-center', {
      'is-flex-direction-column': large,
    })}
    >
      <figure className={cx('image', {
        'is-24x24': !large
      }, 'cimba-logo-image')}
      >
        <img src={logo} alt="Cimba Logo" />
      </figure>
      <h1
        className={cx('pl-2 title has-text-weight-medium cimba-title is-uppercase', {
          dark: dark,
          light: !dark,
          'is-4': !large,
          'is-1': large,
        })}
      >
        Cimba
      </h1>
    </div>
  );
};

Logo.propTypes = {
  dark: PropTypes.bool,
  large: PropTypes.bool
};

export default Logo;
