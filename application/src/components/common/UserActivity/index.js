import React from 'react';
import PropTypes from 'prop-types';

import Card from 'components/common/Card';
import CardAside from 'components/common/CardAside';
import DoughnutChart from 'components/common/DoughnutChart';

const UserActivity = ({ children }) => {
  return (
    <Card title="User Activity">
      <div className="columns">
        <div className="column is-flex is-flex-direction-column is-two-thirds is-justify-content-space-around is-align-items-center">
          <DoughnutChart id="users">
            {children !== undefined ? children.category : []}
          </DoughnutChart>
          <p>[Linear Chart]</p>


        </div>
        <div className="column">
          <CardAside title="Users">
            {children !== undefined ? children.username : []}
          </CardAside>
        </div>
      </div>
    </Card>
  );
};

UserActivity.propTypes = {
  children: PropTypes.any,
};

export default UserActivity;
