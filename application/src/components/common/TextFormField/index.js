import React, { useState } from 'react';
import Proptypes from 'prop-types';
import './styles.scss';

const TextFormField = ({ title }) => {

  const [value, setValue] = useState('');

  return (
    <div className='text-form-field'>
      <p> {title} </p>
      <input type='text' placeholder={title} value={value} onChange={(event) => setValue(event.target.value)} />

    </div>
  );
};

TextFormField.propTypes = {
  title: Proptypes.string,
};

export default TextFormField;
