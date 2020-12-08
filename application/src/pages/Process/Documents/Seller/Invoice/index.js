import React from 'react';

import Card from 'components/common/Card';
import LargeField from 'pages/Process/LargeField';
import BasicField from 'pages/Process/BasicField';
import Subsection from 'pages/Process/Subsection';
import DataTable from 'react-data-table-component';
import invoiceTableColumns from 'utils/sellerInvoiceTableColumns';
import {dateFormat, dateTimeFormat} from 'utils/utilFuncs';

import './styles.scss';

const SellerInvoice = (props) => {
  const invoiceData = props.invoice

  const dateStr = dateFormat(invoiceData.documentDate);
  const dueDateStr = dateFormat(invoiceData.dueDate);
  const loadingTimeStr = dateTimeFormat(invoiceData.loadingDateTime);
  const unloadingTimeStr = dateTimeFormat(invoiceData.unloadingDateTime);
  const overviewFields = [
    { id: 0, fieldSize: 'small', label: 'Document Type', value: invoiceData.documentType },
    { id: 1, fieldSize: 'small', label: 'Series / Number', value: `${invoiceData.serie} - ${invoiceData.seriesNumber}` },
    { id: 2, fieldSize: 'small', label: 'Date', value: dateStr },
    { id: 3, fieldSize: 'small', label: 'Reference', value: invoiceData.reference },
    { id: 4, fieldSize: 'small', label: 'Customer', value: invoiceData.sellerSupplierPartyName },
    { id: 5, fieldSize: 'small', label: 'Payment Term', value: invoiceData.paymentTermDescription },
    { id: 6, fieldSize: 'small', label: 'Discount', value: invoiceData.discountInValueAmountAmount.toFixed(2) + "%" },
    { id: 7, fieldSize: 'small', label: 'Due Date', value: dueDateStr },
    { id: 8, fieldSize: 'small', label: 'Payment Method', value: invoiceData.paymentMethodDescription },
  ];

  const postingDateStr = dateFormat(invoiceData.postingDate);

  const financialFields = [
    { id: 0, fieldSize: 'small', label: 'Financial Account', value: invoiceData.financialAccountDescription },
    { id: 1, fieldSize: 'small', label: 'Currency', value: invoiceData.currency },
    { id: 2, fieldSize: 'small', label: 'Economic Activity', value: invoiceData.economicActivityClassificationDescription },
    { id: 3, fieldSize: 'small', label: 'Exchange Rate', value: invoiceData.exchangeRate.toFixed(invoiceData.exchangeRateDecimalPlaces) },
    { id: 4, fieldSize: 'small', label: 'Posting Date', value: postingDateStr },
    { id: 5, fieldSize: 'small', label: 'Bill to', value: invoiceData.accountingPartyDescription },
    { id: 5, fieldSize: 'small', label: 'Discount in Value', value: invoiceData.discount.toFixed(2) + '%' },
  ];

  const goodsAndServicesTitleAppendix = invoiceData.taxIncluded ? ' (Prices are tax inclusive)' : '(Prices are not tax inclusive)';
  const goodsAndServicesTitle = (<h1>Goods and Services<span className='taxIncluded'>{goodsAndServicesTitleAppendix}</span></h1>);

  return (
    <Card title={`Invoice ${invoiceData.naturalKey}`}>

      <Subsection sectionId='baseFields'>
        <Subsection sectionId='baseFields'>
          {overviewFields.map((field) => (
            <BasicField fieldSize={field.fieldSize} key={field.id} label={field.label} value={field.value} />
          ))}
        </Subsection>

        <Subsection sectionId='goodsAndServices' flexDirection='column' title={goodsAndServicesTitle}>
          <div className='subsection-item-wrapper'>
            <DataTable
              className="table-display"
              columns={invoiceTableColumns}
              data={invoiceData.documentLines}
              highlightOnHover={true}
              noHeader={true}
              pagination={true}
            />
            <div className="noneAndChage">
              <LargeField label={'Note do Recipient'} value={invoiceData.noteToRecipient} />
              <div className='chargingInfo'>
                <h2 ><span className='orderTotalText'>Goods and Services:</span> {`${invoiceData.grossValue.amount.toFixed(2)} ${invoiceData.grossValue.symbol}`}</h2>
                <h2 ><span className='orderTotalText'>Discount:</span> {`${invoiceData.discountInValueAmount.amount.toFixed(2)} ${invoiceData.discountInValueAmount.symbol}`}</h2>
                <h2 ><span className='orderTotalText'>Net:</span> {`${invoiceData.taxExclusiveAmount.amount.toFixed(2)} ${invoiceData.taxExclusiveAmount.symbol}`}</h2>
                <h2 ><span className='orderTotalText'>VAT:</span> {`${invoiceData.taxTotal.amount.toFixed(2)} ${invoiceData.taxTotal.symbol}`}</h2>
                <h2 className='orderTotal'><span className='orderTotalText'>Total:</span> {`${invoiceData.payableAmount.amount.toFixed(2)} ${invoiceData.payableAmount.symbol}`}</h2>
              </div>
            </div>

          </div>
        </Subsection>
        <hr />

        <Subsection sectionId='commercial' title='Commercial'>
          <BasicField label={'Sales Channel'} value={invoiceData.salesChannelDescription} />
          <BasicField label={'Name'} value={invoiceData.sellerSupplierPartyName} />
          <BasicField label={'Salesperson'} value={invoiceData.salesperson} />
          <BasicField label={'Delivery Term'} value={invoiceData.deliveryTermDescription} />
          <BasicField label={'Price List'} value={invoiceData.priceListDescription} />
          <LargeField label={'Address'} value={invoiceData.sellerSupplierPartyAddress} />
        </Subsection>
        <hr />

        <Subsection sectionId='financial' title='Financial'>
          {financialFields.map((field) => (
            <BasicField fieldSize={field.fieldSize} key={field.id} label={field.label} value={field.value} />
          ))}
          <BasicField label={'Billing Name'} value={invoiceData.accountingPartyName} />
          <BasicField label={'Billing Tax ID'} value={invoiceData.accountingPartyTaxId} />
          <LargeField label={'Billing Address'} value={invoiceData.accountingPartyAddress} />
        </Subsection>
        <hr />

        <Subsection sectionId='delivery' title='Delivery'>
          <div className='fieldGroup'>
            <h3>Loading</h3>
            <BasicField fieldSize='large' label={'Warehouse'} value={invoiceData.warehouse} />
            <BasicField fieldSize='large' label={'Point'} value={invoiceData.loadingPoint} />
            <LargeField label={'Address'} value={invoiceData.loadingPointAddress} />
            <BasicField fieldSize='large' label={'Country'} value={invoiceData.loadingCountryDescription} />
            <BasicField fieldSize='large' label={'Date/Time'} value={loadingTimeStr} />
          </div>

          <div className='fieldGroup'>
            <h3>Unloading</h3>
            <BasicField fieldSize='large' label={'Vehicle License Plate'} value={invoiceData.vehiclePlateNumber} />
            <BasicField fieldSize='large' label={'Point'} value={invoiceData.unloadingPoint} />
            <LargeField label={'Address'} value={invoiceData.unloadingPointAddress} />
            <BasicField fieldSize='large' label={'Country'} value={invoiceData.loadingCountryDescription} />
            <BasicField fieldSize='large' label={'Date/Time'} value={unloadingTimeStr} />
          </div>

          <div className='fieldGroup'>
            <h3>Other</h3>
            <BasicField fieldSize='small' label={'AT Code'} value={invoiceData.aTDocCodeID} />
          </div>
        </Subsection>
      </Subsection>
      <hr />

    </Card>
  );
}


export default SellerInvoice;
