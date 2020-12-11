import React from 'react';
import './styles.scss';

const LargeField = ({ label, value }) => {

  return (
    <div className='largeField'>
      <span className='labelField'>{label}</span>
      <p>{value}</p>
    </div>
  );
}


export default LargeField;
