// TODO: change URL to connect with backend
const itemTableURL = "item"
const itemTableColumns = [
    {
        name: 'Company',
        selector: 'company',
    },
    {
        name: 'Local ID',
        selector: 'localID',
        sortable: true,
    },
    {
        name: 'Item ID',
        selector: 'itemID',
    },
    {
        name: 'Description',
        selector: 'description',
        grow: 2,
        style: {
            fontWeight: "bold",
        },
    },
    {
        name: 'Warehouse',
        selector: 'warehouse',
    },
    {
        name: 'Unit',
        selector: 'unit',
        center: true,
    },
    {
        name: 'Unit Price 1',
        selector: 'unit_price_1',
        right: true,
    },
    {
        name: 'VAT Type 1',
        selector: 'vat_type_1',
        center: true,
    },
    {
        name: 'Unit Price 2',
        selector: 'unit_price_2',
        right: true,
    },
    {
        name: 'VAT Type 2',
        selector: 'vat_type_2',
        center: true,
    },
]

export {
    itemTableURL,
    itemTableColumns,
}