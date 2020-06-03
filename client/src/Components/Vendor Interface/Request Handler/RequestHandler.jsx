import React from 'react';
import './RequestHandler.css';
import { handleBookingRequest,GetUnhandledRequest } from '../../../actions/servicestation';
import { useDispatch, useSelector } from 'react-redux';
import { showLoader } from '../../../actions/loader';
import { useEffect } from 'react';
import { useState } from 'react';
import { Dropdown, Button, Modal } from 'semantic-ui-react';

const timeOptions = [
    {
      key: '10',
      text: '10',
      value: '10',
    },
    {
      key: '15',
      text: '15',
      value: '15',
    },
    {
      key: '20',
      text: '20',
      value: '20',
    },
    {
        key: '25',
        text: '25',
        value: '25',
      },
      {
        key: '30',
        text: '30',
        value: '30',
      },
  ]

const RequestHandler = props => {
    const { vendor } = useSelector(st => st);
    let dispatch = useDispatch();
    const [state, setState] = useState({
        oneTimeCall: false,
        time: null,
        size: 'tiny',
        open: false,
        id: null
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
    const handleRequest = (bool, id = null) => {
        close();
        if( bool === true && state.time === null)
        return alert("Please Select Time Consumption");
        dispatch(showLoader(true));
        if(bool === false)
        return dispatch(handleBookingRequest({approved: bool, bookingId: id, timeForService: 0, id: vendor.ss._id}))
        if (bool === true && state.time !== null){
            return dispatch(handleBookingRequest({approved: bool, bookingId: state.id, timeForService: state.time, id: vendor.ss._id}))
        }
    }
    const selectTime = (e, {value}) => {
        console.log(value);
        setState({
            ...state,
            time: value
        })
    }
    const show = (size,  id) => {
        setState({...state, size, open: true, id:id })
    }
    const close = () => setState({...state, open: false })
        return(
            <React.Fragment>
                <Modal style={{margin: 'auto !important'}} size={state.size} open={state.open} onClose={close}>
                    <Modal.Header>Please Select Time Consumption</Modal.Header>
                    <Modal.Content>
                        <Dropdown
                                    placeholder='Select Time Consumption'
                                    fluid
                                    selection
                                    onChange={selectTime}
                                    options={timeOptions}
                                />
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={close} negative>cancel</Button>
                        <Button
                        positive
                        icon='checkmark'
                        labelPosition='right'
                        content='Confirm'
                        onClick={() => handleRequest(true)}
                        />
                    </Modal.Actions>
                </Modal>
            <div className="main-request">
                <h3 className="ui block center header r-head 3">INCOMING REQUESTS</h3>
                <div className="body-request">
                    <div className="ui cards">
                        {vendor.unhandledBooking.length !== 0 ?
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
                                
                            </div>
                            </div>
                            <div className="extra content">
                            <div className="ui two buttons">
                                <div onClick={()=> show('tiny', booking._id)} className="ui basic green button">Approve</div>
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
            </React.Fragment>

        )

}
export default RequestHandler;