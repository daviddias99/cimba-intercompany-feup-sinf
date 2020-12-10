const { getCompanies, getCompanyById } = require('../database/methods/companyMethods');
const { getSalesOrdersNoInvoice, getSalesOrdersNoDelivery, getInvoicesNoPayment } = require('../database/methods/orderMethods');
const {
  getOrders, getInvoices, getDeliveries, getPayments,
} = require('../jasmin/orders');
const {
  newPurchaseOrder,
  newInvoice,
  newDeliveryNote,
  newPayment,
} = require('./purchase');

const pollOrdersCompany = async (companyId) => {
  const orders = await getOrders(companyId);
  const company = await getCompanyById(companyId);
  const mostRecentOrderTime = new Date(company.most_recent_order).getTime();

  const newOrders = orders.data.filter((order) => {
    const time = new Date(order.createdOn);
    return !order.autoCreated && order.orderNature === 1 && time.getTime() > mostRecentOrderTime;
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

  const newInvoices = invoices.filter((invoice) => invoice.documentLines.some((line) => {
    const orderId = line.sourceDocId;
    return salesOrdersId.has(orderId);
  }));

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

  const newDeliveries = deliveries.filter((delivery) => delivery.documentLines.some((line) => {
    const orderId = line.sourceDocId;
    return salesOrdersId.has(orderId);
  }));

  newDeliveries.forEach((delivery) => newDeliveryNote(companyId, delivery));
};

exports.pollDelivery = async () => {
  const companies = await getCompanies();
  companies.forEach((company) => pollDeliveryCompany(company.id));
};

const pollPaymentCompany = async (companyId) => {
  const invoices = await getInvoicesNoPayment(companyId);
  const invoicesId = new Set(invoices.map((inv) => inv.invoice_id));

  const payments = await getPayments(companyId);

  const newPayments = payments.filter((payment) => payment.documentLines.some((line) => {
    const invoiceId = line.sourceDocId;
    return invoicesId.has(invoiceId);
  }));

  newPayments.forEach((payment) => newPayment(companyId, payment));
};

exports.pollPayment = async () => {
  const companies = await getCompanies();
  companies.forEach((company) => pollPaymentCompany(company.id));
};
