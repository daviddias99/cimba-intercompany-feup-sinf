import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Layout from 'components/common/Layout';
import Table from 'components/common/Table';
import api from 'services/api';

const Logs = () => {
  const currentLogger = useSelector(state => state.global.currentLogger);

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [curPage, setCurPage] = useState(1);
  const [nRequests] = useState(20);

  const parseData = (data) => {
    if (!data.logs) {
      return;
    }
    const logs = data.logs;
    const dataParsed = [];
    for (let i = 0; i < logs.length; i++) {
      dataParsed.push([
        i, logs[i].method, logs[i].uri, logs[i].requesterIp, logs[i].createdAt, logs[i].timeTaken,
        logs[i].location, logs[i].uaDeviceModel, logs[i].uaOsName, logs[i].uaBrowserName
      ]);
    }
    return dataParsed;
  };

  /**
   * Fetches for log data.
   */
  const fetchLogs = useCallback(() => {
    setIsLoading(true);
    setIsError(false);
    api.getLogs(currentLogger, nRequests, curPage, res => {
      setIsLoading(false);
      if (res.data.status === 200) {
        console.log('Data successfully retrieved from backend');
        setData(res.data);
      } else {
        console.log('Data unsuccessfully retrieved from backend');
        setIsError(true);
      }
    });
  }, [curPage, currentLogger, nRequests]);

  /**
   * Calls fetchLogs onload.
   */
  useEffect(() => {
    if (isLoading) {
      fetchLogs();
    }
  }, [isLoading, fetchLogs]);

  return (
    <Layout title={'Logs'}>
      {isError}
      {isLoading}
      <Table
        headerAtributes={['Method', 'URI', 'IP Address', 'Timestamp', 'Processing Time', 'Location', 'Device', 'Operating System', 'Browser']}
        drawMethodPosition={1}
        data={parseData(data)}
        curPage={curPage}
        nPages={data.numPages}
        callBackUrl={setCurPage}
        setLoading={setIsLoading}
      />
    </Layout>
  );
};

export default Logs;
