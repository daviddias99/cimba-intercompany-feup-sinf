import { React, useEffect, useState } from 'react';
import LoadingScreen from 'components/common/LoadingScreen';
import { Redirect } from 'react-router-dom';
import Layout from 'components/common/Layout';
import Card from 'components/common/Card';
import DataTable from 'react-data-table-component';
import companyTableColumns from 'utils/overviewTableColumn';
import api from 'services/api';

import './styles.scss';

const Overview = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [data, setData] = useState([
    {
      id: 1,
      company_id: 1,
      order_id: '099d60a4-1033-4179-8f53-98fcd3d4fdf9',
      other_company_name: 'Vem Pro Futji',
      jasmin_created_on: '2020-12-05T15:05:16.759Z',
      type: 'purchase',
      invoice_id: null,
      delivery_id: null,
      payment_id: null,
      state: 0
    },
  ]);

  useEffect(() => {
    setIsLoading(true);
    const callback = (res) => {
      if (res.status === 200) {
        setData(res.data)
        setIsLoading(false)
      }
      else {
        setRedirect(true);
        setIsLoading(false);
        return;
      }
    };

    api.getProcesses(callback);
  }, [isLoading, ]);

  return (
    <Layout title='Overview'>
      {redirect ? <Redirect to="/overview" /> : ""}
      {
        isLoading ?
          <LoadingScreen /> :
          <div className='overview-content-card'>
            <Card title='Process Overview'>
              <DataTable
                className="table-display"
                columns={companyTableColumns}
                data={data}
                highlightOnHover={true}
                noHeader={true}
                pagination={true}
              />
            </Card>
          </div>
      }
    </Layout>
  );
}


export default Overview;
