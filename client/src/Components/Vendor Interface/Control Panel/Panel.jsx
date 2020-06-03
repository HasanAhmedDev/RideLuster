import React from 'react';
import './Panel.css';
const Panel = (props)=>{

    
        return(
            <div className="child-nav">
                        <div className="request">
                            <div className="head ">
                            <button onClick={props.click} name="Request" className="nav-btn bottom-btn danger">INCOMING REQUEST  </button>
                                
                            </div>
                            {/* <div className="p-description">
                                <h6>WAITING TIME: <span className="green"> 25 Minutes</span></h6>
                                <p className="red">ACTION NEEDED !!!</p>
                            </div>
                            <div className="bt"></div> */}
                                                    
                        </div>
                        <div className="waiting ">
                            <div className="head ">
                                
                            <button onClick={props.click} name="Waiting" className="nav-btn bottom-btn warning">WAITING QUEUE </button> 
                            </div>
                            {/* <div className="p-description">
                                <div className="wrap">
                                    <div className="ui tiny active green progress">
                                        <div className="bar"></div>
                                    </div> 
                                    <h6>RL44 will serve in: </h6>
                                </div>
                                <span className="active-n"> 10 Minutes</span>
                                <div className="wrap">
                                    <div className="ui tiny active green progress">
                                        <div className="bar"></div>
                                    </div> 
                                    <h6>RL75 will serve in: </h6>
                                </div>
                                <span className="active-n"> 12 Minutes</span>
                           
                            </div>
                            <div className="bt"></div> */}
                                
                            
                            
                        </div>
                        <div className="a-process">
                            <div className="head ">
                            <button onClick={props.click} name="Active" className="nav-btn bottom-btn primary">ACTIVE PROCESS </button>
                            </div>
                            {/* <div className="p-description">
                            <div className="wrap">
                                    <div className="ui tiny active green progress">
                                        <div className="bar"></div>
                                    </div> 
                                    <h6>RL44 will serve in: </h6>
                                </div> 
                                <span className="active-n"> 10 Minutes</span>
                                <div className="wrap">
                                    <div className="ui tiny active green progress">
                                        <div className="bar"></div>
                                    </div> 
                                    <h6>RL44 will serve in: </h6>
                                </div> 
                                <span className="active-n"> 12 Minutes</span>
                            </div>
                            <div className="bt"></div> */}
                                
                            
                            
                        </div>
                        <div className="c-process">
                            <div className="head">
                            <button onClick={props.click} name="Completed" className="nav-btn bottom-btn success">COMPLETED PROCCESS</button>
                            </div>
                            {/* <div className="p-description">
                                <h6>RL34 Process Completed</h6>
                                <button className="nav-btn ib">Payment Received <i className="green check circle icon"></i></button>
                                <button className="nav-btn ib">Payment Pending <i className="exclamation yellow circle icon"></i></button>
                            </div>
                            <div className="bt"></div> */}
                                
                        </div>
                       
                </div>
        )
    
}
export default Panel;