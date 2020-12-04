import React, { useState } from 'react';

const Tabs = ({children}) => {

    // TODO: descobrir porque e que esta a fazer render duas vezes

    const [activeTab, setActiveTab] = useState(0)
    const childrenArray = React.Children.toArray(children)

    return (
        <div className="tabs">
            <ol className="tab-list">
                {
                    childrenArray.map((child, idx) => {
                        return (
                            <div key={idx} onClick={() => setActiveTab(idx)}>
                                {child.props.label ? child.props.label : `Tab ${idx}`}
                            </div> 
                        )
                    })
                }
            </ol>
            <div className="tab-content">
                {childrenArray[activeTab]}
            </div>
        </div>
    );
}


export default Tabs;
