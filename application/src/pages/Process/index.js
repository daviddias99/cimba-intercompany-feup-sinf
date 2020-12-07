import React from 'react';

import Layout from 'components/common/Layout';
import Card from 'components/common/Card';
import Order from './Order';
import ProcessStepper from './ProcessStepper';
import order from './stubData';

import './styles.scss';

const Process = (props) => {
  const processId = props.match.params.processId;

  return (
    <Layout title={`Process ${processId}`}>
      <div className='processStepperCard'>
        <Card title={`Process ${processId}`}>
          <ProcessStepper activeStp={1}/>
        </Card>
      </div>

      <Order orderData={order} title='Order Details'/>
    </Layout>
  );
}


export default Process;
