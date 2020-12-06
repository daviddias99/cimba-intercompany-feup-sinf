const { getCompanies, getCompanyById } = require('../database/methods/companyMethods');
const { getOrders } = require('../jasmin/orders');
const { newPurchaseOrder } = require('./purchase');

const pollOrdersCompany = async (companyId) => {
  const orders = await getOrders(companyId);
  const company = await getCompanyById(companyId);
  const mostRecentOrderTime = company.most_recent_order;

  const newOrders = orders.filter((order) => {
    const orderDate = new Date(order.createdOn);
    return orderDate.getTime() > mostRecentOrderTime;
  });

  newOrders.forEach((order) => newPurchaseOrder(companyId, order));
};

exports.pollOrders = async () => {
  const companies = await getCompanies();
  companies.forEach((company) => pollOrdersCompany(company.id));
};
