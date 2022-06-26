import React from 'react';
import Nav from '../../Utility Components/Nav';
import { withRouter } from 'react-router';
import { Loader } from 'semantic-ui-react';
import Footer from '../../Footer/Footer';
import { Card } from 'semantic-ui-react'
import { getCompletedServices } from '../../../actions/user';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

const ServiceDetails = props => {
    // if(!props.location.render)
    //     props.history.replace('searchResult');
    const [bookings, setBookings] = useState([]);
    const { user, userAuth } = useSelector(st => st);
    let dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getCompletedServices());
        if(user && userAuth.user)
        user.userSocket.emit('activeServices', userAuth.user._id);
        console.log(user);
    },[])
    useEffect(()=>{
        if(user.userSocket)
        user.userSocket.on('inProcessServices', (res)=>{
            setBookings(res)
        })
    }, [user.userSocket])
    return (
        <React.Fragment>
            <Loader/>
            <Nav/>
            <div style={{width: '100%', minHeight: '85vh', padding: '30px'}}>
            {/* <h3 className='ui block header'>Service Details</h3> */}
            <div style={{width: '80%', margin: '50px auto'}}>
                {bookings.length ? 
                    <h3 className='ui block header'>Active Services</h3>
                    : null
                }
                {
                    bookings.length ? 
                    bookings.map((service, index)=>{
                        return  <div key={index} className={`ui ${service.status === 'Active'? 'primary': 'warning'} message`}>
                              <div className="header" style={{color: `${service.status === 'Active' ? 'blue': '#f0ad4e'}`}}>{service.status}</div>
                              <li> <b>Service Type:</b> {service.serviceType}</li>
                              <li> <b>Vehicle Type:</b> {service.vehicleType}</li>
                              <li> <b>Vehicle Make:</b> {service.vehicleMake}</li>
                              <li> <b>Vehicle Number:</b> {service.vehicleNo}</li>
                              <li> <b>Service Station Name:</b> {service.serviceStation.name}</li>
                              <li> <b>Area:</b> {service.serviceStation.area}</li>
                          </div>
                      })
                    :
                    null
                }
                {user.completedServices && user.completedServices.length ? 
                <h3 className='ui block header'>Completed Services</h3>
                : null
                }
                {user.completedServices && user.completedServices.length  ? 
                (
                    user.completedServices.map((service, index)=>{
                      return  <div key={index} className="ui success message">
                                <div className="header" style={{color: '#21ba45'}}>{service.status}</div>
                                <li> <b>Service Type:</b> {service.serviceType}</li>
                                <li> <b>Vehicle Type:</b> {service.vehicleType}</li>
                                <li> <b>Vehicle Make:</b> {service.vehicleMake}</li>
                                <li> <b>Vehicle Number:</b> {service.vehicleNo}</li>
                                <li> <b>Service Station Name:</b> {service.serviceStation.name}</li>
                                <li> <b>Area:</b> {service.serviceStation.area}</li>
                                <div style={{marginTop: '20px'}} className="ui fluid action input">
                                    <input type="text" placeholder="Comment here..." />
                                    <div className="ui success button">Submit</div>
                                </div>
                            </div>
                    })
                
                ) :
                !bookings.length ? ( <div style={{textAlign: 'center'}}>
                    <h2 style={{color: '#333'}}>YOU DONT HAVE ANY SERVICE YET!</h2>
                    <div className="ui animated blue button" style={{width: '50%'}} tabIndex="0">
                        <div className="visible content" >TRY IT NOW</div>                
                        <div className="hidden content" >BOOK SERVICE</div>
                    </div>
                </div>  ) : null
                }
                
            </div>
            </div>
            <Footer/>
        </React.Fragment>
        
    )
}
export default withRouter(ServiceDetails);