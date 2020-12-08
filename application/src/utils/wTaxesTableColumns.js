// TODO: change URL to connect with backend
const paymenTableColumns = [
    {
        name: 'Ignore',
        selector: 'ignore',
    },
    {
        name: 'Source Doc',
        selector: 'sourceDoc',
    },
    {
        name: 'Widtholding',
        selector: 'withholdingTaxCode'
    },
    {
        name: 'Taxable Amount',
        cell: (row) => `${row.taxableAmount.toFixed(2)}`
    },
    {
        name: 'Rate',
        cell: (row) => `${row.exchangeRate.toFixed(6)}`
    },
    {
        name: 'Open Amount',
        cell: (row) => `${row.openTaxableAmount.toFixed(2)}`
    },
    {
        name: 'Amount',
        cell: (row) => `${row.withholdingTaxAmount.toFixed(2)}`
    },
    {
        name: 'Beneficiary Party',
        selector: 'beneficiaryParty'
    },
]

export default paymenTableColumns;