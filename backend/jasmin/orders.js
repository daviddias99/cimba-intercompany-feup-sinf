const { makeRequest } = require('./makeRequest');
const { jasminToIcId, icToJasminId } = require('../database/methods/companyMapsMethods');
const { mapLocalItemId } = require('../database/methods/itemMapsMethods');
const { getCompanyById } = require('../database/methods/companyMethods');
const { addOrder } = require('../database/methods/orderMethods');
const { addOrderMaps } = require('../database/methods/orderMapsMethods');

exports.getOrders = async (companyId) => makeRequest('purchases/orders', 'get', companyId);

exports.createSalesOrder = async (
  icIdBuyer,
  jasminIdSuplier,
  deliveryTerm,
  documentLines,
  purchaseOrderId,
) => {
  // Getting ic id of suplier
  const icIdSuplier = await jasminToIcId(icIdBuyer, jasminIdSuplier);
  if (icIdSuplier == null) throw new ReferenceError(`Cannot Map Suplier ${jasminIdSuplier} in Buyer`);

  // Getting jasmin id of buyer in suplier
  const jasminIdBuyer = await icToJasminId(icIdSuplier, icIdBuyer);
  if (jasminIdBuyer == null) throw new ReferenceError(`Cannot Map Buyer ${icIdBuyer} in Suplier`);

  const suplier = await getCompanyById(icIdSuplier);
  if (suplier == null) throw new ReferenceError(`Cannot Find Suplier with id ${icIdSuplier}`);

  // Translate documentLines
  let mapPromises = [];
  documentLines.forEach((element) => mapPromises.push(
    mapLocalItemId(icIdBuyer, element.purchasesItem, icIdSuplier),
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
      buyerCustomerParty: jasminIdBuyer,
      deliveryTerm,
      documentLines: documentLinesMapped,
    },
  );

  await addOrder(icIdSuplier, salesOrder.data, 'sale');
  await addOrderMaps(purchaseOrderId, salesOrder.data);
  console.log(`Created sales order ${salesOrder.data} for company ${icIdSuplier}`);

  return salesOrder;
};

exports.getInvoices = async (companyId) => (await makeRequest('billing/invoices', 'get', companyId)).data;

exports.getDeliveries = async (companyId) => (await makeRequest('shipping/deliveries', 'get', companyId)).data;

exports.getOrderById = async (companyId, orderId) => makeRequest(`/purchases/orders/${orderId}`, 'get', companyId);
