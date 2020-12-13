import React from 'react';

import Card from 'components/common/Card';
import LargeField from 'pages/Process/LargeField';
import BasicField from 'pages/Process/BasicField';
import Subsection from 'pages/Process/Subsection';
import DataTable from 'react-data-table-component';
import deliverTableColumns from 'utils/deliverTableColumns';

import './styles.scss';

const Delivery = (props) => {
  const deliveryData = props.delivery

  const documentDate = new Date(deliveryData.documentDate);
  const dateStr = documentDate.getUTCDate() + "/" + (documentDate.getUTCMonth() + 1) + "/" + documentDate.getUTCFullYear();

  const overviewFields = [
    { id: 0, fieldSize: 'small', label: 'Document Type', value: deliveryData.documentType },
    { id: 1, fieldSize: 'small', label: 'Series / Number', value: `${deliveryData.serie} - ${deliveryData.seriesNumber}` },
    { id: 2, fieldSize: 'small', label: 'Date', value: dateStr },
    { id: 3, fieldSize: 'small', label: 'Reference', value: deliveryData.reference },
    { id: 4, fieldSize: 'small', label: 'Party', value: deliveryData.partyDescription },
    { id: 5, fieldSize: 'small', label: 'Payment Term', value: deliveryData.paymentTermDescription },
    { id: 6, fieldSize: 'small', label: 'Delivery Term', value: deliveryData.deliveryTermDescription },
    { id: 7, fieldSize: 'small', label: 'Discount', value: deliveryData.discountInValueAmountAmount.toFixed(2) + "%" },
  ];

  const postingDate = new Date(deliveryData.postingDate);
  const postingDateStr = postingDate.getUTCDate() + "/" + (postingDate.getUTCMonth() + 1) + "/" + postingDate.getUTCFullYear();

  const financialFields = [
    { id: 0, fieldSize: 'small', label: 'Payment method', value: deliveryData.paymentMethodDescription },
    { id: 1, fieldSize: 'small', label: 'Currency', value: deliveryData.currency },
    { id: 2, fieldSize: 'small', label: 'Bill to', value: deliveryData.accountingPartyDescription },
    { id: 3, fieldSize: 'small', label: 'Billing Tax ID', value: deliveryData.accountingPartyTaxId },
    { id: 4, fieldSize: 'small', label: 'Posting Date', value: postingDateStr },
    { id: 5, fieldSize: 'small', label: 'Exchange Rate', value: deliveryData.exchangeRate.toFixed(deliveryData.exchangeRateDecimalPlaces) },
  ];

  const goodsTitleAppendix = deliveryData.taxIncluded ? ' (Prices are tax inclusive)' : '(Prices are not tax inclusive)';
  const goodsTitle = (<h1>Goods<span className='taxIncluded'>{goodsTitleAppendix}</span></h1>);

  return (
    <Card title={`Delivery ${deliveryData.naturalKey}`}>

      <Subsection sectionId='baseFields'>
        {overviewFields.map((field) => (
          <BasicField fieldSize={field.fieldSize} key={field.id} label={field.label} value={field.value} />
        ))}
      </Subsection>

      <Subsection sectionId='goods' flexDirection='column' title={goodsTitle}>
        <div className='subsection-item-wrapper'>
          <DataTable
            className="table-display"
            columns={deliverTableColumns}
            data={deliveryData.documentLines}
            highlightOnHover={true}
            noHeader={true}
            pagination={true}
          />
          <h2 className='orderTotal'><span className='orderTotalText'>Total:</span> {`${deliveryData.payableAmount.amount} ${deliveryData.payableAmount.symbol}`}</h2>
        </div>
      </Subsection>
      <hr />

      <Subsection sectionId='commercial' title='Commercial'>
        <LargeField label={'Note do Recipient'} value={deliveryData.noteToRecipient} />
        <div>
          <BasicField label={'Supplier Name'} value={deliveryData.logisticsPartyName} />
          <BasicField label={'PriceList'} value={deliveryData.priceListDescription} />
        </div>
        <LargeField label={'Address'} value={deliveryData.logisticsPartyAddress} />
      </Subsection>
      <hr />

      <Subsection sectionId='financial' title='Financial'>
        {financialFields.map((field) => (
          <BasicField fieldSize={field.fieldSize} key={field.id} label={field.label} value={field.value} />
        ))}
        <LargeField label={'Billing Address'} value={deliveryData.accountingPartyAddress} />
      </Subsection>
      <hr />

      <Subsection sectionId='delivery' title='Delivery'>
        <div className='fieldGroup'>
          <h3>Loading</h3>
          <BasicField fieldSize='large' label={'Warehouse'} value={deliveryData.warehouse} />
          <BasicField fieldSize='large' label={'Point'} value={deliveryData.loadingPoint} />
          <LargeField label={'Address'} value={deliveryData.loadingPointAddress} />
          <BasicField fieldSize='large' label={'Country'} value={deliveryData.loadingCountryDescription} />
        </div>

        <div className='fieldGroup'>
          <h3>Unloading</h3>
          <BasicField fieldSize='large' label={'Vehicle License Plate'} value={deliveryData.vehiclePlateNumber} />
          <BasicField fieldSize='large' label={'Point'} value={deliveryData.unloadingPoint} />
          <LargeField label={'Address'} value={deliveryData.unloadingPointAddress} />
          <BasicField fieldSize='large' label={'Country'} value={deliveryData.loadingCountryDescription} />
        </div>

        <div className='fieldGroup'>
          <h3>Other</h3>
          <BasicField fieldSize='small' label={'AT Code'} value={deliveryData.aTDocCodeID} />
        </div>
      </Subsection>
    </Card>
  );
}


export default Delivery;
