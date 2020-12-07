import { Button } from 'components/common/Button';
import OverviewOrderStatus from 'components/common/OverviewOrderStatus';
import { Link } from 'react-router-dom';
import routes from 'routes';

const overviewTableColumns = [
    {
        name: 'Date',
        selector: 'date',
    },
    {
        name: 'Process',
        selector: 'processId',
    },
    {
        name: 'Company',
        selector: 'companyName',
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
                        props: { ...row }
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