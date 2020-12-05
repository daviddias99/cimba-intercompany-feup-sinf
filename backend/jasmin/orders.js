const { makeRequest } = require('./makeRequest');

exports.getOrders = async (companyId) => makeRequest('purchases/orders', 'get', companyId);
