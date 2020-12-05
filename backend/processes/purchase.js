const { addOrder } = require('../database/methods/orderMethods');

exports.newPurchaseOrder = async (companyId, order) => {
  console.log(`Start process for order ${order.id} from company ${companyId}`);
  addOrder(companyId, order);
};
