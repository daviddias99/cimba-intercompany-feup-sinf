const { makeRequest } = require('./makeRequest');
const { jasminToIcId, icToJasminId } = require('../database/methods/companyMapsMethods');
const { getCompanyById } = require('../database/methods/companyMethods');
const { getMapOfDocSalesOrder } = require('../database/methods/orderMapsMethods');
const { addGoodsReceiptToOrder } = require('../database/methods/orderMethods');
const { getOrderById } = require('./orders');

exports.createGoodsReceipt = async (
  jasminIdBuyer, // party
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

  // Translate documentLines
  let mapPromises = [];
  documentLines.forEach((element) => mapPromises.push(
    getMapOfDocSalesOrder(element.sourceDocId, icIdSuplier),
  ));

  mapPromises = await Promise.all(mapPromises);

  const documentLinesMapped = [];
  for (let i = 0; i < mapPromises.length && i < documentLines.length; i += 1) {
    const elementPromise = mapPromises[i];
    const docLines = documentLines[i];

    if (elementPromise == null) throw new ReferenceError(`Cannot find Sales Order to Purchase Order at Index ${i}`);

    // eslint-disable-next-line no-await-in-loop
    const orderBuyer = await getOrderById(icIdBuyer, elementPromise);

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
    (sourceDocId) => addGoodsReceiptToOrder(icIdBuyer, sourceDocId, goodsReceipt.data),
  );

  console.log(`Created goods Receipt order ${goodsReceipt.data} for company ${icIdBuyer}`);

  return goodsReceipt;
};
