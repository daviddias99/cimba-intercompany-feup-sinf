import React, {useState} from 'react';
import {Button} from 'components/common/Button';
import TextFormField from 'components/common/TextFormField';
import { Modal } from 'react-responsive-modal';

import './styles.scss';

const FormModal = ({title, formfields, open, closefunc, submitfunc}) => {

    const [data, setData] = useState({})

    const valueChanged = (id, value) => {
        setData(prevState => ({...prevState, [id]: value}));
    }

    return (
        <Modal open={open} onClose={closefunc} center>
            <div className="form-modal">
                <h1 className="form-modal-title">{title}</h1>
                {
                    formfields.map(elem => {
                        return (
                            <TextFormField
                                key={elem.id}
                                title={elem.title} 
                                value={data[elem.id]}
                                id={elem.id} 
                                valueChanged={valueChanged} 
                            />
                        )
                    })
                }
                <Button 
                    className="form-modal-button"
                    onClick={() => {
                        closefunc()
                        submitfunc(data)
                        setData({})
                    }}
                >
                    <p>Submit</p>
                </Button>
            </div>
        </Modal>
    );
}

export default FormModal;
