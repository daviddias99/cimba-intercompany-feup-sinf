import React, {useState} from 'react';
import {itemTableColumns, deleteItemButton, insertItemForm, 
  companyTableColumns, deleteCompanyButton, insertCompanyForm} from 'utils';

import Layout from 'components/common/Layout';
import Tabs from 'components/common/Tabs';
import Tab from 'components/common/Tab';
import Table from 'components/common/Table';
import Toast from 'components/common/Toast';
import FormModal from 'components/common/FormModal';
import Card from 'components/common/Card';

import api from 'services/api';
import 'react-responsive-modal/styles.css';

let toastID = 1

const Mapping = () => {

  const [toastInfo, setToastInfo] = useState(false)
  const [toastList, setToastList] = useState([])
  
  const [itemModalVisible, setItemModalVisible] = useState(false)
  const [companyModalVisible, setCompanyModalVisible] = useState(false)
  
  const [itemData, setItemData] = useState([])
  const [companyData, setCompanyData] = useState([])

  const [itemDataLoading, setItemDataLoading] = useState(false)
  const [companyDataLoading, setCompanyDataLoading] = useState(false)

  const userCompany = JSON.parse(localStorage.getItem('CIMBA_COMPANY'))

  const fetchItemData = () => {
    if (userCompany && userCompany.id) {
      setItemDataLoading(true)
      api.getItemMaps(userCompany.id,
        async (res) => {
          let error_flag = false
          if (res.status === 200) {
            for(let i = 0; i < res.data.length; i++) {
              let res_map = await api.getSingleCompanyMapAsync(userCompany.id, {map_company_id: res.data[i].map_company_id})
              if (res_map.status === 200) {
                res.data[i] = {
                  ...res.data[i],
                  map_company_local_id: res_map.data.local_id,
                }
              }
              else {
                error_flag = true
                break
              }
            }
          }
          else {
            error_flag = true
          }

          if (error_flag) {
            console.log(res)
            setItemData([])
            setItemDataLoading(false)
            addNewToast({
              id: toastID++,
              title: 'ERROR',
              description: `An error ocurred when fetching data. Please try again later.`,
              color: 'danger',
            })
          }
          else {
            setItemData(res.data)
            setItemDataLoading(false)
          }
      })
    }
  }

  const fetchCompanyData = async () => {
    if (userCompany && userCompany.id) {
      setCompanyDataLoading(true)
      api.getCompanyMaps(userCompany.id,
        async (res) => {
          let error_flag = false
          if (res.status === 200) {
            for(let i = 0; i < res.data.length; i++) {
              let res_comp = await api.getCompanyAsync(res.data[i].map_company_id)
              if (res_comp.status === 200) {
                res.data[i] = {
                  ...res.data[i],
                  name: res_comp.data.name,
                }
              }
              else {
                error_flag = true
                break
              }
            }
          }
          else {
            error_flag = true
          }

          if (error_flag) {
            console.log(res)
            setCompanyData([])
            setCompanyDataLoading(false)
            addNewToast({
              id: toastID++,
              title: 'ERROR',
              description: `An error ocurred when fetching data. Please try again later.`,
              color: 'danger',
            })
          }
          else {
            setCompanyData(res.data)
            setCompanyDataLoading(false)
          }
      })
    }
  }

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
    setItemDataLoading(true)
    api.deleteItemMap(userCompany.id, row.local_id,
      (res) => {
        if (res.status === 200) {
          addNewToast({
            id: toastID++,
            title: 'Row Deleted',
            description: `The row was successfully deleted.`,
            color: 'info',
          })
        }
        else {
          addNewToast({
            id: toastID++,
            title: 'ERROR',
            description: `An error ocurred when deleting the row. Please try again later.`,
            color: 'danger',
          })
        }

        fetchItemData()
      }
    )
  }

  const deleteCompanyRow = (row, index) => {
    setCompanyDataLoading(true)
    api.deleteCompanyMap(userCompany.id, row.local_id,
      (res) => {
        if (res.status === 200) {
          addNewToast({
            id: toastID++,
            title: 'Row Deleted',
            description: `The row was successfully deleted.`,
            color: 'info',
          })
        }
        else {
          addNewToast({
            id: toastID++,
            title: 'ERROR',
            description: `An error ocurred when deleting the row. Please try again later.`,
            color: 'danger',
          })
        }

        fetchCompanyData()
      }
    )
  }

  const insertItemAction = data => {
    console.log("Chamada a API para meter item")
    const newItemData = itemData.slice()
    newItemData.unshift(data)
    setItemData(newItemData)
    addNewToast({
      id: toastID++,
      title: 'Row Inserted',
      description: `Row "${data.description}" was inserted.`,
      color: 'info',
    })
  }

  const insertCompanyAction = data => {
    console.log("Chamada a API para meter company")
    const newCompanyData = companyData.slice()
    newCompanyData.unshift(data)
    setCompanyData(newCompanyData)
    addNewToast({
      id: toastID++,
      title: 'Row Inserted',
      description: `Row "${data.name}" was inserted.`,
      color: 'info',
    })
  }

  return (
    <>
      <Layout title='Mapping'>
        <Card>
          <Tabs>
            <Tab label="Items" switchfunc={fetchItemData} btntext="New Item Mapping" btnfunc={() => setItemModalVisible(true)}>
              <Table 
                loading={itemDataLoading}
                columns={itemTableColumns(deleteItemButton(deleteItemRow))} 
                data={itemData}
                selecrows={true}
              />
            </Tab>
            <Tab label="Companies" switchfunc={fetchCompanyData} btntext="New Company Mapping" btnfunc={() => setCompanyModalVisible(true)}>
              <Table 
                loading={companyDataLoading}
                columns={companyTableColumns(deleteCompanyButton(deleteCompanyRow))} 
                data={companyData}
                selecrows={true}
              />
            </Tab>
          </Tabs>
        </Card>
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
