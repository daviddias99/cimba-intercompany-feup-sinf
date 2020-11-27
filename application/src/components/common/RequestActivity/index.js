import React from 'react';
import PropTypes from 'prop-types';

import Card from 'components/common/Card';
import CardAside from 'components/common/CardAside';
import BarChart from 'components/common/BarChart';

const RequestActivity = ({ children }) => {
  return (
    <Card title="Request Activity">
      <div className="columns">
        <div className="column is-flex is-flex-direction-column is-two-thirds is-justify-content-space-around is-align-items-center">
          <BarChart id="endpoint">
            {children.endpoint}
          </BarChart>
          <p>[Area Chart]</p>
        </div>
        <div className="column">
          <CardAside title="Requested URIs">
            {children.uri}
          </CardAside>
        </div>
      </div>
    </Card>

  );
};

RequestActivity.propTypes = {
  children: PropTypes.any,
};

export default RequestActivity;
