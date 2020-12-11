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
  const [data, setData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const callback = (res) => {
      if (res.status === 200) {
        setData(res.data)
      }
      else {
        setRedirect(true);
      }
      setIsLoading(false)
    };

    api.getProcesses(callback);
  }, []);

  return (
    <Layout title='Overview'>
      {redirect ? <Redirect to="/settings" /> : ""}
      {
        isLoading ?
          <LoadingScreen /> :
          <div className='overview-content-card'>
            <Card title='Overview'>
              <DataTable
                defaultSortAsc={false}
                defaultSortField='created_on'
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
