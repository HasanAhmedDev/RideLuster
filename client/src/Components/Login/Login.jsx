import React, { useState } from 'react';
import { Button, Form, Input } from 'semantic-ui-react';


import Footer from '../Footer/Footer';
import { connect, useSelector } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { authenticateUser } from '../../actions/userAuth';
//import { Link } from 'react-router-dom';
import './Login.css';
const divStyle = {
  height: window.screen.height,
};



const Login = props => {
  
  const [state, setState] = useState({
      email: '',
      password: '',
      emailErr: '',
      passErr: '',
      tab: 'client'
  });
  const userAuth = useSelector(st => st.userAuth);
  if(userAuth.isAuthenticated)
    switch(userAuth.type){
      case "client":
        props.history.replace('searchResult');
        break;
      case "vendor":
        props.history.replace('vendor');
        break;
      case "admin":
        props.history.replace('admin');
        break;
      default:
        setAlert("You Need to Sign In Again", false);
        break;
    }
    
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
    console.log(state);
    let url;
    let payload = {
      email: state.email,
      password: state.password
    }
    if (isvalid) {
      await props.setAlert('Log in Successfull', 'success');
      switch(state.tab){
        case 'vendor':
          url = 'http://localhost:5000/api/auth/vendor';
          break;
        case 'admin':
          url = 'http://localhost:5000/api/auth/admin'
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
    const tab = evt.target.name;
    setState({
      ...state,
      tab: tab
    })
    console.log(state.tab);
  }

    //console.log(window.screen.height);
    return (
      <div className='body' style={divStyle}>
        <div className='overlay'>
          <div className='main-form'>
            <Form onSubmit={handleSubmit} className='inside-form'>
              <h4 style={{ paddingBottom: '6%' }}>Welcome to Log in</h4>
              <div style={{textAlign: 'center', margin:'15px 0px'}}>
                <div class="ui pointing menu" >
                  <a  name="client" onClick={switchTabs} class="item">Client</a>
                  <a  name="vendor" onClick={switchTabs} class="item">Vendor</a>
                  <a  name="admin" onClick={switchTabs} class="item">Admin</a>
                </div>
                {/* <div class="ui segment active tab">Tab 1 Content</div> */}
              </div>
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
            </Form>
          </div>
        </div>
        <Footer />
      </div>
    );
}

export default connect(null, { setAlert, authenticateUser })(Login);
