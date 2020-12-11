import React from 'react';

import Card from 'components/common/Card';
import './styles.scss';

const GoodsReceipt = (props) => {
  const deliveryData = props.delivery
  return (
    <Card title={`Goods Receipt`}>
      <p>We have received a goods receipt with this Jasmin ID: {deliveryData.deliveryId} . But can't show it right now :(</p>
    </Card>
  );
}


export default GoodsReceipt;
