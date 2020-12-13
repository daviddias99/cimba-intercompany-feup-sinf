import React from 'react';

import Card from 'components/common/Card';
import BasicField from 'pages/Process/BasicField';
import LargeField from 'pages/Process/LargeField';
import Subsection from 'pages/Process/Subsection';
import DataTable from 'react-data-table-component';
import paymentTableColumns from 'utils/paymentTableColumns';
import wTaxesTableColumns from 'utils/wTaxesTableColumns';

import './styles.scss'

const Payment = (props) => {
  const paymentData = props.payment;
  const documentDate = new Date(paymentData.documentDate);
  const dateStr = documentDate.getUTCDate() + "/" + (documentDate.getUTCMonth() + 1) + "/" + documentDate.getUTCFullYear();
  const postingDate = new Date(paymentData.postingDate);
  const postinDateStr = postingDate.getUTCDate() + "/" + (postingDate.getUTCMonth() + 1) + "/" + postingDate.getUTCFullYear();

  const overviewFields = [
    { id: 0, fieldSize: 'small', label: 'Document Type', value: paymentData.documentType },
    { id: 1, fieldSize: 'small', label: 'Series / Number', value: `${paymentData.serie} - ${paymentData.seriesNumber}` },
    { id: 2, fieldSize: 'small', label: 'Date', value: dateStr },
    { id: 3, fieldSize: 'small', label: 'Reference', value: paymentData.reference },
    { id: 4, fieldSize: 'small', label: 'Accounting Party', value: paymentData.accountingPartyDescription },
    { id: 5, fieldSize: 'small', label: 'Payment Method', value: paymentData.paymentMethod },
    { id: 6, fieldSize: 'small', label: 'Financial Account', value: paymentData.financialAccountDescription },
    { id: 7, fieldSize: 'small', label: 'Cash Flow', value: paymentData.cashFlowItemDescription },
  ];

  return (
    <Card title={`Payment ${paymentData.naturalKey}`}>

      <Subsection sectionId='baseFields'>
        {overviewFields.map((field) => (
          <BasicField key={field.id} label={field.label} value={field.value} />
        ))}
      </Subsection>

      <Subsection sectionId='openItems' flexDirection='column' title={'Open Items'}>
        <div className='subsection-item-wrapper'>
          <DataTable
            className="table-display"
            columns={paymentTableColumns}
            data={paymentData.documentLines}
            highlightOnHover={true}
            noHeader={true}
            pagination={true}
          />
          <h2 className='orderTotal'><span className='orderTotalText'>Total:</span> {`${paymentData.grossValue.amount.toFixed(2)} ${paymentData.grossValue.symbol}`}</h2>
        </div>
      </Subsection>
      <hr />
      <Subsection sectionId='other' flexDirection='column' title={'Other'}>
        <LargeField label={'Note to Recipient'} value={paymentData.noteToRecipient} />
        <div>
          <BasicField label={'Currency'} value={paymentData.currency} />
          <BasicField label={'Posting Date'} value={postinDateStr} />
        </div>
        <BasicField label={'Exchange Rate'} value={paymentData.exchangeRate.toFixed(paymentData.exchangeRateDecimalPlaces)} />
      </Subsection>
      <hr />
      <Subsection sectionId='wthtaxes' flexDirection='column' title={'Withholding Taxes'}>
        <DataTable
          className="table-display"
          columns={wTaxesTableColumns}
          data={paymentData.documentWTaxes}
          highlightOnHover={true}
          noHeader={true}
          pagination={true}
        />
      </Subsection>

    </Card>
  );
}


export default Payment;
