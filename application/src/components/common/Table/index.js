import React, {useMemo} from 'react';
import DataTable from 'react-data-table-component';

import './styles.scss';

const Table = ({title, columns, selecrows = false, data}) => {

    // const styles = {
    //     table: {
    //         style: {
    //             backgroundColor: "white"
    //         }
    //     }
    // }

    return (
        <DataTable
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
