const { makeRequest } = require('./makeRequest');

exports.getOrders = async (companyId) => {
  const orders = await makeRequest('purchases/orders', 'get', companyId);
  return orders.map((elem) => ({ id: elem.id }));
};
