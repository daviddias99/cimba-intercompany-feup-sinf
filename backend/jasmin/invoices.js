const { makeRequest } = require('./makeRequest');
const { jasminToIcId, icToJasminId } = require('../database/methods/companyMapsMethods');
const { getCompanyById } = require('../database/methods/companyMethods');
const { getMapOfDocSalesOrder } = require('../database/methods/orderMapsMethods');
const { addInvoiceToOrder } = require('../database/methods/orderMethods');
const { getOrdersKeyAndLines, filterAvailableLines } = require('./utils');
const { addLog } = require('../database/methods/logsMethods');

async function getAvailableLinesForInvoice(buyer, index, numLines) {
  return (await makeRequest(
    `invoiceReceipt/processOrders/${index}/${numLines}`,
    'get',
    buyer.id,
    { company: buyer.company_key },
    {},
  )).data;
}

exports.createInvoice = async (
  jasminIdBuyer, // buyerCustomerParty
  icIdSuplier,
  documentLines,
) => {
  // Getting intercompany id of buyer
  const icIdBuyer = await jasminToIcId(icIdSuplier, jasminIdBuyer);
  if (icIdBuyer == null) throw new ReferenceError(`Cannot Map Buyer ${jasminIdBuyer} in Suplier`);

  // Getting local id of suplier in buyer
  const jasminIdSuplier = await icToJasminId(icIdBuyer, icIdSuplier);
  if (jasminIdSuplier == null) throw new ReferenceError(`Cannot Map Suplier ${icIdSuplier} in Buyer`);

  const buyer = await getCompanyById(icIdBuyer);
  if (buyer == null) throw new ReferenceError(`Cannot Find Suplier with id ${icIdBuyer}`);

  // Translate SalesOrderIds to PurchaseOrderIds
  let purchaseOrderIds = [];
  const lines = [];
  documentLines.forEach((element) => {
    purchaseOrderIds.push(getMapOfDocSalesOrder(element.sourceDocId, icIdSuplier));
    lines.push(element.sourceDocLine);
  });

  purchaseOrderIds = await Promise.all(purchaseOrderIds);

  // Getting Keys and Lines For all Entries
  const orderKeysAndLines = await getOrdersKeyAndLines(purchaseOrderIds, lines, icIdBuyer);

  // Filter the available lines with the lines sent by the suplier
  let availableLinesForInvoice = await getAvailableLinesForInvoice(buyer, 1, 50);

  availableLinesForInvoice = filterAvailableLines(
    availableLinesForInvoice, orderKeysAndLines,
  );

  const invoices = await makeRequest(
    `invoiceReceipt/processOrders/${buyer.company_key}`,
    'post',
    buyer.id,
    {},
    availableLinesForInvoice,
  );

  if (invoices.status !== 201) {
    return invoices;
  }

  const buyerOrderIds = new Set(purchaseOrderIds);
  buyerOrderIds.forEach(
    async (sourceDocId) => {
      const id = await addInvoiceToOrder(icIdBuyer, sourceDocId, invoices.data, 'purchase');
      await addLog(id[0], 'create', invoices.data, 'invoice');
    },
  );

  console.log(`Created Invoice ${invoices.data} for company ${icIdBuyer}`);

  return invoices;
};
