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
      links: [
        { title: 'Dashboard', link: routes.activity.ref(currentLogger) },
        { title: 'Orders', link: routes.performance.ref(currentLogger) },
        { title: 'Mapping', link: routes.performance.ref(currentLogger) },
        { title: 'Settings', link: routes.performance.ref(currentLogger) },
        { title: 'Logs', link: routes.performance.ref(currentLogger) },
      ],
    },
    {
      title: 'Support',
      links: [
        { title: 'Support', link: routes.bots.ref(currentLogger) },
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

Sidebar.propTypes = {
  loggerName: Proptypes.string,
};

export default Sidebar;
