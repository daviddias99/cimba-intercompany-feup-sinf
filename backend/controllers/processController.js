const jasmin = require('../jasmin/orders');
const { getAllProcesses } = require('../database/methods/orderMethods');
const regexNum = require('../helper/regexNum');

const getProcessState = (process) => {
  if (process.delivery_id == null) return 0;
  if (process.invoice_id == null) return 1;
  if (process.payment_id == null) return 2;

  return 3;
};

exports.getProcess = async (req, res) => {
  const { process } = req;
  process.state = getProcessState(process);

  return res.json(process);
};

exports.getOrder = async (req, res) => {
  const { process } = req;

  let document;
  if (process.type === 'purchase') {
    document = await jasmin.getPurchaseOrder(process.company_id, process.order_id);
  } else if (process.type === 'sale') {
    document = await jasmin.getSalesOrder(process.company_id, process.order_id);
  }

  return res.json({
    type: process.type,
    document,
    processState: getProcessState(process),
    documentState: 0,
  });
};

exports.getTransportation = async (req, res) => {
  const { process } = req;

  let document;
  if (process.type === 'purchase') {
    document = { url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' };
  } else if (process.type === 'sale') {
    document = await jasmin.getSalesDelivery(process.company_id, process.delivery_id);
  }

  return res.json({
    type: process.type,
    document,
    processState: getProcessState(process),
    documentState: 1,
  });
};

exports.getInvoice = async (req, res) => {
  const { process } = req;

  let document;
  if (process.type === 'purchase') {
    document = await jasmin.getPurchaseInvoice(process.company_id, process.invoice_id);
  } else if (process.type === 'sale') {
    document = await jasmin.getSalesInvoice(process.company_id, process.invoice_id);
  }

  return res.json({
    type: process.type,
    document,
    processState: getProcessState(process),
    documentState: 2,
  });
};

exports.getFinancial = async (req, res) => {
  const { process } = req;

  let document;
  if (process.type === 'purchase') {
    document = await jasmin.getPurchaseFinancial(process.company_id, process.payment_id);
  } else if (process.type === 'sale') {
    document = await jasmin.getSalesFinancial(process.company_id, process.payment_id);
  }

  return res.json({
    type: process.type,
    document,
    processState: getProcessState(process),
    documentState: 3,
  });
};

exports.getAllProcesses = async (req, res) => {
  let { page, pageSize } = req.query;

  const regex = new RegExp(regexNum);

  if (page && pageSize) {
    if (!(regex.test(page) && regex.test(pageSize))) {
      res.status(400).json({ status: 400 });
      return;
    }
    page = parseInt(page, 10);
    pageSize = parseInt(pageSize, 10);
  } else {
    page = null;
    pageSize = null;
  }

  let processes = await getAllProcesses(req.company.id, page, pageSize);
  processes = processes.map((process) => ({ ...process, state: getProcessState(process), other_company_name: 'OTHER_COMP' }));

  res.json(processes);
};
