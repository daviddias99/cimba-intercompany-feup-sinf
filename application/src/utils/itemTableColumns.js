import React from 'react';
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
    },
    {
        title: "Item Quantity (positive number w/ max 2 decimal places)",
        id: "item_quant"
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
        name: 'Local Item Description',
        selector: 'local_description',
        grow: 2,
        style: {
            fontWeight: "bold",
        },
    },
    {
        name: 'Item Description',
        selector: 'description',
        grow: 2,
        style: {
            fontWeight: "bold",
        },
    },
    {
        name: 'Local Unit',
        selector: 'local_unit',
        center: true,
    },
    {
        name: 'Unit',
        selector: 'unit',
        center: true,
    },
    {
        name: 'Item Quant.',
        selector: 'item_quant',
        center: true,
    },
]

export {
    itemTableColumns,
    deleteItemButton,
    insertItemForm
}