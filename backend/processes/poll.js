const { getCompanies, getCompanyById } = require('../database/methods/companyMethods');
const { getOrders } = require('../jasmin/orders');
const { newPurchaseOrder } = require('./purchase');

const pollOrdersCompany = async (companyId) => {
  const orders = await getOrders(companyId);
  const company = await getCompanyById(companyId);
  const mostRecentOrderTime = new Date(company.most_recent_order);

  const newOrders = orders.data.filter((order) => {
    const orderDate = new Date(order.createdOn);
    return orderDate.getTime() > mostRecentOrderTime.getTime();
  });

  newOrders.forEach((order) => newPurchaseOrder(companyId, order));
};

exports.pollOrders = async () => {
  const companies = await getCompanies();
  companies.forEach((company) => pollOrdersCompany(company.id));
};
