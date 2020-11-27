import React from 'react';
import cx from 'classnames';
import { useHistory, Link } from 'react-router-dom';
import Proptypes from 'prop-types';

import './styles.scss';

const SidebarMenu = ({ title, links }) => {
  const history = useHistory();

  /**
   * Link sub-component.
   */
  const menuLink = ({ title, link }, i) => {
    const selected = history.location.pathname === link;
    return (
      <Link
        key={i}
        className={cx('sidebarmenu-link', 'no-select', { selected })}
        to={link}
      >
        {title}
      </Link>
    );
  };

  /**
   * Returns the links.
   */
  const getLinks = () => {
    if (links) {
      return links.map((link, i) => menuLink(link, i));
    }
  };

  return (
    <div className="sidebarmenu-wrap">
      <div className="sidebarmenu-title is-uppercase">
        {title}
      </div>

      <div className="sidebarmenu-links-wrap">
        {getLinks()}
      </div>
    </div>
  );
};

SidebarMenu.propTypes = {
  title: Proptypes.string,
  links: Proptypes.array
};

export default SidebarMenu;
