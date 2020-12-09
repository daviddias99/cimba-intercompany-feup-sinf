const { makeRequest } = require('./makeRequest');
const { mapLocalCompanyId, mapUniversalCompanyId } = require('../database/methods/companyMapsMethods');
const { mapLocalItemId } = require('../database/methods/itemMapsMethods');
const { getCompanyById } = require('../database/methods/companyMethods');
const { addOrder } = require('../database/methods/orderMethods');

exports.getOrders = async (companyId) => makeRequest('purchases/orders', 'get', companyId);

exports.createSalesOrder = async (
  companyIdBuyer,
  companyIdSuplier,
  deliveryTerm,
  documentLines,
) => {
  // Getting universal id of suplier
  const universalIdSuplier = await mapLocalCompanyId(companyIdBuyer, companyIdSuplier);
  if (universalIdSuplier == null) throw new ReferenceError(`Cannot Map Suplier ${companyIdSuplier} in Buyer`);

  // Getting local id of buyer in suplier
  const localIdBuyer = await mapUniversalCompanyId(universalIdSuplier, companyIdBuyer);
  if (localIdBuyer == null) throw new ReferenceError(`Cannot Map Buyer ${companyIdBuyer} in Suplier`);

  const suplier = await getCompanyById(universalIdSuplier);
  if (suplier == null) throw new ReferenceError(`Cannot Find Suplier with id ${universalIdSuplier}`);

  // Translate documentLines
  let mapPromises = [];
  documentLines.forEach((element) => mapPromises.push(
    mapLocalItemId(companyIdBuyer, element.purchasesItem, universalIdSuplier),
  ));

  mapPromises = await Promise.all(mapPromises);

  const documentLinesMapped = [];
  mapPromises.forEach((element, index) => {
    if (element == null) throw new ReferenceError(`Cannot Map Item number ${index}`);
    documentLinesMapped.push({ salesItem: element });
  });

  const salesOrder = await makeRequest(
    'sales/orders',
    'post',
    suplier.id,
    {},
    {
      company: suplier.company_key,
      buyerCustomerParty: localIdBuyer,
      deliveryTerm,
      documentLines: documentLinesMapped,
    },
  );

  addOrder(universalIdSuplier, salesOrder.data, 'sale');
  console.log(`Created sales order ${salesOrder.data} for company ${universalIdSuplier}`);

  return salesOrder;
};

exports.getInvoices = async (companyId) => (await makeRequest('billing/invoices', 'get', companyId)).data;

exports.getDeliveries = async (companyId) => (await makeRequest('shipping/deliveries', 'get', companyId)).data;

exports.getPurchaseOrder = async (companyId, orderId) => (await makeRequest(`purchases/orders/${orderId}`, 'get', companyId)).data;

exports.getPurchaseInvoice = async (companyId, invoiceId) => (await makeRequest(`invoiceReceipt/invoices/${invoiceId}`, 'get', companyId)).data;

exports.getPurchaseFinancial = async (companyId, id) => (await makeRequest(`/accountsPayable/payments/${id}`, 'get', companyId)).data;

exports.getSalesOrder = async (companyId, orderId) => (await makeRequest(`sales/orders/${orderId}`, 'get', companyId)).data;

exports.getSalesInvoice = async (companyId, invoiceId) => (await makeRequest(`billing/invoices/${invoiceId}`, 'get', companyId)).data;

exports.getSalesDelivery = async (companyId, deliveryId) => (await makeRequest(`shipping/deliveries/${deliveryId}`, 'get', companyId)).data;

exports.getSalesFinancial = async (companyId, id) => (await makeRequest(`/accountsReceivable/receipts/${id}`, 'get', companyId)).data;
