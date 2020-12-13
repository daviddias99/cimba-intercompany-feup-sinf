import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from 'components/common/Layout';
import Card from 'components/common/Card';
import LoadingScreen from 'components/common/LoadingScreen';
import BuyerOrder from './Documents/Buyer/Order';
import SellerOrder from './Documents/Seller/Order';
import Delivery from './Documents/Seller/Delivery';
import Payment from './Documents/Buyer/Payment';
import Receipt from './Documents/Seller/Receipt';
import BuyerInvoice from './Documents/Buyer/Invoice';
import SellerInvoice from './Documents/Seller/Invoice';
import BuyerCreditNote from './Documents/Buyer/CreditNote';
import SellerCreditNote from './Documents/Seller/CreditNote';
import ProcessStepper from './ProcessStepper';
// import { purchaseOrder, salesOrder, sellerDelivery, sellerInvoice, buyerInvoice, receipt, payment, buyerCredit, sellerCredit } from './stubData';

import api from 'services/api';
import './styles.scss';
import GoodsReceipt from './Documents/Buyer/GoodsReceipt';

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

const getComponent = (id, data, type) => {
  return {
    sale: [
      <SellerOrder orderData={data} title='Sales Order Details' />,
      <Delivery delivery={data} title='Delivery Details' />,
      <SellerInvoice invoice={data} title='Invoice Details' />,
      <Receipt receipt={data} title='Receipt Details' />,
    ],
    purchase: [
      <BuyerOrder orderData={data} title='Purchase Order Details' />,
      <GoodsReceipt delivery={data} title='Goods Receipt details'/>,
      <BuyerInvoice invoice={data} title='Invoice Details' />,
      <Payment payment={data} title='Payment Details' />,
    ],
    return_sale: [
      <SellerOrder orderData={data} title='Return Order Details' />,
      <GoodsReceipt delivery={data} title='Delivery Details' />,
      <SellerCreditNote creditNote={data} title='Credit Note Details'/>
    ],
    return_purchase: [
      <BuyerOrder orderData={data} title='Return Order Details' />,
      <Delivery delivery={data} title='Delivery Details' />,
      <BuyerCreditNote creditNote={data} title='Credit Note Details'/>
    ]
  }[type][id];
}

const apiRequests = (id, type) => {
  return {
    sale: [
      api.getOrder,
      api.getTransportation,
      api.getInvoice,
      api.getFinancial
    ],
    purchase: [
      api.getOrder,
      api.getTransportation,
      api.getInvoice,
      api.getFinancial,
    ],
    return_sale: [
      api.getOrder,
      api.getTransportation,
      api.getFinancial,
    ],
    return_purchase: [
      api.getOrder,
      api.getTransportation,
      api.getFinancial,
    ]
  }[type][id]
}

const Process = (props) => {
  const processId = props.match.params.processId;
  const [type, setType] = useState('purchase');
  const [shownStep, setShownStep] = useState(0);
  const [processState, setProcessState] = useState(0);
  const [shownCard, setShownCard] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const endpoint = apiRequests(shownStep, type);
    const callback = (res) => {
      if (res.status === 200) {
        setType(res.data.type)
        setShownStep(res.data.documentState);
        setProcessState(res.data.processState);
        setShownCard(getComponent(shownStep, res.data.document, type))
        setIsLoading(false)
      }
      else {
        setIsLoading(false);
        setRedirect(true);
        return;
      }
    };
    endpoint(processId, callback);
  }, [redirect, processId, shownStep, type]);

  return (
    <Layout title={`Process ${processId}`}>
      {redirect ? <Redirect to="/overview" /> : ""}
      {
        isLoading ?
          <LoadingScreen /> :
          <div>
            <div className='processStepperCard'>
              <Card title={`Process ${processId}`}>
                <ProcessStepper activeStp={shownStep} type={type} maxStep={processState} handlers={[setShownStep, setShownStep]} />
              </Card>
            </div>
            {shownCard}
          </div>
      }

      {/* <SellerOrder orderData={exampleProp.data.order} title='Sales Order Details' />
      <Delivery delivery={exampleProp.data.delivery} title='Delivery Details' />
      <SellerInvoice invoice={exampleProp.data.invoice} title='Invoice Details' />
      <Receipt receipt={exampleProp.data.payment} title='Receipt Details' /> 
      <BuyerCreditNote creditNote={buyerCredit}/>*/
      }

      {/* <SellerCreditNote creditNote={sellerCredit} /> */}
      {/* <BuyerOrder orderData={exampleProp.data.order} title='Purchase Order Details' />
      <BuyerInvoice invoice={exampleProp.data.invoice} title='Invoice Details' />
      <Payment payment={exampleProp.data.payment} title='Payment Details' /> */}
    </Layout>
  );
}


export default Process;
