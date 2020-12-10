const db = require('../knex');

exports.addOrderMaps = async (purchaseOrderId, salesOrderId) => {
  const order = {
    sales_order_id: salesOrderId,
    purchase_order_id: purchaseOrderId,
  };

  return db('orders_maps').insert(order);
};

exports.getMapOfDocSalesOrder = async (salesOrderDocId) => {
  const orderMap = await db('orders_maps').where({ sales_order_id: salesOrderDocId }).first();
  return orderMap == null ? null : orderMap.purchase_order_id;
};
