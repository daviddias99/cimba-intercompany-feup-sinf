const { addOrder, addDeliveryToOrder, addInvoiceToOrder } = require('../database/methods/orderMethods');
const { createOrder } = require('../jasmin/orders');
const { createGoodsReceipt } = require('../jasmin/goodsReceipt');
const { createInvoice } = require('../jasmin/invoices');
const { isStandardOrder } = require('../jasmin/utils');

exports.newOrder = async (companyId, order) => {
  console.log(`Start process for order ${order.id} from company ${companyId}`);

  const orderType = isStandardOrder(order.orderNature) ? 'purchase' : 'return_purchase';
  await addOrder(companyId, order.id, orderType, order.createdOn);

  try {
    await createOrder(
      companyId,
      order.sellerSupplierParty,
      order.deliveryTerm,
      order.documentLines,
      order.id,
      order.orderNature,
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

exports.newDeliveryNote = async (companyId, delivery) => {
  console.log(`Detect new delivery note ${delivery.id} from company ${companyId}`);

  const salesOrdersId = new Set(delivery.documentLines.map(
    (documentLines) => documentLines.sourceDocId,
  ));
  salesOrdersId.forEach(
    (sourceDocId) => addDeliveryToOrder(companyId, sourceDocId, delivery.id, 'sale'),
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
