import React from 'react';
import './styles.scss';
import cx from 'classnames';
const BasicField = ({ label, value, fieldSize='small'}) => {

  return (
    <div className='itemField'>
      <span className='labelField'>{label}</span>
      <input className={cx('valueField', fieldSize)} type='text' disabled value={value === null ? "" : value}></input>
    </div>
  );
}


export default BasicField;