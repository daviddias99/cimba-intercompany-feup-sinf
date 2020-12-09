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

// TODO: change URL to connect with backend
const companyTableURL = "company"
const companyTableColumns = (actioncell) => [
    {
      cell: actioncell,  
    },
    {
        name: 'Local ID',
        selector: 'localID',
    },
    {
        name: 'Company ID',
        selector: 'companyID',
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
    companyTableURL,
    companyTableColumns,
    deleteCompanyButton,
    insertCompanyForm
}