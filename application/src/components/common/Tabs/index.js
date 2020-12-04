import React, { useState } from 'react';
import { Button } from 'components/common/Button';

import './styles.scss';

const Tabs = ({children}) => {

    const [activeTab, setActiveTab] = useState(0)
    const childrenArray = React.Children.toArray(children)

    const tabComps = childrenArray.map((child, idx) => {
        return (
            <div key={idx} onClick={() => setActiveTab(idx)} className={idx === activeTab ? "active" : ""}>
                {child.props.label ? child.props.label : `Tab ${idx}`}
            </div> 
        )
    })

    const tabButton = childrenArray[activeTab].props.btnfunc && childrenArray[activeTab].props.btntext ?
        <div className="tab-list-button">
            <Button onClick={childrenArray[activeTab].props.btnfunc}>
                {childrenArray[activeTab].props.btntext}
            </Button>
        </div>
        : null

    return (
        <div className="tabs">
            <ol className="tab-list">
                {tabComps}
                {tabButton}
            </ol>
            <div className="tab-content">
                {childrenArray[activeTab]}
            </div>
        </div>
    );
}


export default Tabs;
