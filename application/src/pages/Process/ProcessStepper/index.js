import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import classNames from 'classnames';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { Button } from 'components/common/Button';

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
    margin: '0em 2em 0em 2em',
    // fontSize: 'large'
  },
  active: {
    backgroundColor: '#ff4000',
    border: '2px solid #22333b',
  },
  alternativeLabel: {
    color: '#ffffff'
  },
  completed: {
    backgroundColor: '#ff4000',
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;
  const icons = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
  };

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


function getSteps() {
  return ['Order', 'Delivery', 'Invoice', 'Receipt',];
}


export default function OverviewTooltipStepper({ activeStp, maxStep, handlers }) {
  const classes = useColorlibStepIconStyles();
  const steps = getSteps();
  // const [thisActiveStep, setThisActiveStep] = useState(activeStp);

  const handleNext = () => {
    handlers[1](activeStp === maxStep ? maxStep : activeStp + 1);
    // setThisActiveStep(thisActiveStep+1)
  };

  const handleBack = () => {
    handlers[0](activeStp === 0 ? 0 : activeStp - 1);
    // setThisActiveStep(thisActiveStep+1)
  };

  // const handleReset = () => {
  //   setActiveStep(0);
  // };

  return (
    <div className='stepperWrapper'>
      <div className={clsx(classes.root)}>
        <Stepper alternativeLabel activeStep={activeStp}>
          {steps.map((label, idx) => (

            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>{<span className='tooltiplabel'>{label}</span>}</StepLabel>
            </Step>

          ))}
        </Stepper>
      </div>
      <Button onClick={handleBack}>
        Back
      </Button>
      <Button onClick={handleNext} >
        Next
      </Button>
    </div>
  );

}
