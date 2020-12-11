import React from 'react';
import DataTable from 'react-data-table-component';
import LoadingScreen from 'components/common/LoadingScreen';

import './styles.scss';

const Table = ({title, loading, columns, selecrows = false, data}) => {

    return (
        <DataTable
            progressPending={loading}
            progressComponent={<LoadingScreen />}
            className="table-display"
            title={title}
            columns={columns}
            data={data}
            highlightOnHover={true}
            pagination={true}
            selectableRows={selecrows}
            selectableRowsHighlight={selecrows}
        />
    );
}

export default Table;
