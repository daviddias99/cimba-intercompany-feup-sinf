import React from 'react';

import Card from 'components/common/Card';

const Order = (props) => {
  console.log(props)
  const orderData = props.orderData

  return (
      <Card title={`Order ${orderData.naturalKey}`}>
        <div>
          
        </div>
      </Card>
  );
}


export default Order;
