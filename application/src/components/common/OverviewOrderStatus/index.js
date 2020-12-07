import LightTooltip from 'components/common/Tooltip';
import OverviewTooltipStepper from 'components/common/OverviewTooltipStepper';
import React from 'react';

import './styles.scss';

const OverviewOrderStatus = ({ row }) => {

  const colorFromStatyus = {
    0: '#052423',
    1: '#0B5351',
    2: '#00A9A5',
    3: '#4E8098',
    4: '#90C2E7',
  }

  const style = {
    opacity: 1,
    color: colorFromStatyus[row.statusCode],
  }

  return (
    <div className='overviewStatusCell'>
      <LightTooltip
        title={
          <React.Fragment>
            <OverviewTooltipStepper activeStp={row.currentStep} />
          </React.Fragment>
        }
        placement="top"
      >
        <div className='overviewStatusCellContent'>
          <i style={style} className="overviewStatusIcon fas fa-circle"></i>
          <p>{row.status}</p>
        </div>

      </LightTooltip>
    </div>);
}

export default OverviewOrderStatus;