import React from 'react';
import { Button } from "components/common/Button"
import DeleteIcon from '@material-ui/icons/Delete';

const insertCompanyForm = [
    {
        title: "Company Jasmin ID",
        id: "jasmin_id"
    },
    {
        title: "Company IC ID",
        id: "map_ic_id"
    },
]

const deleteCompanyButton = (actionFunction) => {
    return (row, index) =>         
        <Button 
            color={'secondary'} 
            onClick={ () => actionFunction(row, index) }
        >
            <DeleteIcon />
        </Button>
}

const companyTableColumns = (actioncell) => [
    {
      cell: actioncell,  
    },
    {
        name: 'Company Jasmin ID',
        selector: 'jasmin_id',
    },
    {
        name: 'Company IC ID',
        selector: 'map_ic_id',
    },
    {
        name: 'Name',
        selector: 'name',
        grow: 2,
        style: {
            fontWeight: 'bold',
        }
    }
]

export {
    companyTableColumns,
    deleteCompanyButton,
    insertCompanyForm
}