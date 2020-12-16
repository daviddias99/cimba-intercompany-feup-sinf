import React from 'react';
import DataTable from 'react-data-table-component';
import LoadingScreen from 'components/common/LoadingScreen';

const Table = ({title = null, loading, columns, selecrows = false, data}) => {

    return (
        <DataTable
            progressPending={loading}
            progressComponent={<LoadingScreen />}
            title={title}
            columns={columns}
            data={data}
            noHeader={title ? false : true}
            highlightOnHover={true}
            pagination={true}
            selectableRows={selecrows}
            selectableRowsHighlight={selecrows}
        />
    );
}

export default Table;
