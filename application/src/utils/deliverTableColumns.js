// TODO: change URL to connect with backend
const orderTableColumns = [
    {
        name: 'Item',
        selector: 'item',
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
        // selector: 'quantity',
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
        name: 'Total',
        // selector: 'grossValue.amount',
        cell: (row) => `${row.grossValue.amount.toFixed(2)} ${row.grossValue.symbol} `
    },
]

export default orderTableColumns;