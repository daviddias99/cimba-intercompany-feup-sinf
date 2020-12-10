import { Button } from "components/common/Button"
import DeleteIcon from '@material-ui/icons/Delete';

const insertCompanyForm = [
    {
        title: "Local ID",
        id: "localID"
    },
    {
        title: "Company ID",
        id: "companyID"
    },
    {
        title: "Name",
        id: "name"
    }
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