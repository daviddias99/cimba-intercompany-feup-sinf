import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Layout from 'components/common/Layout';
import MetricsGlance from 'components/common/MetricsGlance';
// import UserActivity from 'components/common/UserActivity';
// import RequestActivity from 'components/common/RequestActivity';
// import DeviceActivity from 'components/common/DeviceActivity';
// import RegionActivity from 'components/common/RegionActivity';

import api from 'services/api';

const Activity = () => {
  const currentLogger = useSelector((state) => state.global.currentLogger);

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Fetches for activity data.
   */
  const fetchActivity = useCallback(() => {
    api.getActivity(currentLogger, (res) => {
      setIsLoading(false);
      if (res.data.status === 200) {
        setData(res.data.data);
      } else {
        // setIsError(true);
      }
    });
  }, [currentLogger]);

  const getMetrics = () => {
    if (data !== null) {
      return <MetricsGlance {...data.metrics} />;
    } else {
      return <MetricsGlance {...[]} />;
    }
  };

  /**
   * Calls fetchActivity onload.
   */
  useEffect(() => {
    if (isLoading) {
      fetchActivity();
    }
  }, [isLoading, fetchActivity]);

  return (
    <Layout title={'Activity'} loading={isLoading}>
      <div className="columns">
        <div className="column">
          {getMetrics()}
          <div className="columns is-desktop mt-3">
            <div className="column">
              {/* <UserActivity>
                  {getUser()}
                </UserActivity> */}
            </div>
            <div className="column">
              {/* <RequestActivity>
                  {getRequest()}
                </RequestActivity> */}
            </div>
          </div>
          <div className="columns is-desktop">
            <div className="column is-one-third-desktop">
              {/* <DeviceActivity>
                  {getDevice()}
                </DeviceActivity> */}
            </div>
            <div className="column">
              {/* <RegionActivity>
                  {getRegion}
                </RegionActivity> */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

Activity.propTypes = {
  title: PropTypes.string,
  noSidebar: PropTypes.bool,
  navbarLogo: PropTypes.bool,
  children: PropTypes.any,
};

export default Activity;
