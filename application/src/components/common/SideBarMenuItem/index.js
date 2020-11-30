import React from 'react';
import cx from 'classnames';
import { useHistory, Link } from 'react-router-dom';
import Proptypes from 'prop-types';

import './styles.scss';

const SidebarMenuitem = ({ title, image, link }) => {
  const history = useHistory();
  const selected = history.location.pathname === link;

  return (
    <Link
      className={cx('sidebarmenu-link', 'no-select', 'has-text-weight-semibold', { selected })}
      to={link}
    >
      <img src={image} alt='Side bar menu item icon'></img>
      <p>{title}</p>
    </Link>
  );
};

SidebarMenuitem.propTypes = {
  title: Proptypes.string,
  image: Proptypes.string,
  link: Proptypes.string
};

export default SidebarMenuitem;
