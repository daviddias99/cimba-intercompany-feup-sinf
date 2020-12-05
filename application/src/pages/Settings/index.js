import React, { useEffect, useState, useCallback } from 'react';
import { setSettings } from 'actions/userActions';
import Layout from 'components/common/Layout';
import Card from 'components/common/Card';
import { Button, BtnType } from 'components/common/Button';
import TextFormField from 'components/common/TextFormField';
import './styles.scss';
import api from 'services/api';


const Settings = () => {

  const [data, setData] = useState(JSON.parse(window.localStorage.getItem('CIMBA_COMPANY')));
  // const [isLoading, setIsLoading] = useState(true);
  const userId = JSON.parse(window.localStorage.getItem('CIMBA_USER')).id;

  const getFooter = () => {
    return (
      <div className='save-settings'>
        <Button btnType='submit' type={BtnType.filled} color={'primary'}> Save Settings</Button>
      </div>
    );
  }

  const valueChanged = (id, value) => {
    setData(prevState => ({ ...prevState, [id]: value }));
  }
  //   /**
  //  * Fetches current user settings
  //  */
  //   const fetchSettings = () => {
  //     api.getSettings(userId, (res) => {

  //       if (res.status === 200) {
  //         setData(res.data);
  //         setSettings(res.data);
  //       }
  //       setIsLoading(false);
  //     });
  //   };

  const handleSubmit = (event) => {
    event.preventDefault();
    api.setSettings(
      userId,
      {
        company_key: data.company_key,
        app_id: data.app_id,
        app_secret: data.app_secret,
        tenant: data.tenant,
        organization: data.organization,
      },
      (res) => {
        if (res.status === 200) {
          window.localStorage.setItem('CIMBA_COMPANY', JSON.stringify(res.data.data));
          console.log(res.data.data.name);
          valueChanged('name', res.data.data.name);
        }
      });
  };

  return (
    <Layout title='Settings'>
      <div className='settings-content-card'>
        <form onSubmit={handleSubmit}>
          <Card title='Settings' footer={getFooter()}>

            <TextFormField title={'Company name'} disabled={true} value={data.name} id='name' valueChanged={valueChanged} placeholder=''></TextFormField>
            <TextFormField title={'Company Key'} value={data.company_key} id='company_key' valueChanged={valueChanged} ></TextFormField>
            <TextFormField title={'App ID'} value={data.app_id} id='app_id' valueChanged={valueChanged} ></TextFormField>
            <TextFormField title={'App Secret'} value={data.app_secret} id='app_secret' valueChanged={valueChanged} ></TextFormField>
            <TextFormField title={'Tenant'} value={data.tenant} id='tenant' valueChanged={valueChanged} ></TextFormField>
            <TextFormField title={'Organization'} value={data.organization} id='organization' valueChanged={valueChanged} ></TextFormField>

          </Card>
        </form>
      </div>
    </Layout>
  );
}


export default Settings;
