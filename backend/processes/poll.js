const { getCompanies, getCompanyById } = require('../database/methods/companyMethods');
const { getSalesOrdersNoInvoice, getSalesOrdersNoDelivery } = require('../database/methods/orderMethods');
const { getOrders, getInvoices, getDeliveries } = require('../jasmin/orders');
const { newPurchaseOrder, newInvoice, newDeliveryNote } = require('./purchase');

const pollOrdersCompany = async (companyId) => {
  const orders = await getOrders(companyId);
  const company = await getCompanyById(companyId);
  const mostRecentOrderTime = new Date(company.most_recent_order).getTime();

  const newOrders = orders.data.filter((order) => {
    const orderDate = new Date(order.createdOn);
    return order.documentType === 'ECF' && orderDate.getTime() > mostRecentOrderTime;
  });

  newOrders.forEach((order) => newPurchaseOrder(companyId, order));
};

exports.pollPurchaseOrders = async () => {
  const companies = await getCompanies();
  companies.forEach((company) => pollOrdersCompany(company.id));
};

const pollInvoiceCompany = async (companyId) => {
  const salesOrders = await getSalesOrdersNoInvoice(companyId);
  const salesOrdersId = new Set(salesOrders.map((order) => order.order_id));

  const invoices = await getInvoices(companyId);

  const newInvoices = invoices.filter((invoice) => {
    const orderId = invoice.documentLines[0].sourceDocId;
    return salesOrdersId.has(orderId);
  });

  newInvoices.forEach((invoice) => newInvoice(companyId, invoice));
};

exports.pollInvoice = async () => {
  const companies = await getCompanies();
  companies.forEach((company) => pollInvoiceCompany(company.id));
};

const pollDeliveryCompany = async (companyId) => {
  const salesOrders = await getSalesOrdersNoDelivery(companyId);
  const salesOrdersId = new Set(salesOrders.map((order) => order.order_id));

  const deliveries = await getDeliveries(companyId);

  const newDeliveries = deliveries.filter((delivery) => {
    const orderId = delivery.documentLines[0].sourceDocId;
    return salesOrdersId.has(orderId);
  });

  newDeliveries.forEach((delivery) => newDeliveryNote(companyId, delivery));
};

exports.pollDelivery = async () => {
  const companies = await getCompanies();
  companies.forEach((company) => pollDeliveryCompany(company.id));
};
