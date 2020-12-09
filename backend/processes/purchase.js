const { addOrder } = require('../database/methods/orderMethods');
const { createSalesOrder } = require('../jasmin/orders');

exports.newPurchaseOrder = async (companyId, order) => {
  console.log(`Start process for order ${order.id} from company ${companyId}`);

  addOrder(companyId, order.id, 'purchase', order.createdOn);

  try {
    createSalesOrder(
      companyId,
      order.sellerSupplierParty,
      order.deliveryTerm,
      order.documentLines,
    );
  } catch (error) {
    console.log(error.message);
  }
};

exports.newInvoice = async (companyId, invoice) => {
  console.log(`Detect new invoice ${invoice.id} from company ${companyId}`);
};

exports.newDeliveryNote = async (companyId, delivery) => {
  console.log(`Detect new invoice ${delivery.id} from company ${companyId}`);
};
