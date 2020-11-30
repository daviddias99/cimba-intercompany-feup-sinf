import React, { useState, Fragment } from 'react';
import cx from 'classnames';

import SidebarMenu from 'components/common/SidebarMenu';

import routes from 'routes';
import icons from '../../../assets/icons';
import './styles.scss';

const Sidebar = () => {
  const [opened, setOpened] = useState(false);

  const toggleSidebar = () => {
    setOpened(!opened);
  };

  /**
   * Sidebar menus definition.
   */
  const menus = [
    {
      links: [
        { title: 'Overview', link: routes.overview.ref(), image: icons.dashboardIcon },
        { title: 'Mapping', link: routes.mapping.ref(), image: icons.peopleIcon},
        { title: 'Settings', link: routes.settings.ref(), image: icons.lockIcon },
        { title: 'Logs', link: routes.logs.ref(), image: icons.textIcon },
      ],
    },
    {
      title: 'Support',
      links: [
        { title: 'Support', link: routes.support.ref(), image:icons.supportIcon },
      ],
    },
  ];

  /**
   * Returns menus
   * as SidebarMenu components.
   */
  const getMenus = () => {
    return menus.map((menu, i) => {
      return (
        <SidebarMenu
          key={i}
          title={menu.title}
          links={menu.links}
        />
      );
    });
  };

  return (
    <Fragment>
      <div className="sidebar-hamburguer" onClick={toggleSidebar}>
        <span className="icon is-large">
          <i className="fas fa-lg fa-bars"></i>
        </span>
      </div>
      <div className={cx('sidebar', { opened })}>
        <div className="sidebar-split">
          <div className="sidebar-content">
            {getMenus()}
          </div>
        </div>
      </div>
      <div
        className={cx('sidebar-cover', { opened })}
        onClick={toggleSidebar}
      />
    </Fragment>
  );
};

export default Sidebar;
