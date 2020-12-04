import React from 'react';

import Layout from 'components/common/Layout';
import Tabs from 'components/common/Tabs';

const Mapping = () => {

  return (
    <Layout title='Mapping'>
      <Tabs>
        <div label="Items">
          <p>CONTEUDO ITEMS</p>
        </div>
        <div label="Companies">
          <p>CONTEUDO COMPANIES</p>
        </div>
      </Tabs>
    </Layout>
  );
}

export default Mapping;
