import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Layout from 'components/common/Layout';
import Table from 'components/common/Table';
import api from 'services/api';

const Bots = () => {
  const currentLogger = useSelector(state => state.global.currentLogger);

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [curPage, setCurPage] = useState(1);
  const [nRequests] = useState(20);

  const formatTimestamp = (timestamp) => {
    if (!timestamp) {
      return;
    }

    return new Date(timestamp).toLocaleString();
  };

  const parseData = (data) => {
    if (!data.bots) {
      return;
    }
    const bots = data.bots;
    const dataParsed = [];
    for (let i = 0; i < bots.length; i++) {
      dataParsed.push([
        i, bots[i].id, bots[i].ipListing.join('\n'), 'Type', bots[i].avgTimeTaken, bots[i].totalRequests,
        formatTimestamp(bots[i].firstAccess), formatTimestamp(bots[i].lastAccess), { name: bots[i].name, color: bots[i].colorLabel }
      ]);
    }
    return dataParsed;
  };

  /**
   * Fetches for log data.
   */
  const fetchBots = useCallback(() => {
    setIsLoading(true);
    setIsError(false);
    api.getBots(currentLogger, nRequests, curPage, res => {
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
      fetchBots();
    }
  }, [isLoading, fetchBots]);

  return (
    <Layout title={'Bots'}>
      {isError}
      {isLoading}
      <Table
        headerAtributes={[
          'Name', 'IP Listing', 'Type', 'Avg Time per Request (ms)', 'Total Requests',
          'First Access', 'Last Access', 'Label'
        ]}
        data={parseData(data)}
        drawIpListingPosition={2}
        drawGroupPosition={8}
        curPage={curPage}
        nPages={data.numPages}
        callBackUrl={setCurPage}
        setLoading={setIsLoading}
      />
    </Layout>
  );
};

export default Bots;
