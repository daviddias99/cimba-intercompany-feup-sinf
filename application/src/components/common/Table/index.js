import React, {useMemo} from 'react';
import DataTable from 'react-data-table-component';

import './styles.scss';

const Table = ({title, columns, urltofetch}) => {

    const noHeader = title ? false : true

    // Some dummy data. In reality we would fetch the data from the backend
    const data = useMemo(() => urltofetch === "item" ? 
    [
        {
            company: 50001,
            localID: 21321123,
            itemID: "31123321-1",
            description: "German Flour Type 55",
            warehouse: "213213213-1",
            unit: "UN",
            unit_price_1: "40,213€",
            vat_type_1: "CONT 23%",
            unit_price_2: null,
            vat_type_2: null,
        },
        {
            company: 50002,
            localID: 62931413,
            itemID: "31165721-1",
            description: "Chefs Puff Pastry",
            warehouse: "92334941-2",
            unit: "UN",
            unit_price_1: "55,41€",
            vat_type_1: "CONT 23%",
            unit_price_2: null,
            vat_type_2: null,
        },
        {
            company: 50001,
            localID: 21321123,
            itemID: "31123321-1",
            description: "German Flour Type 55",
            warehouse: "213213213-1",
            unit: "UN",
            unit_price_1: "40,213€",
            vat_type_1: "CONT 23%",
            unit_price_2: null,
            vat_type_2: null,
        },
        {
            company: 50002,
            localID: 62931413,
            itemID: "31165721-1",
            description: "Chefs Puff Pastry",
            warehouse: "92334941-2",
            unit: "UN",
            unit_price_1: "55,41€",
            vat_type_1: "CONT 23%",
            unit_price_2: null,
            vat_type_2: null,
        },
        {
            company: 50001,
            localID: 21321123,
            itemID: "31123321-1",
            description: "German Flour Type 55",
            warehouse: "213213213-1",
            unit: "UN",
            unit_price_1: "40,213€",
            vat_type_1: "CONT 23%",
            unit_price_2: null,
            vat_type_2: null,
        },
        {
            company: 50002,
            localID: 62931413,
            itemID: "31165721-1",
            description: "Chefs Puff Pastry",
            warehouse: "92334941-2",
            unit: "UN",
            unit_price_1: "55,41€",
            vat_type_1: "CONT 23%",
            unit_price_2: null,
            vat_type_2: null,
        },
        {
            company: 50001,
            localID: 21321123,
            itemID: "31123321-1",
            description: "German Flour Type 55",
            warehouse: "213213213-1",
            unit: "UN",
            unit_price_1: "40,213€",
            vat_type_1: "CONT 23%",
            unit_price_2: null,
            vat_type_2: null,
        },
        {
            company: 50002,
            localID: 62931413,
            itemID: "31165721-1",
            description: "Chefs Puff Pastry",
            warehouse: "92334941-2",
            unit: "UN",
            unit_price_1: "55,41€",
            vat_type_1: "CONT 23%",
            unit_price_2: null,
            vat_type_2: null,
        },
        {
            company: 50001,
            localID: 21321123,
            itemID: "31123321-1",
            description: "German Flour Type 55",
            warehouse: "213213213-1",
            unit: "UN",
            unit_price_1: "40,213€",
            vat_type_1: "CONT 23%",
            unit_price_2: null,
            vat_type_2: null,
        },
        {
            company: 50002,
            localID: 62931413,
            itemID: "31165721-1",
            description: "Chefs Puff Pastry",
            warehouse: "92334941-2",
            unit: "UN",
            unit_price_1: "55,41€",
            vat_type_1: "CONT 23%",
            unit_price_2: null,
            vat_type_2: null,
        },
        {
            company: 50001,
            localID: 21321123,
            itemID: "31123321-1",
            description: "German Flour Type 55",
            warehouse: "213213213-1",
            unit: "UN",
            unit_price_1: "40,213€",
            vat_type_1: "CONT 23%",
            unit_price_2: null,
            vat_type_2: null,
        },
        {
            company: 50002,
            localID: 62931413,
            itemID: "31165721-1",
            description: "Chefs Puff Pastry",
            warehouse: "92334941-2",
            unit: "UN",
            unit_price_1: "55,41€",
            vat_type_1: "CONT 23%",
            unit_price_2: null,
            vat_type_2: null,
        },
        {
            company: 50001,
            localID: 21321123,
            itemID: "31123321-1",
            description: "German Flour Type 55",
            warehouse: "213213213-1",
            unit: "UN",
            unit_price_1: "40,213€",
            vat_type_1: "CONT 23%",
            unit_price_2: null,
            vat_type_2: null,
        },
        {
            company: 50002,
            localID: 62931413,
            itemID: "31165721-1",
            description: "Chefs Puff Pastry",
            warehouse: "92334941-2",
            unit: "UN",
            unit_price_1: "55,41€",
            vat_type_1: "CONT 23%",
            unit_price_2: null,
            vat_type_2: null,
        },
        {
            company: 50001,
            localID: 21321123,
            itemID: "31123321-1",
            description: "German Flour Type 55",
            warehouse: "213213213-1",
            unit: "UN",
            unit_price_1: "40,213€",
            vat_type_1: "CONT 23%",
            unit_price_2: null,
            vat_type_2: null,
        },
        {
            company: 50002,
            localID: 62931413,
            itemID: "31165721-1",
            description: "Chefs Puff Pastry",
            warehouse: "92334941-2",
            unit: "UN",
            unit_price_1: "55,41€",
            vat_type_1: "CONT 23%",
            unit_price_2: null,
            vat_type_2: null,
        }
    ] 
    : 
    [
        {
            localID: 50001,
            companyID: "21321123-002",
            name: "Paniminho, Produtos de Pastelaria, LDA",
        },
        {
            localID: 50002,
            companyID: "18490289-00005",
            name: "Leopoldo Bakery Ingredients, LDA",
        },
        {
            localID: 50003,
            companyID: "176689-00006",
            name: "Sousa & Morgado, LDA",
        },
        {
            localID: 50001,
            companyID: "21321123-002",
            name: "Paniminho, Produtos de Pastelaria, LDA",
        },
        {
            localID: 50002,
            companyID: "18490289-00005",
            name: "Leopoldo Bakery Ingredients, LDA",
        },
        {
            localID: 50003,
            companyID: "176689-00006",
            name: "Sousa & Morgado, LDA",
        },
        {
            localID: 50001,
            companyID: "21321123-002",
            name: "Paniminho, Produtos de Pastelaria, LDA",
        },
        {
            localID: 50002,
            companyID: "18490289-00005",
            name: "Leopoldo Bakery Ingredients, LDA",
        },
        {
            localID: 50003,
            companyID: "176689-00006",
            name: "Sousa & Morgado, LDA",
        },
        {
            localID: 50001,
            companyID: "21321123-002",
            name: "Paniminho, Produtos de Pastelaria, LDA",
        },
        {
            localID: 50002,
            companyID: "18490289-00005",
            name: "Leopoldo Bakery Ingredients, LDA Ingredients",
        },
        {
            localID: 50003,
            companyID: "176689-00006",
            name: "Sousa & Morgado, LDA",
        },
    ], [])

    return (
        <DataTable
            className="table-display"
            title={title}
            columns={columns}
            data={data}
            highlightOnHover={true}
            noHeader={noHeader}
            pagination={true}
        />
    );
}

export default Table;
