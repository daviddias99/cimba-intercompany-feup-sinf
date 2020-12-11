import React from 'react';

import Card from 'components/common/Card';
import BasicField from 'pages/Process/BasicField';
import LargeField from 'pages/Process/LargeField';
import Subsection from 'pages/Process/Subsection';
import DataTable from 'react-data-table-component';
import paymentTableColumns from 'utils/paymentTableColumns';
import wTaxesTableColumns from 'utils/wTaxesTableColumns';

import './styles.scss'

const Receipt = (props) => {
  const receiptData = props.receipt;
  const documentDate = new Date(receiptData.documentDate);
  const dateStr = documentDate.getUTCDate() + "/" + (documentDate.getUTCMonth() + 1) + "/" + documentDate.getUTCFullYear();
  const postingDate = new Date(receiptData.postingDate);
  const postinDateStr = postingDate.getUTCDate() + "/" + (postingDate.getUTCMonth() + 1) + "/" + postingDate.getUTCFullYear();

  const overviewFields = [
    { id: 0, fieldSize: 'small', label: 'Document Type', value: receiptData.documentType },
    { id: 1, fieldSize: 'small', label: 'Series / Number', value: `${receiptData.serie} - ${receiptData.seriesNumber}` },
    { id: 2, fieldSize: 'small', label: 'Date', value: dateStr },
    { id: 3, fieldSize: 'small', label: 'Reference', value: receiptData.reference },
    { id: 4, fieldSize: 'small', label: 'Accounting Party', value: receiptData.accountingPartyDescription },
    { id: 5, fieldSize: 'small', label: 'Payment Method', value: receiptData.paymentMethod },
    { id: 6, fieldSize: 'small', label: 'Financial Account', value: receiptData.financialAccountDescription },
    { id: 7, fieldSize: 'small', label: 'Cash Flow', value: receiptData.cashFlowItemDescription },
  ];

  return (
    <Card title={`Receipt ${receiptData.naturalKey}`}>

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
            data={receiptData.receiptLines}
            highlightOnHover={true}
            noHeader={true}
            pagination={true}
          />
          <h2 className='orderTotal'><span className='orderTotalText'>Total:</span> {`${receiptData.grossValue.amount} ${receiptData.grossValue.symbol}`}</h2>
        </div>
      </Subsection>
      <hr />
      <Subsection sectionId='other' flexDirection='column' title={'Other'}>
        <LargeField label={'Note to Recipient'} value={receiptData.noteToRecipient} />
        <div>
          <BasicField label={'Currency'} value={receiptData.currency} />
          <BasicField label={'Posting Date'} value={postinDateStr} />
        </div>
        <BasicField label={'Exchange Rate'} value={receiptData.exchangeRate.toFixed(receiptData.exchangeRateDecimalPlaces)} />
      </Subsection>
      <hr />
      <Subsection sectionId='wthtaxes' flexDirection='column' title={'Withholding Taxes'}>
        <DataTable
          className="table-display"
          columns={wTaxesTableColumns}
          data={receiptData.documentWTaxes}
          highlightOnHover={true}
          noHeader={true}
          pagination={true}
        />
      </Subsection>

    </Card>
  );
}


export default Receipt;
