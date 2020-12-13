import React from 'react';
import Proptypes from 'prop-types';
import './styles.scss';

// TODO: refactor nisto por cause da cena dos controller components; ver erro na consola
const TextFormField = ({ title, value, disabled, valueChanged, id, placeholder = title}) => {
  return (
    <div className='text-form-field'>
      <p> {title} </p>
      <input type='text' disabled={disabled} placeholder={placeholder} value={value} onChange={(event) => valueChanged(id,event.target.value)} />
    </div>
  );
};

TextFormField.propTypes = {
  title: Proptypes.string,
};

export default TextFormField;
