import React from 'react';
import './Panel.css';
const Panel = (props)=>{

    
        return(
            <div className="child-nav">
                        <div className="request">
                            <div className="head danger">
                                <h5>INCOMING REQUESTS</h5>
                                <p>3</p>
                            </div>
                            <div className="p-description">
                                <h6>WAITING TIME: <span className="green"> 25 Minutes</span></h6>
                                <p className="red">ACTION NEEDED !!!</p>
                            </div>
                            <div className="bt"></div>
                            <button onClick={props.click} name="Request" className="nav-btn bottom-btn danger">Manage</button> 
                            
                                                       
                        </div>
                        <div className="waiting ">
                            <div className="head warning">
                                
                                <h5>WAITING QUEUE</h5>
                                <p>2</p>
                            </div>
                            <div className="p-description">
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
                            <div className="bt"></div>
                                <button onClick={props.click} name="Waiting" className="nav-btn bottom-btn warning">Update</button> 
                            
                            
                        </div>
                        <div className="a-process">
                            <div className="head primary">
                                <h5>ACTIVE PROCESSES</h5>
                                <p>2</p>
                            </div>
                            <div className="p-description">
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
                            <div className="bt"></div>
                                <button onClick={props.click} name="Active" className="nav-btn bottom-btn primary">Update</button>
                            
                            
                        </div>
                        <div className="c-process">
                            <div className="head success">
                                <h5>COMPLETED PROCESSES</h5>
                                <p>1</p>
                            </div>
                            <div className="p-description">
                                <h6>RL34 Process Completed</h6>
                                <button className="nav-btn ib">Payment Received <i className="green check circle icon"></i></button>
                                <button className="nav-btn ib">Payment Pending <i className="exclamation yellow circle icon"></i></button>
                            </div>
                            <div className="bt"></div>
                                <button onClick={props.click} name="Completed" className="nav-btn bottom-btn success">View</button>
                        </div>
                       
                </div>
        )
    
}
export default Panel;