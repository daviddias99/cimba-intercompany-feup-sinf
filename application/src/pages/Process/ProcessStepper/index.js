import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { Button } from 'components/common/Button';
import './styles.scss'

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    color: '#fff',
    width: 35,
    height: 35,
    display: 'flex',
    alignContent: 'center',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0em'
  },
  active: {
    backgroundColor: '#ff4000',
    border: '2px solid #22333b',
  },

  completed: {
    backgroundColor: '#ff4000',
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed} = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {<i className="overviewStatusIcon fas fa-circle"></i>}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};


function getSteps(type) {
  return {
    sales: ['Order', 'Delivery', 'Invoice', 'Receipt',],
    purchase: ['Order', 'Goods Receipt', 'Invoice', 'Payment',],
    return_sale: ['Order', 'Delivery', 'Credit Note'],
    return_purchase: ['Order', 'Delivery', 'Credit Note'],
  }[type];
}


export default function OverviewTooltipStepper({ activeStp, maxStep, handlers, type }) {
  const classes = useColorlibStepIconStyles();
  const steps = getSteps(type);

  const handleNext = () => {
    handlers[1](activeStp === maxStep ? maxStep : activeStp + 1);
  };

  const handleBack = () => {
    handlers[0](activeStp === 0 ? 0 : activeStp - 1);
  };

  return (
    <div className='stepperWrapper'>
      <div className={clsx(classes.root)}>
        <Stepper alternativeLabel activeStep={activeStp} nonLinear={true}>
          {steps.map((label, idx) => (

            <Step key={label} completed={idx <= maxStep ? true : undefined} disabled={idx > maxStep}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>{<span className='tooltiplabel'>{label}</span>}</StepLabel>
            </Step>

          ))}
        </Stepper>
      </div>
      <div className='control-buttons'>
        <Button disabled={activeStp === 0} onClick={handleBack}>
          Back
        </Button>
        <Button disabled={activeStp === maxStep} onClick={handleNext} >
          Next
      </Button>
      </div>

    </div>
  );

}
