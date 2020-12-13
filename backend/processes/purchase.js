const {
  addDeliveryToSalesOrder, addInvoiceToSalesOrder, addPaymentToOrder,
} = require('../database/methods/orderMethods');
const { createSalesOrder } = require('../jasmin/orders');
const { createGoodsReceipt } = require('../jasmin/goodsReceipt');
const { createInvoice } = require('../jasmin/invoices');
const { createSalesReceipt } = require('../jasmin/salesReceipt');
const { addLog } = require('../database/methods/logsMethods');

exports.newPurchaseOrder = async (companyId, order) => {
  try {
    await createSalesOrder(
      companyId,
      order.sellerSupplierParty,
      order.deliveryTerm,
      order.documentLines,
      order.id,
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
      const id = await addInvoiceToSalesOrder(companyId, sourceDocId, invoice.id);
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

exports.newDeliveryNote = async (companyId, delivery) => {
  console.log(`Detect new delivery note ${delivery.id} from company ${companyId}`);

  const salesOrdersId = new Set(delivery.documentLines.map(
    (documentLines) => documentLines.sourceDocId,
  ));
  salesOrdersId.forEach(
    async (sourceDocId) => {
      const id = await addDeliveryToSalesOrder(companyId, sourceDocId, delivery.id);
      await addLog(id[0], 'detect', delivery.id, 'delivery');
    },
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
