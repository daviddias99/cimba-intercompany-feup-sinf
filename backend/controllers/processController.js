const jasmin = require('../jasmin/orders');
const { getAllProcesses } = require('../database/methods/orderMethods');
const regexNum = require('../helper/regexNum');

const getProcessState = (process) => {
  if (process.type === 'sale' || process.type === 'purchase') {
    if (process.delivery_id == null) return 0;
    if (process.invoice_id == null) return 1;
    if (process.payment_id == null) return 2;
  }

  if (process.type === 'return_sale' || process.type === 'return_purchase') {
    if (process.delivery_id == null) return 0;
    if (process.payment_id == null) return 1;
    return 2;
  }

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
  if (process.type === 'purchase' || process.type === 'return_purchase') {
    document = await jasmin.getPurchaseOrder(process.ic_id, process.order_id);
  } else if (process.type === 'sale' || process.type === 'return_sale') {
    document = await jasmin.getSalesOrder(process.ic_id, process.order_id);
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

  if (process.type === 'purchase' || process.type === 'return_sale') {
    document = { deliveryId: process.delivery_id };
  } else if (process.type === 'sale' || process.type === 'return_purchase') {
    document = await jasmin.getSalesDelivery(process.ic_id, process.delivery_id);
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
  if (process.type === 'purchase' || process.type === 'return_purchase') {
    document = await jasmin.getPurchaseInvoice(process.ic_id, process.invoice_id);
  } else if (process.type === 'sale' || process.type === 'return_sale') {
    document = await jasmin.getSalesInvoice(process.ic_id, process.invoice_id);
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
    document = await jasmin.getPurchaseFinancial(process.ic_id, process.payment_id);
  } else if (process.type === 'sale') {
    document = await jasmin.getSalesFinancial(process.ic_id, process.payment_id);
  } else if (process.type === 'return_sale') {
    document = await jasmin.getCreditNote(process.ic_id, process.payment_id);
  } else if (process.type === 'return_purchase') {
    document = await jasmin.getBuyerCreditNote(process.ic_id, process.payment_id);
  }

  return res.json({
    type: process.type,
    document,
    processState: getProcessState(process),
    documentState: (process.type === 'return_sale' || process.type === 'return_purchase') ? 2 : 3,
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
  processes = processes.map((process) => ({ ...process, state: getProcessState(process) }));

  res.json(processes);
};
