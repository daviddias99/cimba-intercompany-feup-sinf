import React, { useState } from 'react';

const Tabs = ({children}) => {

    console.log("render")

    const [activeTab, setActiveTab] = useState(0);

    // const tabComps = children.map((child, idx) => {
    //     return [
    //         child,
    //         idx !== children.length - 1 && (
    //             <div key={idx} onClick={setActiveTab(idx)}>
    //                 {child.label ? child.label : `Tab ${idx}`}
    //             </div>
    //         )
    //     ];
    // })

    // const tabComps = React.Children.toArray(children).map((child, idx) => {
    //     return (
    //         <div key={idx} onClick={setActiveTab(idx)}>
    //             {child.label ? child.label : `Tab ${idx}`}
    //         </div>
    //     )
    // })

    return (
        <div className="tabs">
            <ol className="tab-list">
                {
                    React.Children.toArray(children).forEach((child, idx) => {
                        <div key={idx} onClick={setActiveTab(idx)}>
                            {child.label ? child.label : `Tab ${idx}`}
                        </div>
                    })
                }
            </ol>
        </div>
    );
}


export default Tabs;
