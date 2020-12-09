const db = require('../knex');

exports.addOrder = async (companyId, order) => {
  await db('orders').insert({
    company_id: companyId,
    jasmin_created_on: order.createdOn,
    order_id: order.id,
    type: 'purchase',
  });
};

exports.getSalesOrdersNoInvoice = async (companyId) => db('orders').select('order_id').where({ company_id: companyId, type: 'sale', invoice_id: null });

exports.getSalesOrdersNoDelivery = async (companyId) => db('orders').select('order_id').where({ company_id: companyId, type: 'sale', delivery_id: null });
