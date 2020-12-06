import React from 'react';
import {itemTableURL, itemTableColumns, companyTableURL, companyTableColumns} from 'utils'

import Layout from 'components/common/Layout';
import Tabs from 'components/common/Tabs';
import Tab from 'components/common/Tab';
import Table from 'components/common/Table';

const Mapping = () => {

  return (
    <Layout title='Mapping'>
      <Tabs>
        <Tab label="Items" btntext="New Item Mapping" btnfunc={() => console.log("new item mapping")}>
          <Table columns={itemTableColumns} urltofetch={itemTableURL} />
        </Tab>
        <Tab label="Companies" btntext="New Company Mapping" btnfunc={() => console.log("new company mapping")}>
          <Table columns={companyTableColumns} urltofetch={companyTableURL} />
        </Tab>
      </Tabs>
    </Layout>
  );
}

export default Mapping;
