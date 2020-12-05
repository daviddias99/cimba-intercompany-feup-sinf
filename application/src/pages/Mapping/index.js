import React from 'react';

import Layout from 'components/common/Layout';
import Tabs from 'components/common/Tabs';
import Tab from 'components/common/Tab';
import Card from 'components/common/Card';

const Mapping = () => {

  return (
    <Layout title='Mapping'>
      <Tabs>
        <Tab label="Items" btntext="New Item Mapping" btnfunc={() => console.log("new item mapping")}>
          <Card title="Items"></Card>
        </Tab>
        <Tab label="Companies" btntext="New Company Mapping" btnfunc={() => console.log("new company mapping")}>
          <Card title="Companies"></Card>
        </Tab>
      </Tabs>
    </Layout>
  );
}

export default Mapping;
