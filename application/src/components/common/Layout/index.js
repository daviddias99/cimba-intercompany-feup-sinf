import React from 'react';
import PropTypes from 'prop-types';

import usePage from 'hooks/usePage';

import Sidebar from 'components/common/Sidebar';
import Navbar from 'components/common/Navbar';
import LoadingScreen from 'components/common/LoadingScreen';

import './styles.scss';

const Layout = ({ title, noSidebar, loading, children }) => {
  usePage(title);

  const getSidebar = () => {
    if (noSidebar === true) {
      return null;
    } else {
      return (
        <Sidebar />
      );
    }
  };

  return (
    <div className="layout">
      <Navbar />
      <div className="layout-content-wrap">
        {getSidebar()}
        <div className="layout-content">
          {loading ? <LoadingScreen /> : children}
        </div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  title: PropTypes.string,
  noSidebar: PropTypes.bool,
  loading: PropTypes.bool,
  children: PropTypes.any
};

export default Layout;
