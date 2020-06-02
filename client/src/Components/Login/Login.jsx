import React, { useState } from 'react';
import { Button, Form, Input } from 'semantic-ui-react';

import Footer from '../Footer/Footer';
import { connect, useSelector } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { authenticateUser } from '../../actions/userAuth';
import { showLoader } from '../../actions/loader';
import Loader from '../Utility Components/Loader';
//import { Link } from 'react-router-dom';
import './Login.css';
import { useEffect } from 'react';
const divStyle = {
  height: window.screen.height,
};

const Login = (props) => {
  const [state, setState] = useState({
    email: '',
    password: '',
    emailErr: '',
    passErr: '',
    tab: 'client',
  });
  const userAuth = useSelector((st) => st.userAuth);

  useEffect(()=>{
    if(userAuth.isAuthenticated && userAuth.userType && userAuth.userLoaded)
      props.history.replace(`${userAuth.userType === 'client' ? 'searchResult' : userAuth.userType}`);
  })
  
  const validate = () => {
    let emailErr = '';
    let passErr = '';
    if (state.email) {
      if (/^[A-Za-z0-9]\S*@\S+\.\S+$/.test(state.email) === false) {
        emailErr = '* Email must be in a valid format.';
      }
    } else {
      emailErr = '* This field must be non-empty.';
    }

    if (state.password) {
      if (state.password.length < 8) {
        passErr = '* Password must contain atleast 8 characters.';
      }
    } else {
      passErr = '* This field must be non-empty.';
    }

    setState({ ...state, emailErr, passErr });

    if (emailErr || passErr) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    let isvalid = validate();
    let url;
    let payload = {
      email: state.email,
      password: state.password,
    };
    if (isvalid) {
      props.showLoader(true);
      switch (state.tab) {
        case 'vendor':
          url = 'http://localhost:5000/api/auth/vendor';
          break;
        case 'admin':
          url = 'http://localhost:5000/api/auth/admin';
          break;
        default:
          url = 'http://localhost:5000/api/auth/user';
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
    let menu = document.getElementsByClassName('item');
    menu[0].className = 'item';
    menu[1].className = 'item';
    menu[2].className = 'item';
    document.getElementById(evt).className += ' activ ';
    setState({
      ...state,
      tab: evt,
    });
    
    console.log(state.tab);
  };

  //console.log(window.screen.height);
  return (
    <div className='body' style={divStyle}>
      <Loader/>
      <div className='overlay'>
        <div className='main-form'>
          <Form onSubmit={handleSubmit} className='inside-form'>
            <h4 style={{ paddingBottom: '6%' }}>Welcome to Log in</h4>
            <div>
              <div className="ui attached tabular menu" style={{width: 'fit-content'}}>
                <a className="activ item" id="client" onClick={() => switchTabs('client')}>
                  <i aria-hidden="true" className="client icon"></i>
                  Users
                </a>
                <a className="item" id="vendor" onClick={() => switchTabs('vendor')}>
                  Vendors
                  {/* <div className="ui label">15</div> */}
                </a>
                <a className="item" id="admin" onClick={() => switchTabs('admin')}>
                  Admin
                  {/* <div class="ui label">15</div> */}
                </a>
              </div>
              {/* <div class="ui bottom attached segment active tab"> */}
              <Form.Field style={{ paddingBottom: '6%' }}>
              <label>Email</label>
              <Input
                name='email'
                value={state.email}
                onChange={handleChange}
                placeholder='Enter Email'
              />
              <div className='valerr'>{state.emailErr}</div>
            </Form.Field>
            <Form.Field style={{ paddingBottom: '6%' }}>
              <label>Password</label>
              <Input
                name='password'
                value={state.password}
                onChange={handleChange}
                type='password'
                placeholder='Enter Password'
              />
              <div className='valerr'>{state.passErr}</div>
            </Form.Field>
            <Form.Field>
              <Button fluid color='blue' type='submit'>
                Login
              </Button>
            </Form.Field>

              {/* </div> */}
            </div>
            
          </Form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default connect(null, { setAlert, authenticateUser, showLoader })(Login);
