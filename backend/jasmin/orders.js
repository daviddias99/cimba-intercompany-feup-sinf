const { makeRequest } = require('./makeRequest');
const { mapLocalCompanyId, mapUniversalCompanyId } = require('../database/methods/companyMapsMethods');
const { mapLocalItemId } = require('../database/methods/itemMapsMethods');
const { getCompanyByKey } = require('../database/methods/companyMethods');

exports.getOrders = async (companyId) => makeRequest('purchases/orders', 'get', companyId);

exports.createSalesOrder = async (
  companyIdBuyer,
  companyIdSuplier,
  deliveryTerm,
  documentLines,
) => {
  // Getting universal id of suplier
  const companyKeySuplier = await mapLocalCompanyId(companyIdBuyer, companyIdSuplier);
  if (companyKeySuplier == null) throw new ReferenceError(`Cannot Map Suplier ${companyIdSuplier} in Buyer`);

  // Getting local id of buyer in suplier
  const localIdBuyer = await mapUniversalCompanyId(companyKeySuplier, companyIdBuyer);
  if (localIdBuyer == null) throw new ReferenceError(`Cannot Map Buyer ${companyIdBuyer} in Suplier`);

  const suplier = await getCompanyByKey(companyKeySuplier);
  if (suplier == null) throw new ReferenceError(`Cannot Find Suplier with key ${companyKeySuplier}`);

  // Translate documentLines
  let mapPromises = [];
  documentLines.forEach((element) => mapPromises.push(
    mapLocalItemId(companyIdBuyer, element.purchasesItem, companyKeySuplier),
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
      // TODO: change SINFAM
      company: 'SINFAM',
      buyerCustomerParty: localIdBuyer,
      deliveryTerm,
      documentLines: documentLinesMapped,
    },
  );
};
