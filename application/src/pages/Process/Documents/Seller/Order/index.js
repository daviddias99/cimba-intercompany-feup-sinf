import React from 'react';

import Card from 'components/common/Card';
import BasicField from 'pages/Process/BasicField';
import LargeField from 'pages/Process/LargeField';
import Subsection from 'pages/Process/Subsection';
import DataTable from 'react-data-table-component';
import salesOrderTableColumns from 'utils/salesOrderTableColumns';

import './styles.scss'

const SellerOrder = (props) => {
  const orderData = props.orderData;
  const documentDate = new Date(orderData.documentDate);
  const dateStr = documentDate.getUTCDate() + "/" + (documentDate.getUTCMonth() + 1) + "/" + documentDate.getUTCFullYear();

  const overviewFields = [
    { id: 0, fieldSize: 'small', label: 'Document Type', value: orderData.documentType },
    { id: 1, fieldSize: 'small', label: 'Series / Number', value: `${orderData.serie} - ${orderData.seriesNumber}` },
    { id: 2, fieldSize: 'small', label: 'Date', value: dateStr },
    { id: 3, fieldSize: 'small', label: 'Reference', value: orderData.reference },
    { id: 4, fieldSize: 'small', label: 'Customer', value: orderData.buyerCustomerPartyDescription },
    { id: 5, fieldSize: 'small', label: 'Payment Term', value: orderData.paymentTermDescription },
    { id: 6, fieldSize: 'small', label: 'Delivery Term', value: orderData.deliveryTermDescription },
    { id: 7, fieldSize: 'small', label: 'Discount', value: orderData.discountInValueAmountAmount.toFixed(2) + "%" },
  ];

  const postingDate = new Date(orderData.postingDate);
  const postingDateStr = postingDate.getUTCDate() + "/" + (postingDate.getUTCMonth() + 1) + "/" + postingDate.getUTCFullYear();

  const financialFields = [
    { id: 0, fieldSize: 'small', label: 'Payment method', value: orderData.paymentMethodDescription },
    { id: 1, fieldSize: 'small', label: 'Currency', value: orderData.currency },
    { id: 2, fieldSize: 'small', label: 'Economic Activity', value: orderData.economicActivityClassificationDescription },
    { id: 3, fieldSize: 'small', label: 'Exchange Rate', value: orderData.exchangeRate.toFixed(orderData.exchangeRateDecimalPlaces) },
    { id: 4, fieldSize: 'small', label: 'Posting Date', value: postingDateStr },
    { id: 5, fieldSize: 'small', label: 'Bill to', value: orderData.accountingPartyDescription },
  ];


  const goodsAndServicesTitleAppendix = orderData.taxIncluded ? ' (Prices are tax inclusive)' : '(Prices are not tax inclusive)';
  const goodsAndServicesTitle = (<h1>Goods and Services <span className='taxIncluded'>{goodsAndServicesTitleAppendix}</span></h1>);
  return (
    <Card title={`Sales Order ${orderData.naturalKey}`}>

      <Subsection sectionId='baseFields'>
        {overviewFields.map((field) => (
          <BasicField key={field.id} label={field.label} value={field.value} />
        ))}
      </Subsection>

      <Subsection sectionId='goodsAndServices' flexDirection='column' title={goodsAndServicesTitle}>
        <div className='subsection-item-wrapper'>
          <DataTable
            className="table-display"
            columns={salesOrderTableColumns}
            data={orderData.documentLines}
            highlightOnHover={true}
            noHeader={true}
            pagination={true}
          />
          <h2 className='orderTotal'><span className='orderTotalText'>Total:</span> {`${orderData.payableAmount.amount} ${orderData.payableAmount.symbol}`}</h2>
        </div>
      </Subsection>
      <hr />

      <Subsection sectionId='commercial' title='Commercial'>
        <div>
        <LargeField label={'Note do Recipient'} value={orderData.noteToRecipient} />
        <BasicField fieldSize='large' label={'Order Nature'} value={orderData.orderNatureDescription} />

        </div>
        <div>
          <BasicField label={'Price List'} value={orderData.priceListDescription} />
          <BasicField label={'Salesperson'} value={orderData.salesperson} />
          <BasicField label={'Sales Channel'} value={orderData.salesChannelDescription} />

        </div>
        <div>
        <BasicField label={'Customer Name'} value={orderData.buyerCustomerPartyDescription}/>
        <LargeField label={'Customer Address'} value={orderData.buyerCustomerPartyAddress}/>
        </div>
        <div>
        </div>


      </Subsection>
      <hr />

      <Subsection sectionId='financial' title='Financial'>
        {financialFields.map((field) => (
          <BasicField key={field.id} label={field.label} value={field.value} />
        ))}
        <BasicField label={'Billing Name'} value={orderData.accountingPartyName} />
        <BasicField label={'Billing Tax ID'} value={orderData.accountingPartyTaxId} />
        <LargeField label={'Billing Address'} value={orderData.accountingPartyAddress} />

      </Subsection>
      <hr />

      <Subsection sectionId='delivery' title='Delivery'>
        <div className='fieldGroup'>
          <h3>Loading</h3>
          <BasicField fieldSize='large' label={'Point'} value={orderData.loadingPoint} />
          <LargeField label={'Address'} value={orderData.loadingPointAddress} />
          <BasicField fieldSize='large' label={'Country'} value={orderData.loadingCountryDescription} />
        </div>
        <div className='fieldGroup'>
          <h3>Unloading</h3>
          <BasicField fieldSize='large' label={'Point'} value={orderData.unloadingPoint} />
          <LargeField label={'Address'} value={orderData.unloadingPointAddress} />
          <BasicField fieldSize='large' label={'Country'} value={orderData.loadingCountryDescription} />
        </div>
      </Subsection>
    </Card>
  );
}


export default SellerOrder;
