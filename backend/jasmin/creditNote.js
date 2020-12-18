const { makeRequest } = require('./makeRequest');
const { jasminToIcId, icToJasminId } = require('../database/methods/companyMapsMethods');
const { getCompanyById } = require('../database/methods/companyMethods');
const { getMapOfDocSalesOrder } = require('../database/methods/orderMapsMethods');
const { addCreditNoteToOrder } = require('../database/methods/orderMethods');
const { getOrdersKeyAndLines, filterAvailableLines } = require('./utils');
const { addLog } = require('../database/methods/logsMethods');
const { getPurchaseOrder } = require('./orders');

// TODO this request doesn't work

async function getAvailableLinesForCreditNote(buyer, index, numLines) {
  return (await makeRequest(
    `invoiceReceipt/processReturnOrders/${index}/${numLines}`,
    'get',
    buyer.id,
    { company: buyer.company_key },
    {},
  )).data;
}

exports.createCreditNote = async (
  jasminIdBuyer, // buyerCustomerParty
  icIdSuplier,
  memoReason,
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
  const buyerOrderIds = new Set(purchaseOrderIds);

  // Get necessary orders
  let purchaseOrders = [];
  buyerOrderIds.forEach((docId) => {
    purchaseOrders.push(getPurchaseOrder(icIdBuyer, docId));
  });

  purchaseOrders = await Promise.all(purchaseOrders);

  // Mapping all of the orders
  let documentLinesMapped = [];
  purchaseOrders.forEach((element) => {
    documentLinesMapped = [...documentLinesMapped, ...element.documentLines];
  });

  const creditNote = await makeRequest(
    'invoiceReceipt/memos',
    'post',
    buyer.id,
    {},
    {
      sellerSupplierParty: jasminIdSuplier,
      documentType: 'VNC',
      memoReason,
      documentLines: documentLinesMapped,
    },
  );

  if (creditNote.status !== 201) {
    return creditNote;
  }

  buyerOrderIds.forEach(
    async (sourceDocId) => {
      const id = await addCreditNoteToOrder(icIdBuyer, sourceDocId, creditNote.data, 'return_purchase');
      await addLog(id[0], 'create', creditNote.data, 'payment');
    },
  );

  console.log(`Created Credit Note ${creditNote.data} for company ${icIdBuyer}`);

  return creditNote;
};

exports.createCreditNoteAlternative = async (
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
  let availableLinesForCreditNote = await getAvailableLinesForCreditNote(buyer, 1, 50);

  availableLinesForCreditNote = filterAvailableLines(
    availableLinesForCreditNote, orderKeysAndLines,
  );

  const creditNote = await makeRequest(
    `invoiceReceipt/processReturnOrders/${buyer.company_key}`,
    'post',
    buyer.id,
    {},
    availableLinesForCreditNote,
  );

  if (creditNote.status !== 201) {
    return creditNote;
  }

  const buyerOrderIds = new Set(purchaseOrderIds);
  buyerOrderIds.forEach(
    async (sourceDocId) => {
      const id = await addCreditNoteToOrder(icIdBuyer, sourceDocId, creditNote.data, 'return_purchase');
      await addLog(id[0], 'create', creditNote.data, 'payment');
    },
  );

  console.log(`Created Credit Note ${creditNote.data} for company ${icIdBuyer}`);

  return creditNote;
};
