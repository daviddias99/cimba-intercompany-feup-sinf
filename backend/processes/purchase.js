const { addOrder } = require('../database/methods/orderMethods');
const { createSalesOrder } = require('../jasmin/orders');

exports.newPurchaseOrder = async (companyId, order) => {
  console.log(`Start process for order ${order.id} from company ${companyId}`);

  try {
    await createSalesOrder(companyId, order.sellerSupplierParty, order.deliveryTerm,
      order.documentLines);

    addOrder(companyId, order);
  } catch (error) {
    console.log(error.message);
  }
};
