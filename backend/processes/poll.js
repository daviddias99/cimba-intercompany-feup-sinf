const { getCompanies } = require('../database/methods/companyMethods');
const { getOrders } = require('../jasmin/orders');
const { newPurchaseOrder } = require('./purchase');

let lastPoll = new Date('1995-12-17T03:24:00');

const pollOrdersCompany = async (id) => {
  const orders = await getOrders(id);

  const newOrders = orders.filter((order) => {
    const orderDate = new Date(order.postingDate);
    return orderDate.getTime() >= lastPoll.getTime();
  });

  newOrders.forEach(newPurchaseOrder);
};

exports.pollOrders = async () => {
  const companies = await getCompanies();
  const pollPromises = companies.map((company) => pollOrdersCompany(company.id));

  Promise.all(pollPromises).then(() => {
    lastPoll = new Date();
  });
};
