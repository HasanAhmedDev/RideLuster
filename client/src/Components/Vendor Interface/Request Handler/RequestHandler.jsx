import React from 'react';
import './RequestHandler.css';
import { handleBookingRequest,GetUnhandledRequest } from '../../../actions/servicestation';
import { useDispatch, useSelector } from 'react-redux';
import { showLoader } from '../../../actions/loader';
import { useEffect } from 'react';
import { useState } from 'react';
const RequestHandler = props => {
    const { vendor } = useSelector(st => st);
    let dispatch = useDispatch();
    const [state, setState] = useState({
        oneTimeCall: false
    })
    useEffect(()=>{
        if(vendor.ss && !state.oneTimeCall){
        dispatch(GetUnhandledRequest({id:vendor.ss._id}));
        setState({
            ...state,
            oneTimeCall: true
        })
        }
    })
    const handleRequest = (bool, id) => {
        dispatch(showLoader(true));
        dispatch(handleBookingRequest({approved: bool, bookingId: id}))
        setState({
            ...state,
            oneTimeCall: false
        })
    }
        return(
            <div className="main-request">
                <h3 className="ui block center header r-head 3">INCOMING REQUESTS</h3>
                <div className="body-request">
                    <div className="ui cards">
                        {vendor.unhandledBooking.length ?
                        vendor.unhandledBooking.map((booking, index)=>{
                            return <div key={index} className="card r-card">
                            <div className="content">
                            <img className="right floated mini ui image" alt="" src={require('../../../assets/stas-svechnikov-zXQdgHr2KIw-unsplash.jpg')}/>
                            <div className="header">
                            </div>
                            <div className="meta">
                                
                                {booking.contactNo}
                                <br/>
                                
                                Requested At: {booking.createdAt}
                            </div>
                            <div className="description">
                                <h5 className="r-h5 green">{booking.serviceType}</h5>
                                <h6 className="r-h5">STATUS: <span className="red">{booking.status}</span></h6>
                                <ul className="r-ul">
                                    <li> <b>VEHICLE NAME: </b> {booking.vehicleMake}</li>
                                    <li> <b>VEHICLE TYPE: </b> {booking.vehicleType}</li>
                                    <li> <b>VEHICLE NUMBER: </b> {booking.vehicleNo}</li>
                                </ul>
                                {/* <select name="" id="" className="r-inp">
                                    <option value="0">Time Consumption</option>
                                    <option value="10">10 Minutes</option>
                                    <option value="15">15 Minutes</option>
                                    <option value="20">20 Minutes</option>
                                    <option value="25">25 Minutes</option>
                                    <option value="30">30 Minutes</option>
                                </select> */}
                            </div>
                            </div>
                            <div className="extra content">
                            <div className="ui two buttons">
                                <div onClick={()=> handleRequest(true, booking._id)} className="ui basic green button">Approve</div>
                                <div onClick={()=> handleRequest(false, booking._id)} className="ui basic red button">Decline</div>
                            </div>
                            </div>
                        </div>
                        })
                        :
                        <div><h2>No Request Available</h2></div>
                        }
                    </div>
                </div>
            </div>
        )

}
export default RequestHandler;