const { getCompanies, getCompanyById } = require('../database/methods/companyMethods');
const {
  getSalesOrdersNoInvoice, getSalesOrdersNoDelivery, getInvoicesNoPayment,
  getReturnOrdersNoDelivery, getReturnOrdersNoPayment,
} = require('../database/methods/orderMethods');
const {
  getOrders, getInvoices, getDeliveries, getPayments, getCreditNotes,
} = require('../jasmin/orders');
const {
  newOrder, newInvoice, newDeliveryNote, newPayment, newCreditNote,
} = require('./purchase');

const pollOrdersCompany = async (companyId, page) => {
  let currPage = page;
  if (!page) currPage = 1;

  const orders = await getOrders(companyId, currPage, 5);
  const company = await getCompanyById(companyId);
  const mostRecentOrderTime = new Date(company.most_recent_order).getTime();

  const newOrders = orders.data.filter((order) => {
    const time = new Date(order.createdOn);

    return !order.autoCreated && time.getTime() > mostRecentOrderTime;
  });

  if (newOrders.length === orders.data.length && orders.nextPage !== '') {
    pollOrdersCompany(companyId, currPage + 1);
  }

  newOrders.forEach((order) => newOrder(companyId, order));
};

exports.pollPurchaseOrders = async () => {
  const companies = await getCompanies();
  companies.forEach((company) => {
    pollOrdersCompany(company.id);
  });
};

const pollInvoiceCompany = async (companyId, page) => {
  let currPage = page;
  if (!page) currPage = 1;

  const salesOrders = await getSalesOrdersNoInvoice(companyId);
  const salesOrdersId = new Set(salesOrders.map((order) => order.order_id));

  const invoices = await getInvoices(companyId, currPage, 5);

  const newInvoices = invoices.data.filter((invoice) => invoice.documentLines.some((line) => {
    const orderId = line.sourceDocId;
    return salesOrdersId.has(orderId);
  }));

  if (newInvoices.length === invoices.data.length && invoices.nextPage !== '') {
    pollInvoiceCompany(companyId, currPage + 1);
  }

  newInvoices.forEach((invoice) => newInvoice(companyId, invoice));
};

exports.pollInvoice = async () => {
  const companies = await getCompanies();
  companies.forEach((company) => {
    pollInvoiceCompany(company.id);
  });
};

const pollCreditNoteCompany = async (companyId) => {
  const salesOrders = await getReturnOrdersNoPayment(companyId);
  const salesOrdersId = new Set(salesOrders.map((order) => order.order_id));

  const invoices = await getCreditNotes(companyId);

  const newInvoices = invoices.filter((invoice) => invoice.documentLines.some((line) => {
    const orderId = line.sourceDocId;
    return salesOrdersId.has(orderId);
  }));

  newInvoices.forEach((invoice) => newCreditNote(companyId, invoice));
};

exports.pollCreditNote = async () => {
  const companies = await getCompanies();
  companies.forEach((company) => pollCreditNoteCompany(company.id));
};

const pollDeliveryCompany = async (companyId, page) => {
  let currPage = page;
  if (!page) currPage = 1;

  const salesOrders = await getSalesOrdersNoDelivery(companyId);
  const salesOrdersId = new Set(salesOrders.map((order) => order.order_id));

  const returnOrders = await getReturnOrdersNoDelivery(companyId);
  const returnOrdersId = new Set(returnOrders.map((order) => order.order_id));

  const deliveries = await getDeliveries(companyId, currPage, 5);

  const newDeliveries = deliveries.data.filter((delivery) => delivery.documentLines.some((line) => {
    const orderId = line.sourceDocId;
    return salesOrdersId.has(orderId);
  }));
  const newReturnDeliveries = deliveries.data.filter((delivery) => delivery.documentLines.some(
    (line) => {
      const orderId = line.sourceDocId;
      return returnOrdersId.has(orderId);
    },
  ));

  if (newDeliveries.length === deliveries.data.length && deliveries.nextPage !== '') {
    pollDeliveryCompany(companyId, currPage + 1);
  }

  newDeliveries.forEach((delivery) => newDeliveryNote(companyId, delivery, true));
  newReturnDeliveries.forEach((delivery) => newDeliveryNote(companyId, delivery, false));
};

exports.pollDelivery = async () => {
  const companies = await getCompanies();
  companies.forEach((company) => {
    pollDeliveryCompany(company.id);
  });
};

const pollPaymentCompany = async (companyId, page) => {
  let currPage = page;
  if (!page) currPage = 1;

  const invoices = await getInvoicesNoPayment(companyId);
  const invoicesId = new Set(invoices.map((inv) => inv.invoice_id));

  const payments = await getPayments(companyId, currPage, 5);

  const newPayments = payments.data.filter((payment) => payment.documentLines.some((line) => {
    const invoiceId = line.sourceDocId;
    return invoicesId.has(invoiceId);
  }));

  if (newPayments.length === payments.data.length && payments.nextPage !== '') {
    pollPaymentCompany(companyId, currPage + 1);
  }

  newPayments.forEach((payment) => newPayment(companyId, payment));
};

exports.pollPayment = async () => {
  const companies = await getCompanies();
  companies.forEach((company) => {
    pollPaymentCompany(company.id);
  });
};
