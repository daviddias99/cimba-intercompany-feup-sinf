import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import './styles.scss';

const Toast = ({ toastList, position = 'bottom-right' }) => {

  const [list, setList] = useState(toastList);

  useEffect(() => {
    setList(toastList);
  }, [toastList, list]);

  const deleteToast = (id) => {
    const index = list.findIndex(e => e.id === id);
    list.splice(index, 1);
    setList([...list]);
  };

  const getIconClass = (color) => {
    switch (color) {
      case 'success':
        return 'fa-check-circle';
      case 'danger':
        return 'fa-times-circle';
      case 'info':
        return 'fa-info-circle';
      case 'warning':
        return 'fa-exclamation-circle';
      default:
    }
  };

  return (
    <>
      <div className={`toast-container ${position}`}>
        {
          list.map((toast, i) => {

            setTimeout(() =>
              deleteToast(toast.id)
              , 2000);

            return (
              <div
                key={toast.id}
                className={cx('notification toast',
                  toast.color ? `is-${toast.color}` : '', {
                  'is-light': toast.light,
                })}
              >
                <button className="delete" onClick={() => deleteToast(toast.id)}></button>
                <div className="is-flex is-align-items-center mb-1">
                  <span className="icon">
                    <i className={`fas ${getIconClass(toast.color)}`}></i>
                  </span>
                  <h3 className="title is-5">
                    {toast.title}
                  </h3>
                </div>
                <p>
                  {toast.description}
                </p>
              </div>
            );
          })
        }
      </div>
    </>
  );
};

Toast.propTypes = {
  toastList: PropTypes.array.isRequired,
  position: PropTypes.string,
};

export default Toast;
