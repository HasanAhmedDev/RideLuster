import React, { Component, useState } from 'react';
import { Button, Form, Input } from 'semantic-ui-react';
import  { Redirect } from 'react-router-dom'

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
  });
  const userAuth = useSelector(st => st.userAuth);
  if(userAuth.isAuthenticated)
    props.history.replace('searchResult');
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
    if (isvalid) {
      props.setAlert('Log in Successfull', 'success');
      await props.authenticateUser('http://localhost:5000/api/auth/user/', {
        email: state.email,
        password: state.password
      })
    }
  };

  const handleChange = (evt) => {
    setState({
      ...state,
      [evt.target.name]: evt.target.value,
    });
  };


    //console.log(window.screen.height);
    return (
      <div className='body' style={divStyle}>
        <div className='overlay'>
          <div className='main-form'>
            <Form onSubmit={handleSubmit} className='inside-form'>
              <h4 style={{ paddingBottom: '6%' }}>Welcome to Log in</h4>
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
// const mapStateToProps = state => {
//   return {
//     payload: state
//   };
// };
export default connect(null, { setAlert, authenticateUser })(Login);
