import React, { useState } from 'react';
import { Button, Form, Input } from 'semantic-ui-react';
import Footer from '../Footer/Footer';
import { connect, useSelector, useDispatch } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { authenticateUser } from '../../actions/userAuth';
import Loader from '../Utility Components/Loader';
//import { Link } from "react-router-dom";	//import { Link } from "react-router-dom";
import './Signup.css';
import { showLoader } from '../../actions/loader';

const divStyle = {
  height: window.screen.height,
};
var type = 'client';
const Signup = (props) => {
  const [state, setState] = useState({
    fname: '',
    lname: '',
    email: '',
    pass1: '',
    pass2: '',
    fnameErr: '',
    lnameErr: '',
    emailErr: '',
    pass1Err: '',
    pass2Err: '',
    tab: 'client'
  });

  let dispatch = useDispatch();
  const userAuth = useSelector((st) => st.userAuth);
  if(userAuth.isAuthenticated && userAuth.userLoaded){
    if(userAuth.userType === 'client')
      props.history.replace('photoUpload');
    if(userAuth.userType === 'vendor')
      props.history.replace('addSS');
  }

  const vaidate = () => {
    let fnameErr = '';
    let lnameErr = '';
    let emailErr = '';
    let pass1Err = '';
    let pass2Err = '';

    if (/^[A-Za-z]+$/.test(state.fname) === false) {
      fnameErr = '* First Name can only contain Alphabets';
    }
    if (!state.fname) {
      fnameErr = '* This field must be non-empty.';
    }
    if (/^[A-Za-z]+$/.test(state.lname) === false) {
      lnameErr = '* Last Name can only contain Alphabets';
    }
    if (!state.lname) {
      lnameErr = '* This field must be non-empty.';
    }

    if (state.email) {
      if (/^[A-Za-z0-9]\S*@\S+\.\S+$/.test(state.email) === false) {
        emailErr = '* Email must be in a valid format.';
      }
    } else {
      emailErr = '* This field must be non-empty.';
    }

    if (state.pass1) {
      if (state.pass1.length < 8) {
        pass1Err = '* Password must contain atleast 8 characters.';
      }
    } else {
      pass1Err = '* This field must be non-empty.';
    }

    if (state.pass1 !== state.pass2 || !state.pass1) {
      pass2Err = '* Pasword Mismatch';
    }
    setState({ ...state, fnameErr, lnameErr, emailErr, pass1Err, pass2Err });

    if (fnameErr || lnameErr || emailErr || pass1Err || pass2Err) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    console.log(state);
    let isvalid = vaidate();
    if (isvalid) {
      dispatch(showLoader(true));
      console.log('VALID!', props);
      let url;
      let payload = {}
      switch(type){
        case 'vendor':
          url = 'http://localhost:5000/api/vendors/';
          payload = {
            email: state.email,
            password: state.pass1,
            name: state.fname + " " + state.lname
          }
          break;
        default:
          url = 'http://localhost:5000/api/users/';
          payload = {
            email: state.email,
            password: state.pass1,
            firstname: state.fname,
            lastname: state.lname
          }
          break;
      }
      await props.authenticateUser(url, payload, state.tab);
    }
  };

  const handleChange = (evt) => {
    setState({
      ...state,
      [evt.target.name]: evt.target.value,
    });
  };

  const switchTabs = (evt) => {
    const tab = evt.target.name;
    setState({
      ...state,
      tab: tab,
    });
    type = evt.target.name;
    let c = document.getElementById('c');
    let v = document.getElementById('v');

    c.className = 'ite';
    v.className = 'ite';

    if(evt.target.name === 'client'){
      c.className+= ' accc';
    }
    else{
      v.className+= ' accc';
    }
    console.log(state.tab);
  };

  return (
    <React.Fragment>
    <Loader/>
    <Form.Field className='body' style={divStyle}>
      <Form.Field className='overlay'>
        <Form.Field className='main-form'>
          <Form onSubmit={handleSubmit} className='inside-form'>
            <h4>Welcome to Sign Up</h4>
            <div style={{ textAlign: 'center', margin: '15px 0px' }}>
              <div className='customSbar'>
                <a name='client' id="c" onClick={switchTabs} className='accc ite'>
                  Client
                </a>
                <a name='vendor' id="v" onClick={switchTabs} className='ite'>
                  Vendor
                </a>
              </div>
              {/* <div class="ui segment active tab">Tab 1 Content</div> */}
            </div>
            <Form.Field>
              <label>FirstName</label>
              <Input
                name='fname'
                onChange={handleChange}
                value={state.fname}
                placeholder='Enter FirstName'
              />
              <div className='valerr'>{state.fnameErr}</div>
            </Form.Field>
            <Form.Field>
              <label>LastName</label>
              <Input
                name='lname'
                onChange={handleChange}
                value={state.lname}
                placeholder='Enter LastName'
              />
              <div className='valerr'>{state.lnameErr}</div>
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <Input
                name='email'
                onChange={handleChange}
                value={state.email}
                placeholder='Enter Email'
              />
              <div className='valerr'>{state.emailErr}</div>
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <Input
                name='pass1'
                onChange={handleChange}
                value={state.pass1}
                type='password'
                placeholder='Enter Password'
              />
              <div className='valerr'>{state.pass1Err}</div>
            </Form.Field>
            <Form.Field>
              <label>Confirm Password</label>
              <Input
                name='pass2'
                onChange={handleChange}
                value={state.pass2}
                type='password'
                placeholder='Enter Password Again'
              />
              <div className='valerr'>{state.pass2Err}</div>
            </Form.Field>
            <Form.Field>
              <Button fluid color='blue' type='submit'>
                SignUp
              </Button>
            </Form.Field>
          </Form>
        </Form.Field>
      </Form.Field>
      <Footer />
    </Form.Field>
    </React.Fragment>
  );
};
export default connect(null, { setAlert, authenticateUser })(Signup);
