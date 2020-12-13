const { makeRequest } = require('./makeRequest');
const { jasminToIcId, icToJasminId } = require('../database/methods/companyMapsMethods');
const { mapLocalItemId } = require('../database/methods/itemMapsMethods');
const { getCompanyById } = require('../database/methods/companyMethods');
const { addOrder } = require('../database/methods/orderMethods');
const { addOrderMaps } = require('../database/methods/orderMapsMethods');
const { addLog } = require('../database/methods/logsMethods');

const isStandardOrder = (orderNature) => orderNature === 1;

exports.getOrders = async (companyId) => makeRequest('purchases/orders', 'get', companyId);

exports.createOrder = async (
  icIdBuyer,
  jasminIdSuplier,
  purchaseOrderId,
  order,
  createdOn,
) => {
  // Getting ic id of suplier
  const icIdSuplier = await jasminToIcId(icIdBuyer, jasminIdSuplier);
  if (icIdSuplier == null) throw new ReferenceError(`Cannot Map Suplier ${jasminIdSuplier} in Buyer`);

  // Getting jasmin id of buyer in suplier
  const jasminIdBuyer = await icToJasminId(icIdSuplier, icIdBuyer);
  if (jasminIdBuyer == null) throw new ReferenceError(`Cannot Map Buyer ${icIdBuyer} in Suplier`);

  const suplier = await getCompanyById(icIdSuplier);
  if (suplier == null) throw new ReferenceError(`Cannot Find Suplier with id ${icIdSuplier}`);

  const { documentLines } = order;
  const buyer = await getCompanyById(icIdBuyer);
  if (buyer == null) throw new ReferenceError(`Cannot Find Buyer with id ${icIdSuplier}`);

  console.log(`Start process for order ${purchaseOrderId} from company ${icIdBuyer}`);

  const isStandard = isStandardOrder(order.orderNature);
  const orderType = isStandard ? 'purchase' : 'return_purchase';
  const processId = await addOrder(icIdBuyer, purchaseOrderId, orderType, suplier.name, createdOn);

  await addLog(processId[0], 'detect', purchaseOrderId, 'order');

  // Translate documentLines
  let mapPromises = [];
  documentLines.forEach((element) => mapPromises.push(
    mapLocalItemId(icIdBuyer, element.purchasesItem, icIdSuplier),
  ));

  mapPromises = await Promise.all(mapPromises);

  const documentLinesMapped = [];
  mapPromises.forEach((element, index) => {
    if (element == null) throw new ReferenceError(`Cannot Map Item number ${index}`);
    documentLinesMapped.push({
      salesItem: element,
      quantity: documentLines[index].quantity,
      unitPrice: documentLines[index].unitPrice,
      discount1: documentLines[index].discount1,
      discount2: documentLines[index].discount2,
      discount3: documentLines[index].discount3,
    });
  });

  const documentType = isStandard ? undefined : 'DEV';

  const salesOrder = await makeRequest(
    'sales/orders',
    'post',
    suplier.id,
    {},
    {
      documentType,
      company: suplier.company_key,
      buyerCustomerParty: jasminIdBuyer,
      documentLines: documentLinesMapped,
      discount: order.discount,
      deliveryTerm: order.deliveryTerm,
      paymentMethod: order.paymentMethod,
      noteToRecipient: order.noteToRecipient,
      note: order.note,
      remarks: order.remarks,
      salesChannel: order.salesChannel,
      currency: order.currency,
      loadingPoint: order.loadingPoint,
      loadingPointAddress: order.loadingPointAddress,
      loadingStreetName: order.loadingStreetName,
      loadingBuildingNumber: order.loadingBuildingNumber,
      loadingPostalZone: order.loadingPostalZone,
      loadingCityName: order.loadingCityName,
      loadingDateTime: order.loadingDateTime,
      loadingCountry: order.loadingCountry,
      unloadingPoint: order.unloadingPoint,
      unloadingPointAddress: order.unloadingPointAddress,
      unloadingStreetName: order.unloadingStreetName,
      unloadingBuildingNumber: order.unloadingBuildingNumber,
      unloadingPostalZone: order.unloadingPostalZone,
      unloadingCityName: order.unloadingCityName,
      unloadingDateTime: order.unloadingDateTime,
      unloadingCountry: order.unloadingCountry,
      taxIncluded: order.taxIncluded,
      taxTotalAmount: order.taxTotalAmount,
    },
  );

  if (salesOrder.status !== 201) {
    return salesOrder;
  }
  const salesOrderType = isStandard ? 'sale' : 'return_sale';

  const salesProcessId = await addOrder(icIdSuplier, salesOrder.data, salesOrderType, buyer.name);
  await addLog(salesProcessId[0], 'create', salesOrder.data, 'order');
  await addOrderMaps(purchaseOrderId, salesOrder.data);
  console.log(`Created ${salesOrderType} order ${salesOrder.data} for company ${icIdSuplier}`);

  return salesOrder;
};

exports.getInvoices = async (companyId) => (await makeRequest('billing/invoices', 'get', companyId)).data;

exports.getCreditNotes = async (companyId) => (await makeRequest('billing/memos', 'get', companyId)).data;

exports.getDeliveries = async (companyId) => (await makeRequest('shipping/deliveries', 'get', companyId)).data;

exports.getPurchaseOrder = async (companyId, orderId) => (await makeRequest(`purchases/orders/${orderId}`, 'get', companyId)).data;

exports.getPurchaseInvoice = async (companyId, invoiceId) => (await makeRequest(`invoiceReceipt/invoices/${invoiceId}`, 'get', companyId)).data;

exports.getPurchaseFinancial = async (companyId, id) => (await makeRequest(`/accountsPayable/payments/${id}`, 'get', companyId)).data;

exports.getSalesOrder = async (companyId, orderId) => (await makeRequest(`sales/orders/${orderId}`, 'get', companyId)).data;

exports.getSalesInvoice = async (companyId, invoiceId) => (await makeRequest(`billing/invoices/${invoiceId}`, 'get', companyId)).data;

exports.getSalesDelivery = async (companyId, deliveryId) => (await makeRequest(`shipping/deliveries/${deliveryId}`, 'get', companyId)).data;

exports.getSalesFinancial = async (companyId, id) => (await makeRequest(`/accountsReceivable/receipts/${id}`, 'get', companyId)).data;

exports.getPayments = async (companyId) => (await makeRequest('accountsPayable/payments', 'get', companyId)).data;
