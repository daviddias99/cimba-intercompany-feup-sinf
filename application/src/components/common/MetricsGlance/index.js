import React from 'react';
import PropTypes from 'prop-types';

import Card from 'components/common/Card';
import Metrics from 'components/common/Metrics';

const MetricsGlance = ({
  requests,
  blacklist,
  whitelist,
  newBlacklist,
  newWhitelist,
  avgRequestTime,
  users,
  bots,
}) => {
  return (
    <Card title="Metrics">
      <Metrics
        requests={requests}
        blacklist={blacklist}
        whitelist={whitelist}
        newBlacklist={newBlacklist}
        newWhitelist={newWhitelist}
        avgRequestTime={avgRequestTime}
        users={users}
        bots={bots}
      />
    </Card>
  );
};

MetricsGlance.propTypes = {
  requests: PropTypes.object,
  blacklist: PropTypes.object,
  whitelist: PropTypes.object,
  newBlacklist: PropTypes.object,
  newWhitelist: PropTypes.object,
  avgRequestTime: PropTypes.object,
  users: PropTypes.object,
  bots: PropTypes.object
};

export default MetricsGlance;
