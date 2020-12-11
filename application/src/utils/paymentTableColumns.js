// TODO: change URL to connect with backend
const paymentTableColumns = [
    {
        name: 'Source',
        selector: 'sourceDoc',
    },
    {
        name: 'Amount',
        cell: (row) => `${row.amount.amount.toFixed(2)} ${row.amount.symbol} `
    },
    {
        name: 'Open',
        cell: (row) => `${row.openAmount.amount.toFixed(2)} ${row.openAmount.symbol} `
    },
    {
        name: 'Settled',
        cell: (row) => `${row.settledAmount.amount.toFixed(2)} ${row.settledAmount.symbol} `
    },
    {
        name: 'Discount',
        cell: (row) => `${row.discount.amount.toFixed(2)} ${row.discount.symbol} `
    },
    {
        name: 'Withheld',
        cell: (row) => `${row.withholdingTaxAmount.amount.toFixed(2)} ${row.withholdingTaxAmount.symbol} `
    },
]

export default paymentTableColumns;