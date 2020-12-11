// TODO: change URL to connect with backend

import {dateFormat} from './utilFuncs';
const orderTableColumns = [
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
        name: 'Discount',
        // selector: 'discount1',
        cell: (row) => `${row.discount1.toFixed(2)} %`
    },
    {
        name: 'DeliveryDate',
        selector: 'deliveryDate',
        cell: (row) => {
            return dateFormat(row.deliveryDate);
        },
    },
    {
        name: 'VAT Type',
        selector: 'itemTaxSchema',
    },
    {
        name: 'Total',
        selector: 'grossValue.amount',
        cell: (row) => `${row.lineExtensionAmount.amount.toFixed(2)} ${row.lineExtensionAmount.symbol} `
    },
]

export default orderTableColumns;