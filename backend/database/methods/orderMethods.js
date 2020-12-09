const db = require('../knex');

exports.getProcess = async (processId) => db('orders').where({ id: processId }).select();

exports.addOrder = async (companyId, orderId, type, createdOn = null) => {
  const order = {
    company_id: companyId,
    order_id: orderId,
    type,
  };

  if (createdOn != null) {
    order.jasmin_created_on = createdOn;
  }

  await db('orders').insert(order);
};

exports.getSalesOrdersNoInvoice = async (companyId) => db('orders').select('order_id').where({ company_id: companyId, type: 'sale', invoice_id: null });

exports.getSalesOrdersNoDelivery = async (companyId) => db('orders').select('order_id').where({ company_id: companyId, type: 'sale', delivery_id: null });
