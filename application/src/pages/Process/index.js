import React from 'react';

import Layout from 'components/common/Layout';
import Card from 'components/common/Card';
import Order from './Documents/Buyer/Order';
import Delivery from './Documents/Seller/Delivery';
import Payment from './Documents/Buyer/Payment';
import Receipt from './Documents/Seller/Receipt';
import BuyerInvoice from './Documents/Buyer/Invoice';
import SellerInvoice from './Documents/Seller/Invoice';
import ProcessStepper from './ProcessStepper';
import {purchaseOrder, sellerDelivery, sellerInvoice, buyerInvoice,receipt, payment} from './stubData';

import './styles.scss';

/*
 * 
  {
      date: '12/12/2020',
      processId: 'ECF-2',
      companyName: 'Mister Cimba',
      statusCode: 3,
      status: 'Payment',
      currentStep: 3,
      data: {
        order:... ,
        delivery: ... ,
        invoice: ... ,
        payment: ... 
      }
   } 
 */

const Process = (props) => {
  const processId = props.match.params.processId;



  return (
    <Layout title={`Process ${processId}`}>
      <div className='processStepperCard'>
        <Card title={`Process ${processId}`}>
          <ProcessStepper activeStp={2} />
        </Card>
      </div>

      {/* <BuyerInvoice invoice={buyerInvoice} title='Invoice Details' />
      <SellerInvoice invoice={sellerInvoice} title='Invoice Details' />
      <Order orderData={purchaseOrder} title='Order Details' />
      <Delivery delivery={sellerDelivery} title='Delivery Details' /> */}
      <Receipt receipt={receipt} title='Receipt Details' />
      <Payment payment={payment} title='Payment Details' />
    </Layout>
  );
}


export default Process;
