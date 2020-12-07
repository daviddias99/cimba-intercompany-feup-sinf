// TODO: change URL to connect with backend
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
        selector: 'quantity',
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
            const date = new Date(row.deliveryDate);
            const dateStr = date.getUTCDay() + "/" + (date.getUTCMonth() + 1) + "/" + date.getUTCFullYear();
            return dateStr;
        },
    },
    {
        name: 'VAT Type',
        selector: 'itemTaxSchema',
    },
    {
        name: 'Total',
        selector: 'grossValue.amount',
        cell: (row) => `${row.grossValue.amount.toFixed(2)} ${row.grossValue.symbol} `
    },
]

export default orderTableColumns;