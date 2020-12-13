const { makeRequest } = require('./makeRequest');
const { jasminToIcId, icToJasminId } = require('../database/methods/companyMapsMethods');
const { getCompanyById } = require('../database/methods/companyMethods');
const { getCorrespondingSalesInvoice } = require('../database/methods/orderMapsMethods');
const { addSalesReceiptToOrder } = require('../database/methods/orderMethods');
const { addLog } = require('../database/methods/logsMethods');

exports.createSalesReceipt = async (
  jasminIdSupplier, // party
  icIdBuyer,
  documentLines,
) => {
  // Getting intercompany id of supplier
  const icIdSupplier = await jasminToIcId(icIdBuyer, jasminIdSupplier);
  if (icIdSupplier == null) throw new ReferenceError(`Cannot Map Buyer ${jasminIdSupplier} in Buyer`);

  // Getting local id of suplier in buyer
  const jasminIdBuyer = await icToJasminId(icIdSupplier, icIdBuyer);
  if (jasminIdBuyer == null) throw new ReferenceError(`Cannot Map Suplier ${icIdBuyer} in Buyer`);

  const supplier = await getCompanyById(icIdSupplier);
  if (supplier == null) throw new ReferenceError(`Cannot Find Suplier with id ${icIdSupplier}`);

  const salesOrderIds = [];

  const promises = documentLines.map(async (line) => {
    const purchaseInvoiceId = line.sourceDocId;

    const salesOrder = await getCorrespondingSalesInvoice(purchaseInvoiceId);

    salesOrderIds.push(salesOrder.order_id);

    const jasminInvoice = await makeRequest(
      `billing/invoices/${salesOrder.invoice_id}`,
      'get',
      supplier.id,
    );

    const newLine = {
      sourceDoc: jasminInvoice.data.naturalKey,
      settled: line.amount.amount,
    };

    return newLine;
  });

  const lines = await Promise.all(promises);

  const salesReceipt = await makeRequest(
    `accountsReceivable/processOpenItems/${supplier.company_key}`,
    'post',
    supplier.id,
    {},
    lines,
  );

  if (salesReceipt.status !== 201) {
    return salesReceipt;
  }

  salesOrderIds.forEach(
    async (id) => {
      const processId = await addSalesReceiptToOrder(icIdSupplier, id, salesReceipt.data);
      await addLog(processId[0], 'create', salesReceipt.data, 'payment');
    },
  );

  console.log(`Created receipt ${salesReceipt.data} for company ${icIdSupplier}`);

  return salesReceipt;
};
