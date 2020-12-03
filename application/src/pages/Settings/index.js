import React, { useEffect, useState, useCallback } from 'react';

import Layout from 'components/common/Layout';
import Card from 'components/common/Card';
import { Button, BtnType } from 'components/common/Button';
import TextFormField from 'components/common/TextFormField';
import './styles.scss';
import api from 'services/api';


const Settings = () => {

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getFooter = () => {
    return (
      <div className='save-settings'>
        <Button btnType='submit' type={BtnType.filled} color={'primary'}> Save Settings</Button>
      </div>
    );
  }

  const valueChanged = (id, value) =>{
    setData(prevState => ({...prevState, [id]: value}));
  }

  /**
 * Fetches current user settings
 */
  const fetchSettings = () => {
    
    api.getSettings((res) => {

      if (res.status === 200) {
        setData(res.data);
      }
      setIsLoading(false);
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Send to DB');
  }

  // fetches user settings
  useEffect(() => {
    if (isLoading) {
      fetchSettings();
    }
  }, [isLoading]);

  return (
    <Layout title='Settings'>
      <div className='settings-content-card'>
        <form onSubmit={handleSubmit}>
          <Card title='Settings' footer={getFooter()}>

            <TextFormField title={'Company Key'} value={isLoading ? '' : data.company_key} id='company_key' valueChanged={valueChanged} ></TextFormField>
            <TextFormField title={'App ID'} value={isLoading ? '' : data.app_id} id='app_id' valueChanged={valueChanged} ></TextFormField>
            <TextFormField title={'App Secret'} value={isLoading ? '' : data.app_secret} id='app_secret' valueChanged={valueChanged} ></TextFormField>
            <TextFormField title={'Tenant'} value={isLoading ? '' : data.tenant} id='tenant' valueChanged={valueChanged} ></TextFormField>
            <TextFormField title={'Organization'} value={isLoading ? '' : data.organization} id='organization' valueChanged={valueChanged} ></TextFormField>

          </Card>
        </form>
      </div>
    </Layout>
  );
}


export default Settings;
