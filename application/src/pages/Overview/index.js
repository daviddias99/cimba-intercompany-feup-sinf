import { React, useState } from 'react';

import Layout from 'components/common/Layout';
import Card from 'components/common/Card';
import DataTable from 'react-data-table-component';
import companyTableColumns from 'utils/overviewTableColumn';

import './styles.scss';

const Overview = () => {

  const [stubData, setData] = useState([
    {
      id: 0,
      date: '12/12/2020',
      processId: 'ECF-5',
      companyName: 'FEUP',
      statusCode: 0,
      status: 'Order',
      currentStep: 0,
    },
    {
      id: 1,
      date: '12/12/2020',
      processId: 'ECF-4',
      companyName: 'Vem Pro Futji',
      statusCode: 1,
      status: 'Delivery',
      currentStep: 1,
    },
    {
      id: 2,
      date: '12/12/2020',
      orderId: 'ECF-3',
      companyName: 'Vitinho LDA',
      statusCode: 2,
      status: 'Invoice',
      currentStep: 2,
    },
    {
      id: 3,
      date: '12/12/2020',
      processId: 'ECF-2',
      companyName: 'Mister Cimba',
      statusCode: 3,
      status: 'Payment',
      currentStep: 3,
    },
    {
      id: 4,
      date: '12/12/2020',
      processId: 'ECF-2',
      companyName: 'Mister Cimba',
      statusCode: 4,
      status: 'Done',
      currentStep: 4,
    },

  ]);

  return (
    <Layout title='Overview'>
      <div className='overview-content-card'>
        <Card title='Process Overview'>
          <DataTable
            className="table-display"
            columns={companyTableColumns}
            data={stubData}
            highlightOnHover={true}
            noHeader={true}
            pagination={true}
          />
        </Card>
      </div>
    </Layout>
  );
}


export default Overview;
