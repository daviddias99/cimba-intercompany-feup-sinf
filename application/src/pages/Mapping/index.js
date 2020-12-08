import React, {useState} from 'react';
import {itemTableURL, itemTableColumns, companyTableURL, companyTableColumns} from 'utils'

import Layout from 'components/common/Layout';
import Tabs from 'components/common/Tabs';
import Tab from 'components/common/Tab';
import Table from 'components/common/Table';
import Toast from 'components/common/Toast';

// TODO: depois ver para onde é que a funcao poderia ficar
const newItemMapping = () => {
  // TODO: abrir modal, receber input e fazer ação
  console.log("new item mapping")
}

const newCompanyMapping = () => {
  // TODO: abrir modal, receber input e fazer ação
  console.log("new company mapping")
}

const Mapping = () => {

  const [deleted, setDeleted] = useState(false)
  const [toastList, setToastList] = useState([])

  const getToast = () => {
    if (deleted) {
      return (
        <Toast
          toastList={toastList}
        />
      );
    }
  }

  const informDelete = newInform => {
    setDeleted(true)
    setToastList([
      ...toastList,
      newInform
    ])
  }

  return (
    <>
      <Layout title='Mapping'>
        <Tabs>
          <Tab label="Items" btntext="New Item Mapping" btnfunc={newItemMapping}>
            <Table 
              columns={itemTableColumns} 
              urltofetch={itemTableURL}
              selecrows={true}
              actionfunc={informDelete}
            />
          </Tab>
          <Tab label="Companies" btntext="New Company Mapping" btnfunc={newCompanyMapping}>
            <Table 
              columns={companyTableColumns} 
              urltofetch={companyTableURL}
              selecrows={true}
              actionfunc={informDelete}
            />
          </Tab>
        </Tabs>
      </Layout>
      {getToast()}
    </>
  );
}

export default Mapping;
