import React from 'react';
import Proptypes from 'prop-types';
import SidebarMenuItem from '../SideBarMenuItem';

import './styles.scss';

const SidebarMenu = ({ title, links }) => {

  /**
   * Link sub-component.
   */
  const menuLink = ({ title, link, image }, i) => {
    console.log(image);
    return (
      
      <SidebarMenuItem
        key={i}
        title={title}
        image={image}
        link={link}
      />
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

  const getTitle = (ttl) => {
    if (ttl)
      return (
      <div className="sidebarmenu-title">
        {ttl}
      </div>
      );
  }

  return (
    <div className="sidebarmenu-wrap">

      {getTitle(title)}

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
