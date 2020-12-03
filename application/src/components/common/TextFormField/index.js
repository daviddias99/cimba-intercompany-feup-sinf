import React, { useState } from 'react';
import Proptypes from 'prop-types';
import './styles.scss';

const TextFormField = ({ title, value, valueChanged, id}) => {
  console.log(value)
  return (
    <div className='text-form-field'>
      <p> {title} </p>
      <input type='text' placeholder={title} value={value} onChange={(event) => valueChanged(id,event.target.value)} />
    </div>
  );
};

TextFormField.propTypes = {
  title: Proptypes.string,
};

export default TextFormField;
