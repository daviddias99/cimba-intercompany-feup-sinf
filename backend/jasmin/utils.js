const { getPurchaseOrder } = require('./orders');

exports.getOrdersKeyAndLines = async (orderIds, lines, icIdBuyer) => {
  // Getting Keys and lines For All orders
  const orderKeysAndLines = [];
  for (let i = 0; i < orderIds.length && i < lines.length; i += 1) {
    const docId = orderIds[i];

    if (docId == null) throw new ReferenceError(`Cannot find Sales Order to Purchase Order at Index ${i}`);

    // eslint-disable-next-line no-await-in-loop
    const orderBuyer = await getPurchaseOrder(icIdBuyer, docId);

    orderKeysAndLines.push({
      key: `${orderBuyer.documentType}.${orderBuyer.serie}.${orderBuyer.seriesNumber}`,
      line: lines[i],
    });
  }

  return orderKeysAndLines;
};

exports.filterAvailableLines = (availableLines, keysAndLines) => availableLines.filter(
  (element) => keysAndLines.some((match) => match.key === element.orderKey
                                              && match.line === element.orderLineNumber),
);
