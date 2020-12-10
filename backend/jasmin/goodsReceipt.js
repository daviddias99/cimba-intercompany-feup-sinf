const { makeRequest } = require('./makeRequest');
const { mapLocalCompanyId, mapUniversalCompanyId } = require('../database/methods/companyMapsMethods');
const { getCompanyById } = require('../database/methods/companyMethods');
const { getMapOfDocSalesOrder } = require('../database/methods/orderMapsMethods');
const { addGoodsReceiptToOrder } = require('../database/methods/orderMethods');
const { getOrderById } = require('./orders');

exports.createGoodsReceipt = async (
  companyIdBuyer, // party
  companyIdSuplier,
  documentLines,
) => {
  // Getting universal id of buyer
  const universalIdBuyer = await mapLocalCompanyId(companyIdSuplier, companyIdBuyer);
  if (universalIdBuyer == null) throw new ReferenceError(`Cannot Map Buyer ${companyIdBuyer} in Suplier`);

  // Getting local id of suplier in buyer
  const localIdSuplier = await mapUniversalCompanyId(universalIdBuyer, companyIdSuplier);
  if (localIdSuplier == null) throw new ReferenceError(`Cannot Map Suplier ${companyIdSuplier} in Buyer`);

  const buyer = await getCompanyById(universalIdBuyer);
  if (buyer == null) throw new ReferenceError(`Cannot Find Suplier with id ${universalIdBuyer}`);

  // Translate documentLines
  let mapPromises = [];
  documentLines.forEach((element) => mapPromises.push(
    getMapOfDocSalesOrder(element.sourceDocId, companyIdSuplier),
  ));

  mapPromises = await Promise.all(mapPromises);

  const documentLinesMapped = [];
  for (let i = 0; i < mapPromises.length && i < documentLines.length; i += 1) {
    const elementPromise = mapPromises[i];
    const docLines = documentLines[i];

    if (elementPromise == null) throw new ReferenceError(`Cannot find Sales Order to Purchase Order at Index ${i}`);

    // eslint-disable-next-line no-await-in-loop
    const orderBuyer = await getOrderById(universalIdBuyer, elementPromise);

    documentLinesMapped.push({
      sourceDocLineNumber: docLines.sourceDocLine,
      quantity: docLines.quantity,
      sourceDocKey: `${orderBuyer.data.documentType}.${orderBuyer.data.serie}.${orderBuyer.data.seriesNumber}`,
    });
  }

  const goodsReceipt = await makeRequest(
    `goodsReceipt/processOrders/${buyer.company_key}`,
    'post',
    buyer.id,
    {},
    documentLinesMapped,
  );

  if (goodsReceipt.status !== 201) {
    return new Error({ status: goodsReceipt.status, data: goodsReceipt.data });
  }

  const buyerOrderId = new Set(mapPromises);
  buyerOrderId.forEach(
    (sourceDocId) => addGoodsReceiptToOrder(universalIdBuyer, sourceDocId, goodsReceipt.data),
  );

  console.log(`Created goods Receipt order ${goodsReceipt.data} for company ${universalIdBuyer}`);

  return goodsReceipt;
};
