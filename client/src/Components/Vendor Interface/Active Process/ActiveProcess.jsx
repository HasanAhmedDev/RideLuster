import React from'react';
import './ActiveProcess.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import { getServiceStation, updateProcess } from '../../../actions/servicestation'
import { showLoader } from '../../../actions/loader';
const ActiveProcess = props => {
    const [state, setState] = useState({
        once: false
    })
    const {vendor} = useSelector(st => st);
    let dispatch = useDispatch()
    useEffect(()=>{
        if(vendor.ss && !state.once){
            dispatch(getServiceStation());
            setState({
                ...state,
                once: true
            })
        }
    })
    const completeProcess = (id) => {
        dispatch(showLoader(true));
        dispatch(updateProcess({
            status: 'Active',
            bookingId: id
        }))
    }
        return (
            <div className="main-active">
                <h3 className="ui block center header r-head 3">ACTIVE PROCESS</h3>
                <div className="body-request">
                    {vendor.ss.activeProcess.length === 0 ?
                    <div><h3 style={{color: 'black', textAlign: 'center', margin:'30px'}}>No Active Processess</h3></div>
                    : null}
                    <div className="ui cards">
                        
                        {vendor.ss.activeProcess.length ?
                        vendor.ss.activeProcess.map((process,index)=>{
                            return <div key={index} className="card r-card">
                            <div className="content">
                            <img className="right floated mini ui image" alt="" src={require('../../../assets/stas-svechnikov-zXQdgHr2KIw-unsplash.jpg')}/>
                            <div className="header">
                            </div>
                            <div className="meta">
                                Faisal Town
                                <br/>
                                {process.contactNo}
                                <br/>
                                {process.createdAt}
                            </div>
                            <div className="description">
                                <h5 className="r-h5 green">{process.serviceType}</h5>
                                <h6 className="r-h5">STATUS: <span className="blue">{process.status}</span></h6>
                                <ul className="r-ul">
                                    <li> <b>VEHICLE NAME: </b> {process.vehicleMake}</li>
                                    <li> <b>VEHICLE TYPE: </b> {process.vehicleType}</li>
                                    <li> <b>VEHICLE NUMBER: </b> {process.vehicleNo}</li>
                                </ul>
                                {/* <h6>Process Complete in: <span className="yellow">10 Minutes</span></h6> */}
                            </div>
                            </div>
                            <div className="extra content">
                            <div className="ui two buttons">
                                <div onClick={() => completeProcess(process._id)} className="ui basic green button">Complete</div>
                                {/* <div className="ui basic red button">Cancel</div> */}
                            </div>
                            </div>
                        </div>
                        }): null
                        }
                        
                        
                    </div>
                    
                </div>
            </div>
        )

}
export default ActiveProcess;
