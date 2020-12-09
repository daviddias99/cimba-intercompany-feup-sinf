import React, {useState, useEffect} from 'react';
import {itemTableURL, itemTableColumns, deleteItemButton, insertItemForm,
  companyTableURL, companyTableColumns, deleteCompanyButton, insertCompanyForm} from 'utils';

import Layout from 'components/common/Layout';
import Tabs from 'components/common/Tabs';
import Tab from 'components/common/Tab';
import Table from 'components/common/Table';
import Toast from 'components/common/Toast';
import FormModal from 'components/common/FormModal';

import 'react-responsive-modal/styles.css';

const Mapping = () => {

  const [toastInfo, setToastInfo] = useState(false)
  const [toastList, setToastList] = useState([])
  const [itemModalVisible, setItemModalVisible] = useState(false)
  const [companyModalVisible, setCompanyModalVisible] = useState(false)

  const [itemData, setItemData] = useState([])
  const [companyData, setCompanyData] = useState([])

  // TODO: fazer API call ao backend aqui, de modo a poder chamar quando se muda de tab
  const fetchItemData = () => {
    console.log("Chamada a API para ir buscar items")
    setItemData([
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
  ])}

  // TODO: fazer API call ao backend aqui, de modo a poder chamar quando se muda de tab
  const fetchCompanyData = () => {
    console.log("Chamada a API para ir buscar companies")
    setCompanyData([
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
  ])}

  const displayToasts = () => {
    if (toastInfo) {
      return (
        <Toast
          toastList={toastList}
        />
      );
    }
  }

  const addNewToast = newToastInfo => {
    setToastInfo(true)
    setToastList([
      ...toastList,
      newToastInfo
    ])
  }

  const deleteItemRow = (row, index) => {
    const newItemData = itemData.slice()
    newItemData.splice(index, 1)
    setItemData(newItemData)
    addNewToast({
        id: row.localID,
        title: 'Row Deleted',
        description: `Row "${row.description}" was deleted.`,
        color: 'info',
    })
  }

  const deleteCompanyRow = (row, index) => {
    const newCompanyData = companyData.slice()
    newCompanyData.splice(index, 1)
    setItemData(newCompanyData)
    addNewToast({
        id: row.localID,
        title: 'Row Deleted',
        description: `Row "${row.name}" was deleted.`,
        color: 'info',
    })
  }

  const insertItemAction = data => {
    console.log(data)
  }

  const insertCompanyAction = data => {
    console.log(data)
  }

  return (
    <>
      <Layout title='Mapping'>
        <Tabs>
          <Tab label="Items" switchfunc={fetchItemData} btntext="New Item Mapping" btnfunc={() => setItemModalVisible(true)}>
            <Table 
              columns={itemTableColumns(deleteItemButton(deleteItemRow))} 
              data={itemData}
              selecrows={true}
            />
          </Tab>
          <Tab label="Companies" switchfunc={fetchCompanyData} btntext="New Company Mapping" btnfunc={() => setCompanyModalVisible(true)}>
            <Table 
              columns={companyTableColumns(deleteCompanyButton(deleteCompanyRow))} 
              data={companyData}
              selecrows={true}
            />
          </Tab>
        </Tabs>
      </Layout>

      <FormModal 
        title={"Insert Item Mapping"}
        formfields={insertItemForm}
        open={itemModalVisible}
        closefunc={() => setItemModalVisible(false)}
        submitfunc={insertItemAction}
      />

      <FormModal 
        title={"Insert Company Mapping"}
        formfields={insertCompanyForm}
        open={companyModalVisible}
        closefunc={() => setCompanyModalVisible(false)}
        submitfunc={insertCompanyAction}
      />

      {displayToasts()}
    </>
  );
}

export default Mapping;
