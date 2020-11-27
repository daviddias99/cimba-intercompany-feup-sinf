import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Metric from 'components/common/Metric';

const Metrics = ({
  requests,
  blacklist,
  whitelist,
  newBlacklist,
  newWhitelist,
  avgRequestTime,
  users,
  bots,
}) => {
  const [data, setData] = useState(null);
  const getContent = () => {
    if (data === null) {
      return (
        <div>
          <p>No data available.</p>
        </div>
      );
    } else {
      return (
        <div className="is-flex is-flex-wrap-wrap is-justify-content-space-between">
          <Metric
            name="Total Requests"
            value={requests.requests}
            variation={requests.requestsVar}
          />
          <Metric
            name="Blacklisted Requesters"
            value={blacklist.blacklist}
            variation={blacklist.blacklistVar}
          />
          <Metric
            name="Whitelisted Requesters"
            value={whitelist.whitelist}
            variation={whitelist.whitelistVar}
          />
          <Metric
            name="Recently Blacklist"
            value={newBlacklist.newBlacklist}
            variation={newBlacklist.newBlacklistVar}
          />
          <Metric
            name="Recently Whitelist"
            value={newWhitelist.newWhitelist}
            variation={newWhitelist.newWhitelistVar}
          />
          <Metric
            name="Avg Time/Request"
            value={avgRequestTime.avgRequestTime}
            variation={avgRequestTime.avgRequestTimeVar}
          />
          <Metric
            name="Unique Users"
            value={users.users}
            variation={users.usersVar}
          />
          <Metric name="Bots" value={bots.bots} variation={bots.botsVar} />
        </div>
      );
    }
  };

  const getData = () => {
    if (
      requests !== undefined ||
      blacklist !== undefined ||
      whitelist !== undefined ||
      newBlacklist !== undefined ||
      newWhitelist !== undefined ||
      avgRequestTime !== undefined ||
      users !== undefined ||
      bots !== undefined
    ) {
      setData(true);
    }
  };

  useEffect(() => {
    if (data === null) {
      getData();
    }
  });

  return (
    <div>
      {getContent()}
    </div>
  );
};

Metrics.propTypes = {
  requests: PropTypes.object,
  blacklist: PropTypes.object,
  whitelist: PropTypes.object,
  newBlacklist: PropTypes.object,
  newWhitelist: PropTypes.object,
  avgRequestTime: PropTypes.object,
  users: PropTypes.object,
  bots: PropTypes.object,
};

export default Metrics;
