import React from 'react';
import './styles.scss';

const Subsection = ({ sectionId, title, children, flexDirection= 'row' }) => {

  return (
    <div className={sectionId} style={{flexDirection: flexDirection}}>
      {title ? <h1 className='subsectionHeader'>{title}</h1> : ""}
      <div className='subsectionItems'>
        {children}
      </div>
    </div>
  );
}

export default Subsection;