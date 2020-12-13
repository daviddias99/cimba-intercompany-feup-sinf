const { makeRequest } = require('./makeRequest');
const { jasminToIcId, icToJasminId } = require('../database/methods/companyMapsMethods');
const { getCompanyById } = require('../database/methods/companyMethods');
const { getMapOfDocSalesOrder, getMapOfDocPurchaseOrder } = require('../database/methods/orderMapsMethods');
const { addDeliveryToOrder } = require('../database/methods/orderMethods');
const { getPurchaseOrder, getSalesOrder } = require('./orders');
const { addLog } = require('../database/methods/logsMethods');
const { mapLocalItemId, convertItemQuantity } = require('../database/methods/itemMapsMethods');

async function getDocumentLinesMapped(purchaseOrderIds, documentLines,
  icIdBuyer, isDefault, icIdSuplier) {
  const documentLinesMapped = [];
  for (let i = 0; i < purchaseOrderIds.length && i < documentLines.length; i += 1) {
    const elementPromise = purchaseOrderIds[i];
    const docLines = documentLines[i];

    if (elementPromise == null) throw new ReferenceError(`Cannot find Sales Order to Purchase Order at Index ${i}`);

    const orderBuyer = isDefault
      // eslint-disable-next-line no-await-in-loop
      ? await getPurchaseOrder(icIdBuyer, elementPromise)
      // eslint-disable-next-line no-await-in-loop
      : await getSalesOrder(icIdBuyer, elementPromise);
    documentLinesMapped.push({
      sourceDocLineNumber: docLines.sourceDocLine,
      // eslint-disable-next-line no-await-in-loop
      quantity: await convertItemQuantity(icIdSuplier, docLines.item, icIdBuyer, docLines.quantity),
      // eslint-disable-next-line no-await-in-loop
      item: await mapLocalItemId(icIdSuplier, docLines.item, icIdBuyer),
      sourceDocKey: `${orderBuyer.documentType}.${orderBuyer.serie}.${orderBuyer.seriesNumber}`,
    });
  }

  return documentLinesMapped;
}

exports.createGoodsReceipt = async (
  jasminIdBuyer, // party
  icIdSuplier,
  documentLines,
  isDefault,
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
  let purchaseOrderIds = [];
  documentLines.forEach((element) => {
    purchaseOrderIds.push(isDefault
      ? getMapOfDocSalesOrder(element.sourceDocId, icIdSuplier)
      : getMapOfDocPurchaseOrder(element.sourceDocId, icIdSuplier));
  });

  purchaseOrderIds = await Promise.all(purchaseOrderIds);

  const documentLinesMapped = await getDocumentLinesMapped(
    purchaseOrderIds, documentLines, icIdBuyer, isDefault, icIdSuplier,
  );

  const goodsReceipt = await makeRequest(
    `goodsReceipt/processOrders/${buyer.company_key}`,
    'post',
    buyer.id,
    {},
    documentLinesMapped,
  );

  if (goodsReceipt.status !== 201) {
    return goodsReceipt;
  }

  const buyerOrderId = new Set(purchaseOrderIds);
  buyerOrderId.forEach(
    async (sourceDocId) => {
      const orderType = isDefault ? 'purchase' : 'return_sale';
      const id = await addDeliveryToOrder(icIdBuyer, sourceDocId, goodsReceipt.data, orderType);
      await addLog(id[0], 'create', goodsReceipt.data, 'delivery');
    },
  );

  console.log(`Created goods Receipt order ${goodsReceipt.data} for company ${icIdBuyer}`);

  return goodsReceipt;
};
