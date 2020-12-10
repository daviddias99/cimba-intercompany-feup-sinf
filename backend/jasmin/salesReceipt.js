const { makeRequest } = require('./makeRequest');
const { jasminToIcId, icToJasminId } = require('../database/methods/companyMapsMethods');
const { getCompanyById } = require('../database/methods/companyMethods');
const { getMapOfDocPurchaseOrder } = require('../database/methods/orderMapsMethods');
const { addSalesReceiptToOrder, getInvoiceOfOrder } = require('../database/methods/orderMethods');

exports.createSalesReceipt = async (
  jasminIdSupplier, // party
  icIdBuyer,
  documentLines,
) => {
  // Getting intercompany id of supplier
  const icIdSupplier = await jasminToIcId(icIdBuyer, jasminIdSupplier);
  if (icIdSupplier == null) throw new ReferenceError(`Cannot Map Buyer ${jasminIdSupplier} in Buyer`);

  // Getting local id of suplier in buyer
  const jasminIdBuyer = await icToJasminId(icIdSupplier, icIdBuyer);
  if (jasminIdBuyer == null) throw new ReferenceError(`Cannot Map Suplier ${icIdBuyer} in Buyer`);

  const supplier = await getCompanyById(icIdSupplier);
  if (supplier == null) throw new ReferenceError(`Cannot Find Suplier with id ${icIdSupplier}`);

  const salesOrderIds = [];

  const promises = documentLines.map(async (line) => {
    const salesOrderId = await getMapOfDocPurchaseOrder();
    salesOrderIds.push(salesOrderId);

    const invoice = await getInvoiceOfOrder(supplier.id, salesOrderId, 'sale');

    const jasminInvoice = await makeRequest(
      `billing/invoices/${invoice.invoice_id}`,
      'get',
      supplier.id,
    );

    return { sourceDoc: jasminInvoice.naturalKey, settled: line.settledAmount.amount };
  });

  const lines = await Promise.all(promises);

  const salesReceipt = await makeRequest(
    `goodsReceipt/processOrders/${supplier.company_key}`,
    'post',
    supplier.id,
    {},
    lines,
  );

  if (salesReceipt.status !== 201) {
    return salesReceipt;
  }

  salesOrderIds.forEach(
    (id) => addSalesReceiptToOrder(icIdSupplier, id, salesReceipt.data),
  );

  console.log(`Created goods Receipt order ${salesReceipt.data} for company ${icIdSupplier}`);

  return salesReceipt;
};
