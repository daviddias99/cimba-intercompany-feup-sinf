import React from 'react';

import Spinner from 'components/common/Spinner';

import './styles.scss';

const LoadingScreen = () => {
  return (
    <div className="loadingscreen-container">
      <div className="loadingscreen-wrap">
        <Spinner className="loadingscreen-spinner" />
        <div className="loadingscreen-label">Fetching your data</div>
      </div>
    </div>
  );
};

export default LoadingScreen;
