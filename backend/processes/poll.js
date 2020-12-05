const { getCompanies } = require('../database/methods/companyMethods');
const { getOrders } = require('../jasmin/orders');
const { newPurchaseOrder } = require('./purchase');

// TODO: lastPoll initial value should probably be the created time of the company
let lastPoll = new Date('1995-12-17T03:24:00');

const pollOrdersCompany = async (companyId, lastPollTime) => {
  const orders = await getOrders(companyId);

  const newOrders = orders.filter((order) => {
    const orderDate = new Date(order.createdOn);
    return orderDate.getTime() >= lastPollTime;
  });

  newOrders.forEach((order) => newPurchaseOrder(companyId, order));
};

exports.pollOrders = async () => {
  const companies = await getCompanies();
  companies.forEach((company) => pollOrdersCompany(company.id, lastPoll.getTime()));
  lastPoll = new Date();
};
