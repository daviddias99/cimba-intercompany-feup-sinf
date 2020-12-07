import React from 'react';

import Card from 'components/common/Card';
import BasicField from 'pages/Process/BasicField';
import DataTable from 'react-data-table-component';
import orderTableColumns from 'utils/orderTableColumns';

import './styles.scss'
import order from '../stubData';
import LargeField from '../LargeField';
import Subsection from '../Subsection';

const Order = (props) => {
  const orderData = props.orderData
  const documentDate = new Date(orderData.documentDate);
  const dateStr = documentDate.getUTCDay() + "/" + (documentDate.getUTCMonth() + 1) + "/" + documentDate.getUTCFullYear();

  const overviewFields = [
    { id: 0, fieldSize: 'small', label: 'Document Type', value: orderData.documentType },
    { id: 1, fieldSize: 'small', label: 'Series / Number', value: `${orderData.serie} - ${orderData.seriesNumber}` },
    { id: 2, fieldSize: 'small', label: 'Date', value: dateStr },
    { id: 3, fieldSize: 'large', label: 'Reference', value: orderData.reference },
    { id: 4, fieldSize: 'large', label: 'Supplier', value: orderData.sellerSupplierPartyName },
    { id: 5, fieldSize: 'large', label: 'Payment Term', value: orderData.paymentTermDescription },
    { id: 6, fieldSize: 'large', label: 'Delivery Term', value: orderData.deliveryTermDescription },
    { id: 7, fieldSize: 'small', label: 'Discount', value: orderData.discountInValueAmountAmount.toFixed(2) + "%" },
  ];

  const postingDate = new Date(orderData.postingDate);
  const postingDateStr = postingDate.getUTCDay() + "/" + (postingDate.getUTCMonth() + 1) + "/" + postingDate.getUTCFullYear();

  const financialFields = [
    { id: 0, fieldSize: 'small', label: 'Payment method', value: orderData.documentType },
    { id: 1, fieldSize: 'small', label: 'Currency', value: `${orderData.serie} - ${orderData.seriesNumber}` },
    { id: 2, fieldSize: 'small', label: 'Bill from', value: orderData.accountingPartyName },
    { id: 3, fieldSize: 'large', label: 'Billing Tax ID', value: orderData.accountingPartyTaxId },
    { id: 4, fieldSize: 'large', label: 'Posting Date', value: postingDateStr },
    { id: 5, fieldSize: 'large', label: 'Exchange Rate', value: orderData.exchangeRate.toFixed(orderData.exchangeRateDecimalPlaces) },
  ];

  const goodsAndServicesTitleAppendix = order.taxIncluded ? ' (Prices are tax inclusive)' : '(Prices are not tax inclusive)';
  const goodsAndServicesTitle = (<h1>Goods and Services <span className='taxIncluded'>{goodsAndServicesTitleAppendix}</span></h1>);
  return (
    <Card title={`Order ${orderData.naturalKey}`}>

      <Subsection sectionId='baseFields'>
        {overviewFields.map((field) => (
          <BasicField key={field.id} label={field.label} value={field.value} />
        ))}
      </Subsection>

      <Subsection sectionId='goodsAndServices' flexDirection='column' title={goodsAndServicesTitle}>
        <div style={{width: '100%'}}>
          <DataTable
            className="table-display"
            columns={orderTableColumns}
            data={orderData.documentLines}
            highlightOnHover={true}
            noHeader={true}
            pagination={true}
          />
          <h2 className='orderTotal'><span className='orderTotalText'>Total:</span> {`${orderData.grossValue.amount} ${orderData.grossValue.symbol}`}</h2>
        </div>
      </Subsection>
      <hr />

      <Subsection sectionId='commercial' title='Commercial'>
        <LargeField label={'Note do Recipient'} value={orderData.noteToRecipient} />
        <LargeField label={'Supplier Address'} value={orderData.sellerSupplierPartyAddress} />
        <BasicField label={'Order Nature'} value={orderData.orderNatureDescription} />
      </Subsection>
      <hr />

      <Subsection sectionId='financial' title='Financial'>
        {financialFields.map((field) => (
          <BasicField key={field.id} label={field.label} value={field.value} />
        ))}
        <LargeField label={'Billing Address'} value={orderData.accountingPartyAddress} />
      </Subsection>
      <hr />

      <Subsection sectionId='delivery' title='Delivery'>
        <LargeField label={'Loading'} value={orderData.loadingPointAddress + '\n' + orderData.loadingCountryDescription} />
        <LargeField label={'Unloading'} value={orderData.unloadingPointAddress + '\n' + orderData.unloadingCountryDescription} />
      </Subsection>
    </Card>
  );
}


export default Order;
