import { React, useEffect, useState } from 'react';
import LoadingScreen from 'components/common/LoadingScreen';
import { Redirect } from 'react-router-dom';
import Layout from 'components/common/Layout';
import Card from 'components/common/Card';
import DataTable from 'react-data-table-component';
import logsTableColumns from 'utils/logsTableColumns';
import api from 'services/api';

import './styles.scss';

const Logs = () => {

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

    api.getLogs(callback);
  }, []);

  return (
    <Layout title='Logs'>
      {/* {redirect ? <Redirect to="/settings" /> : ""} */}
      {
        isLoading ?
          <LoadingScreen /> :
          <div className='overview-content-card'>
            <Card title='Logs'>
              <DataTable
                defaultSortAsc={false}
                defaultSortField='created_on'
                className="table-display"
                columns={logsTableColumns}
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


export default Logs;
