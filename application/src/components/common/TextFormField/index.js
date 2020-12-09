import React, { useState } from 'react';
import Proptypes from 'prop-types';
import './styles.scss';

// TODO: refactor nisto por cause da cena dos controller components; ver erro na consola

const TextFormField = ({ title, value, valueChanged, id}) => {
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
