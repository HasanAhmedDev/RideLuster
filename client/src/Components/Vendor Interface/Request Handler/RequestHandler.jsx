import React from 'react';
import './RequestHandler.css';
import { handleBookingRequest,GetUnhandledRequest } from '../../../actions/servicestation';
import { useDispatch, useSelector } from 'react-redux';
import { showLoader } from '../../../actions/loader';
import { useEffect } from 'react';
import { useState } from 'react';
import { Dropdown, Button, Modal } from 'semantic-ui-react';
import { setAlert } from '../../../actions/alert';

let socketchk = true;
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
    {
        key: '35',
        text: '35',
        value: '35',
    },
    {
        key: '40',
        text: '40',
        value: '40',
    },
    {
        key: '45',
        text: '45',
        value: '45',
    },
    {
        key: '50',
        text: '50',
        value: '50',
    },
    {
        key: '55',
        text: '55',
        value: '55',
    },
    {
        key: '60',
        text: '60',
        value: '60',
    },
  ]
let ssid = null;
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
        ssid = vendor.ss._id;
        console.log("INNER VS", ssid);
        setState({
            ...state,
            oneTimeCall: true
        })
        }
    })
    useEffect(()=>{
        if(vendor.vendorSocket && socketchk){
            vendor.vendorSocket.on('VendorNotification', res => {
                socketchk = false;
                if(res[0].id === 200){
                    dispatch(setAlert('New Booking From Client', 'success'));
                    dispatch(GetUnhandledRequest({id: ssid}));
                }
                console.log(res);
            })
            setTimeout(()=>{
                socketchk = true;
            },3000)
        }
    },[vendor.vendorSocket])
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

    React.useEffect(() => {
        console.log(vendor);
    }, [vendor])
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

    const isExpired = (booking) => {
        if(new Date(booking.date) > new Date()) {
            return false;
        }
        return true;
    }
    React.useEffect(() => {
        let estimatedstart = new Date();
        let endBookDate = new Date(estimatedstart);
        endBookDate.setMinutes(estimatedstart.getMinutes() + 60);
        console.log("DATE ====== ", endBookDate);
    })
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
                {vendor.unhandledBooking.length === 0 ?
                    <div><h3 style={{color: 'black', textAlign: 'center', margin:'30px'}}>No Incoming Request Found</h3></div>
                    : null}
                    <div className="ui cards">
                        {vendor.unhandledBooking.length !== 0 ?
                        vendor.unhandledBooking.map((booking, index)=>{
                            return <div key={index} className="card r-card">
                            <div className="content">
                            <img className="right floated mini ui image" alt="" src={require('../../../assets/men.png')}/>
                            <div className="header">
                            </div>
                            <div className="meta">
                                <b>Contact:</b> {booking.contactNo}
                                <br/>
                                
                                <b>Start Time:</b> {booking.startTime}
                            </div>
                            <div className="description">
                                <h5 className="s-types green">
                                    <ul>
                                        {
                                            booking.serviceType.map((type, ind)=> {
                                                return <li key={ind}>{type}</li>
                                            })
                                        }
                                    </ul>
                                </h5>
                                <h6 className="r-h5">STATUS: <span className="red">{isExpired(booking) ? 'Expired' : booking.status}</span></h6>
                                <ul className="r-ul">
                                    <li> <b>VEHICLE NAME: </b> {booking.vehicleMake}</li>
                                    <li> <b>VEHICLE TYPE: </b> {booking.vehicleType}</li>
                                    <li> <b>VEHICLE NUMBER: </b> {booking.vehicleNo}</li>
                                </ul>
                                
                            </div>
                            </div>
                            <div className="extra content">
                            <div className="ui two buttons">
                                {
                                    isExpired(booking) ?
                                    null : <div onClick={()=> {
                                        if(isExpired(booking)) {
                                            window.location.reload();
                                            return;
                                        }
                                        show('tiny', booking._id)
                                    }} className="ui basic green button">Approve</div>
                                }
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