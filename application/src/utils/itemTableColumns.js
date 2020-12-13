import React from 'react';
import { Button } from "components/common/Button"
import DeleteIcon from '@material-ui/icons/Delete';

const insertItemForm = [
    {
        title: "Jasmin ID of the item",
        id: "jasmin_id"
    },
    {
        title: "Mapped Company IC ID",
        id: "map_ic_id"
    },
    {
        title: "Jasmin ID of the item in the mapped company",
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
        name: 'Company Jasmin ID',
        selector: 'map_company_jasmin_id',
    },
    {
        name: 'Item Jasmin ID',
        selector: 'jasmin_id',
        sortable: true,
    },
    {
        name: 'Item Jasmin ID on mapped company',
        selector: 'item_id',
    },
    {
        name: 'Item Description',
        selector: 'local_description',
        grow: 2,
        style: {
            fontWeight: "bold",
        },
    },
    {
        name: 'Mapped Item Description',
        selector: 'description',
        grow: 2,
        style: {
            fontWeight: "bold",
        },
    },
    {
        name: 'Unit',
        selector: 'local_unit',
        center: true,
    },
    {
        name: 'Mapped Unit',
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