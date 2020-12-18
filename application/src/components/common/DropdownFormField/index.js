import React, { useState } from 'react';
import Select from 'react-select';

import './styles.scss';

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#00072C' : state.isFocused ? '#e6eaff' : 'white',
    }),
    menu: (provided, state) => ({
        ...provided,
        position: 'static'
    })
}

const DropdownFormField = ({title, options, valueChanged, id}) => {

    const [option, setOption] = useState({})

    return (
        <div className='dropdown-form-field'>
            <p> {title} </p>
            <Select
                styles={customStyles}
                options={options} 
                value={option}
                onChange={selectedOption => {
                    setOption(selectedOption)
                    valueChanged(id, selectedOption.value)
                }}
            />
        </div>
    );
}

export default DropdownFormField;
