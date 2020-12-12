const {
  addOrder, addDeliveryToOrder, addInvoiceToOrder, addPaymentToOrder,
} = require('../database/methods/orderMethods');
const { createOrder } = require('../jasmin/orders');
const { createGoodsReceipt } = require('../jasmin/goodsReceipt');
const { createInvoice } = require('../jasmin/invoices');
const { createCreditNote } = require('../jasmin/creditNote');
const { isStandardOrder } = require('../jasmin/utils');
const { createSalesReceipt } = require('../jasmin/salesReceipt');

exports.newOrder = async (companyId, order) => {
  console.log(`Start process for order ${order.id} from company ${companyId}`);

  const isStandard = isStandardOrder(order.orderNature);
  const orderType = isStandard ? 'purchase' : 'return_purchase';

  await addOrder(companyId, order.id, orderType, order.createdOn);

  try {
    await createOrder(
      companyId,
      order.sellerSupplierParty,
      order.deliveryTerm,
      order.documentLines,
      order.id,
      isStandard,
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
    (sourceDocId) => addInvoiceToOrder(companyId, sourceDocId, invoice.id, 'sale'),
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
    (sourceDocId) => addInvoiceToOrder(companyId, sourceDocId, invoice.id, 'return_sale'),
  );

  try {
    await createCreditNote(invoice.buyerCustomerParty,
      companyId,
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
    (sourceDocId) => {
      const orderType = isDefault ? 'sale' : 'return_purchase';
      addDeliveryToOrder(companyId, sourceDocId, delivery.id, orderType);
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

  payment.documentLines.forEach(
    (line) => addPaymentToOrder(companyId, line.sourceDocId, payment.id),
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
