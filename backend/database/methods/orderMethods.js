const db = require('../knex');

exports.addOrder = async (companyId, order) => {
  await db('orders').insert({
    company_id: companyId,
    jasmin_created_on: order.createdOn,
    order_id: order.id,
  });
};
