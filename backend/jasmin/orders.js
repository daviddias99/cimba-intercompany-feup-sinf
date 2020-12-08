const { makeRequest } = require('./makeRequest');
const { mapLocalCompanyId, mapUniversalCompanyId } = require('../database/methods/companyMapsMethods');
const { mapLocalItemId } = require('../database/methods/itemMapsMethods');
const { getCompanyById } = require('../database/methods/companyMethods');

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

  return makeRequest(
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
};

exports.getInvoices = async (companyId) => makeRequest('billing/invoices', 'get', companyId);
