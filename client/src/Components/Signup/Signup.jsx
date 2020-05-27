import React, { Component } from "react";
import { Button, Form, Input } from "semantic-ui-react";
import Footer from "../Footer/Footer";
//import { Link } from "react-router-dom";
import "./Signup.css";

const divStyle = {
  height: window.screen.height,
};

const initialState = {
  fname: "",
  lname: "",
  email: "",
  pass1: "",
  pass2: "",
  fnameErr: "",
  lnameErr: "",
  emailErr: "",
  pass1Err: "",
  pass2Err: "",
};

class Signup extends Component {
  state = initialState;

  vaidate= () => {
    let fnameErr= ""
    let lnameErr= ""
    let emailErr= ""
    let pass1Err= ""
    let pass2Err= ""

    if(/^[A-Za-z]+$/.test(this.state.fname) === false)
    {
      fnameErr="* First Name can only contain Alphabets"
    }
    if(!this.state.fname)
    {
      fnameErr="* This field must be non-empty."
    }
    this.setState({fnameErr})

    if(/^[A-Za-z]+$/.test(this.state.lname) === false)
    {
      lnameErr="* Last Name can only contain Alphabets"
    }
    if(!this.state.lname)
    {
      lnameErr="* This field must be non-empty."
    }
    this.setState({lnameErr})

    if (this.state.email) {
      if (/^[A-Za-z0-9]\S*@\S+\.\S+$/.test(this.state.email) === false) {
        emailErr = "* Email must be in a valid format.";
      }
    } else {
      emailErr = "* This field must be non-empty.";
    }

    this.setState({ emailErr });

    if (this.state.pass1) {
      if (this.state.pass1.length < 8) {
        pass1Err = "* Password must contain atleast 8 characters.";
      }
    } else {
      pass1Err = "* This field must be non-empty.";
    }

    this.setState({ pass1Err });

    if(this.state.pass1!==this.state.pass2 || !this.state.pass1)
    {
      pass2Err="* Pasword Mismatch"
    }
    this.setState({pass2Err})

    if (fnameErr|| lnameErr || emailErr || pass1Err || pass2Err) {
      return false;
    }
    return true;
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(this.state);
    let isvalid = this.vaidate()
    if (isvalid) {
      this.setState(initialState);
    }
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  render() {
    return (
      <Form.Field className="body" style={divStyle}>
        <Form.Field className="overlay">
          <Form.Field className="main-form">
            <Form onSubmit={this.handleSubmit} className="inside-form">
              <h4>Welcome to Sign Up</h4>
              <Form.Field>
                <label>FirstName</label>
                <Input
                  name="fname"
                  onChange={this.handleChange}
                  value={this.state.fname}
                  placeholder="Enter FirstName"
                />
                <div className="valerr">{this.state.fnameErr}</div>
              </Form.Field>
              <Form.Field>
                <label>LastName</label>
                <Input
                  name="lname"
                  onChange={this.handleChange}
                  value={this.state.lname}
                  placeholder="Enter LastName"
                />
                <div className="valerr">{this.state.lnameErr}</div>
              </Form.Field>
              <Form.Field>
                <label>Email</label>
                <Input
                  name="email"
                  onChange={this.handleChange}
                  value={this.state.email}
                  placeholder="Enter Email"
                />
                <div className="valerr">{this.state.emailErr}</div>
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <Input
                  name="pass1"
                  onChange={this.handleChange}
                  value={this.state.pass1}
                  type="password"
                  placeholder="Enter Password"
                />
                <div className="valerr">{this.state.pass1Err}</div>
              </Form.Field>
              <Form.Field>
                <label>Confirm Password</label>
                <Input
                  name="pass2"
                  onChange={this.handleChange}
                  value={this.state.pass2}
                  type="password"
                  placeholder="Enter Password Again"
                />
                <div className="valerr">{this.state.pass2Err}</div>
              </Form.Field>
              <Form.Field>
                  <Button fluid color="blue" type="submit">
                    SignUp
                  </Button>
              </Form.Field>
            </Form>
          </Form.Field>
        </Form.Field>
        <Footer />
      </Form.Field>
    );
  }
}
export default Signup;
