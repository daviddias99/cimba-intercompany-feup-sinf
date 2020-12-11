const {
  addOrder, addDeliveryToSalesOrder, addInvoiceToSalesOrder, addPaymentToOrder,
} = require('../database/methods/orderMethods');
const { createSalesOrder } = require('../jasmin/orders');
const { createGoodsReceipt } = require('../jasmin/goodsReceipt');
const { createInvoice } = require('../jasmin/invoices');
const { createSalesReceipt } = require('../jasmin/salesReceipt');

exports.newPurchaseOrder = async (companyId, order) => {
  console.log(`Start process for order ${order.id} from company ${companyId}`);

  await addOrder(companyId, order.id, 'purchase', order.createdOn);

  try {
    await createSalesOrder(
      companyId,
      order.sellerSupplierParty,
      order.deliveryTerm,
      order.documentLines,
      order.id,
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
    (sourceDocId) => addInvoiceToSalesOrder(companyId, sourceDocId, invoice.id),
  );

  try {
    await createInvoice(invoice.buyerCustomerParty,
      companyId,
      invoice.documentLines);
  } catch (error) {
    console.log(error.message);
  }
};

exports.newDeliveryNote = async (companyId, delivery) => {
  console.log(`Detect new delivery note ${delivery.id} from company ${companyId}`);

  const salesOrdersId = new Set(delivery.documentLines.map(
    (documentLines) => documentLines.sourceDocId,
  ));
  salesOrdersId.forEach(
    (sourceDocId) => addDeliveryToSalesOrder(companyId, sourceDocId, delivery.id),
  );

  try {
    await createGoodsReceipt(
      delivery.party,
      companyId,
      delivery.documentLines,
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
