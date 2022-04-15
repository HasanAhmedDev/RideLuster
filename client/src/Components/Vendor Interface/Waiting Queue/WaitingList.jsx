import React, { useEffect } from 'react';
import './WaitingList.css';
import { useSelector, useDispatch } from 'react-redux';
import { showLoader } from '../../../actions/loader';
import { getServiceStation, updateProcess } from '../../../actions/servicestation';
import { useState } from 'react';
const WaitingList = props => {
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
    const moveToActive = (id) => {
        dispatch(showLoader(true));
        dispatch(updateProcess({
            bookingId: id,
            status: 'Waiting'
        }))
    }
        return(
            <div className="main-waiting">
                <h3 className="ui block center header r-head 3">WAITING QUEUE</h3>
                <div className="body-request">
                    {vendor.ss.bookings.length === 0 ?
                    <div><h3 style={{color: 'black', textAlign: 'center', margin:'30px'}}>Waiting Queue is Empty</h3></div>
                    : null}
                    <div className="ui cards">

                        {vendor.ss.bookings.length ? 
                        vendor.ss.bookings.map((waiting, index)=>{
                            return <div key={index} className="card r-card">
                            <div className="content">
                            <img className="right floated mini ui image" alt="" src={require('../../../assets/men.png')}/>
                            <div className="header">
                            </div>
                            <div className="meta">
                                <b>Contact:</b> {waiting.contactNo}
                                <br/>
                                <b>Request Time:</b> {waiting.createdAt}
                            </div>
                            <div className="description">
                                <h5 className="r-h5 green">{waiting.serviceType}</h5>
                                <h6 className="r-h5">STATUS: <span className="yellow">{waiting.status}</span></h6>
                                <ul className="r-ul">
                                    <li> <b>VEHICLE NAME: </b> {waiting.vehicleMake}</li>
                                    <li> <b>VEHICLE TYPE: </b> {waiting.vehicleType}</li>
                                    <li> <b>VEHICLE NUMBER: </b> {waiting.vehicleNo}</li>
                                </ul>
                                <h6>Alloted Process Time: <span className="green">{waiting.timeForService}</span></h6>
                                <h6>Vehicle Serving Start Time: <span className="red">{new Date(waiting.estimatedStartTime).toLocaleTimeString()}</span></h6>
                            </div>
                            </div>
                            <div className="extra content">
                            <div className="ui two buttons">
                                <div onClick={() => moveToActive(waiting._id)} className="ui basic green button">Start Process</div>
                                {/* <div className="ui basic red button">Cancel</div> */}
                            </div>
                            </div>
                        </div>
                        }): 
                        <div><h2>Waiting Queue is Empty</h2></div>
                        }
                                                
                    </div>
                </div>
            </div>
        )
}
export default WaitingList;