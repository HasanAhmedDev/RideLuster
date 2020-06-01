import React from 'react';
import Nav from '../../Utility Components/Nav';
import { withRouter } from 'react-router';
import { Loader } from 'semantic-ui-react';
import Footer from '../../Footer/Footer';
import { Card } from 'semantic-ui-react'
import { getCompletedServices } from '../../../actions/user';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ServiceDetails = props => {
    // if(!props.location.render)
    //     props.history.replace('searchResult');
    const { user } = useSelector(st => st);
    let dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getCompletedServices());
    },[])
    return (
        <React.Fragment>
            <Loader/>
            <Nav/>
            <div style={{width: '100%', minHeight: '85vh', padding: '30px'}}>
            <h3 className='ui block header'>Service Details</h3>
            <div style={{width: '80%', margin: '50px auto'}}>
                {user.completedServices ? 
                (
                    user.completedServices.map((service, index)=>{
                      return  <div key={index} class="ui success message">
                            <div class="header" style={{color: '#21ba45'}}>{service.status}</div>
                            <li> <b>Service Type:</b> {service.serviceType}</li>
                            <li> <b>Vehicle Type:</b> {service.vehicleType}</li>
                            <li> <b>Vehicle Make:</b> {service.vehicleMake}</li>
                            <li> <b>Vehicle Number:</b> {service.vehicleNo}</li>
                        </div>
                    })
                
                ) :
                ( <div style={{textAlign: 'center'}}>
                    <h2 style={{color: '#333'}}>YOU DONT HAVE ANY SERVICE YET!</h2>
                    <div className="ui animated blue button" style={{width: '50%'}} tabIndex="0">
                        <div className="visible content" >TRY IT NOW</div>                
                        <div className="hidden content" >BOOK SERVICE</div>
                    </div>
                </div>  )
                }
                
            </div>
            </div>
            <Footer/>
        </React.Fragment>
        
    )
}
export default withRouter(ServiceDetails);