const db = require('../knex');

exports.getAllProcesses = async (icId, page = null, pageSize = null) => {
  let query = db('orders').where({ ic_id: icId });

  if (page != null && pageSize != null) query = query.offset(page * pageSize).limit(pageSize);

  return query.orderBy([{ column: 'created_on', order: 'desc' }]).select();
};

exports.getProcess = async (processId) => db('orders').where({ id: processId }).first();

exports.addOrder = async (icId, orderId, type, otherCompanyName, createdOn = null) => {
  const order = {
    ic_id: icId,
    order_id: orderId,
    type,
    other_company_name: otherCompanyName,
  };

  if (createdOn != null) {
    order.created_on = createdOn;
  }

  return db('orders').insert(order).returning('id');
};

exports.getSalesOrdersNoInvoice = async (icId) => db('orders').select('order_id').where({ ic_id: icId, type: 'sale', invoice_id: null });

exports.getSalesOrdersNoDelivery = async (icId) => db('orders').select('order_id').where({ ic_id: icId, type: 'sale', delivery_id: null });

exports.addDeliveryToSalesOrder = async (icId, orderId, goodsReceiptId) => db('orders').where({
  ic_id: icId, order_id: orderId, type: 'sale', delivery_id: null,
}).update({ delivery_id: goodsReceiptId }).returning('id');

exports.addDeliveryToPurchaseOrder = async (icId, orderId, goodsReceiptId) => db('orders').where({
  ic_id: icId, order_id: orderId, type: 'purchase', delivery_id: null,
}).update({ delivery_id: goodsReceiptId }).returning('id');

exports.addInvoiceToSalesOrder = async (icId, orderId, invoiceId) => db('orders').where({
  ic_id: icId, order_id: orderId, type: 'sale', invoice_id: null,
}).update({ invoice_id: invoiceId }).returning('id');

exports.addInvoiceToPurchaseOrder = async (icId, orderId, invoiceId) => db('orders').where({
  ic_id: icId, order_id: orderId, type: 'purchase', invoice_id: null,
}).update({ invoice_id: invoiceId }).returning('id');

exports.addSalesReceiptToOrder = async (icId, orderId, receiptId) => db('orders').where({
  ic_id: icId, order_id: orderId, type: 'sale', payment_id: null,
}).update({ payment_id: receiptId }).returning('id');

exports.getInvoicesNoPayment = async (icId) => db('orders').select('invoice_id').where({ ic_id: icId, type: 'purchase', payment_id: null });

exports.addPaymentToOrder = async (icId, invoiceId, paymentId) => db('orders').where({
  ic_id: icId, invoice_id: invoiceId, type: 'purchase', payment_id: null,
}).update({ payment_id: paymentId }).returning('id');

exports.getInvoiceOfOrder = async (icId, orderId, type) => db('orders').select('invoice_id').where({ ic_id: icId, order_id: orderId, type }).first();
