import React from 'react';
import {itemTableURL, itemTableColumns, companyTableURL, companyTableColumns} from 'utils'

import Layout from 'components/common/Layout';
import Tabs from 'components/common/Tabs';
import Tab from 'components/common/Tab';
import Table from 'components/common/Table';

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

  return (
    <Layout title='Mapping'>
      <Tabs>
        <Tab label="Items" btntext="New Item Mapping" btnfunc={newItemMapping}>
          <Table 
            columns={itemTableColumns} 
            urltofetch={itemTableURL}
            selecrows={true} 
          />
        </Tab>
        <Tab label="Companies" btntext="New Company Mapping" btnfunc={newCompanyMapping}>
          <Table 
            columns={companyTableColumns} 
            urltofetch={companyTableURL}
            selecrows={true}  
          />
        </Tab>
      </Tabs>
    </Layout>
  );
}

export default Mapping;
