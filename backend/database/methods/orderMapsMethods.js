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

exports.getMapOfDocPurchaseOrder = async (purchaseOrderDocId) => {
  const orderMap = await db('orders_maps').where({ purchase_order_id: purchaseOrderDocId }).first();
  return orderMap == null ? null : orderMap.sales_order_id;
};

exports.getCorrespondingSalesInvoice = async (purchaseInvoiceId) => {
  const invoices = await db('orders AS po')
    .join('orders_maps', 'po.order_id', 'orders_maps.purchase_order_id')
    .join('orders AS so', 'so.order_id', 'orders_maps.sales_order_id')
    .select('so.invoice_id ', 'so.order_id')
    .where({ 'po.invoice_id': purchaseInvoiceId })
    .first();

  return invoices;
};
