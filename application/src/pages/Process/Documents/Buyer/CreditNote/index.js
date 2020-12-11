import React from 'react';

import Card from 'components/common/Card';
import LargeField from 'pages/Process/LargeField';
import BasicField from 'pages/Process/BasicField';
import Subsection from 'pages/Process/Subsection';
import DataTable from 'react-data-table-component';
import buyerCreditNoteTableColumns from 'utils/buyerCreditNoteTableColumns';
import { dateFormat} from 'utils/utilFuncs';

import './styles.scss';

const BuyerCreditNote = (props) => {
  const creditNote = props.creditNote

  const dateStr = dateFormat(creditNote.documentDate);
  const dueDateStr = dateFormat(creditNote.dueDate);

  const overviewFields = [
    { id: 0, fieldSize: 'small', label: 'Document Type', value: creditNote.documentType },
    { id: 1, fieldSize: 'small', label: 'Series / Number', value: `${creditNote.serie} - ${creditNote.seriesNumber}` },
    { id: 2, fieldSize: 'small', label: 'Date', value: dateStr },
    { id: 3, fieldSize: 'small', label: 'Reference', value: creditNote.reference },
    { id: 4, fieldSize: 'small', label: 'Supplier', value: creditNote.sellerSupplierPartyName },
    { id: 5, fieldSize: 'small', label: 'Payment Term', value: creditNote.paymentTermDescription },
    { id: 8, fieldSize: 'small', label: 'Reason', value: creditNote.memoReasonDescription },
    { id: 6, fieldSize: 'small', label: 'Discount', value: creditNote.discount.toFixed(2) + "%" },
  ];

  const postingDateStr = dateFormat(creditNote.postingDate);

  const financialFields = [
    { id: 1, fieldSize: 'small', label: 'Posting Date', value: postingDateStr },
    { id: 2, fieldSize: 'small', label: 'Payment Method', value: creditNote.paymentMethod },
    { id: 3, fieldSize: 'small', label: 'Currency', value: creditNote.currency },
    { id: 4, fieldSize: 'small', label: 'Bill from', value: creditNote.accountingPartyDescription },
    { id: 5, fieldSize: 'small', label: 'Exchange Rate', value: creditNote.exchangeRate.toFixed(creditNote.exchangeRateDecimalPlaces) },
    { id: 6, fieldSize: 'small', label: 'Due Date', value: dueDateStr },
  ];

  const goodsAndServicesTitleAppendix = creditNote.taxIncluded ? ' (Prices are tax inclusive)' : '(Prices are not tax inclusive)';
  const goodsAndServicesTitle = (<h1>Goods and Services<span className='taxIncluded'>{goodsAndServicesTitleAppendix}</span></h1>);

  return (
    <Card title={`Credit Note ${creditNote.naturalKey}`}>

      <Subsection sectionId='baseFields'>
        {overviewFields.map((field) => (
          <BasicField fieldSize={field.fieldSize} key={field.id} label={field.label} value={field.value} />
        ))}
      </Subsection>

      <Subsection sectionId='goodsAndServices' flexDirection='column' title={goodsAndServicesTitle}>
        <div className='subsection-item-wrapper'>
          <DataTable
            className="table-display"
            columns={buyerCreditNoteTableColumns}
            data={creditNote.documentLines}
            highlightOnHover={true}
            noHeader={true}
            pagination={true}
          />
          <h2 className='orderTotal'><span className='orderTotalText'>Total:</span> {`${creditNote.payableAmount.amount.toFixed(2)} ${creditNote.payableAmount.symbol}`}</h2>
        </div>
      </Subsection>
      <hr />

      <Subsection sectionId='commercial' title='Commercial'>
        <LargeField label={'Note do Recipient'} value={creditNote.noteToRecipient} />
        <div>
          <BasicField label={'Delivery Term'} value={creditNote.deliveryTermDescription} />
          <BasicField label={'Suplier'} value={creditNote.supplierPartyDescription} />
        </div>

        <LargeField label={'Supplier Address'} value={creditNote.sellerSupplierPartyAddress} />
      </Subsection>
      <hr />

      <Subsection sectionId='financial' title='Financial'>
        {financialFields.map((field) => (
          <BasicField fieldSize={field.fieldSize} key={field.id} label={field.label} value={field.value} />
        ))}
        <BasicField label={'Billing Name'} value={creditNote.accountingPartyName} />
        <BasicField label={'Billing Tax ID'} value={creditNote.accountingPartyTaxId} />
        <LargeField label={'Billing Address'} value={creditNote.accountingPartyAddress} />
      </Subsection>
      <hr />

    </Card>
  );
}


export default BuyerCreditNote;
