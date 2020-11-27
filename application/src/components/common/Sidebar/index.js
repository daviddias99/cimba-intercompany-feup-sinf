import React, { useState, Fragment } from 'react';
import { useSelector } from 'react-redux';
import cx from 'classnames';
import Proptypes from 'prop-types';

import SidebarMenu from 'components/common/SidebarMenu';

import routes from 'routes';

import './styles.scss';

const Sidebar = ({ loggerName }) => {
  const [opened, setOpened] = useState(false);

  const currentLogger = useSelector(state => state.global.currentLogger);

  const toggleSidebar = () => {
    setOpened(!opened);
  };

  /**
   * Sidebar menus definition.
   */
  const menus = [
    {
      title: 'Dashboard',
      links: [
        { title: 'Activity', link: routes.activity.ref(currentLogger) },
        { title: 'Performance', link: routes.performance.ref(currentLogger) }
      ],
    },
    {
      title: 'General',
      links: [
        { title: 'Bots', link: routes.bots.ref(currentLogger) },
        { title: 'Blacklist', link: routes.blacklist.ref(currentLogger) },
        { title: 'Whitelist', link: routes.whitelist.ref(currentLogger) },
        { title: 'Notifications', link: routes.notifications.ref(currentLogger) },
      ],
    },
    {
      title: 'Settings',
      links: [
        { title: 'Logs', link: routes.logs.ref(currentLogger) },
        { title: 'Rules', link: routes.rules.ref(currentLogger) },
        { title: 'Keys', link: routes.keys.ref(currentLogger) },
        { title: 'Settings', link: routes.settings.ref(currentLogger) },
      ],
    }
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
        <div className="header">
        </div>
        <div className="sidebar-split">
          <div className="sidebar-content">
            <div className="sidebar-title">
              {loggerName}
            </div>
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

Sidebar.propTypes = {
  loggerName: Proptypes.string,
};

export default Sidebar;
