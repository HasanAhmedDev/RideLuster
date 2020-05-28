import React, { Component } from 'react';
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

const initialState = {
  email: '',
  password: '',
  emailErr: '',
  passErr: '',
};

const Login = props => {
  // state = initialState;
  const reduxState = useSelector(state => state);
  console.log(reduxState);
  // validate = () => {
  //   let emailErr = '';
  //   let passErr = '';
  //   if (this.state.email) {
  //     if (/^[A-Za-z0-9]\S*@\S+\.\S+$/.test(this.state.email) === false) {
  //       emailErr = '* Email must be in a valid format.';
  //     }
  //   } else {
  //     emailErr = '* This field must be non-empty.';
  //   }

  //   this.setState({ emailErr });

  //   if (this.state.password) {
  //     if (this.state.password.length < 8) {
  //       passErr = '* Password must contain atleast 8 characters.';
  //     }
  //   } else {
  //     passErr = '* This field must be non-empty.';
  //   }

  //   this.setState({ passErr });

  //   if (emailErr || passErr) {
  //     return false;
  //   }
  //   return true;
  // };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // let isvalid = this.validate();
    // if (isvalid) {
    //   this.setState(initialState);
    //   this.props.setAlert('Log in Successfull', 'success');
    // }
    const data = {
      email: 'hasan@gmail.com',
      password: '11223344'
    }
    props.authenticateUser('http://localhost:5000/api/auth/user/', data);
  };

  const handleChange = (evt) => {
    // this.setState({
    //   [evt.target.name]: evt.target.value,
    // });
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
                  value={'this.state.email'}
                  onChange={handleChange}
                  placeholder='Enter Email'
                />
                <div className='valerr'>{'this.state.emailErr'}</div>
              </Form.Field>
              <Form.Field style={{ paddingBottom: '6%' }}>
                <label>Password</label>
                <Input
                  name='password'
                  value={'this.state.password'}
                  onChange={handleChange}
                  type='password'
                  placeholder='Enter Password'
                />
                <div className='valerr'>{'this.state.passErr'}</div>
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
