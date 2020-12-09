import React, { useEffect, useState } from 'react';

import Layout from 'components/common/Layout';
import Card from 'components/common/Card';
import BuyerOrder from './Documents/Buyer/Order';
import SellerOrder from './Documents/Seller/Order';
import Delivery from './Documents/Seller/Delivery';
import Payment from './Documents/Buyer/Payment';
import Receipt from './Documents/Seller/Receipt';
import BuyerInvoice from './Documents/Buyer/Invoice';
import SellerInvoice from './Documents/Seller/Invoice';
import ProcessStepper from './ProcessStepper';
import {purchaseOrder, salesOrder, sellerDelivery, sellerInvoice, buyerInvoice,receipt, payment} from './stubData';

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

const buyerPropsExample = {
  date: '12/12/2020',
  processId: 'ECF-2',
  companyName: 'Mister Cimba',
  statusCode: 3,
  status: 'Payment',
  currentStep: 3,
  data: {
    order: purchaseOrder ,
    delivery: null,
    invoice: buyerInvoice ,
    payment: payment
  }
}

const sellerPropsExample = {
  date: '12/12/2020',
  processId: 'ECF-2',
  companyName: 'Mister Cimba',
  statusCode: 3,
  status: 'Payment',
  currentStep: 2,
  data: {
    order: salesOrder ,
    delivery: sellerDelivery,
    invoice: sellerInvoice ,
    payment: receipt
  }
}

const prp = [
      <SellerOrder orderData={sellerPropsExample.data.order} title='Sales Order Details' />,
      <Delivery delivery={sellerPropsExample.data.delivery} title='Delivery Details' />,
      <SellerInvoice invoice={sellerPropsExample.data.invoice} title='Invoice Details' />,
      <Receipt receipt={sellerPropsExample.data.payment} title='Receipt Details' />,
]

const Process = (props) => {
  const exampleProp = sellerPropsExample
  const [shownStep, setShownStep] = useState(exampleProp.currentStep);
  const [shownCard, setShownCard] = useState(exampleProp.currentStep);

  useEffect(
    () => {
      // Do initial API call
      setShownCard(prp[shownStep])
    }, [shownStep]
  );

  return (
    <Layout title={`Process ${exampleProp.processId}`}>
      <div className='processStepperCard'>
        <Card title={`Process ${exampleProp.processId}`}>
          <ProcessStepper activeStp={shownStep} maxStep={exampleProp.currentStep} handlers={[setShownStep, setShownStep]}/>
        </Card>
      </div>
      {shownCard}
      {/* <SellerOrder orderData={exampleProp.data.order} title='Sales Order Details' />
      <Delivery delivery={exampleProp.data.delivery} title='Delivery Details' />
      <SellerInvoice invoice={exampleProp.data.invoice} title='Invoice Details' />
      <Receipt receipt={exampleProp.data.payment} title='Receipt Details' /> */}

      {/* <BuyerOrder orderData={exampleProp.data.order} title='Purchase Order Details' />
      <BuyerInvoice invoice={exampleProp.data.invoice} title='Invoice Details' />
      <Payment payment={exampleProp.data.payment} title='Payment Details' /> */}
    </Layout>
  );
}


export default Process;
