const { makeRequest } = require('./makeRequest');
const { mapLocalCompanyId, mapUniversalCompanyId } = require('../database/methods/companyMapsMethods');
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

  // Getting local id of buyer in suplier
  const localIdBuyer = await mapUniversalCompanyId(companyKeySuplier, companyIdBuyer);

  const suplier = await getCompanyByKey(companyKeySuplier);

  // TODO: transalte documentLines

  const res = await makeRequest(
    'sales/orders',
    'post',
    suplier.id,
    {},
    {
      // TODO: change SINFAM
      company: 'SINFAM',
      buyerCustomerParty: localIdBuyer,
      deliveryTerm,
      documentLines,
    },
  );

  return res;
};
