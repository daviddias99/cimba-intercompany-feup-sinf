import { Button } from "components/common/Button"
import DeleteIcon from '@material-ui/icons/Delete';

const insertItemForm = [
    {
        title: "Item Local ID",
        id: "local_id"
    },
    {
        title: "Company ID",
        id: "map_company_id"
    },
    {
        title: "Item ID (on other company)",
        id: "item_id"
    }
]

const deleteItemButton = (actionFunction) => {
    return (row, index) =>         
        <Button 
            color={'secondary'} 
            onClick={ () => actionFunction(row, index) }
        >
            <DeleteIcon />
        </Button>
}

const itemTableColumns = (actioncell) => [
    {
        cell: actioncell,
    },
    {
        name: 'Company',
        selector: 'map_company_local_id',
    },
    {
        name: 'Local ID',
        selector: 'local_id',
        sortable: true,
    },
    {
        name: 'Item ID',
        selector: 'item_id',
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
    itemTableColumns,
    deleteItemButton,
    insertItemForm
}