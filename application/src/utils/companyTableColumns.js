import React from 'react';
import { Button } from "components/common/Button"
import DeleteIcon from '@material-ui/icons/Delete';

const insertCompanyForm = [
    {
        title: "Company Local ID",
        id: "local_id"
    },
    {
        title: "Company ID",
        id: "map_company_id"
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
        name: 'Local ID',
        selector: 'local_id',
    },
    {
        name: 'Company ID',
        selector: 'map_company_id',
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