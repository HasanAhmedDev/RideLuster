import React from 'react';
import './Panel.css';
const Panel = (props)=>{

    
    return(
        <div className="child-nav">
                    {/* <div className="request">
                        <div className="head ">
                        <button onClick={props.click} name="Request" className="nav-btn bottom-btn danger">REQUESTS  </button>
                            
                        </div>

                                                
                    </div>
                    <div className="waiting ">
                        <div className="head ">
                            
                        <button onClick={props.click} name="Waiting" className="nav-btn bottom-btn warning">WAITING QUEUE </button> 
                        </div>

                            
                        
                        
                    </div>
                    <div className="a-process">
                        <div className="head ">
                        <button onClick={props.click} name="Active" className="nav-btn bottom-btn primary">ACTIVE PROCESS </button>
                        </div>

                            
                        
                        
                    </div>
                    <div className="c-process">
                        <div className="head">
                        <button onClick={props.click} name="Completed" className="nav-btn bottom-btn success">COMPLETED</button>
                        </div>
                            
                    </div> */}

            <div className="ui four steps">
                <div onClick={() => props.click('Request')} className={` ${props.process === 'Request' ? 'active' : ' '} step`}>
                    <i className="truck icon"></i>
                    <div className="content">
                    <div className="title">Requests</div>
                    </div>
                </div>
                <div onClick={() => props.click('Waiting')} className={` ${props.process === 'Waiting' ? 'active' : ' '} step`}>
                    <i className="payment icon"></i>
                    <div className="content">
                    <div className="title">Waiting</div>
                    </div>
                </div>
                <div onClick={() => props.click('Active')} className={` ${props.process === 'Active' ? 'active' : ' '} step`}>
                    <i className="info icon"></i>
                    <div className="content">
                    <div className="title">Active</div>
                    </div>
                </div>
                <div onClick={() => props.click('Completed')} className={` ${props.process === 'Completed' ? 'active' : ' '} completed step`}>
                    <i className="truck icon"></i>
                    <div className="content">
                    <div className="title">Completed</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Panel;