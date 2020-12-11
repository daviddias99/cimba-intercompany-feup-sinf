const db = require('../knex');

exports.addOrder = async (icId, orderId, type, createdOn = null) => {
  const order = {
    ic_id: icId,
    order_id: orderId,
    type,
  };

  if (createdOn != null) {
    order.jasmin_created_on = createdOn;
  }

  return db('orders').insert(order);
};

exports.getSalesOrdersNoInvoice = async (icId) => db('orders').select('order_id').where({ ic_id: icId, type: 'sale', invoice_id: null });

exports.getSalesOrdersNoDelivery = async (icId) => db('orders').select('order_id').where({ ic_id: icId, type: 'sale', delivery_id: null });

exports.addDeliveryToSalesOrder = async (icId, orderId, goodsReceiptId) => db('orders').where({
  ic_id: icId, order_id: orderId, type: 'sale', delivery_id: null,
}).update({ delivery_id: goodsReceiptId });

exports.addDeliveryToPurchaseOrder = async (icId, orderId, goodsReceiptId) => db('orders').where({
  ic_id: icId, order_id: orderId, type: 'purchase', delivery_id: null,
}).update({ delivery_id: goodsReceiptId });

exports.addInvoiceToSalesOrder = async (icId, orderId, invoiceId) => db('orders').where({
  ic_id: icId, order_id: orderId, type: 'sale', invoice_id: null,
}).update({ invoice_id: invoiceId });

exports.addInvoiceToPurchaseOrder = async (icId, orderId, invoiceId) => db('orders').where({
  ic_id: icId, order_id: orderId, type: 'purchase', invoice_id: null,
}).update({ invoice_id: invoiceId });
