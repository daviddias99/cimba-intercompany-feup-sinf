import {dateTimeFormat} from './utilFuncs'
import { Button } from 'components/common/Button';
import { Link } from 'react-router-dom';
import routes from 'routes';

const docTypes = {
    purchase: {
       order: 'Purchase Order',
       delivery: 'Goods Receipt',
       invoice: 'Invoice',
       payment: 'Payment' 
    },
    sale: {
       order: 'Sales Order',
       delivery: 'Delivery Note',
       invoice: 'Invoice',
       payment: 'Receipt' 
    },

}


const logsTableColumns = [
    {
        name: 'Date/Time',
        cell: (row) => dateTimeFormat(row.created_on)
    },
    {
        name: 'Log type',
        cell: (row) => `${row.log_type === 'detect' ? 'Detect' : 'Create'}`
    },
    {
        name: 'DocumentID',
        selector: 'doc_id',
        grow: 2,
    },
    {
        name: 'Doc. Type',
        cell: (row) =>{
            return docTypes[row.process_type][row.doc_type]
        },
    },
    {
        name: '',
        cell: (row) =>
            <Link
                to={
                    {
                        pathname: routes.process.ref(row.process_id),
                    }}
            >
                <Button isUppercase={false}>Go to process</Button>
            </Link>
        ,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true
    }
]

export default logsTableColumns;