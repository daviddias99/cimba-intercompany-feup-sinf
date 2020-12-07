import React from 'react';

import Layout from 'components/common/Layout';
import Card from 'components/common/Card';


const Order = (props) => {
  const orderId = props.match.params.orderId;
  return (
    <Layout title='Order'>
      <Card title='Order'>
        <h1>Order {orderId}</h1>
      </Card>
    </Layout>
  );
}


export default Order;
