const { getProcess } = require('../database/methods/orderMethods');
const jasmin = require('../jasmin/orders');

const getProcessState = (process) => {
  if (process.delivery_id == null) return 0;
  if (process.invoice_id == null) return 1;
  if (process.payment_id == null) return 2;

  return 3;
};

exports.getOrder = async (req, res) => {
  const { process } = req;

  let order;
  if (process.type === 'purchase') {
    order = jasmin.getPurchaseOrder(process.company_id, process.order_id);
  } else if (process.type === 'sale') {
    order = jasmin.getSalesOrder(process.company_id, process.order_id);
  }

  return res.json({
    type: process.type,
    document: order,
    state: getProcessState(process),
  });
};

exports.getTransportation = async (req, res) => {
  const { process } = req;

  let order;
  if (process.type === 'purchase') {
    order = { url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' };
  } else if (process.type === 'sale') {
    order = jasmin.getSalesDelivery(process.company_id, process.order_id);
  }

  return res.json({
    type: process.type,
    document: order,
    state: getProcessState(process),
  });
};

exports.getInvoice = async (req, res) => {
  const { process } = req;

  let order;
  if (process.type === 'purchase') {
    order = jasmin.getPurchaseInvoice(process.company_id, process.invoice_id);
  } else if (process.type === 'sale') {
    order = jasmin.getSalesInvoice(process.company_id, process.invoice_id);
  }

  return res.json({
    type: process.type,
    document: order,
    state: getProcessState(process),
  });
};

exports.getFinancial = async (req, res) => {
  const { process } = req;

  let order;
  if (process.type === 'purchase') {
    order = jasmin.getPurchaseFinancial(process.company_id, process.order_id);
  } else if (process.type === 'sale') {
    order = jasmin.getSalesFinancial(process.company_id, process.order_id);
  }

  return res.json({
    type: process.type,
    document: order,
    state: getProcessState(process),
  });
};
