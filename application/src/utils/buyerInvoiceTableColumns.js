// TODO: change URL to connect with backend
import {dateFormat} from 'utils/utilFuncs'
const invoiceTableColumns = [
    {
        name: 'Item',
        selector: 'purchasesItem',
    },
    {
        name: 'Description',
        selector: 'description',
        grow: 3,
    },
    {
        name: 'Warehouse',
        selector: 'warehouse',
    },
    {
        name: 'Quantity',
        cell: (row) => row.quantity.toFixed(row.quantityDecimalPlaces)
    },
    {
        name: 'Unit',
        selector: 'unit',
    },
    {
        name: 'Unit price',
        // selector: 'unitPrice.amount',
        cell: (row) => `${row.unitPrice.amount.toFixed(2)} ${row.unitPrice.symbol} `
    },
    {
        name: 'VAT Type',
        selector: 'itemTaxSchema',
    },
    {
        name: 'WHT',
        selector: 'itemWithholdingTaxSchema',
    },
    {
        name: 'Delivery Date',
        cell: (row) => dateFormat(row.deliveryDate)
    },
]

export default invoiceTableColumns;