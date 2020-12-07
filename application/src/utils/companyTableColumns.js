import { Button } from "components/common/Button"
import DeleteIcon from '@material-ui/icons/Delete';

const deleteCompanyButton = (setRows) => {
    return (row, index) =>         
    <Button 
        color={'secondary'} 
        onClick={ () => {
            setRows(rows => {
                const newRows = rows.slice()
                newRows.splice(index, 1)
                return newRows
            })
            console.log(`Apaguei o cenas: ${row.description}`)
        }}>
        <DeleteIcon />
    </Button>
}

// TODO: change URL to connect with backend
const companyTableURL = "company"
const companyTableColumns = (setRows) => [
    {
        cell: deleteCompanyButton(setRows),
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