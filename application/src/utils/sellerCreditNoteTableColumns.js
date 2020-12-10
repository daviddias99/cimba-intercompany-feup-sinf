// TODO: change URL to connect with backend
import {dateFormat} from 'utils/utilFuncs'
const creditNoteTableColumns = [
    {
        name: 'Item',
        selector: 'salesItem',
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
        name: 'Discount',
        // selector: 'discount1',
        cell: (row) => `${row.discount1.toFixed(2)} %`
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
        name: 'Total',
        cell: (row) => `${row.lineExtensionAmount.amount} ${row.lineExtensionAmount.symbol}`
    },
]

export default creditNoteTableColumns;