import { Button } from "components/common/Button"
import DeleteIcon from '@material-ui/icons/Delete';

const deleteCompanyButton = (setRows, actionFunction) => {
    return (row, index) =>         
    <Button 
        color={'secondary'} 
        onClick={ () => {
            setRows(rows => {
                const newRows = rows.slice()
                newRows.splice(index, 1)
                return newRows
            })
            actionFunction({
                id: row.localID,
                title: 'Row Deleted',
                description: `Row "${row.description}" was deleted.`,
                color: 'info',
            })
        }}>
        <DeleteIcon />
    </Button>
}

// TODO: change URL to connect with backend
const companyTableURL = "company"
const companyTableColumns = (setRows, actionFunction) => [
    {
        cell: deleteCompanyButton(setRows, actionFunction),
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
}