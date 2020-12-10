const { addOrder, addGoodsReceiptToOrder } = require('../database/methods/orderMethods');
const { createSalesOrder } = require('../jasmin/orders');
const { createGoodsReceipt } = require('../jasmin/goodsReceipt');

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
};

exports.newDeliveryNote = async (companyId, delivery) => {
  console.log(`Detect new delivery note ${delivery.id} from company ${companyId}`);

  const salesOrdersId = new Set(delivery.documentLines.map(
    (documentLines) => documentLines.sourceDocId,
  ));
  salesOrdersId.forEach(
    (sourceDocId) => addGoodsReceiptToOrder(companyId, sourceDocId, delivery.id),
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
