const { getCompanies } = require('./database/methods/companyMethods');
const { getOrders } = require('./jasmin/orders');

const pollOrdersCompany = async (id) => {
  const orders = await getOrders(id);
  console.log(orders.map((e) => ({ id: e.id })));
};

exports.pollOrders = async () => {
  const companies = await getCompanies();
  companies.forEach((company) => pollOrdersCompany(company.id));
};
