const db = require('../knex');

exports.addOrder = async (companyId, orderId, type, createdOn = null) => {
  const order = {
    company_id: companyId,
    order_id: orderId,
    type,
  };

  if (createdOn != null) {
    order.jasmin_created_on = createdOn;
  }

  return db('orders').insert(order);
};

exports.getSalesOrdersNoInvoice = async (companyId) => db('orders').select('order_id').where({ company_id: companyId, type: 'sale', invoice_id: null });

exports.getSalesOrdersNoDelivery = async (companyId) => db('orders').select('order_id').where({ company_id: companyId, type: 'sale', delivery_id: null });

exports.addGoodsReceiptToOrder = async (companyId, orderId, goodsReceiptId) => db('orders').where({
  company_id: companyId, order_id: orderId, type: 'sale', delivery_id: null,
}).update({ delivery_id: goodsReceiptId });
