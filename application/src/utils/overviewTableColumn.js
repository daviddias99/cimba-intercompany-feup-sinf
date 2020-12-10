import { Button } from 'components/common/Button';
import OverviewOrderStatus from 'components/common/OverviewOrderStatus';
import { Link } from 'react-router-dom';
import routes from 'routes';
import {dateTimeFormat} from './utilFuncs'

const overviewTableColumns = [
    {
        name: 'Date',
        cell: (row) => dateTimeFormat(row.created_on)
    },
    {
        name: 'Type',
        cell: (row) => `${row.type === 'purchase' ? 'Purchase' : 'Sale'}`
    },
    {
        name: 'Process',
        cell: (row) => `${row.type === 'purchase' ? 'Purchase' : 'Sales'} process ${row.id}`
    },
    {
        name: 'Company',
        selector: 'other_company_name',
    },
    {
        name: 'Status',
        cell: (row) =>
            <OverviewOrderStatus row={row} />,
    },
    {
        name: '',
        cell: (row) =>
            <Link
                to={
                    {
                        pathname: routes.process.ref(row.id),
                    }}
            >
                <Button isUppercase={false}>See details</Button>
            </Link>
        ,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true
    }

]

export default overviewTableColumns;