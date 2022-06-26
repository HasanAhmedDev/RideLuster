import React from 'react';
import Nav from '../../Utility Components/Nav';
import Footer from '../../Footer/Footer';
import './SearchDetails.css';
import Loader from '../../Utility Components/Loader';
import { showLoader } from '../../../actions/loader';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { Icon } from 'semantic-ui-react';
const SearchDetails = (props) => {
  const [state, setState] = useState({
    serviceStation: null,
    viewport: {
      latitude: null,
      longitude: null,
      width: '100vw',
      height: '100vh',
      zoom: 14,
    },
  });
  const user = useSelector((st) => st.user);
  let dispatch = useDispatch();
  
  useEffect(() => {
    if (props.location.ssID === undefined) 
      props.history.replace('searchResult');
    dispatch(showLoader(false));
    if (state.serviceStation === null && props.location.ssID !== undefined)
    setState({
      ...state,
      serviceStation: user.docs[props.location.ssID],
      viewport: {
        ...state.viewport,
        latitude: user.docs[props.location.ssID].location.coordinates[0],
        longitude: user.docs[props.location.ssID].location.coordinates[1],
      },
    });
  }, []);
  
  return (
    <React.Fragment>
      <Loader />
      {state.serviceStation !== null ? (
        <div className='details-main'>
          <Nav />
          <div className='details-body'>
            <h3 className='ui block header d-head' style={{display: 'flex', alignItems: 'center'}}>
              {state.serviceStation.name}
              {
                state.serviceStation.status === 'Open' ? <i style={{marginLeft: '15px'}} className='green small check circle icon'></i> : null
              }
            </h3>
            <img
            style={{ maxHeight: '50vh', objectFit: 'contain'}}
              className='ui fluid image'
              src={`http://localhost:5000/servicestations_photos/${state.serviceStation.photo}`}
              alt='No Image'
            />
            {/* <span>
              <div className='list-grid'>
                <div className='left-grid'>
                  <ul>
                    <li>Location: {state.serviceStation.area}</li>
                    <li>Status: {state.serviceStation.status}</li>
                    {state.serviceStation.vehicles.map((vehicle, index) => {
                      return <li key={index}>{vehicle}</li>;
                    })}
                  </ul>
                </div>
                <div className='right-grid'>
                  <ul>
                    {state.serviceStation.services.map((service, index) => {
                      return <li key={index}>{service}</li>;
                    })}
                  </ul>
                </div>
              </div>
            </span> */}
            <div style={{width: '90%', margin: '25px auto'}} className="ui segments">
              <div className="ui segment" style={{display: 'flex', alignItems: 'center'}}>
                <i className="location arrow icon"></i>
                <p className='heading'> Location: </p>
                <p className='info-text' style={{paddingLeft: '12px'}}> {state.serviceStation.area}</p>
              </div>
              <div className="ui segment" style={{display: 'flex', alignItems: 'center'}}>
                <i className="cogs icon"></i>
                <p className='heading'> Available Services</p>
              </div>
              <div className="ui segments">
                {state.serviceStation.services.map((vehicle, index) => {
                  return <div key={index} className="ui segment">
                    <p className='info-text'>{vehicle}</p>
                  </div>
                })}
              </div>
              <div className="ui segment" style={{display: 'flex', alignItems: 'center'}}>
                <i className="recycle icon"></i>
                <p className='heading'> Vehicle Types </p>
              </div>
              <div className="ui horizontal segments">
                {state.serviceStation.vehicles.map((vehicle, index) => {
                  return <div key={index} className="ui segment">
                    <p className='info-text'>{vehicle}</p>
                  </div>
                })}
              </div>
            </div>
          </div>
          <ReactMapGL
            {...state.viewport}
            mapboxApiAccessToken={
              'pk.eyJ1IjoicmlkZWx1c3RlciIsImEiOiJja2F2aWxyZjcxNWU0MnpsMnM5d2k4dDZ4In0.ntnAmiDLVjRMMxzgBbcqgg'
            }
            mapStyle='mapbox://styles/rideluster/ckavldwur4m301inslqmp33jc'
            // onViewportChange={viewport => {
            //     setState({
            //         ...state,
            //         viewport: viewport
            //     })
            // }}
          >
            <Marker
              key='1'
              latitude={state.viewport.latitude}
              longitude={state.viewport.longitude}
              draggable={null}
            >
              <div style={{ color: 'white' }}>
                <Icon name='point' size='big' />
              </div>
            </Marker>
          </ReactMapGL>
          <Footer />
        </div>
      ) : null}
    </React.Fragment>
  );
};
export default SearchDetails;
