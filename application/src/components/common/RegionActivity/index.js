import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import Card from 'components/common/Card';
import CardAside from 'components/common/CardAside';
import MapChart from 'components/common/MapChart';

const RegionActivity = ({ children }) => {
  const [content, setContent] = useState('');

  return (
    <Card title="Region Activity">
      <div className="columns">
        <div className="column is-flex is-flex-direction-column is-three-quarters-desktop is-two-thirds is-justify-content-space-around is-align-items-center">
          <p>[Table]</p>
          <MapChart setTooltipContent={setContent}>


            {children.country}
          </MapChart>
          <ReactTooltip>
            {content}
          </ReactTooltip>
        </div>
        <div className="column">
          <CardAside title="IP Addresses">
            {children.address}
          </CardAside>
        </div>
      </div>
    </Card>
  );
};

RegionActivity.propTypes = {
  children: PropTypes.any,
};

export default RegionActivity;
