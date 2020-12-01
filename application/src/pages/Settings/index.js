import React from 'react';

import Layout from 'components/common/Layout';
import Card from 'components/common/Card';
import { Button, BtnType } from 'components/common/Button';
import TextFormField from 'components/common/TextFormField';
import './styles.scss';


const Settings = () => {

  const getFooter = () => {
    return (
      <div className='save-settings'>
        <Button type={BtnType.filled} color={'primary'}> Save Settings</Button>
      </div>
    );
  }

  return (
    <Layout title='Settings'>
      <div className='settings-content-card'>
        <Card title='Settings' footer={getFooter()}>
          <TextFormField title={'Company Key'}></TextFormField>
          <TextFormField title={'App ID'}></TextFormField>
          <TextFormField title={'App Secret'}></TextFormField>
          <TextFormField title={'Tenant'}></TextFormField>
          <TextFormField title={'Organization'}></TextFormField>
        </Card>
      </div>
    </Layout>
  );
}


export default Settings;
