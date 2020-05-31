import React from 'react';
import  Nav  from '../../Utility Components/Nav';
import Footer from '../../Footer/Footer';
import './SearchDetails.css';
import Loader from '../../Utility Components/Loader';
import { showLoader } from '../../../actions/loader';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
const SearchDetails = props => {

    const [state, setState] = useState({
        serviceStation: null
    })
    const user = useSelector(st => st.user);
    let dispatch = useDispatch();
    if(!props.location.ssID)
    props.history.replace('searchResult');
    useEffect(()=>{
       
        dispatch(showLoader(false));
    })
    if(state.serviceStation === null && props.location.ssID)
            setState({
                ...state,
                serviceStation: user.docs[props.location.ssID]
            })
        return (
            <React.Fragment>
                <Loader/>
                {state.serviceStation !== null ? 
                <div className="details-main">
                <Nav/>
                <div className="details-body">
                    <h3 className="ui block header d-head">{state.serviceStation.name}</h3>
                    <img class="ui big aligned large image" src="https://onlybusinessideas.com/wp-content/uploads/2019/11/Petrol-pump-business.jpg" alt='img'/>
                    <span>
                        <div className="list-grid">
                            <div className="left-grid">
                                <ul>
                                    <li>Location: {state.serviceStation.area}</li>
                                    <li>Status: {state.serviceStation.status}</li>
                                    {state.serviceStation.vehicles.map((vehicle, index)=>{
                                        return <li key={index}>{vehicle}</li>
                                    })}
                                </ul>
                            </div>
                            <div className="right-grid">
                                <ul>
                                    {state.serviceStation.services.map((service, index)=>{
                                        return <li key={index}>{service}</li>
                                    })}
                                </ul>
                            </div>
                        </div>
                    </span>
                </div>
                <Footer/>
            </div>
                : null}
            </React.Fragment>
            )

}
export default SearchDetails;