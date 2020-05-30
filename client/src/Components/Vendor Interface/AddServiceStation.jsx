import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select, Dropdown } from 'semantic-ui-react';
import Footer from '../Footer/Footer';
import { connect, useSelector } from 'react-redux';
import { addServiceStation } from '../../actions/vendor';
import './style.css'
import { Redirect } from 'react-router';

const divStyle = {
  height: window.screen.height,
};

const initialState = {
  vehicle: [],
  services: [],
  name: '',
  area: '',
  location: {
    type : 'Point',
    coordinates : []
  },
  vehicleErr: '',
  servicesErr: '',
  nameErr: '',
  areaErr: '',
  locationErr: '',
}

const vehicleOptions = [
    { key: 'bike', value: 'Bike', text: 'Bike' },
    { key: 'car', value: 'Car', text: 'Car' },
]

const serviceOptions = [
    { key: 'wash', value: 'Wash', text: 'Wash' },
    { key: 'polish', value: 'Polish', text: 'Polish' },
    { key: 'oil', value: 'Oil Change', text: 'Oil Change' },
]

const areaOptions = [
  { key: 'johar', value: 'Johar Town', text: 'Johar Town' },
  { key: 'wapda', value: 'Wapda Town', text: 'Wapda Town' },
  { key: 'faisal', value: 'Faisal Town', text: 'Faisal Town' },
]

const AddServiceStation = (props) => {
  const [state, setState] = useState(initialState);

  const userAuth = useSelector((st) => st.userAuth);
  const vendor = useSelector(st => st.vendor);
    
  useEffect(()=>{
    if((!userAuth.isAuthenticated || userAuth.userType !== 'vendor') && userAuth.userLoaded)
      props.history.replace('login');
    if(vendor.ss && userAuth.userLoaded)
      props.history.replace('photoUpload');
  })
  const validate = () => {
    let nameErr = '';
    let vehicleErr = '';
    let servicesErr = '';
    let areaErr = '';
    let locationErr = '';


    if (!state.name) {
      nameErr = '* This field must be non-empty.';
    }
    if (!state.area) {
      areaErr = '* This field must be non-empty.';
    }

    if (!state.location.coordinates.length) {
      locationErr = 'Please Set Your Location';
    } 

    if (!state.vehicle.length) {
      vehicleErr = '* This field must be non-empty.';
    } 

    if (!state.services.length) {
      servicesErr = "* This must not be empty";
    } 
    setState({ ...state, nameErr, areaErr, locationErr, vehicleErr, servicesErr });

    if (nameErr || areaErr || locationErr || vehicleErr || servicesErr) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    console.log(state);
    let isvalid = validate();
    if (isvalid) {
      let location = {
        type : 'Point',
        coordinates : [
          -72.7738706,
          41.6332836
        ]
      }
      console.log('VALID!', state);
      await props.addServiceStation('http://localhost:5000/api/auth/vendor/addservicestation', {
          vehicles: state.vehicle,
          services: state.services,
          name: state.name,
          area: state.area,
          location: location
      }, userAuth.token);
      // props.history.replace('photoUpload');
    }
  };

  const handleChange = (evt) => {
    setState({
      ...state,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleChangeDrop = (e, { value }) => {
    setState({
        ...state,
        vehicle: value
    })
    console.log(e, value);
  }
  const handleChangeDropOne = (e, { value }) => {
    setState({
        ...state,
        services: value
    })
  }
  const handleChangeDropTwo = (e, { value }) => {
    setState({
        ...state,
        area: value
    })
  }

  const getLocation = ()=>{
    navigator.geolocation.getCurrentPosition((position) => {
      let coord = [position.coords.latitude, position.coords.longitude];
        setState({
          ...state,
          location:{
            ...state.location,
            coordinates: coord
          }
        })
    })
  }
  return (
    <Form.Field className='body' style={divStyle}>
      <Form.Field className='overlay'>
        <Form.Field className='main-form'>
          <Form onSubmit={handleSubmit} className='inside-form'>
            <h4>Add Service Station</h4>
            <Form.Field>
              <label>Vehicle</label>
              <Dropdown
                    className="vehicle"
                    onChange={handleChangeDrop}
                    options={vehicleOptions}
                    placeholder='Choose Vehicle'
                    fluid multiple selection
                    value={state.vehicle}
                />              
                <div className='valerr'>{state.vehicleErr}</div>
            </Form.Field>
            <Form.Field>
              <label>Services</label>
              <Dropdown
                
                onChange={handleChangeDropOne}
                options={serviceOptions}
                placeholder='Choose Service'
                fluid multiple selection
                value={state.services}
              />                
                <div className='valerr'>{state.servicesErr}</div>
            </Form.Field>
            <Form.Field>
              <label>Name</label>
              <Input
                name='name'
                onChange={handleChange}
                value={state.name}
                placeholder='Enter Name'
              />
              <div className='valerr'>{state.nameErr}</div>
            </Form.Field>
            <Form.Field>
              <label>Area</label>
              <Dropdown
                    onChange={handleChangeDropTwo}
                    options={areaOptions}
                    placeholder='Choose Area'
                    selection
                    value={state.area}
                />  
              <div className='valerr'>{state.areaErr}</div>
            </Form.Field>
            <Form.Field>
              <label>Location</label>
              <Button onClick={getLocation} positive>Set Location</Button>
              <div className='valerr'>{state.locationErr}</div>
            </Form.Field>
            <Form.Field>
              <Button fluid color='blue' type='submit'>
                Add Service Station
              </Button>
            </Form.Field>
          </Form>
        </Form.Field>
      </Form.Field>
      <Footer />
    </Form.Field>
  );
};
export default connect(null, {addServiceStation})(AddServiceStation);
