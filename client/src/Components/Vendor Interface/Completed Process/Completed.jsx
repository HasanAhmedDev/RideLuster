import React from 'react';
import './Completed.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import { getCompletedServicesSS } from '../../../actions/servicestation';
import { showLoader } from '../../../actions/loader';
const Completed = props => {
    const [state, setState] = useState({
        once: false
    })
        const {vendor} = useSelector(st => st);
        let dispatch = useDispatch();
        useEffect(()=>{
            if(vendor.ss && vendor.ssLoaded && !state.once){
                dispatch(showLoader(true));
                dispatch(getCompletedServicesSS());
                setState({
                    ...state,
                    once: true
                })
            }
           
        })
        return(
            <div className="main-waiting">
                <h3 className="ui block center header r-head 3">COMPLETED PROCESS</h3>
                <div className="body-request">
                    {vendor.completed.length === 0? 
                        <div><h3 style={{color: 'black', textAlign: 'center', margin:'30px'}}>No Completed Services</h3></div>
                    :null}
                    <div className="ui cards">

                        {vendor.completed.length ? 
                        vendor.completed.map((booking, ind)=>{
                            return  <div key={ind} className="card r-card">
                            <div className="content">
                            <img className="right floated mini ui image" alt="" src={require('../../../assets/luther-bottrill-EsBufnuK4NE-unsplash.jpg')}/>
                            <div className="header">
                            </div>
                            <div className="meta">
                                <br/>
                                {booking.contactNo}
                                <br/>
                                Request Time: {booking.createdAt}
                            </div>
                            <div className="description">
                                <h5 className="r-h5 green">{booking.serviceType}</h5>
                                <h6 className="r-h5">STATUS: <span className="green">{booking.status}</span></h6>
                                <ul className="r-ul">
                                    <li> <b>VEHICLE NAME: </b> {booking.vehicleMake}</li>
                                    <li> <b>VEHICLE TYPE: </b> {booking.vehicleType}</li>
                                    <li> <b>VEHICLE NUMBER: </b> {booking.vehicleNo}</li>
                                </ul>
                                {/* <h6>Process Time: <span className="green">15 Minutes</span></h6>
                                <h6>Completion Time: <span className="green">12:32 pm</span></h6>
                                <h6>Payment: <span className="red">Pending</span></h6> */}
                            </div>
                            </div>
                            {/* <div className="extra content">
                            <div className="ui two buttons">
                                <div className="ui basic green button">Start Process</div>
                                <div className="ui basic red button">Cancel</div>
                            </div>
                            </div> */}
                        </div>
                        }):
                        <div><h2>No Completed Services</h2></div>
                        }
                       
                        
                        
                        
                        </div>
                </div>
            </div>
        )
}
export default Completed;