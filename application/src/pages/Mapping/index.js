import React from 'react';

import Layout from 'components/common/Layout';
import Tabs from 'components/common/Tabs';

const Mapping = () => {

  return (
    <Layout title='Mapping'>
      <Tabs>
        <div label="Companies">
          <p>CONTEUDO 0</p>
        </div>
        <div label="Companies1">
          <p>CONTEUDO 1</p>
        </div>
        <div label="Companies2">
          <p>CONTEUDO 2</p>
        </div>
        <div label="Companies3">
          <p>CONTEUDO 3</p>
        </div>
        <div><p>CONTEUDO 4</p></div>
        <div label="Companies5"><p>CONTEUDO 5</p></div>
      </Tabs>
    </Layout>
  );
}

export default Mapping;
