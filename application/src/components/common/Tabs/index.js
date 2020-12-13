import React, { useEffect, useState } from 'react';
import { Button } from 'components/common/Button';
import Tab from 'components/common/Tab';

import './styles.scss';

const Tabs = ({children}) => {

    const [activeTab, setActiveTab] = useState(0)
    const childrenArray = React.Children.toArray(children)

    const activeChild = childrenArray[activeTab]

    // change tab and call tab switch function
    const changeTab = idx => {
        setActiveTab(idx)
        if (childrenArray[idx].props.switchfunc) {
            childrenArray[idx].props.switchfunc();
        }
    }

    useEffect(() => changeTab(activeTab), [])

    const tabComps = childrenArray.map((child, idx) => {
        return child.type === Tab ? 
        (
            <div key={idx} onClick={() => changeTab(idx)} className={idx === activeTab ? "active tab-list-elem" : "tab-list-elem"}>
                {child.props.label ? child.props.label : `Tab ${idx}`}
            </div> 
        )
        : ""
    })

    const tabButton = activeChild.type === Tab && activeChild.props.btnfunc && activeChild.props.btntext ?
        <div className="tab-list-button">
            <Button onClick={activeChild.props.btnfunc}>
                {activeChild.props.btntext}
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
                {activeChild}
            </div>
        </div>
    );
}


export default Tabs;
