const db = require('../knex');

exports.getAllProcesses = async (icId, page = null, pageSize = null) => {
  let query = db('orders').where({ ic_id: icId });

  if (page != null && pageSize != null) query = query.offset(page * pageSize).limit(pageSize);

  return query.orderBy([{ column: 'created_on', order: 'desc' }]).select();
};

exports.getProcess = async (processId) => db('orders').where({ id: processId }).first();

exports.addOrder = async (icId, orderId, type, createdOn = null) => {
  const order = {
    ic_id: icId,
    order_id: orderId,
    type,
  };

  if (createdOn != null) {
    order.created_on = createdOn;
  }

  return db('orders').insert(order);
};

exports.getSalesOrdersNoInvoice = async (icId) => db('orders').select('order_id').where({ ic_id: icId, type: 'sale', invoice_id: null });

exports.getSalesOrdersNoDelivery = async (icId) => db('orders').select('order_id').where({ ic_id: icId, type: 'sale', delivery_id: null });

exports.addDeliveryToOrder = async (icId, orderId, goodsReceiptId, type) => db('orders').where({
  ic_id: icId, order_id: orderId, type, delivery_id: null,
}).update({ delivery_id: goodsReceiptId });

exports.addInvoiceToOrder = async (icId, orderId, invoiceId, type) => db('orders').where({
  ic_id: icId, order_id: orderId, type, invoice_id: null,
}).update({ invoice_id: invoiceId });
