import React from 'react';
import usePage from 'hooks/usePage';
import Layout from 'components/common/Layout';
import { Link } from 'react-router-dom';
import './styles.scss'
const NotFound = () => {
  usePage('Not found');

  return (
    <Layout noSidebar={true}>
      <div className='notFound'>
        <div>
          :(
        </div>
        <div>
          <p>No light shines here</p>
          <p>back to <Link to={'/overview'}> mainpage </Link></p>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
