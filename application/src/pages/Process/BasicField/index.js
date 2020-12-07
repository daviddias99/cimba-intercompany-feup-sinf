import React from 'react';
import './styles.scss';

const BasicField = ({ label, value}) => {

  return (
    <div className="itemField">
      <span className='labelField'>{label}</span>
      <input className='valueField' type='text' disabled value={value}></input>
    </div>
  );
}


export default BasicField;