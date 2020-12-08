import React from 'react';
import cx from 'classnames';
import './styles.scss';

const Subsection = ({ sectionId, title, children, flexDirection= 'row' }) => {

  return (
    <div className={cx(sectionId, 'subsec')} style={{flexDirection: flexDirection}}>
      {title ? <h1 className='subsectionHeader'>{title}</h1> : ""}
      <div className='subsectionItems'>
        {children}
      </div>
    </div>
  );
}

export default Subsection;