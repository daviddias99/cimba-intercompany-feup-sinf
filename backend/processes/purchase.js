const {
  addDeliveryToOrder, addInvoiceToOrder, addPaymentToOrder, addCreditNoteToOrder,
} = require('../database/methods/orderMethods');
const { createOrder } = require('../jasmin/orders');
const { createGoodsReceipt } = require('../jasmin/goodsReceipt');
const { createInvoice } = require('../jasmin/invoices');
const { createCreditNote } = require('../jasmin/creditNote');
const { createSalesReceipt } = require('../jasmin/salesReceipt');
const { addLog } = require('../database/methods/logsMethods');

exports.newOrder = async (companyId, order) => {
  try {
    await createOrder(
      companyId,
      order.sellerSupplierParty,
      order.id,
      order,
      order.createdOn,
    );
  } catch (error) {
    console.log(error.message);
  }
};

exports.newInvoice = async (companyId, invoice) => {
  console.log(`Detect new invoice ${invoice.id} from company ${companyId}`);

  const salesOrdersId = new Set(invoice.documentLines.map(
    (documentLines) => documentLines.sourceDocId,
  ));
  salesOrdersId.forEach(
    async (sourceDocId) => {
      const id = await addInvoiceToOrder(companyId, sourceDocId, invoice.id, 'sale');
      await addLog(id[0], 'detect', invoice.id, 'invoice');
    },
  );

  try {
    await createInvoice(invoice.buyerCustomerParty,
      companyId,
      invoice.documentLines);
  } catch (error) {
    console.log(error.message);
  }
};

exports.newCreditNote = async (companyId, invoice) => {
  console.log(`Detect new credit note ${invoice.id} from company ${companyId}`);

  const salesOrdersId = new Set(invoice.documentLines.map(
    (documentLines) => documentLines.sourceDocId,
  ));
  salesOrdersId.forEach(
    async (sourceDocId) => {
      const id = await addCreditNoteToOrder(companyId, sourceDocId, invoice.id, 'return_sale');
      await addLog(id[0], 'detect', invoice.id, 'payment');
    },
  );

  try {
    await createCreditNote(invoice.buyerCustomerParty,
      companyId,
      invoice.memoReason,
      invoice.documentLines);
  } catch (error) {
    console.log(error.message);
  }
};

exports.newDeliveryNote = async (companyId, delivery, isDefault) => {
  console.log(`Detect new delivery note ${delivery.id} from company ${companyId}`);

  const salesOrdersId = new Set(delivery.documentLines.map(
    (documentLines) => documentLines.sourceDocId,
  ));
  salesOrdersId.forEach(
    async (sourceDocId) => {
      const orderType = isDefault ? 'sale' : 'return_purchase';
      const id = await addDeliveryToOrder(companyId, sourceDocId, delivery.id, orderType);
      await addLog(id[0], 'detect', delivery.id, 'delivery');
    },
  );

  try {
    await createGoodsReceipt(
      delivery.party,
      companyId,
      delivery.documentLines,
      isDefault,
    );
  } catch (error) {
    console.log(error.message);
  }
};

exports.newPayment = async (companyId, payment) => {
  console.log(`Detect new payment ${payment.id} from company ${companyId}`);

  const sourceDocIds = new Set(payment.documentLines.map((line) => line.sourceDocId));
  sourceDocIds.forEach(
    async (id) => {
      const processId = await addPaymentToOrder(companyId, id, payment.id);
      await addLog(processId[0], 'detect', payment.id, 'payment');
    },
  );

  try {
    await createSalesReceipt(
      payment.accountingParty,
      companyId,
      payment.documentLines,
    );
  } catch (error) {
    console.log(error.message);
  }
};
