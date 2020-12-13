import { Button } from 'components/common/Button';
import OverviewOrderStatus from 'components/common/OverviewOrderStatus';
import { Link } from 'react-router-dom';
import routes from 'routes';
import { dateTimeFormat } from './utilFuncs'

const getProperName = (type) => {
    switch (type) {
        case 'purchase':
            return 'Purchase'
        case 'sale':
            return 'Sales'
        default:
            return 'Return';
    }
}

const overviewTableColumns = [
    {
        name: 'Date',
        cell: (row) => dateTimeFormat(row.created_on)
    },
    {
        name: 'Type',
        cell: (row) => getProperName(row.type)
    },
    {
        name: 'Process',
        cell: (row) => `${getProperName(row.type)} process ${row.id}`
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