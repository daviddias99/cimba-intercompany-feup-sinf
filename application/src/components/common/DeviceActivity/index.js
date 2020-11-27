import React from 'react';
import PropTypes from 'prop-types';

import Card from 'components/common/Card';
import DoughnutChart from 'components/common/DoughnutChart';

const DeviceActivity = ({ children }) => {
  return (
    <Card title="Device Activity">
      <div className="columns">
        <div className="column is-flex is-flex-direction-column is-justify-content-space-around is-align-items-center">
          <DoughnutChart id="os">
            {children.os}
          </DoughnutChart>
          <DoughnutChart id="browser">
            {children.browser}
          </DoughnutChart>
        </div>
      </div>
    </Card>

  );
};

DeviceActivity.propTypes = {
  children: PropTypes.any,
};

export default DeviceActivity;
