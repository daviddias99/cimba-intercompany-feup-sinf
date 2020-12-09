import React, { useEffect, useState, useCallback } from 'react';
import { setSettings } from 'actions/userActions';
import Layout from 'components/common/Layout';
import Card from 'components/common/Card';
import { Button, BtnType } from 'components/common/Button';
import TextFormField from 'components/common/TextFormField';
import './styles.scss';
import api from 'services/api';
import Toast from 'components/common/Toast';

// theres probably a better way to do this
let numToasts = 0;

const Settings = () => {

  const [data, setData] = useState(JSON.parse(window.localStorage.getItem('CIMBA_COMPANY')));
  const [toastUp, setToastUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastList, setToastList] = useState([]);
  const userId = JSON.parse(window.localStorage.getItem('CIMBA_USER')).id;

  const getFooter = () => {
    return (
      <div className='save-settings'>
        <Button btnType='submit' type={BtnType.filled} color={'primary'} loading={loading}> Save Settings</Button>
      </div>
    );
  }

  const valueChanged = (id, value) => {
    setData(prevState => ({ ...prevState, [id]: value }));
  }

  const handleSubmit = (event) => {
    setLoading(true);
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
        setToastUp(true);
        setLoading(false);
        if (res.status === 200) {

          if (res.data.data.name !== data.name) {
            window.localStorage.setItem('CIMBA_COMPANY', JSON.stringify(res.data.data));
            valueChanged('name', res.data.data.name);

            setToastList([
              ...toastList, {
                id: numToasts++,
                title: 'Company changed',
                description: `Changed to company ${res.data.data.name}`,
                color: 'success',
              }
            ]);
          }

        }
        else {
          setToastUp(true);
          setToastList([
            ...toastList, {
              id: numToasts++,
              title: 'Wrong Credentials',
              description: 'Invalid company settings',
              color: 'danger',
            }
          ]);
        }
      });
  };


  const getErrorToast = () => {
    if (toastUp) {
      return (
        <Toast
          toastList={toastList}
          position='top-right'
        />
      );
    }
  }
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
      {getErrorToast()}
    </Layout>
  );
}


export default Settings;
